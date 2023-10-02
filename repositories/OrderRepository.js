import { Op } from 'sequelize';

import { sequelize } from '../db.js';

import Order from '../models/Order.js';

class OrderRepository {

    // READ

    async getOrders() {
        try {
            const res = await Order.findAndCountAll({});
            return res;
        } catch (err) {
            console.log('Get Orders Messages Error: ', err);
            throw Error('There was an error getting all orders');
        }
    }

    async getOrderId(id) {
        try {
            const res = await Order.findAndCountAll({
                where: {
                    id: id
                }
            });
            return res;
        } catch (err) {
            console.log('Get Orders Messages Error: ', err);
            throw Error('There was an error getting all orders');
        }
    }

    async getOrdersByUserId(id) {
        try {
            const res = await Order.findAndCountAll({
                where: {
                    userId: id
                }
            });
            return res;
        } catch (err) {
            console.log('Get Orders Messages Error: ', err);
            throw Error('There was an error getting all orders');
        }
    }

    async getOrdersByProductId(productId) {
        try {
            const res = await sequelize.query(`select *
            from cosmic."Orders"
            where products @> '[{"productId": ${productId}}]'::jsonb`);
            return res;
        } catch (err) {
            console.log('Get Orders Messages Error: ', err);
            throw Error('There was an error getting all orders');
        }
    }

    async getOrdersByRefId(refId) {
        try {
            console.log('Ref id: ', refId);
            const res = await Order.findAndCountAll({
                where: {
                    refId: refId
                }
            });
            return res;
        } catch (err) {
            console.log('Get Orders Messages Error: ', err);
            throw Error('There was an error getting all orders');
        }
    }

    async getOrderByRef(refId) {
        try {
            const res = await Order.findAndCountAll({
                where: {
                    refId
                }
            });
            return res;
        } catch (err) {
            console.log('Get Orders Messages Error: ', err);
            throw Error('There was an error getting all orders');
        }
    }

    // UPDATE

    async updateOrder(orderId, data) {
        try {
            const res = await Order.update(
                data,
                {
                    where: {
                                id: orderId
                            }
                }
            );
            return res;
        } catch (err) {
            console.log('Update User Error: ', err);
            throw Error('There was an error updating the user');
        }
    }
}

export default OrderRepository;