
import { Request, Response } from "express";
import Cart from "../models/Cart";
import CartItem from "../models/Cartitem";

export const addToCart = async (req: Request, res: Response) => {
  const userId = (req as any).user.id; // from your protect middleware
  const { productId, quantity } = req.body;

  try {
    // Find or create a cart for the user
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await Cart.create({ userId });
    }

    // Add item to cart
    const item = await CartItem.create({ cartId: cart.id, productId, quantity });

    res.status(201).json(item);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getMyCart = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  try {
    const cart = await Cart.findOne({
      where: { userId },
      include: [{ model: CartItem }],
    });

    res.json(cart);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
