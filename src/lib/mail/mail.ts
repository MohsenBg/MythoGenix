import { SendMailOptions } from "nodemailer";
import { transporter } from "./nodemailerConfig";
import { verificationEmailTemplate } from "./templateMail";
interface UserInfo {
  email: string;
  username: string;
  variationUrl: string;
}

async function sendVerificationUrl(userInfo: UserInfo) {
  const mailOptions: SendMailOptions = {
    from: "genixmytho@gmail.com",
    to: `${userInfo.email}`,
    subject: "Account Verification: Please Verify Your Email Address",
    html: verificationEmailTemplate(userInfo),
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
}

export { sendVerificationUrl };
