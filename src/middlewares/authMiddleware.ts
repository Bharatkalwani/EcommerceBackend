import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";

interface AuthPayload extends JwtPayload {
    id: number;
}

export interface RequestWithUser extends Request {
    user?: typeof User.prototype;
}

export const protect = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
) => {
    try {
        const auth = req.headers.authorization;

        if (!auth?.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token" });
        }
        const token = auth.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Invalid token format" });
        }
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as unknown as AuthPayload;

        if (!decoded || typeof decoded === "string" || !decoded.id ) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const user = await User.findByPk(decoded.id);
        if (!user) return res.status(401).json({ message: "Invalid token" });

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
