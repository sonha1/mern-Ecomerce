import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    jwt.verify(token, process.env.SECRET_ACCESS_KEY, (error, user) => {
      if (error) {
        return next(error);
      }
      req.user = user;
    });
    next();
    //id , email, role
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const checkRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      // console.log(req.user);
      return res.status(403).json({ message: "you cant use this service" });
    }
    next();
  };
};
