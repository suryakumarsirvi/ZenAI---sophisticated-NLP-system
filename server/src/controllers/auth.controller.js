import {
  registerService,
  loginService,
  googleAuthService,
  logoutService,
  refreshTokenService,
} from "../services/auth.service.js";

import { CONFIG } from "../configs/env.config.js";

const cookieOptions = {
  httpOnly: true,
  secure: CONFIG.NODE_ENV === "production",
  sameSite: "lax",
};

export const handleRegister = async (req, res) => {
  const { fullname, email, password } = req.body;

  const { user, accessToken, refreshToken } =
    await registerService({
      fullname,
      email,
      password,
    });

  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      id: user._id,
      email: user.email,
      accessToken,
    },
  });
};

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  const { user, accessToken, refreshToken } =
    await loginService({
      email,
      password,
    });

  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);

  return res.status(200).json({
    success: true,
    message: "User loggedIn successfully",
    data: {
      id: user._id,
      email: user.email,
      accessToken,
    },
  });
};

export const handleGoogleAuth = async (req, res) => {
  const { displayName, emails, photos } = req.user;

  const email = emails?.[0]?.value;
  const profilePicture = photos?.[0]?.value;

  await googleAuthService({
    displayName,
    email,
    profilePicture,
  });

  return res.redirect(`${CONFIG.CLIENT_URL}/google/callback`);
};

export const handleLogout = async (req, res) => {
  await logoutService(req.user._id);

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const handleRefresh = async (req, res) => {
  const { refreshToken } = req.cookies;

  const { newAccessToken, newRefreshToken } =
    await refreshTokenService(refreshToken);

  res.cookie("accessToken", newAccessToken, cookieOptions);
  res.cookie("refreshToken", newRefreshToken, cookieOptions);

  return res.status(200).json({
    success: true,
    message: "Token refreshed successfully",
    accessToken: newAccessToken,
  });
};

export const handleGetMe = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "User fetched successfully",
    data: req.user,
  });
};