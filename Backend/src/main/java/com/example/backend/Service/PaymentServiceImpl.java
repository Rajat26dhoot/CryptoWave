package com.example.backend.Service;


import com.example.backend.Domain.PaymentMethod;
import com.example.backend.Domain.PaymentOrderStaus;
import com.example.backend.Model.PaymentOrder;
import com.example.backend.Model.User;
import com.example.backend.Repository.PaymentOrderRepository;
import com.example.backend.Response.PaymentResponse;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentOrderRepository paymentOrderRepository;

    @Value("${stripe.api.key}")
    private String stripeSecretKey;

    @Value("${razorpay.api.key}")
    private String apiKey;

    @Value("${razorpay.api.secret}")
    private String apiSecretKey;


    @Override
    public PaymentOrder createOrder(User user, Long amount, PaymentMethod paymentMethod) {
        PaymentOrder paymentOrder = new PaymentOrder();
        paymentOrder.setUser(user);
        paymentOrder.setAmount(amount);
        paymentOrder.setPaymentMethod(paymentMethod);
        paymentOrder.setStatus(PaymentOrderStaus.PENDING);
        return paymentOrderRepository.save(paymentOrder);
    }

    @Override
    public PaymentOrder getPaymentOrderById(Long id) throws Exception{
        return paymentOrderRepository.findById(id).orElseThrow(()-> new Exception("Payment order not Found"));
    }

    @Override
    public Boolean ProceedPaymentOrder(PaymentOrder paymentOrder, String paymentId) throws Exception {
        if (paymentOrder.getStatus() == null) {
            paymentOrder.setStatus(PaymentOrderStaus.PENDING);
        }

        if (paymentOrder.getStatus().equals(PaymentOrderStaus.PENDING)) {
            if (paymentOrder.getPaymentMethod().equals(PaymentMethod.RAZORPAY)) {
                RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecretKey);
                Payment payment = razorpay.payments.fetch(paymentId);

                Integer amount = payment.get("amount");
                String status = payment.get("status");

                if (status.equals("captured")) {
                    paymentOrder.setStatus(PaymentOrderStaus.SUCCESS);
                    paymentOrderRepository.save(paymentOrder);
                    return true;
                }

                paymentOrder.setStatus(PaymentOrderStaus.FAILED);
                paymentOrderRepository.save(paymentOrder);
                return false;
            }

            if (paymentOrder.getPaymentMethod().equals(PaymentMethod.STRIPE)) {
                Stripe.apiKey = stripeSecretKey;

                try {
                    // Fetch session details using session ID (paymentId)
                    Session session = Session.retrieve(paymentId);

                    Long amount = session.getAmountTotal(); // Amount in cents
                    String status = session.getStatus(); // Payment status

                    if ("complete".equals(status) && amount.equals(paymentOrder.getAmount() * 100)) {
                        paymentOrder.setStatus(PaymentOrderStaus.SUCCESS);
                        paymentOrderRepository.save(paymentOrder);
                        return true;
                    }

                    paymentOrder.setStatus(PaymentOrderStaus.FAILED);
                    paymentOrderRepository.save(paymentOrder);
                    return false;

                } catch (StripeException e) {
                    System.out.println("Error fetching Stripe session: " + e.getMessage());
                    paymentOrder.setStatus(PaymentOrderStaus.FAILED);
                    paymentOrderRepository.save(paymentOrder);
                    return false;
                }
            }
        }
        return false;
    }



    @Override
    public PaymentResponse createRazorpayPaymentLink(User user, Long amount,Long orderId) throws RazorpayException {
        Long Amount=amount*100;
        try{
            RazorpayClient razorpay=new RazorpayClient(apiKey,apiSecretKey);

            JSONObject paymentLinkRequest=new JSONObject();
            paymentLinkRequest.put("amount",amount);
            paymentLinkRequest.put("currency","INR");

            JSONObject customer=new JSONObject();
            customer.put("name",user.getUsername());

            customer.put("email",user.getEmail());
            paymentLinkRequest.put("customer",customer);

            JSONObject notify=new JSONObject();
            notify.put("email",true);
            paymentLinkRequest.put("notify",notify);

            paymentLinkRequest.put("reminder_enable",true);

            paymentLinkRequest.put("callback_url","https://localhost:5173/wallet?order_id="+orderId);
            paymentLinkRequest.put("callback_method","get");

            PaymentLink payment=razorpay.paymentLink.create(paymentLinkRequest);

            String paymentLinkId=payment.get("id");
            String paymentLinkUrl=payment.get("short_url");

            PaymentResponse res=new PaymentResponse();
            res.setPayment_url(paymentLinkUrl);

            return res;

        } catch (RazorpayException e) {
            System.out.println("Error creating razorpay payment link"+e.getMessage());
            throw new RazorpayException(e.getMessage());
        }
    }

    @Override
    public PaymentResponse createStripePaymentLink(User user, Long amount, Long orderId) throws StripeException {
        Stripe.apiKey = stripeSecretKey;

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:5173/wallet?order_id=" + orderId+"&payment_id={CHECKOUT_SESSION_ID}")
                .setCancelUrl("http://localhost:5173/payment/cancel")
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("usd")
                                .setUnitAmount(amount * 100)
                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                        .setName("Top up wallet")
                                        .build()
                                )
                                .build()
                        )
                        .build()
                )
                .build();

        Session session=Session.create(params);
        System.out.println("Session: " + session);

        PaymentResponse res = new PaymentResponse();
        res.setPayment_url(session.getUrl());

        return res;

    }

}
