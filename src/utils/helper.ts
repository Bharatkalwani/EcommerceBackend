// src/utils/responseHelper.ts

import { Response } from "express";

interface ApiResponse<T> {
  status: number;
  message: string;
  data?: T;
}

export const sendResponse = <T>(
  res: Response,
  status: number,
  message: string,
  data?: T
) => {
  const response: ApiResponse<T> = { status, message };
  if (data !== undefined) response.data = data;

  return res.status(status).json(response);
};
