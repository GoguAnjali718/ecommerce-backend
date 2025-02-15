import { ProductModel } from "./ProductModel";

const seedProducts = async () => {
  const productsList = [
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
    {
      id: 2,
      productName: "Froks",
      price: "1900",
      rating: "3.4",
      sizes: ["XS", "S", "M", "L", "XL"],
      imageUrl:
        "/Users/anjaligogu/Documents/CODE/myntra/src/assets/imageUrls-15.jpeg",
      reviews: "Amazing quality fabric, feels soft and durable",
    },
    {
      id: 3,
      productName: "Suit",
      price: "900",
      rating: "4",
      sizes: ["XS", "S", "M", "L", "XL"],
      imageUrl:
        "/Users/anjaligogu/Documents/CODE/myntra/src/assets/imageUrls-8.jpeg",
      reviews: "I’m really impressed with the product’s design and comfort.",
    },
    {
      id: 4,
      productName: "One Piece",
      price: "3000",
      rating: "3",
      sizes: ["XS", "S", "M", "L", "XL"],
      imageUrl:
        "/Users/anjaligogu/Documents/CODE/myntra/src/assets/imageUrls-9.jpeg",
      reviews: "Affordable price for such great quality!",
    },
    {
      id: 5,
      productName: "Mini Dress",
      price: "1900",
      rating: "4",
      sizes: ["XS", "S", "M", "L", "XL"],
      imageUrl:
        "/Users/anjaligogu/Documents/CODE/myntra/src/assets/imageUrls-10.jpeg",
      reviews: "Comfortable and high-quality fabric at an unbeatable price.",
    },
    {
      id: 6,
      productName: "Mermaid",
      price: "9000",
      rating: "4",
      sizes: ["XS", "S", "M", "L", "XL"],
      imageUrl:
        "/Users/anjaligogu/Documents/CODE/myntra/src/assets/imageUrls-11.jpeg",
      reviews: "Perfect for everyday use, really happy with the material.",
    },
    {
      id: 7,
      productName: "Trumpet",
      price: "2900",
      rating: "5",
      sizes: ["XS", "S", "M", "L", "XL"],
      imageUrl:
        "/Users/anjaligogu/Documents/CODE/myntra/src/assets/imageUrls-12.jpeg",
      reviews: "So happy with my purchase, fits like a glove!",
    },
    {
      id: 8,
      productName: "Long Frock",
      price: "1900",
      rating: "4",
      sizes: ["XS", "S", "M", "L", "XL"],
      imageUrl:
        "/Users/anjaligogu/Documents/CODE/myntra/src/assets/imageUrls-14.jpeg",
      reviews: "Definitely worth the price, will buy again!",
    },
    {
      id: 9,
      productName: "Jumpsuit",
      price: "1500",
      rating: "5",
      sizes: ["XS", "S", "M", "L", "XL"],
      imageUrl:
        "/Users/anjaligogu/Documents/CODE/myntra/src/assets/imageUrls-17.jpeg",
      reviews: "For the price, this is an exceptional product!",
    },
  ];

  try {
    console.log("Starting to seed products...");
    await ProductModel.bulkCreate(productsList);
    console.log("Products seeded successfully!");
  } catch (error) {
    console.error("Error seeding products:", error);
  }
};

module.exports = seedProducts;
