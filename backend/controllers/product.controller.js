import _Product from "../models/product.model.js";
import asyncHandler from "express-async-handler";

// post /api/v1/product/create  --- admin ---
export const createProduct = asyncHandler(async (req, res, next) => {
  try {
    const { name, description, brand, price, stock, category } = req.body;
    const product = await _Product.create({
      name,
      description,
      price,
      stock,
      category,
      brand,
    });
    res
      .status(200)
      .json({ message: "create product success", ...product._doc });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
// get /api/v1/product
export const getProducts = async (req, res, next) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await _Product.countDocuments({ ...keyword });
    const products = await _Product
      .find({ ...keyword, hide: null })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    
    res
      .status(200)
      .json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// get /api/v1/product/all ---admin---
export const listProducts = async (req, res, next) => {
  try {
    const pageSize = 10;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await _Product.countDocuments({ ...keyword });
    const page = Number(req.query.pageNumber) || 1;

    const products = await _Product
      .find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res
      .status(200)
      .json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// delete /api/v1/product/:id
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await _Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "delete product successfully", product });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// put /api/v1/product/hide/:id ---admin--- test::<
export const hideProduct = async (req, res, next) => {
  try {
    const product = await _Product.findById(req.params.id);
    product.hideProduct();
    await product.save();
    return res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// /api/v1/product/update/:id ---admin---
export const updateProduct = async (req, res, next) => {
  try {
    const { name, description, brand, price, stock, category } = req.body;
    const product = await _Product.findOneAndUpdate(
      { _id: req.params.id },
      { name, description, brand, price, stock, category }
    );
    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
//get /api/v1/product/:id ---all---
export const getDetailProduct = async (req, res, next) => {
  try {
    
    const product = await _Product
      .findById(req.params.id)
      .populate("reviews.user", "name");
    
    res.status(200).json({ ...product._doc });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// post /api/v1/product/review/create/:id ---all---

export const createReview = async (req, res, next) => {
  try {
    const { rating, review } = req.body;
    const product = await _Product.findById(req.params.id);

    // product.reviews?.forEach(async (rv) => {});
    for (let i = 0; i < product.reviews.length; i++) {
      if (product.reviews[i].user.toString() === req.user.id) {
        product.reviews[i].rating = rating;
        product.reviews[i].review = review;
        product.numOfReviews++;
        product.countRating();
        await product.save();
        return res.status(200).json({ message: "successfully" });
      }
    }
    const newReview = {
      user: req.user.id,
      rating,
      review,
    };
    product.reviews.push(newReview);
    if (product.numOfReviews) {
      product.numOfReviews++;
    } else {
      product.numOfReviews = 1;
    }
    product.countRating();

    await product.save();
    return res.status(200).json({ message: "successfully" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// delete /api/v1/product/review/delete/:id --all--
export const deleteReview = async (req, res, next) => {
  try {
    const product = await _Product.findById(req.params.id);
    product.reviews = product.reviews.filter(
      (rv) => rv.user.toString() !== req.user.id
    );

    if (product.numOfReviews > 0) {
      product.numOfReviews--;
    }
    product.countRating();
    product.save();
    return res.status(200).json({ message: "successfully" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// update /api/v1/product/review/update/:id
export const updateReview = async (req, res, next) => {
  try {
  } catch (error) {}
};
