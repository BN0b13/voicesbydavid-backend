import { Configuration, Theme } from '../models/Associations.js';

class ConfigurationRepository {

    // READ

    async getConfigurations() {
        try {
            const res = await Configuration.findAndCountAll({
                include: [
                    { 
                        model: Theme,
                        required: true
                    }
                ]
            });

            return res;
        } catch (err) {
            console.log('Get Configurations Error: ', err);
            throw Error('There was an error getting configurations');
        }
    }

    async getAdminConfiguration() {
        try {
            const res = await Configuration.findAndCountAll({
                where: {
                    name: 'admin'
                },
                include: [
                    { 
                        model: Theme,
                        required: true
                    }
                ]
            });

            return res;
        } catch (err) {
            console.log('Get Admin Configuration Error: ', err);
            throw Error('There was an error getting the admin configuration');
        }
    }

    async getPublicConfiguration() {
        try {
            const res = await Configuration.findAndCountAll({
                where: {
                    name: 'public'
                },
                include: [
                    { 
                        model: Theme,
                        required: true
                    }
                ]
            });

            const data = res;

            return data;
        } catch (err) {
            console.log('Get Public Configuration Error: ', err);
            throw Error('There was an error getting categories');
        }
    }

    async getPublicConfigurationSocialMedia() {
        try {
            const res = await Configuration.findAndCountAll({
                where: {
                    name: 'public'
                },
                include: [
                    { 
                        model: Theme,
                        required: true
                    }
                ]
            });

            
            const socialMedias = res.rows[0].options.socialMedia;

            const data = {};

            for(let social in socialMedias) {
                if(socialMedias[social].active) {
                    data[social] = socialMedias[social];
                }
                if(!socialMedias[social].active) {
                    data[social] = {
                        url: socialMedias[social].active
                    }
                }
            }

            return data;
        } catch (err) {
            console.log('Get Public Configuration Error: ', err);
            throw Error('There was an error getting categories');
        }
    }

    // UPDATE

    async updatePublicSocialMedia(data) {
        try {
            const getRes = await Configuration.findAndCountAll({
                where: {
                    name: 'public'
                },
                include: [
                    { 
                        model: Theme,
                        required: true
                    }
                ]
            });

            const previousOptions = getRes.rows[0].options;

            const res = await Configuration.update(
                {
                    options: {
                        ...previousOptions,
                        ...data
                    }
                },
                {
                    where: {
                        name: 'public'
                    }
                }
            );
            return res;
        } catch (err) {
            console.log('Update Category Error: ', err);
            throw Error('There was an error updating the category');
        }
    }
}

export default ConfigurationRepository;