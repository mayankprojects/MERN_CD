const fs = require("fs");
const Product = require("../model/product");
const path = require("path");
const data = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../data.json"), "utf-8")
);
const products = data.products;

exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "User not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.replaceProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndReplace(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).send("Product not found");
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).send("Product not found");
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "User not found" });

    res.json({ message: "user deleted successfully," });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
