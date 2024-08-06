import prisma from "../../utils/prismaClient.js";
import bcrypt from "bcrypt";
import { AccessToken, RefreshToken } from "../../services/authServices.js";

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
                  email: findUser.email,
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
    } catch {
      return res.status(401).json({
        status: "failed",
        message: "something went wrong",
      });
    }
  }
};

export default login;
