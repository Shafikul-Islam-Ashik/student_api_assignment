import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const verifyToken = (req, res, next) => {
  // check cookies
  const { accessToken } = req.cookies;

  //check token
  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // verify token
  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    asyncHandler(async (error, decode) => {
      if (error) {
        return res.status(400).json({ message: "Invalid Token" });
      }

      next();
    })
  );
};
