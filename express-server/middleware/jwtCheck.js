import jwt from "jsonwebtoken";

const jwtCheck = (req, res, next) => {
  try {
    const token = req.cookies["my_cookie"];
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res.status(401).send("Token error");
    }
    req.locals = verifyToken.userId;
    next();
  } catch (err) {
    console.log("jwt failed");
    res.status(401).send({
      msg: "Auth Failed",
    });
  }
};

export default jwtCheck;
