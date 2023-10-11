import fs from 'fs';
import Testimonial from '../models/Testimonial.js';


class TestimonialRepository {


    // CREATE

    async create(params) {
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
                testimonial = null,
                image = null
            } = params;

            const data = {
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

            Object.keys(data).forEach(param => data[param] == null && delete data[param]);

            if(image !== null) {
                data.filename = image.filename;
                data.path = `/img/testimonials/${image.filename}`;
            }

            const res = await Testimonial.create(data);
            return res;
        } catch (err) {
            console.log('CREATE Testimonial Error: ', err);
            throw Error('There was an error creating the testimonial');
        }
    }

    // READ

    async getTestimonials() {
        try {
            const res = await Testimonial.findAndCountAll({});
            return res;
        } catch (err) {
            console.log('GET Testimonials Error: ', err);
            throw Error('There was an error getting the testimonials');
        }
    }

    async getTestimonialById(id) {
        try {
            const res = await Testimonial.findAll(
                {
                    where: {
                        id: id
                    }
                }
            );
            return res;
        } catch (err) {
            console.log('GET Testimonial by id Error: ', err);
            throw Error('There was an error getting the testimonial by id');
        }
    }

    // UPDATE 

    async updateTestimonial(id, params) {
        try {
            const {
                position,
                testimonialDate,
                title,
                firstName,
                lastName,
                initials,
                company,
                url,
                image
            } = params;

            const data = {
                position,
                testimonialDate,
                title,
                firstName,
                lastName,
                initials,
                company,
                url,
            };

            if(image) {
                data.filename = image.filename;
                data.path = `/img/testimonials/${image.filename}`;
            }

            const res = await Testimonial.update(
                data,
                {
                    where: {
                                id: id
                            }
                }
            );
            return res;
        } catch (err) {
            console.log('UPDATE Testimonial Error: ', err);
            throw Error('There was an error updating the testimonial');
        }
    }

    // DELETE

    async deleteTestimonialById(id) {
        try {
            const getTestimonial = await Testimonial.findAndCountAll({
                where: {
                    id
                }
            });
            
            if(getTestimonial.rows[0].path) {
                console.log('DELETING image...');
                const imagePath = getTestimonial.rows[0].path;

                fs.stat(`./public${imagePath}`, function (err) {
                    if (err) {
                        return console.error(err);
                    }
                
                    fs.unlink(`./public${imagePath}`,function(err){
                        if(err) return console.log('There was an error deleting testimonial image: ', err);
                        console.log('file deleted successfully');
                    });
                });
            }

            const res = await Testimonial.destroy(
                {
                    where: {
                                id: id
                            }
                }
            );
            return {
                status: 200,
                res: res
            };
        } catch (err) {
            console.log('DELETE Testimonial Error: ', err);
            throw Error('There was an error deleting the testimonial');
        }
    }

    async deleteTestimonialImage(ids) {
        try {
            const getImages = await Testimonial.findAndCountAll({
                where: {
                    id: {
                        [Op.in]: ids
                    }
                }
            });
            
            if(getImages.rows.length !== ids.length) {
                return {
                    status: 404,
                    message: 'Images(s) not found'
                }
            }
            
            const imagesPath = getImages.rows.map(image => image.path);

            for(let imagePath of imagesPath) {
                fs.stat(`./public${imagePath}`, function (err) {
                    if (err) {
                        return console.error(err);
                    }
                 
                    fs.unlink(`./public${imagePath}`,function(err){
                         if(err) return console.log(err);
                         console.log('file deleted successfully');
                    });
                 });
            }

            const res = await Testimonial.update(
                {
                    filename: '',
                    path: ''
                },
                {
                    where: {
                                id: id
                            }
                }
            );

            return {
                status: 200,
                message: `Deleted ${res} Picture`
            };
        } catch (err) {
            console.log('DELETE Testimonial Image Error: ', err);
            throw Error('There was an error deleting the testimonial image');
        }
    }
}

export default TestimonialRepository;