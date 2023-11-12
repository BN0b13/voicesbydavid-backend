import { Message } from '../models/Associations.js';
import EmailService from '../services/EmailService.js';

import ReCaptchaCheck from '../tools/ReCaptcha.js';

const emailService = new EmailService();

class MessageRepository {


    // CREATE

    async create(reCaptcha, params) {
        const checkReCaptcha = await ReCaptchaCheck(reCaptcha);
        
        if(checkReCaptcha !== 200) {
            return {
                status: 403,
                message: 'reCAPTCHA validation failed'
            }
        }

        const data = {
            ...params,
            status: 'new',
            replied: false,
            deleted: false
        };

        try {
            const res = await Message.create(data);

            await emailService.messageReceived({ 
                firstName: params.firstName, 
                lastName: params.lastName, 
                phone: params.phone, 
                email: params.email, 
                message: params.message 
            });

            return {
                status: 201,
                message: 'Message created.',
                response: res
            };
        } catch (err) {
            console.log(err);
            throw Error('There was an error creating the message');
        }
    }

    // READ

    async getMessages() {
        try {
            const res = await Message.findAndCountAll({});
            return res;
        } catch (err) {
            console.log('Get Messages Error: ', err);
            throw Error('There was an error getting the messages');
        }
    }

    async getMessageById(id) {
        try {
            const res = await Message.findAll(
                {
                    where: {
                        id: id
                    }
                }
            );
            return res;
        } catch (err) {
            console.log('Get Message by id Error: ', err);
            throw Error('There was an error getting the message by id');
        }
    }

    // UPDATE 

    async updateMessage(id, data) {
        try {
            const res = await Message.update(
                data,
                {
                    where: {
                                id: id
                            }
                }
            );
            return res;
        } catch (err) {
            console.log('Update Message Error: ', err);
            throw Error('There was an error updating the message');
        }
    }
}

export default MessageRepository;