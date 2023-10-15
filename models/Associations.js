import Category from './Category.js';
import Configuration from './Configuration.js';
import Message from './Message.js';
import Reel from './Reel.js';
import Role from './Role.js';
import Section from './Section.js';
import SectionImage from './SectionImage.js';
import Testimonial from './Testimonial.js';
import Theme from './Theme.js';
import User from './User.js';
import Visit from './Visit.js';

Category.hasMany(Reel, {
    foreignKey:{
        allowNull: false, 
        name:'categoryId'
    }
});

Configuration.hasOne(Theme, {
    foreignKey:{
        allowNull: false, 
        name:'id'
    },
    sourceKey: 'themeId'
});

Reel.hasOne(Category, {
    foreignKey:{
        allowNull: false, 
        name:'id'
    },
    sourceKey: 'categoryId'
});
  
User.hasOne(Role, {
    foreignKey:{
        allowNull: false, 
        name:'id'
    },
    sourceKey: 'roleId'
});

Section.hasMany(SectionImage, {
    foreignKey:{
        allowNull: false, 
        name:'sectionId'
    }
});

SectionImage.hasOne(Section, {
    foreignKey:{
        allowNull: false, 
        name:'id'
    },
    sourceKey: 'sectionId'
});



export {
    Category,
    Configuration,
    Message,
    Reel,
    Role,
    Section,
    SectionImage,
    Testimonial,
    Theme,
    User,
    Visit,
}