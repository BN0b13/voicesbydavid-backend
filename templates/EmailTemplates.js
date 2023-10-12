import { companyName, companySupportEmail } from "../config.js";

export default class EmailTemplates {
    passwordResetEmailTemplate = ({ token }) => {
        return {
            sellerEmail: companySupportEmail,
            emailSubject: `${companyName} Password Reset`,
            emailBody: `Hello! The password reset process has been initiated on your account. Please click the link below to reset your password. If you did not initiate this process, please disregard this email and continue on using your normal password. 
            https://admin.voicesbydavid.com/password-reset/${token}`,
            html: `
                <div style='text-align:center;'>
                    <h1>${companyName}</h1>
                    <p>Hello! The password reset process has been initiated on your account. Please click the link below to reset your password. If you did not initiate this process, please disregard this email and continue using your normal password.</p>
                    <button style='border-radius:5px;'>
                        <a href='https://admin.voicesbydavid.com/password-reset/${token}' style='text-decoration:none;border-radius:5px;padding:5px;'>
                            Reset Password
                        </a>
                    </button>
                </div>
            `
        }
    }
}