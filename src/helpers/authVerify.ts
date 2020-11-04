import { Request, Response } from "express";
import { Users } from "../../src/models/Users";
import { getManager } from "typeorm";
import jwt from "jsonwebtoken";

const authVerify = (req: Request, res: Response, next): Promise<Response> => {
  let token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).json({ auth: false, message: "No token provided" });

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .json({ auth: false, message: "Failed to authenticate token" });
    req.userId = decoded.id;
    next();
  });
};

export default authVerify;
