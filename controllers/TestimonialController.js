import TestimonialRepository from '../repositories/TestimonialRepository.js';

const testimonialRepository = new TestimonialRepository();

class TestimonialController {

    // CREATE

    async create(req, res) {
        try {
            const {
                position = null,
                testimonialDate = null,
                title = null,
                firstName = null,
                lastName = null,
                initials = null,
                company = null,
                url = null,
                testimonial = null
            } = req.body;

            const requiredParams = {
                firstName,
                lastName,
                testimonial
            };

            Object.values(requiredParams).forEach(param => {
                if(param === null) {
                    throw Error(`Testimonial missing ${requiredParams[param]} Param`);
                }
            });

            const optionalParams = {
                position,
                testimonialDate,
                title,
                initials,
                company,
                url
            };

            if(req.files) {
                optionalParams.image = req.files[0];
            }

            const params = {
                ...requiredParams,
                ...optionalParams
            };

            const data = await testimonialRepository.create(params);

            res.send(data);
        } catch (err) {
            res.send({
                err,
                message: 'There was an error creating the testimonial'
            });
        }
    }

    // READ
    
    async getTestimonials(req, res) {
        const data = await testimonialRepository.getTestimonials();
        res.send(data);
    }
    
    async getTestimonialById(req, res) {
        const { id } = req.params;
        const data = await testimonialRepository.getTestimonialById(id);
        res.send(data);
    }

    // UPDATE

    async updateTestimonial(req, res) {
        const {
            id,
            position = null,
            testimonialDate = null,
            title = null,
            firstName = null,
            lastName = null,
            initials = null,
            company = null,
            url = null,
            testimonial = null
        } = req.body;

        const params = {
            position,
            testimonialDate,
            title,
            firstName,
            lastName,
            initials,
            company,
            url,
            testimonial
        };

        Object.keys(params).forEach(param => params[param] == null && delete params[param]);

        if(req.files) {
            params.image = req.files[0];
        }

        const data = await testimonialRepository.updateTestimonial(id, params);
        res.send(data);
    }

    // DELETE

    async deleteTestimonialById(req, res) {
        const {
            id
        } = req.body;

        const data = await testimonialRepository.deleteTestimonialById(id);
        res.send(data);
    }

    async deleteTestimonialImage(req, res) {
        const { ids } = req.body;
        const data = await welcomeService.deleteTestimonialImage(ids);
        res.send(data);
    }
}

export default TestimonialController;