import { Request, Response } from "express";
import User from "../models/User";

export const registerUser = async (req: Request, res: Response) => {
  try {
    console.log("data",req.body)
    const user = await User.create(req.body);
    console.log("user",user)
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  const users = await User.findAll();
  res.json(users);
};
