const Product = require("../models/Product");
const Category = require("../models/Category");

const resolvers = {
  Query: {
    // Get all categories
    categories: async () => {
      return await Category.find();
    },

    // Get products with pagination, search, and category filter
    products: async (_, args) => {
      const { page = 1, limit = 5, search = "", categoryIds = [] } = args;

      const filter = {};

      // Search by name
      if (search) {
        filter.name = { $regex: search, $options: "i" };
      }

      // Filter by categories
      if (categoryIds.length > 0) {
        filter.categories = { $in: categoryIds };
      }

      const products = await Product.find(filter)
        .populate("categories")
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

      return products;
    },
  },

  Mutation: {
    // Add a new product
    addProduct: async (_, { input }) => {
      const { name, description, quantity, categoryIds, createdAt } = input;

      // Check duplicate name
      const existing = await Product.findOne({ name });
      if (existing) throw new Error("Product name already exists");

      const product = new Product({
        name,
        description,
        quantity,
        categories: categoryIds,
        createdAt,
      });

      await product.save();
      return await product.populate("categories");
    },

    // Delete a product
    deleteProduct: async (_, { id }) => {
      const deleted = await Product.findByIdAndDelete(id);
      return deleted ? true : false;
    },

    // ✅ ADD CATEGORY
    addCategory: async (_, { name }) => {
      const existing = await Category.findOne({ name });
      if (existing) throw new Error("Category already exists");

      const category = new Category({ name });
      return await category.save();
    },

    // ✅ DELETE CATEGORY
    deleteCategory: async (_, { id }) => {
      const deleted = await Category.findByIdAndDelete(id);
      return !!deleted;
    },
  },
};

module.exports = resolvers;
