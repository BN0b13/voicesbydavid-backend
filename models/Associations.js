import Configuration from './Configuration.js';
import Message from './Message.js';
import Reel from './Reel.js';
import Role from './Role.js';
import Theme from './Theme.js';
import User from './User.js';
import Visit from './Visit.js';
import WelcomeImage from './WelcomeImage.js';

Configuration.hasOne(Theme, {
    foreignKey:{
        allowNull: false, 
        name:'id'
    },
    sourceKey: 'themeId'
});
  
User.hasOne(Role, {
    foreignKey:{
        allowNull: false, 
        name:'id'
    },
    sourceKey: 'roleId'
});

export {
    Configuration,
    Message,
    Reel,
    Role,
    Theme,
    User,
    Visit,
    WelcomeImage
}