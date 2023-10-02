import { Category, Product, ProductImage } from '../models/Associations.js';

export default class CategoryService {

    categoryTypes = {
        CLOTHING: 'clothing',
        SEEDS: 'seeds'
    }

    // READ

    async getCategoriesByType(type) {
        const res = await Category.findAndCountAll(
            {
                where: {
                    type
                }
            }
        );

        return res;
    }

    async getCategoryByName(name) {
        try {
            const res = await Category.findAndCountAll(
                {
                    where: {
                        name
                    },
                    include: [
                        {
                            model: Product,
                            include: [
                                {
                                    model: ProductImage
                                }
                            ]
                        },
                    ],
                }
            );
    
            return res;
        } catch (err) {
            console.log('Get Category by name Error: ', err);
            throw Error('There was an error getting category by name');
        }
    }
    
    // DELETE

    async deleteCategory(id) {
        try {
            const getCategoryProducts = await Product.findAndCountAll(
                {
                    where: {
                        categoryId: id
                    }
                }
            );

            if(getCategoryProducts.rows.length > 0) {
                return {
                    status: 403,
                    message: 'Unable to delete Category. Category has associated products.',
                    associatedProducts: getCategoryProducts.rows
                }
            }

            const getCategory = await Category.findAndCountAll(
                {
                    where: {
                        id: id
                    }
                }
            );

            const res = await Category.destroy(
                {
                    where: {
                                id: id
                            }
                }
            );
            
            return {
                status: 200,
                message: `Deleted ${res} category.`,
                categoryName: getCategory.rows[0].name,
                categoryDescription: getCategory.rows[0].description
            };
        } catch (err) {
            console.log('Update Category Error: ', err);
            throw Error('There was an error deleting the category');
        }
    }
}