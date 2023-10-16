import ConfigurationRepository from '../repositories/ConfigurationRepository.js';

const configurationRepository = new ConfigurationRepository();

class ConfigurationController {

    // READ
    
    async getAdminConfiguration(req, res) {
        const data = await configurationRepository.getAdminConfiguration();
        res.send(data);
    }
    
    async getPublicConfiguration(req, res) {
        const data = await configurationRepository.getPublicConfiguration();
        res.send(data);
    }
    
    async getPublicConfigurationSocialMedia(req, res) {
        const data = await configurationRepository.getPublicConfigurationSocialMedia();
        res.send(data);
    }

    // UPDATE

    async updatePublicSocialMedia(req, res) {
        const {
            facebookActive = null,
            facebookUrl = null,
            instagramActive = null,
            instagramUrl = null,
            twitterActive = null,
            twitterUrl = null,
            youtubeActive = null,
            youtubeUrl = null,
        } = req.body;

        const params = {
                socialMedia: {
                facebook: {
                    url: facebookUrl,
                    active: facebookActive
                },
                instagram: {
                    url: instagramUrl,
                    active: instagramActive
                },
                twitter: {
                    url: twitterUrl,
                    active: twitterActive
                },
                youtube: {
                    url: youtubeUrl,
                    active: youtubeActive
                }
            }
        };

        Object.values(params).forEach(param => {
            if(param === null) {
                throw Error(`Missing ${params[param]} Param`);
            }
        });

        const data = await configurationRepository.updatePublicSocialMedia(params);
        res.send(data);
    }
}

export default ConfigurationController;