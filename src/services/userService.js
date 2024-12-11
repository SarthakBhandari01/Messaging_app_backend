import userRepository from "../repositories/userRepository.js";
import validationError from "../utils/errors/validationError.js";

export const signUpService = async (user) => {
  try {
    const newUser = await userRepository.create(user);
    return newUser;
  } catch (error) {
    // console.log("User service error ", error);
    if (error.name === "ValidationError") {
      throw new validationError({ error: error.errors }, error.message);
    }
    if (error.name === "MongoServerError" && error.code === 11000) {
      throw new validationError(
        {
          error: ["A user with same  email or username already exists"],
        },
        "A user with same  email or username already exists"
      );
    }
  }
};
