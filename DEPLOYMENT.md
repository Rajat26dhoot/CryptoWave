# Free Deployment Checklist

Recommended free setup:

- Frontend: Vercel
- Backend: Render Docker web service
- Database: Aiven free MySQL

## 1. Create The MySQL Database

Create a free Aiven for MySQL service, then copy its connection details.

Use this JDBC URL format for Spring Boot:

```text
jdbc:mysql://HOST:PORT/defaultdb?ssl-mode=REQUIRED
```

## 2. Deploy Backend On Render

Create a new Render Web Service from this GitHub repo.

Render settings:

- Root directory: `Backend`
- Runtime: `Docker`
- Dockerfile path: `Dockerfile`

Environment variables:

```text
SPRING_DATASOURCE_URL=jdbc:mysql://HOST:PORT/defaultdb?ssl-mode=REQUIRED
SPRING_DATASOURCE_USERNAME=YOUR_AIVEN_USER
SPRING_DATASOURCE_PASSWORD=YOUR_AIVEN_PASSWORD
DB_POOL_MAX_SIZE=2
DB_POOL_MIN_IDLE=1
JWT_SECRET=generate-a-long-random-secret
STRIPE_API_KEY=your_stripe_secret_key
RAZORPAY_API_KEY=your_razorpay_key
RAZORPAY_API_SECRET=your_razorpay_secret
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_gmail_app_password
FRONTEND_URL=https://your-vercel-domain.vercel.app
```

Note: Render free web services may block outbound SMTP ports such as `587`. If OTP email fails on the free backend, switch the email code to an HTTP email API provider, or use a backend host/plan that allows SMTP.

Deploy once. Copy the Render backend URL, for example:

```text
https://cryptowave-backend.onrender.com
```

## 3. Deploy Frontend On Vercel

Import the same GitHub repo into Vercel.

Vercel settings:

- Root directory: `Frontend`
- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`

Environment variable:

```text
VITE_API_BASE_URL=https://your-render-backend.onrender.com
```

Redeploy the frontend after adding the environment variable.

## 4. Update Backend Frontend URL

After Vercel gives you the final frontend URL, go back to Render and set:

```text
FRONTEND_URL=https://your-vercel-domain.vercel.app
```

Then redeploy the backend.
