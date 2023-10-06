import AuthManagement from '../services/AuthManagement.js';
import UserService from '../services/UserService.js';

import { Role, User } from '../models/Associations.js';

const authManagement = new AuthManagement();
const userService = new UserService();

class UserRepository {
    // READ

    async adminLogin({ email, password }) {
        try {
            const getUser = await this.getSingleUserByEmail(email);

            console.log('Admin Login GET user: ', );

            if(!getUser) {
                throw Error('Email does not exist');
            }

            if(getUser.roleId !== 1) {
                throw Error('Access Denied');
            }

            const verifyPassword = await userService.verifyPassword(password, getUser.password);

            if(!verifyPassword) {
                throw Error('Password was not correct');
            }

            const token = await authManagement.createToken({
                id: getUser.id,
                roleId: getUser.roleId,
                email: getUser.email
            });

            return {
                status: 200,
                token,
                email: getUser.email
            };
        } catch (err) {
            console.log('Login error: ', err);
            throw Error('There was an error logging in');
        }
    }

    async getUser(id) {
        const user = await User.findOne({
            where: {
                id
            }
        });

        const data = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            address: user.address,
            emailVerified: user.emailVerified,
            themeId: user.themeId,
            themeInverted: user.themeInverted,
        }

        return data;
    }

    async getByPK(id) {
        return await User.findByPk(id);
    }

    async getUsers() {
        try {
            const res = await User.findAndCountAll({
                include: [
                    { 
                        model: Role
                    }
                ]
            });
            return res;
        } catch (err) {
            console.log('Get Users Error: ', err);
            throw Error('There was an error getting all users');
        }
    }

    async getUserById(id) {
        try {
            const res = await User.findAll(
                {
                    where: {
                        id:id
                    },
                    include: [
                        { 
                            model: Role
                        }
                    ]
                }
            );
            return res;
        } catch (err) {
            console.log('Get Users Error: ', err);
            throw Error('There was an error getting all users');
        }
    }

    async getSingleUserByEmail(email) {
        return await User.findOne({
            where: {
                email
            }
        });
    }

    async getAdmin() {
        return await User.findAndCountAll({
            where: {
                roleId: 2
            },
            include: [
                { 
                    model: Role
                }
            ]
        });
    }

    // UPDATE

    async updateUser(id, data) {
        try {
            const res = await User.update(
                data,
                {
                    where: {
                                id: id
                            }
                }
            );
            return res;
        } catch (err) {
            console.log('Update User Error: ', err);
            throw Error('There was an error updating the user');
        }
    }

    // DELETE

    async deleteUser(id) {
        try {
            const res = await User.destroy(
                {
                    where: {
                                id: id
                            }
                }
            );
            return res;
        } catch (err) {
            console.log('Delete User Error: ', err);
            throw Error('There was an error deleting the user');
        }
    }
}

export default UserRepository;