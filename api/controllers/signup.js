import prisma from "../utils/prismaClient.js";
import bcrypt from "bcrypt";
import { UserSchemaValidation } from "../utils/schema/index.js";
import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV}` });

const signup = async (req, res) => {
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
                  role: "user",
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

export default signup;
