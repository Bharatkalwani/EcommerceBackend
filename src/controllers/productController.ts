import { Request, Response } from "express";
import Product from "../models/Product";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    // Check if product with the same name already exists
    const existingProduct = await Product.findOne({ where: { name } });

    if (existingProduct) {
      return res
        .status(400)
        .json({ message: "Product with this name already exists" });
    }

    // Create product if name is unique
    req.body.productUrl ="https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=300&q=80"
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    // Default values if not provided
    const page = parseInt((req.query.page as string) || "1", 10);
    const limit = parseInt((req.query.limit as string) || "10", 10);

    // Calculate offset
    const offset = (page - 1) * limit;

    // Fetch with count for pagination
    const { rows: products, count } = await Product.findAndCountAll({
      offset,
      limit,
      order: [["id", "ASC"]],
    });

    res.status(200).json({
      products,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getProduct = async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });

  await product.update(req.body);
  res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });

  await product.destroy();
  res.json({ message: "Deleted" });
};
