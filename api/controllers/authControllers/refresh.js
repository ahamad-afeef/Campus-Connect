import prisma from "../../utils/prismaClient.js";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { AccessToken, RefreshToken } from "../../services/authServices.js";
config({ path: `.env.${process.env.NODE_ENV}` });

const refresh = async (req, res) => {
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
        try {
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
            const accessToken = AccessToken({
              id: findUser.id,
              role: findUser.role,
            });
            const refreshToken = RefreshToken({
              id: findUser.id,
              role: findUser.role,
            });
            const encryptRefresh = bcrypt.hashSync(refreshToken, 10);
            await prisma.user.update({
              where: {
                id: findUser.id,
              },
              data: {
                refreshtoken: encryptRefresh,
              },
            });
            res.cookie("authsession", refreshToken, {
              httpOnly: true,
              secure: true,
              sameSite: false,
              maxAge: 28 * 24 * 60 * 60 * 1000,
            });
            res.status(201).json({ token: accessToken });
          }
        } catch {
          res.status(401).json({
            status: "failed",
            message: "something went wrong",
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

export default refresh;
