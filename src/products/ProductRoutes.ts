import { ProductModel } from "./ProductModel";
import express from "express";
import { Router, Response, Request } from "express";
import { ErrorMessages, StatusCodes } from "../../Enums";

const productRouter = Router();

productRouter.get("/", async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.findAll();
    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: ErrorMessages.PRODUCT_FETCH_ERROR });
  }
});

productRouter.post("/", async (req: Request, res: Response) => {
  const { productName, price, rating, sizes, imageUrl, reviews } = req.body;
  try {
    const newProducts = await ProductModel.create({
      productName,
      price,
      rating,
      sizes,
      imageUrl,
      reviews,
    });
    res.status(StatusCodes.CREATED).json(newProducts);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: ErrorMessages.PRODUCT_CREATE_ERROR });
  }
});

export default productRouter;
