import WelcomeRepository from '../repositories/WelcomeRepository.js';
import WelcomeService from '../services/WelcomeService.js';

const welcomeRepository = new WelcomeRepository();
const welcomeService = new WelcomeService();

class WelcomeController {

    // CREATE

    async postWelcomeImage(req, res) {
        const {
            caption = '',
            link = '',
            position
        } = req.body;

        const params = {
            caption,
            link,
            position,
            image: req.files[0]
        }

        const data = await welcomeService.saveWelcomeImage(params);
        res.send(data);
    }

    // READ
    
    async getWelcomeImages(req, res) {
        const data = await welcomeRepository.getWelcomeImages();
        res.send(data);
    }
    
    async getWelcomeContent(req, res) {
        const data = await welcomeRepository.getWelcomeContent();
        res.send(data);
    }

    async getByPK(req, res) {
        const { id } = req.params;
        const data = await welcomeRepository.getByPK(id);
        res.send(data);
    }

    // UPDATE

    async updateWelcomeImageById(req, res) {
        const {
            id,
            caption = null,
            link = null,
            position = null
        } = req.body;

        const params = {
            caption,
            link,
            position
        };

        Object.keys(params).forEach(param => params[param] == null && delete params[param]);

        const data = await welcomeRepository.updateWelcomeImageById(id, params);
        res.send(data);
    }

    // DELETE

    async deleteWelcomeImageById(req, res) {
        const { id } = req.params;
        const data = await welcomeRepository.deleteWelcomeImageById(id);
        res.send(data);
    }

    async deleteImagesAndFilesById(req, res) {
        const { ids } = req.body;
        const data = await welcomeService.deleteImagesAndFilesById(ids);
        res.send(data);
    }

}

export default WelcomeController;