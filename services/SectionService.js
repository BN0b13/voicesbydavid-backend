import fs from 'fs';
import { Op } from 'sequelize';

import { Section, SectionImage } from '../models/Associations.js';

export default class SectionService {

    async saveSectionImage(params) {
        try {
            const {
                sectionId,
                caption,
                link,
                position,
                image
            } = params;
            
            const data = {
                sectionId,
                caption,
                filename: image.filename,
                path: `/img/sections/${image.filename}`,
                link,
                position
            };

            const res = await SectionImage.create(data);

            return res;
        } catch(err) {
            console.log('Save Section Image To Server Error: ', err);
            throw Error('There was an error getting saving section image to server');
        }
    }

    // DELETE

    async deleteSectionImages(ids) {
        try {
            const getImages = await SectionImage.findAndCountAll({
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

            const res = await SectionImage.destroy(
                {
                    where: {
                        id: {
                            [Op.in]: ids
                        }
                    }
                }
            );

            return {
                status: 200,
                message: `Deleted ${res} Section Image`
            };
        } catch (err) {
            console.log('DELETE Section Image Error: ', err);
            throw Error('There was an error deleting the section images');
        }
    }
}