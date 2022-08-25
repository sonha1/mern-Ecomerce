import _Order from "../models/order.model.js";
import _Product from "../models/product.model.js";

export const createOrder = async (req, res, next) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
    console.log(orderItems.qty);
    const order = new _Order({
      user: req.user.id,
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    orderItems.forEach(async (item) => {
      const product = await _Product.findById(item.product);
      product.reduceStock(item.qty);
      await product.save();
    });
    await order.save();
    res.status(200).json("create order successfully");
  } catch (error) {
    console.error(error);
    next();
  }
};

// get  /api/v1/order/list --admin--
export const listOrders = async (req, res, next) => {
  try {
    const orders = await _Order.find({}).populate("user", "name");
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//  get /api/v1/order/admin/:id --admin
// export const getDetailOrderAdmin = async (req, res, next) => {
//   try {
//     const order = await _Order.findById(req.params.id);
//     res.status(200).json(order);
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// };

//  get /api/v1/order/:id --user
export const getDetailOrder = async (req, res, next) => {
  try {
    const order = await _Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const listMyOrders = async (req, res, next) => {
  try {
    const orders = await _Order.find({ user: req.user.id });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
