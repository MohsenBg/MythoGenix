interface UserInfo {
  email: string;
  username: string;
  variationUrl: string;
}

export function verificationEmailTemplate(userInfo: UserInfo) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Email Verification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
      }
  
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #fff;
      }
  
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
  
      .logo img {
        max-width: 150px;
      }
  
      .message {
        margin-bottom: 30px;
      }
  
      .button-container {
        text-align: center;
      }
  
      .button {
        display: inline-block;
        padding: 12px 24px;
        border-radius: 5px;
        background-color: #badbff;
        color: #fff;
        text-decoration: none;
        font-weight: bold;
        transition: background-color 0.3s ease;
      }
  
      .button:hover {
        color:#fff;
        background-color: #63a1e5;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">
        <img src="https://cdn.logo.com/hotlink-ok/logo-social.png" alt="Logo">
      </div>
      <div class="message">
        <p>Dear ${userInfo.username},</p>
        <p>Thank you for signing up! Please click the button below to verify your email address:</p>
      </div>
      <div class="button-container">
        <a class="button" href="${userInfo.variationUrl}">Verify Email</a>
      </div>
    </div>
  </body>
  </html>
  `;
}
