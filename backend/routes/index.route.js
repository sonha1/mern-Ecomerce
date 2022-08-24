import userRouter from "./user.route.js";
import productRouter from "./product.route.js";
import orderRouter from "./order.route.js";
const routes = (app) => {
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/product", productRouter);
  app.use("/api/v1/order", orderRouter);
};

export default routes;
