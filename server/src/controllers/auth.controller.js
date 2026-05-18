import { CONFIG } from "../configs/env.config.js";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { fullname, email, password } = req.body;

    try {
        if (!fullname || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "all fields are required"
            })
        };

        const isExist = await User.findOne({ email });

        if (isExist) {
            return res.status(400).json({
                success: false,
                message: "User already exist, Try login"
            })
        };

        const newUser = {
            fullname,
            email,
            password
        }

        const user = await User.create(newUser);

        const token = jwt.sign(
            {
                id: user?._id
            },
            CONFIG.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        );

        if (token) {
            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict'
            });
        };

        res.status(201).json({
            success: true,
            message: "Registered Successfully",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while register",
            error: error.message
        })
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "email & password is required",
        })
    };

    const isExist = await User.findOne({ email }).select("+password");

    if (!isExist) {
        return res.status(409).json({
            success: false,
            message: "User not found"
        });
    };

    if (isExist.password !== password) {
        return res.status(409).json({
            success: false,
            message: "incorrect password"
        });
    }

    const token = jwt.sign(
        {
            id: isExist?._id
        },
        CONFIG.JWT_SECRET,
        {
            expiresIn: '7d'
        }
    );

    if (token) {
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
        });
    };

    res.status(201).json({
        success: true,
        message: "Logged In Successfully",
        data: {
            _id: isExist._id,
            fullname: isExist.fullname,
            email: isExist.email,
        }
    });
};

