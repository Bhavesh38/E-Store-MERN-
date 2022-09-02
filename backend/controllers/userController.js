const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncError.js");

const User = require("../models/userModels.js");
const sendToken = require("../utils/jwtToken.js");


//Register user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "this is a sample",
            url: "profilePicUrl"
        }
    });
    user.save();

    // const token = user.getJWTToken();

    // res.status(201).json({
    //     success: true,
    //     token
    // });
    sendToken(user, 201, res);
});

//LOGIN USER
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password ", 400));
    }

    const user = await User.findOne({ email }).select("password");

    if (!user) {
        return next(new ErrorHandler("Invalid credentials", 401));
    }

    const isPasswordMatched = user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid credentials", 401))
    }

    // const token = user.getJWTToken();

    // res.status(200).json({
    //     success: true,
    //     token
    // });
    sendToken(user, 200, res)
});


//logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: "Log Out successfully"
    });
})