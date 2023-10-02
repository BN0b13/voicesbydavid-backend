import { companyName, companyEmail, companySupportEmail } from "../config.js";

export default class EmailTemplates {
    orderReceivedEmailTemplate = ({ refId }) => {
        return {
            sellerEmail: companyEmail,
            emailSubject: `Order Received at  ${companyName}`,
            emailBody: `Hello! Your order at ${companyName} has been received. Reference: ${refId}. Once it has been shipped out, you will receive another email with the tracking information. Thank you for your purchase and we hope to see you again soon!`,
            html: `
                <div style='text-align:center;'>
                    <h1>${companyName}</h1>
                    <p>Thank you for your order! Your order at ${companyName} has been received. Reference: ${refId}. Once it has been shipped out, you will receive another email with the tracking information. Thank you for your purchase and we hope to see you again soon!</p>
                </div>
            `
        }
    }

    paymentLinkEmailTemplate = ({ refId, paymentLink }) => {
        return {
            sellerEmail: companyEmail,
            emailSubject: `${companyName} Payment Link`,
            emailBody: `Hello! Your order at ${companyName} is ready to be processed. Reference: ${refId}. Please use this payment link to pay your invoice ${paymentLink}. If payment is not received within 72 hours of receiving this email, your order will be canceled. Thank you for your purchase and we hope to see you again soon!`,
            html: `
                <div style='text-align:center;'>
                    <h1>${companyName}</h1>
                    <p>Hello! Your order at ${companyName} is ready to be processed. Reference: ${refId}. Please use this payment link to pay your invoice ${paymentLink}. If payment is not received within 72 hours of receiving this email, your order will be canceled. Thank you for your purchase and we hope to see you again soon!</p>
                </div>
            `
        }
    }

    orderShippedEmailTemplate = ({ refId, tracking }) => {
        return {
            sellerEmail: companyEmail,
            emailSubject: `Order Shipped from  ${companyName}`,
            emailBody: `Hello! Your order at ${companyName} has been shipped. Reference: ${refId}. Your tracking number is: ${tracking}. Thank you for your purchase and we hope to see you again soon!`,
            html: `
                <div style='text-align:center;'>
                    <h1>${companyName}</h1>
                    <p>Hello! Your order at ${companyName} has been shipped. Reference: ${refId}. Your tracking number is: ${tracking}. Thank you for your purchase and we hope to see you again soon!</p>
                </div>
            `
        }
    }
    
    passwordResetEmailTemplate = ({ token }) => {
        return {
            sellerEmail: companySupportEmail,
            emailSubject: `${companyName} Password Reset`,
            emailBody: `Hello! The password reset process has been initiated on your account. Please click the link below to reset your password. If you did not initiate this process, please disregard this email and continue on using your normal password. 
            https://www.voicesbydavid.com/password-reset/${token}`,
            html: `
                <div style='text-align:center;'>
                    <h1>${companyName}</h1>
                    <p>Hello! The password reset process has been initiated on your account. Please click the link below to reset your password. If you did not initiate this process, please disregard this email and continue using your normal password.</p>
                    <button style='border-radius:5px;'>
                        <a href='https://www.voicesbydavid.com/password-reset/${token}' style='text-decoration:none;border-radius:5px;padding:5px;'>
                            Reset Password
                        </a>
                    </button>
                </div>
            `
        }
    }
    
    verifyEmailTemplate = ({ token }) => {
        return {
            sellerEmail: companySupportEmail,
            emailSubject: `${companyName} Email Verification`,
            emailBody: `Hello and welcome! Please click on the link below to verify your ${companyName} account. Thank you for signing up with us and we hope to see you soon!  
            https://www.voicesbydavid.com/verify-email/${token}`,
            html: `
                <div style='text-align:center;'>
                    <h1>${companyName}</h1>
                    <p>Hello and welcome! Please click on the link below to verify your ${companyName} account. Thank you for signing up with us and we hope to see you soon!</p>
                    <button style='border-radius:5px;'>
                        <a href='https://www.voicesbydavid.com/verify-email/${token}' style='text-decoration:none;border-radius:5px;padding:5px;'>
                            Verify Email
                        </a>
                    </button>
            `
        }
    }
}