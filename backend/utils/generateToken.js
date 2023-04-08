import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, "fdsfibniusdbfvnsdiufbiufbsdiusdbsdiugvbiubgvubiu", {
    expiresIn: "30d",
  });
};

export default generateToken;
