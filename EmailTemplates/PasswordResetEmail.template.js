export const PasswordResetEmailTemplate = ({ resetURL }) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8" />
        <title>Reset Your Password</title>
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
            .footer {
                font-size: 12px;
                color: #6b7280;
                text-align: center;
                margin-top: 20px;
            }
            .btn {
                display: inline-block;
                padding: 12px 20px;
                background-color: #ef4444;
                color: #ffffff;
                text-decoration: none;
                border-radius: 6px;
                margin-top: 20px;
                text-align: center;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Password Reset Request</h2>
            </div>

            <p>Hi,</p>

            <p>You requested to reset your password. Click the button below to proceed:</p>

            <div style="text-align: center;">
                <a href="${resetURL}" class="btn">Reset Password</a>
            </div>

            <p>If you did not request this, please ignore this email.</p>

            <div class="footer">
                <p>© ${new Date().getFullYear()} AuthCompany. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};
