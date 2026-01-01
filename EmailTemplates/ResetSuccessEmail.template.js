export const ResetSuccessEmailTemplate = ({ name }) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8" />
        <title>Password Reset Successful</title>
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
            .success-icon {
                font-size: 48px;
                color: #22c55e;
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
                background-color: #22c55e;
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
                <h2>Password Reset Successful</h2>
            </div>

            <div class="success-icon">✓</div>

            <p>Hi <strong>${name}</strong>,</p>

            <p>Your password has been successfully reset. You can now log in with your new password.</p>

            <div style="text-align: center;">
                <a href="#" class="btn">Log In Now</a>
            </div>

            <p>If you did not perform this action, please contact our support team immediately.</p>

            <div class="footer">
                <p>© ${new Date().getFullYear()} AuthCompany. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};
