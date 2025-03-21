import ReelService from '../services/ReelService.js';

const reelService = new ReelService();

class ReelController {

    // CREATE

    async createAudio(req, res) {
        try {
            const {
                categoryId = null,
                position = 0,
                reelDate = null,
                title = null,
                description = null,
                company = null,
                companyUrl = null,
            } = req.body;

            const requiredParams = {
                categoryId,
                reelType: 'audio',
                title
            };

            Object.values(requiredParams).forEach(param => {
                if(param === null) {
                    throw Error(`Missing ${requiredParams[param]} Param`);
                }
            });

            const optionalParams = {
                position,
                reelDate,
                description,
                company,
                companyUrl
            }

            const params = {
                ...requiredParams,
                ...optionalParams
            }

            const audio = req.files[0];

            const data = await reelService.createAudioReel(params, audio);

            res.send(data);
        } catch (err) {
            res.send({
                err,
                message: 'There was an error creating the Audio Reel'
            });
        }
    }

    async createVideo(req, res) {
        try {
            const {
                categoryId = null,
                position = 0,
                reelDate = null,
                title = null,
                description = null,
                company = null,
                companyUrl = null
            } = req.body;

            const requiredParams = {
                categoryId,
                reelType: 'video',
                title
            };

            Object.values(requiredParams).forEach(param => {
                if(param === null) {
                    throw Error(`Missing ${requiredParams[param]} Param`);
                }
            });

            const optionalParams = {
                position,
                reelDate,
                description,
                company,
                companyUrl
            }

            const params = {
                ...requiredParams,
                ...optionalParams
            }

            const video = req.files[0];

            const data = await reelService.createVideo(params, video);

            res.send(data);
        } catch (err) {
            res.send({
                err,
                message: 'There was an error creating the Video Reel'
            });
        }
    }

    async createYoutubeReel(req, res) {
        try {
            const {
                categoryId = null,
                position = 0,
                reelDate = null,
                title = null,
                description = null,
                company = null,
                companyUrl = null,
                url = null,
            } = req.body;

            const requiredParams = {
                categoryId,
                reelType: 'youtube',
                title,
                url: `<${url}>`
            };

            Object.values(requiredParams).forEach(param => {
                if(param === null) {
                    throw Error(`Missing ${requiredParams[param]} Param`);
                }
            });

            const optionalParams = {
                position,
                reelDate,
                description,
                company,
                companyUrl
            }

            const params = {
                ...requiredParams,
                ...optionalParams
            }

            const data = await reelService.createYoutubeReel(params);

            res.send(data);
        } catch (err) {
            res.send({
                err,
                message: 'There was an error creating the Youtube Reel'
            });
        }
    }

    // READ
    
    async getReels(req, res) {
        const data = await reelService.getReels();
        res.send(data);
    }

    async getReelById(req, res) {
        const { id } = req.params;
        const data = await reelService.getReelById(id);
        res.send(data);
    }

    async getAudioReelByFilename(req, res) {
        await reelService.getAudioReelByFilename(req, res);
    }

    async getVideoReelByFilename(req, res) {
        await reelService.getVideoReelByFilename(req, res);
    }

    // PATCH

    async activateReel(req, res) {
        const { id } = req.body;

        const data = await reelService.activateReel(id);
        res.send(data);
    }

    async updateReel(req, res) {
        const {
            id,
            categoryId = null,
            position = null,
            description = null,
            title = null,
            company = null,
            companyUrl = null,
            url = null,
            reelDate = null
        } = req.body;

        const params = {
            categoryId,
            position,
            description,
            title,
            company,
            companyUrl,
            url: url !== null ? `<${url}>` : null,
            reelDate
        };

        Object.keys(params).forEach(param => params[param] == null && delete params[param]);

        const data = await reelService.updateReel(id, params);
        res.send(data);
    }

    // DELETE

    async deleteReelById(req, res) {
        const {
            id
        } = req.body;

        const data = await reelService.deleteReelById(id);
        res.send(data);
    }
}

export default ReelController;