import jwt from "jsonwebtoken";
import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV}` });

export const AccessToken = ({ id: id, role: role }) => {
  return jwt.sign(
    {
      id: id,
      role: role,
    },
    process.env.ACCESS_SECRET,
    { expiresIn: "15m" }
  );
};

export const RefreshToken = ({ id: id, role: role }) => {
  return jwt.sign({ id: id, role: role }, process.env.REFRESH_SECRET, {
    expiresIn: "28d",
  });
};
