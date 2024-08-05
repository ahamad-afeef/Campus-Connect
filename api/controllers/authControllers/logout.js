import prisma from "../../utils/prismaClient.js";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
config({ path: `.env.${process.env.NODE_ENV}` });

const logout = async (req, res) => {
  const { authsession } = req.cookies;
  if (!authsession) {
    res.clearCookie("authsession");
    res.status(401).json({
      status: "failed",
      message: "token not found",
    });
  } else {
    try {
      const verifyToken = jwt.verify(authsession, process.env.REFRESH_SECRET);
      if (!verifyToken) {
        return null;
      } else {
        const findUser = await prisma.user.findUnique({
          where: {
            id: verifyToken.id,
          },
        });
        const refreshtoken = findUser.refreshtoken;
        const tokenValidation = bcrypt.compareSync(authsession, refreshtoken);
        if (!tokenValidation) {
          return res.json({
            status: "failed",
            message: "invalid token match",
          });
        } else {
          await prisma.user.update({
            where: {
              id: findUser.id,
            },
            data: {
              refreshtoken: "none",
            },
          });
          res.clearCookie("authsession");
          res.status(201).json({
            status: "success",
            message: "logged out successfully",
          });
        }
      }
    } catch {
      res.clearCookie("authsession");
      res.status(401).json({
        status: "failed",
        message: "invalid or token expired, try login",
      });
    }
  }
};

export default logout;
