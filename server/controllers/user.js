const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const TaskUser = require('../models/user');

function signup() {
    return async (req, res, next) => {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({
                    message: 'Please provide username, email, and password',
                });
            }

            const existingUser = await TaskUser.findOne({ email });

            if (existingUser) {
                return res.status(400).json({
                    message: 'User already exists, please use another email address',
                });
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new TaskUser({
                    name,
                    email,
                    password: hashedPassword,
                });

                await newUser.save();
                res.status(201).json({
                    message: 'User created successfully',
                    user: newUser,
                    id : newUser.id
                });
            }
        } catch (error) {
            console.log(error);
            next(error); 
        }
    };
}

function login() {
    return async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const existingUser = await TaskUser.findOne({ email: email });

            if (existingUser) {
                const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
                if (isPasswordCorrect) {
                    const token = jwt.sign(
                        { userID: existingUser._id }, 
                        process.env.JWT_SECRET
                    );
                    res.status(200).json({
                        message: 'Login successful',
                        email: existingUser.email,
                        name: existingUser.name,
                        id: existingUser._id,
                        token
                    });

                } else {
                    res.status(400).json({
                        message: 'Invalid credentials',
                    });
                }
            } else {
                res.status(400).json({
                    message: 'User not found',
                });
            }
        } catch (error) {
            next("Error Logging In", error);
        }
    };
}

const Updateuser = () => {
    return async (req, res) => {
        try {
            const userId = req.params.id;
            console.log(`Update user ${userId}`);
            const { updemail, updpassword } = req.body;
            console.log(req.body);
            if (!updemail || !updpassword) {
                return res.status(400).json({ message: 'Please provide all required fields' });
            }

            const userone = await TaskUser.findById(userId);
            console.log(userone);
            if (userone){
                userone.email = updemail;
                userone.password = await bcrypt.hash(updpassword, 10);

                await userone.save();

                res.json({
                    message: 'User updated successfully',
                    user: userone
                });
            }else{
                return res.status(404).json({ message: 'User not found' });
            }

            
        } catch (error) {
            res.status(500).json({ message: 'Server Error', error: error.message });
        }
    }
}

module.exports = {
    signup,
    login,
    Updateuser
};