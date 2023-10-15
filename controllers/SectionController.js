import SectionRepository from '../repositories/SectionRepository.js';
import SectionService from '../services/SectionService.js';

const sectionRepository = new SectionRepository();
const sectionService = new SectionService();

class SectionController {

    // CREATE

    async postSectionImage(req, res) {
        const {
            sectionId = null,
            caption = '',
            link = '',
            position
        } = req.body;

        if(sectionId === null) {
            throw Error('POST Section Image missing Section ID.');
        }

        const params = {
            sectionId,
            caption,
            link,
            position,
            image: req.files[0]
        }

        const data = await sectionService.saveSectionImage(params);
        res.send(data);
    }

    // READ
    
    async getSectionImages(req, res) {
        const data = await sectionRepository.getSectionImages();
        res.send(data);
    }
    
    async getSections(req, res) {
        const data = await sectionRepository.getSections();
        res.send(data);
    }
    
    async getWelcomeSection(req, res) {
        const data = await sectionRepository.getWelcomeSections();
        res.send(data);
    }
    
    async getAboutSection(req, res) {
        const data = await sectionRepository.getAboutSections();
        res.send(data);
    }

    async getByPK(req, res) {
        const { id } = req.params;
        const data = await sectionRepository.getByPK(id);
        res.send(data);
    }

    // UPDATE

    async updateSection(req, res) {
        const {
            id,
            title = null,
            titleOn = null,
            subtitle = null,
            subtitleOn = null,
            paragraph = null,
            paragraphOn = null,
            imagesOn = null
        } = req.body;

        const params = {
            title,
            titleOn,
            subtitle,
            subtitleOn,
            paragraph,
            paragraphOn,
            imagesOn
        };

        Object.keys(params).forEach(param => params[param] == null && delete params[param]);

        const data = await sectionRepository.updateSection(id, params);
        res.send(data);
    }

    async updateSectionImageById(req, res) {
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

        const data = await sectionRepository.updateSectionImageById(id, params);
        res.send(data);
    }

    // DELETE

    async deleteSectionImages(req, res) {
        const { ids } = req.body;
        const data = await sectionService.deleteSectionImages(ids);
        res.send(data);
    }

}

export default SectionController;