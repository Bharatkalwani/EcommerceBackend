import jwt, { Secret, SignOptions } from "jsonwebtoken";

const secretEnv = process.env.JWT_SECRET;
const expiresEnv = process.env.JWT_EXPIRES_IN;

if (!secretEnv) throw new Error("JWT_SECRET is not set");
if (!expiresEnv) throw new Error("JWT_EXPIRES_IN is not set");

const JWT_SECRET: Secret = secretEnv; // 👈 Correct type: Secret
const JWT_EXPIRES_IN: number  = parseInt(expiresEnv); // 👈 Must be string|number


export const generateToken = (id: number): string => {
  const payload = { id };
  // const options: SignOptions = { expiresIn: JWT_EXPIRES_IN };

  return jwt.sign(payload, JWT_SECRET); // ✅ now matches correct overload
};
