import { Request, Response } from "express";
import Product from "../models/Product";
import { sendResponse } from "../utils/helper";
import { Op } from "sequelize";


export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const existingProduct = await Product.findOne({ where: { name } });

    if (existingProduct) {
      return sendResponse(res, 400, "Product with this name already exists");
    }

    req.body.productUrl =
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=300&q=80";

    const product = await Product.create(req.body);
    return sendResponse(res, 201, "Product created successfully", product);
  } catch (error) {
    return sendResponse(res, 500, "Internal server error");
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = parseInt((req.query.page as string) || "1", 10);
    const limit = parseInt((req.query.limit as string) || "10", 10);
    const offset = (page - 1) * limit;

    const { rows: products, count } = await Product.findAndCountAll({
      offset,
      limit,
      order: [["id", "ASC"]],
    });

    return sendResponse(res, 200, "Products fetched successfully", {
      products,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    return sendResponse(res, 500, "Internal server error");
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return sendResponse(res, 404, "Product not found");
  return sendResponse(res, 200, "Product fetched successfully", product);
};


export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const productId = req.params.id;

    const product = await Product.findByPk(productId);
    if (!product) return sendResponse(res, 404, "Product not found");

    // ✅ Check if name already exists for another product
    if (name) {
      const existingProduct = await Product.findOne({
        where: {
          name,
          id: { [Op.ne]: productId }, // 👈 Exclude current product
        },
      });

      if (existingProduct) {
        return sendResponse(res, 400, "Product with this name already exists");
      }
    }

    await product.update(req.body);
    return sendResponse(res, 200, "Product updated successfully", product);
  } catch (error) {
    return sendResponse(res, 500, "Internal server error");
  }
};
export const deleteProduct = async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return sendResponse(res, 404, "Product not found");

  await product.destroy();
  return sendResponse(res, 200, "Product deleted successfully");
};
