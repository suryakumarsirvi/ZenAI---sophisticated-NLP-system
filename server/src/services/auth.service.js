import * as UserRepository from "../repository/user.repository.js";
import { generateHash, verifyHash } from "../utils/bcrypt.js";
import { generateToken, verifyToken } from "../utils/jwt.js";

export const registerService = async ({ fullname, email, password }) => {
  const isExist = await UserRepository.findByEmail(email);

  if (isExist) {
    throw new Error("Email already exist, Try Login");
  }

  const hashPassword = await generateHash(password);

  const user = await UserRepository.CreateUser({
    fullname,
    email,
    password: hashPassword,
  });

  const accessToken = generateToken(user._id, "15m");
  const refreshToken = generateToken(user._id, "7d");

  const hashedToken = await generateHash(refreshToken);

  user.refreshToken = hashedToken;

  await user.save();

  return {
    user,
    accessToken,
    refreshToken,
  };
};

export const loginService = async ({ email, password }) => {
  const user = await UserRepository.findByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  const validPassword = await verifyHash(password, user.password);

  if (!validPassword) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateToken(user._id, "15m");
  const refreshToken = generateToken(user._id, "7d");

  const hashedToken = await generateHash(refreshToken);

  user.refreshToken = hashedToken;

  await user.save();

  return {
    user,
    accessToken,
    refreshToken,
  };
};

export const googleAuthService = async ({ displayName, email, profilePicture }) => {
  let user = await UserRepository.findByEmail(email);

  if (!user) {
    user = await UserRepository.CreateUser({
      fullname: displayName,
      email,
      profilePicture,
      provider: "google",
    });
  }

  const accessToken = generateToken(user._id, "15m");
  const refreshToken = generateToken(user._id, "7d");

  const hashedToken = await generateHash(refreshToken);

  user.refreshToken = hashedToken;

  await user.save();

  return {
    user,
    accessToken,
    refreshToken,
  };
};

export const logoutService = async (userId) => {
  const user = await UserRepository.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  user.refreshToken = null;

  await user.save();
};

export const refreshTokenService = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error("No refresh token provided");
  }

  let decoded;

  try {
    decoded = verifyToken(refreshToken);
  } catch (error) {
    throw new Error("Invalid refresh token");
  }

  const user = await UserRepository.findById(decoded.id);

  if (!user || !user.refreshToken) {
    throw new Error("User not found or invalid session");
  }

  const isValid = await verifyHash(refreshToken, user.refreshToken);

  if (!isValid) {
    throw new Error("Invalid refresh token");
  }

  const newAccessToken = generateToken(user._id, "15m");
  const newRefreshToken = generateToken(user._id, "7d");

  const hashedToken = await generateHash(newRefreshToken);

  user.refreshToken = hashedToken;

  await user.save();

  return {
    newAccessToken,
    newRefreshToken,
  };
};