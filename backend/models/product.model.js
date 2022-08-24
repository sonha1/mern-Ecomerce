import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
    review: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  { timestamps: true }
);

const productSchema = mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    category: { type: String },
    stock: { type: Number },
    brand: { type: String },
    img: { type: String },
    hide: { type: Date, default: null },
    reviews: [reviewSchema],
    rating: Number,
    numOfReviews: Number,
  },
  {
    timestamps: true,
  }
);

productSchema.methods.hideProduct = function () {
  this.hide = Date.now();
};
productSchema.methods.unHideProduct = function () {
  this.hide = null;
};

productSchema.methods.countRating = function () {
  let count = 0;
  this.reviews.forEach((rv) => (count += rv.rating));
  this.rating = count / this.reviews.length;
};

productSchema.methods.reduceStock = function (quantity) {
  this.stock = this.stock - quantity;
};

export default mongoose.model("product", productSchema);
