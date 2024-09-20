import bcrypt from "bcryptjs";

const helpers = {};

helpers.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword); // Aquí devolvemos el resultado
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default helpers;
