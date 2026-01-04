import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true, //accessible only by the web server not client js
    secure: process.env.NODE_ENV === "production", //https
    sameSite: "strict", //csrf protection
    maxAge: 24 * 60 * 60 * 1000,
  });

  return token;
};
