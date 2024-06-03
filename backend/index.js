const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/mern-ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
    // Product schema and model
    const productSchema = new mongoose.Schema({
      name: String,
      price: Number,
      description: String,
    });

    const Product = mongoose.model("Product", productSchema);

    // Add this part to the index.js file after defining the Product model
    const seedProducts = async () => {
      await Product.deleteMany({});
      await Product.insertMany([
        {
          name: "Product 1",
          price: 19.99,
          description: "Description for product 1",
        },
        {
          name: "Product 2",
          price: 29.99,
          description: "Description for product 2",
        },
        {
          name: "Product 3",
          price: 39.99,
          description: "Description for product 3",
        },
      ]);
      console.log("Products seeded");
    };

    seedProducts();

    // Endpoint to get all products
    app.get("/api/products", async (req, res) => {
      try {
        const products = await Product.find();
        console.log(products);
        res.json(products);
      } catch (err) {
        res.status(500).send(err);
      }
    });

    // Endpoint to handle order processing
    app.post("/api/order", (req, res) => {
      const order = req.body;
      console.log("Order received:", order);
      res.json({ message: "Order received", order });
    });

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
