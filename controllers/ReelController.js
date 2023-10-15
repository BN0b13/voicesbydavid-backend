import ReelService from '../services/ReelService.js';

const reelService = new ReelService();

class ReelController {

    // CREATE

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

    // GET Video Reels
    
    async getVideoReels(req, res) {
        const data = await reelService.getVideoReels();
        res.send(data);
    }

    async getVideoReelById(req, res) {
        const { id } = req.params;
        const data = await reelService.getVideoReelById(id);
        res.send(data);
    }

    
    async streamVideoById(req, res) {
        const { id } = req.params;
        // const range = req.headers.range;
        // if (!range) {
        //     return res.status(400).send("Requires Range header");
        // }
        const data = await reelService.streamVideoById(res, id);

        return data;
    }

    // GET Audio Reels

    // PATCH

    async activateReel(req, res) {
        const { id } = req.body;

        const data = await reelService.activateReel(id);
        res.send(data);
    }

    async updateYoutubeReel(req, res) {
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

        const data = await reelService.updateYoutubeReel(id, params);
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