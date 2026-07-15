import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserWallet } from '../../State/Wallet/Action';
import { getUserAssets } from '../../State/Asset/Action';
import { payOrder } from '../../State/Order/Action';
import { formatCurrency } from '../../utils/currency';

const TradingForm = ({ coinId, coinName, currentPrice, priceChangePercentage24h, isOpen, onClose }) => {
    const dispatch = useDispatch();

    const [amount, setAmount] = useState('');
    const [quantity, setQuantity] = useState('');
    const [tradeAlert, setTradeAlert] = useState('');

    // Fetch wallet details
    const { wallet, asset } = useSelector((state) => state);
    const userWallet = wallet?.userWallet;
    const userAssets = asset?.userAsset || [];
    const selectedAsset = userAssets.find((item) => item?.coin?.id === coinId);
    const availableQuantity = Number(selectedAsset?.quantity) || 0;

    useEffect(() => {
        if (coinId) {
            const jwt = localStorage.getItem('jwt');
            dispatch(getUserWallet(jwt));
            dispatch(getUserAssets(jwt));
        }
    }, [coinId, dispatch]);

    if (!isOpen) return null;

    // Calculate Quantity based on amount
    const calculateByCost = (amount, price) => {
        if (!price) return 0;
        let volume = amount / price;
        let decimalPlaces = Math.max(2, price.toString().split('.')[0].length);
        return volume.toFixed(decimalPlaces);
    };

    // Calculate Amount based on quantity
    const calculateByQuantity = (quantity, price) => {
        if (!price) return 0;
        let total = quantity * price;
        return total.toFixed(2);
    };

    // Handle Amount Change
    const handleAmountChange = (e) => {
        const value = e.target.value === '' ? '' : parseFloat(e.target.value) || 0;
        setAmount(value);
        setTradeAlert('');

        if (value === '') {
            setQuantity('');
        } else {
            const volume = calculateByCost(value, currentPrice);
            setQuantity(volume);
        }
    };

    // Handle Quantity Change
    const handleQuantityChange = (e) => {
        const value = e.target.value === '' ? '' : parseFloat(e.target.value) || 0;
        setQuantity(value);
        setTradeAlert('');

        if (value === '') {
            setAmount('');
        } else {
            const total = calculateByQuantity(value, currentPrice);
            setAmount(total);
        }
    };

    // Handle Buy and Sell Actions
    const showTradeAlert = (message) => {
        setTradeAlert(message);
    };

    const handleBuy = async () => {
        const orderAmount = Number(amount);
        const orderQuantity = Number(quantity);
        const availableCash = Number(userWallet?.balance) || 0;

        if (!orderAmount || !orderQuantity || orderAmount <= 0 || orderQuantity <= 0) {
            showTradeAlert('Please enter a valid amount and quantity.');
            return;
        }

        if (orderAmount > availableCash) {
            showTradeAlert(
                `Insufficient wallet balance. Available cash is ${formatCurrency(availableCash)}.`
            );
            return;
        }

        const orderData = {
            coinId,
            quantity: orderQuantity,
            orderType: 'BUY',
        };

        try {
            await dispatch(
                payOrder({
                    jwt: localStorage.getItem('jwt'),
                    orderData,
                })
            );
            onClose();
        } catch (error) {
            showTradeAlert(error.message);
        }
    };

    const handleSell = async () => {
        const orderAmount = Number(amount);
        const orderQuantity = Number(quantity);

        if (!orderAmount || !orderQuantity || orderAmount <= 0 || orderQuantity <= 0) {
            showTradeAlert('Please enter a valid amount and quantity.');
            return;
        }

        if (availableQuantity <= 0) {
            showTradeAlert(`You do not have any ${coinName} available to sell.`);
            return;
        }

        if (orderQuantity > availableQuantity) {
            showTradeAlert(
                `Insufficient ${coinName} quantity. Available quantity is ${availableQuantity}.`
            );
            return;
        }

        const orderData = {
            coinId,
            quantity: orderQuantity,
            orderType: 'SELL',
        };

        try {
            await dispatch(
                payOrder({
                    jwt: localStorage.getItem('jwt'),
                    orderData,
                })
            );
            onClose();
        } catch (error) {
            showTradeAlert(error.message);
        }
    };

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#0e0e0e] text-white p-8 rounded-lg w-[500px]">
                {/* Close Button */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">How much do you want to spend?</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">
                        ✕
                    </button>
                </div>

                {/* Input Section */}
                <div className="flex gap-4 mb-6">
                    {/* Amount Input */}
                    <input
                        type="number"
                        placeholder="Enter amount..."
                        value={amount}
                        onChange={handleAmountChange}
                        className="w-2/3 text-white border border-gray-600 px-5 py-3 rounded text-lg"
                    />
                    {/* Quantity Input */}
                    <input
                        type="number"
                        placeholder="Qty"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="w-1/3 text-white border border-gray-600 px-5 py-3 rounded text-lg"
                    />
                </div>

                {tradeAlert && (
                    <div className="mb-6 rounded border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-200">
                        {tradeAlert}
                    </div>
                )}

                {/* Token Info */}
                <div className="mb-6">
                    <div className="flex justify-between items-center">
                        <span className="text-xl">{coinId} • {coinName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-green-400 text-lg">
                            {formatCurrency(currentPrice)}
                        </span>
                        <span
                            className={`${
                                priceChangePercentage24h < 0
                                    ? 'text-red-500'
                                    : 'text-green-500'
                            } text-lg`}
                        >
                            {priceChangePercentage24h?.toFixed(2)}%
                        </span>
                    </div>
                </div>

                {/* Order Type and Available Cash */}
                <div className="flex justify-between mb-4 text-gray-400 text-lg">
                    <span>Order Type</span>
                    <span className="text-white">Market Order</span>
                </div>
                <div className="flex justify-between mb-6 text-gray-400 text-lg">
                    <span>Available Cash</span>
                    <span className="text-white">
                        {formatCurrency(userWallet?.balance || 0)}
                    </span>
                </div>
                <div className="flex justify-between mb-6 text-gray-400 text-lg">
                    <span>Available Qty</span>
                    <span className="text-white">{availableQuantity}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-6">
                    <button
                        onClick={handleBuy}
                        className="w-1/2 bg-green-500 text-white py-3 rounded hover:bg-green-400 text-lg font-semibold"
                    >
                        Buy
                    </button>
                    <button
                        onClick={handleSell}
                        className="w-1/2 bg-red-500 text-white py-3 rounded hover:bg-red-400 text-lg font-semibold"
                    >
                        Sell
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TradingForm;
