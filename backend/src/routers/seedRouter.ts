import express from 'express';
import asyncHandler from 'express-async-handler';
import { ProductModel } from '../models/productModel';
import { sampleProducts, sampleUsers } from '../data';
import { UserModel } from '../models/userModel';

export const seedRouter = express.Router();

seedRouter.get(
  '/',
  asyncHandler(async (req: express.Request, res: express.Response) => {
    await ProductModel.deleteMany({});
    const createdProducts = await ProductModel.insertMany(sampleProducts);

    await UserModel.deleteMany({});
    const createdUsers = await UserModel.insertMany(sampleUsers);

    res.json({ createdProducts, createdUsers });
  })
);
