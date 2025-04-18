const db = require("../../models");
const Product = db.product;
const Category = db.category;

class ProductController {

    async addProduct(req, res) {
        const { name, description, price, categoryId, image_url } = req.body;
        if (!name) {
            return res.send({ status: false, data: [], message: "Product name is required" });
        }
        if (!description) {
            return res.send({ status: false, data: [], message: "Product description is required" });
        }
        if (!price) {
            return res.send({ status: false, data: [], message: "Product price is required" });
        }
        if (!categoryId) {
            return res.send({ status: false, data: [], message: "Product category is required" });
        }

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const newProduct = new Product({
            name,
            description,
            price,
            image_url,
            category: categoryId
        });

        await newProduct.save();
        return res.send({ status: true, message: "Product added successfully", data: newProduct });
    }

    async getAllProducts(req, res) {
        const { categoryId } = req.query;
        const query = categoryId ? { category: categoryId } : {};
        const products = await Product.find(query).populate("category", "name").sort({ createdAt: -1 });
        if (products.length === 0) {
            return res.send({ status: false, data: [], message: "No products found" });
        }
        return res.send({ status: true, data: products, message: "Products fetched successfully" });

    }

    async getProductById(req, res) {
        const { id } = req.params;
        const product = await Product.findById(id).populate("category", "name");
        if (!product) {
            return res.send({ status: false, data: [], message: "Product not found" });
        }
        return res.send({ status: true, data: product, message: "Product fetched successfully" });

    }

    async updateProduct(req, res) {
        const { id } = req.params;
        const { name, description, price, categoryId, image_url } = req.body;
        const product = await Product.findById(id);
        if (!product) {
            return res.send({ status: false, data: [], message: "Product not found" });
        }
        // use other method to update the product
        const updatedProduct = await Product.findByIdAndUpdate(id, {
            name,
            description,
            price,
            image_url,
            category: categoryId
        }, { new: true });
        if (!updatedProduct) {
            return res.send({ status: false, data: [], message: "Product not updated" });
        }
        return res.send({ status: true, data: updatedProduct, message: "Product updated successfully" });
    }

    async deleteProduct(req, res) {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.send({ status: false, data: [], message: "Product not found" });
        }
        await Product.findByIdAndDelete(id);
        return res.send({ status: true, data: [], message: "Product deleted successfully" });
    }

}

module.exports = new ProductController();