const db = require("../../models");
const category = db.category;

class CategoryController {

    async addCategory(req, res) {
        const { name } = req.body;
        
        if (!name) {
            return res.send({ status: false, data: [], message: "Category name is required" });
        }

        const newCategory = new category({ name });

        
        await newCategory.save();
        return res.send({ status: true, message: "Category added successfully", data: newCategory });
    }


    async getAllCategory(req, res) {
        const categories = await Category.find().sort({ createdAt: -1 });
        if (categories.length === 0) {
            return res.send({ status: false, data: [], message: "No categories found" });
        }
        return res.send({ status: true, data: categories, message: "Categories fetched successfully" });
    }

    async getCategoryById(req, res) {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.send({ status: false, data: [], message: "Category not found" });
        }
        return res.send({ status: true, data: category, message: "Category fetched successfully" });
    }

    async updateCategory(req, res) {
        const { id, name } = req.body;
        if (!name) {
            return res.send({ status: false, data: [], message: "Category name is required" });
        }
        const category = await Category.findById(id);
        if (!category) {
            return res.send({ status: false, data: [], message: "Category not found" });
        }
        const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });
        return res.send({ status: true, data: updatedCategory, message: "Category updated successfully" });

    }

    async deleteCategory(req, res) {
        const { id } = req.body;
        const category = await Category.findById(id);
        if (!category) {
            return res.send({ status: false, data: [], message: "Category not found" });
        }
        await Category.findByIdAndDelete(id);
        return res.send({ status: true, data: [], message: "Category deleted successfully" });
    }

}

module.exports = new CategoryController();