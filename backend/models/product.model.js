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
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    brand: { type: String, required: true },
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

export default mongoose.model("product", productSchema);
