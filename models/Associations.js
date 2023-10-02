import Cart from './Cart.js';
import Category from './Category.js';
import Configuration from './Configuration.js';
import Coupon from './Coupon.js';
import Inventory from './Inventory.js';
import Message from './Message.js';
import Order from './Order.js';
import Product from './Product.js';
import ProductImage from './ProductImage.js';
import ProductProfile from './ProductProfile.js';
import Role from './Role.js';
import Theme from './Theme.js';
import User from './User.js';
import Visit from './Visit.js';
import WelcomeImage from './WelcomeImage.js';

Category.hasMany(Product, {
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

Message.hasOne(User, {
    foreignKey:{
        allowNull: false, 
        name:'id'
    }
});

Product.hasOne(Category, {
    foreignKey:{
        allowNull: false, 
        name:'id'
    },
    sourceKey: 'categoryId'
});

Product.hasMany(ProductImage, {
    foreignKey:{
        allowNull: false, 
        name:'productId'
    }
});

Product.hasMany(Inventory, {
    foreignKey:{
        allowNull: false, 
        name:'productId'
    }
});

User.hasOne(Cart, {
    foreignKey:{
        allowNull: false, 
        name:'userId'
    }
});

User.hasMany(Order, {
    foreignKey:{
        allowNull: false, 
        name:'userId'
    }
});
  
User.hasOne(Role, {
    foreignKey:{
        allowNull: false, 
        name:'id'
    },
    sourceKey: 'roleId'
});

export {
    Cart,
    Category,
    Configuration,
    Message,
    Coupon,
    ProductProfile,
    Inventory,
    Order,
    Product,
    ProductImage,
    Role,
    Theme,
    User,
    Visit,
    WelcomeImage
}