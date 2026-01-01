export const WelcomeEmailTemplate = ({ name }) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8" />
        <title>Welcome to AuthCompany</title>
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
            .welcome-text {
                font-size: 24px;
                font-weight: bold;
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
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Welcome Aboard!</h2>
            </div>

            <p>Hi <strong>${name}</strong>,</p>

            <p>We are thrilled to have you with us! Your account has been successfully verified.</p>

            <div class="welcome-text">Results delivered!</div>

            <p>You can now log in and explore all the features we have to offer.</p>

            <div style="text-align: center;">
                <a href="#" class="btn">Go to Dashboard</a>
            </div>

            <p>If you have any questions, feel free to reply to this email.</p>

            <div class="footer">
                <p>© ${new Date().getFullYear()} AuthCompany. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};
