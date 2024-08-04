import prisma from "../utils/prismaClient.js";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
config({ path: `.env.${process.env.NODE_ENV}` });

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({
      status: "failed",
      message: "login credentials should not be empty",
    });
  } else {
    try {
      const findUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!findUser) {
        res.status(401).json({
          status: "failed",
          message: "user not found, try signup",
        });
      } else {
        try {
          const PasswordValidation = bcrypt.compareSync(
            password,
            findUser.password
          );
          if (!PasswordValidation) {
            return res.status(401).json({
              status: "failed",
              message: "invalid password",
            });
          } else {
            try {
              const AccessToken = jwt.sign(
                {
                  id: findUser.id,
                  role: findUser.role,
                },
                process.env.ACCESS_SECRET,
                { expiresIn: "15m" }
              );
              const RefreshToken = jwt.sign(
                { id: findUser.id, role: findUser.role },
                process.env.REFRESH_SECRET,
                {
                  expiresIn: "28d",
                }
              );
              res.cookie("auth-session.validation", RefreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: false,
                maxAge: 28 * 24 * 60 * 60 * 1000,
              });
              res.status(201).json({ token: AccessToken });
            } catch {
              return res.status(401).json({
                status: "failed",
                message: "something went wrong da",
              });
            }
          }
        } catch {
          return res.status(401).json({
            status: "failed",
            message: "something went wrong",
          });
        }
      }
    } catch {
      return res.status(401).json({
        status: "failed",
        message: "something went wrong",
      });
    }
  }
};

export default login;
