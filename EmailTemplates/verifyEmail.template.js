export const verifyEmailTemplate = ({ name, code }) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8" />
        <title>Verify Your Email</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f6f8;
                padding: 20px;
            }
            .container {
                max-width: 500px;
                margin: auto;
                background: #ffffff;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
            .code {
                font-size: 32px;
                font-weight: bold;
                letter-spacing: 6px;
                color: #2563eb;
                text-align: center;
                margin: 20px 0;
            }
            .footer {
                font-size: 12px;
                color: #6b7280;
                text-align: center;
                margin-top: 20px;
            }
            .btn {
                display: inline-block;
                padding: 12px 20px;
                background-color: #2563eb;
                color: #ffffff;
                text-decoration: none;
                border-radius: 6px;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Email Verification</h2>
            </div>

            <p>Hi <strong>${name}</strong>,</p>

            <p>Thank you for signing up. Please use the verification code below to verify your email address:</p>

            <div class="code">${code}</div>

            <p>This code will expire in <strong>24 hours</strong>.</p>

            <p>If you did not create this account, please ignore this email.</p>

            <div class="footer">
                <p>© ${new Date().getFullYear()} Your App. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};
