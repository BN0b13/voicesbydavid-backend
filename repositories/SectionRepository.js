import { Section, SectionImage } from '../models/Associations.js';

class SectionRepository {

    // READ

    async getSections() {
        try {
            const res = await Section.findAndCountAll({
                include: [
                    { 
                        model: SectionImage
                    }
                ]
            });
            return res;
        } catch (err) {
            console.log('GET Sections Error: ', err);
            throw Error('There was an error getting sections');
        }
    }

    async getWelcomeSections() {
        try {
            const res = await Section.findAndCountAll({
                where: {
                    type: 'welcome'
                },
                include: [
                    { 
                        model: SectionImage
                    }
                ]
            });
            return res;
        } catch (err) {
            console.log('GET Welcome Section Error: ', err);
            throw Error('There was an error getting the welcome section');
        }
    }

    async getAboutSections() {
        try {
            const res = await Section.findAndCountAll({
                where: {
                    type: 'about'
                },
                include: [
                    { 
                        model: SectionImage
                    }
                ]
            });
            return res;
        } catch (err) {
            console.log('GET About Section Error: ', err);
            throw Error('There was an error getting about section');
        }
    }

    async getSectionImages() {
        try {
            const res = await SectionImage.findAndCountAll();
            return res;
        } catch (err) {
            console.log('GET Section Images Error: ', err);
            throw Error('There was an error getting Section Images');
        }
    }

    // UPDATE

    async updateSection(id, data) {
        try {
            const res = await Section.update(
                data,
                {
                    where: {
                                id: id
                            }
                }
            );
            return res;
        } catch (err) {
            console.log('UPDATE Section Error: ', err);
            throw Error('There was an error updating Section');
        }
    }

    async updateSectionImageById(id, data) {
        try {
            const res = await SectionImage.update(
                data,
                {
                    where: {
                                id: id
                            }
                }
            );
            return res;
        } catch (err) {
            console.log('UPDATE Section Images Error: ', err);
            throw Error('There was an error updating Section Images');
        }
    }

    // DELETE

    async deleteSectionImageById(id) {
        try {
            const res = await Section.destroy(
                {
                    where: {
                                id: id
                            }
                }
            );

            return {
                status: 200,
                message: `Deleted ${res} Section Picture`
            };
        } catch (err) {
            console.log('DELETE Section Image Error: ', err);
            throw Error('There was an error deleting the Section image');
        }
    }
}

export default SectionRepository;