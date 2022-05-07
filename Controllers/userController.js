const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const path = require("path");
require("dotenv").config();






/*-------------------------User Registration Code Started----------------------------------*/

module.exports.userregistration = async (req, res) => {
    let { username, email, number, password,firstname,lastname,location } = req.body
    username = username.trim();
    number = number.trim();
    email = email.trim();
    firstname=firstname.trim();
    lastname=lastname.trim();
    location=location.trim();
    
    if (username == '' || number == '' || email == '' || password == '' || firstname=='' || lastname=='' || location=='') {
        res.status(500).json({
            status: "Failed",
            message: "Empty Input Fields!"
        })
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        res.status(500).json({
            status: "Failed",
            message: "Invalid Email Name"
        })
    } else if (password.length < 8) {
        res.status(500).json({
            status: "Failed",
            message: "Password is too short"
        })
    } else {

        User.find({ email })
            .then(result => {
                if (result.length) {
                    res.status(409).json({
                        code:409,
                        Status: "Failed",
                        message: "Email Already Exist"
                    })
                } else {
                    const saltRounds = 10
                    bcrypt.hash(password, saltRounds).then(hashedPassword => {
                        const newUser = new User({
                            username,
                            email,
                            verified: true,
                            password: hashedPassword,
                            firstname,
                            lastname,
                            location,
                            
                        });
                        const accessToken = jwt.sign({
                            newUser
                        }, process.env.SECRETK, { expiresIn: "1d" });

                        newUser.save().then(result => {
                            res.status(201).json({
                                code:201,
                                Status: "success",
                                message: "User Created Successfully",
                                data: {
                                    accesstoken:accessToken
                                },
                                
                            })
                            
                        })

                    }).catch((error) => {
                        console.log(error)
                        res.status(424).json({
                            code:424,
                            Status: "Failed",
                            message: "Something went wrong while trying to hash a password",
                        })
                    })
                }

            }).catch(error => {
                console.log(error);
                res.status(424).json({
                    code:424,
                    status: "Failed",
                    message: "An error occur while trying to fetch for existing user"
                })
            });
    }

    
}

/*-------------------------User Registration Code Ended----------------------------------*/


/*--------------------------User Login Code Start-----------------------------*/
module.exports.Userlogin = async (req, res) => {
    let { email, password } = req.body
    if (email == '' || password == '') {
        res.status(500).json({
            Status: "Failed",
            message: "Empty Credentials Supplied!"
        })
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        res.status(500).json({
            status: "Failed",
            message: "Invalid Email Name"
        })
    } else if (password.length < 8) {
        res.status(500).json({
            status: "Failed",
            message: "Password Too Small"
        })
    } else {

        User.find({ email })
            .then(data => {
                if (data.length) {
                    if (!data[0].verified) {
                        res.status(500).json({
                            status: "Failed",
                            message: "User has not been verified"
                        })
                    } else {
                        const hashedPassword = data[0].password;
                        const accessToken = jwt.sign({
                            data
                        }, process.env.SECRETK, { expiresIn: "1d" });
                        bcrypt.compare(password, hashedPassword)
                            .then(result => {
                                if (result) {
                                    res.status(200).json({
                                        code:200,
                                        status: "success",
                                        message: "You have successfully Logged in",
                                        token: accessToken,
                                       
                                    })
                                } else {
                                    res.status(200).json({
                                        status: "success",
                                        message: "Invalid Password",

                                    })
                                }
                            })
                            .catch((error) => {
                                console.log(error)
                                res.status(500).json({
                                    status: "Failed",
                                    message: "An error occur while comparing the password",
                                })
                            })
                    }
                } else {

                    res.status(500).json({
                        status: "Failed",
                        message: "Invaid Credentials",
                    })

                }
            })
            .catch(error => {
                res.status(500).json({
                    status: "Failed",
                    message: "Error Occur while trying to get existing Users",
                })
            })

    }

}
/*--------------------------User Login Code Ended-----------------------------*/