import request from "supertest";
import express from "express";
import { ProductModel } from "../products/ProductModel";
import productRouter from "../products/ProductRoutes";

jest.mock("../models/ProductModel", () => ({
  ProductModel: {
    find: jest.fn(),
    create: jest.fn(),
  },
}));
const app = express();
app.use(express.json());
app.use("/api/product", productRouter);

describe("Get route", () => {
  it("should it return all products", async () => {
    const mockProducts = [
      {
        id: 1,
        productName: "Kurta",
        price: "2000",
        rating: "4",
        sizes: ["XS", "S", "M", "L", "XL"],
        imageUrl:
          "/Users/anjaligogu/Documents/CODE/myntra/src/components/assets/imageUrls-7.jpeg",
        reviews: "The product is very comfortable and fits perfectly!",
      },
    ];

    (ProductModel.find as jest.Mock).mockResolvedValue(mockProducts);
    const res = await request(app).get("/api/product");
    expect(res.status).toBe(200);
  });

  it("should return 500 when there is an error while fetching products", async () => {
    (ProductModel.find as jest.Mock).mockRejectedValue(
      new Error("database error")
    );
    const response = await request(app).get("/api/product");
    expect(ProductModel.find).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(500);
  });
});

it("should create a new products", async () => {
  const newProduct = {
    productName: "Kurta",
    price: "2000",
    rating: "4",
    sizes: ["XS", "S", "M", "L", "XL"],
    imageUrl:
      "/Users/anjaligogu/Documents/CODE/myntra/src/components/assets/imageUrls-7.jpeg",
    reviews: "The product is very comfortable and fits perfectly!",
  };
  (ProductModel.create as jest.Mock).mockResolvedValue(newProduct);

  const res = await request(app).post("/api/product").send(newProduct);
  expect(res.status).toBe(201);
  expect(res.body).toEqual(newProduct);
});

it("should return 500 if there is an error creating a products", async () => {
  (ProductModel.create as jest.Mock).mockRejectedValue(
    new Error("Database error")
  );

  const newProduct = {
    productName: "Kurta",
    price: "2000",
    rating: "4",
    sizes: ["XS", "S", "M", "L", "XL"],
    imageUrl:
      "/Users/anjaligogu/Documents/CODE/myntra/src/components/assets/imageUrls-7.jpeg",
    reviews: "The product is very comfortable and fits perfectly!",
  };
  const res = await request(app).post("/api/product").send(newProduct);
  expect(res.status).toBe(500);
});
