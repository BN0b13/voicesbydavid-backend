import sgMail from '@sendgrid/mail';

import EmailTemplates from '../templates/EmailTemplates.js';

import { companyEmail } from '../config.js';

const emailTemplates = new EmailTemplates();

export default class EmailService {
    passwordReset = async ({ email, token }) => {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const data = emailTemplates.passwordResetEmailTemplate({ token });

        const msg = {
            to: email,
            from: data.sellerEmail,
            subject: data.emailSubject,
            text: data.emailBody,
            html: data.html
        }
        try {
            return await sgMail.send(msg);
        } catch (err) {
            console.log('Unable to send password reset email. Error: ', err);
            throw new Error(`Password Reset Email error: ${err}`);
        }
    }

    messageReceived = async ({ firstName, lastName, phone, email, message }) => {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const data = emailTemplates.messageReceivedTemplate({ firstName, lastName, phone, email, message });

        const msg = {
            to: companyEmail,
            from: data.sellerEmail,
            subject: data.emailSubject,
            text: data.emailBody,
            html: data.html
        }
        try {
            return await sgMail.send(msg);
        } catch (err) {
            console.log('Unable to send message received email. Error: ', err);
            throw new Error(`Message Received Email error: ${err}`);
        }
    }
}