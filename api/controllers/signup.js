import prisma from "../utils/prismaClient.js";
import bcrypt from "bcrypt";
import { UserSchemaValidation } from "../utils/schema/index.js";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
config({ path: `.env.${process.env.NODE_ENV}` });

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(401).json({
      status: "failed",
      message: "signup credentials should not be empty",
    });
  } else {
    try {
      UserSchemaValidation.parse({
        username: username,
        email: email,
        password: password,
      });
      try {
        const isUserExists = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        if (isUserExists) {
          return res.status(401).json({
            status: "failed",
            message: "Email already exits, try different account",
          });
        } else {
          try {
            const encryptedPassword = await bcrypt.hashSync(password, 10);
            await prisma.user
              .create({
                data: {
                  username: username,
                  email: email,
                  password: encryptedPassword,
                },
              })
              .then(() =>
                res.status(201).json({
                  status: "success",
                  message: `user ${username} created successfully`,
                })
              );
          } catch {
            return res.status(401).json({
              status: "failed",
              message: "Something went wrong, try again",
            });
          }
        }
      } catch {
        return res.status(401).json({
          status: "failed",
          message: "Something went wrong, try again",
        });
      }
    } catch (error) {
      return res.status(401).json({
        status: "failed",
        message: error,
      });
    }
  }
};

export const login = async (req, res) => {
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
                  email: findUser.email,
                },
                process.env.ACCESS_SECRET,
                { expiresIn: "15m" }
              );
              const RefreshToken = jwt.sign(
                { email: findUser.email },
                process.env.REFRESH_SECRET,
                {
                  expiresIn: "28d",
                }
              );
              res.cookie("jwt", RefreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: false,
                maxAge: 7 * 24 * 60 * 60 * 1000,
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
