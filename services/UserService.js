import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../models/Associations.js';

import AuthManagement from '../services/AuthManagement.js';
import EmailService from './EmailService.js';

import { passwordValidation } from '../tools/user.js';

const emailService = new EmailService();

export default class UserService {
    hashPassword = async (password) => {
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPTSALT));
        return await bcrypt.hash(password, salt);
    }

    verifyPassword = async (data, encrypted) => {
        return await bcrypt.compare(data, encrypted);
    }

    createEmailToken = async (id, email) => {
        const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 3600 });
        await this.updateUserEmailToken(token, email);

        return token;
    }

    

    initiatePasswordReset = async ({ email }) => {
        const user = await this.getByEmail(email);

        if(user.length === 0) {
            return {
                status: 200
            };
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: 300 });

        await this.updateUserPasswordToken(token, email);

        await emailService.passwordReset({ email, token });

        return{
            status: 200
        };
    }

    completePasswordReset = async ({ passwordToken, password }) => {
        const decoded = jwt.decode(passwordToken, process.env.JWT_SECRET);
        if(!decoded) {
            throw Error('Token Expired');
        }

        const hashedPassword = await this.hashPassword(password);
        
        return await this.updateUserPasswordByToken(passwordToken, hashedPassword);
    }

    getByEmail = async (email) => {
        return await User.findAll({
            where: {
                email
            }
        });
    }

    getByEmailToken = async (emailToken) => {
        return await User.findAll({
            where: {
                emailToken
            }
        });
    }

    async updateUserPasswordToken(token, email) {
        return await User.update(
            { 
                passwordToken: token
            },
            {
                where: {
                    email
                }
            }
        );
    }

    async updateUserEmailToken(emailToken, email) {
        return await User.update(
            { 
                emailToken
            },
            {
                where: {
                    email
                }
            }
        );
    }

    async updateUserEmailVerified(id) {
        return await User.update(
            { 
                emailVerified: true
            },
            {
                where: {
                    id
                }
            }
        );
    }

    async updateUserPassword(id, password) {
        return await User.update(
            { 
                password
            },
            {
                where: {
                    id
                }
            }
        );
    }

    async updateUserPasswordByToken(passwordToken, password) {
        return await User.update(
            { 
                password,
                passwordToken: null
            },
            {
                where: {
                    passwordToken
                }
            }
        );
    }


    async updateAccountPassword(id, data) {
        try {
            const { currentPassword, newPassword } = data;
            const getUser = await User.findByPk(id);

            if(!getUser) {
                return {
                    status: 404,
                    error: 'Unable to update user password'
                }
            }

            const verifyPassword = await this.verifyPassword(currentPassword, getUser.password);

            if(!verifyPassword) {
                return {
                    status: 403,
                    error: 'Current password incorrect'
                }
            }
            
            if(!passwordValidation(newPassword) || currentPassword === newPassword) {
                return {
                    status: 406,
                    error: 'Password does not meet validation standards'
                }
            }

            const hashedPassword = await this.hashPassword(newPassword);

            const res = await this.updateUserPassword(id, hashedPassword);
            return res;
        } catch (err) {
            console.log('Update User Error: ', err);
            throw Error('There was an error updating the user');
        }
    }
}