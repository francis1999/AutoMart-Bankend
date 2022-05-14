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
        res.status(400).json({
            status: "Failed",
            message: "Invalid Email Name"
        })
    } else if (password.length < 8) {
        res.status(417).json({
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
                       
                        res.status(424).json({
                            code:424,
                            Status: "Failed",
                            message: "Something went wrong while trying to hash a password",
                        })
                    })
                }

            }).catch(error => {
                
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
        res.status(401).json({
            status: "Failed",
            message: "Invalid Email Name"
        })
    } else if (password.length < 8) {
        res.status(417).json({
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
                                        data
                                    })
                                } else {
                                    res.status(401).json({
                                        status: "success",
                                        message: "Invalid Password",

                                    })
                                }
                            })
                            .catch((error) => {
                               
                                res.status(500).json({
                                    status: "Failed",
                                    message: "An error occur while comparing the password",
                                })
                            })
                    }
                } else {

                    res.status(401).json({
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




/*--------------------------Admin Get single users detail start-----------------------------*/
module.exports.getsingleuser = async (req, res) => {
    const usersidentity = req.params.id
    try {
        const singleID = await User.findOne(req.params.id)
        res.status(200).json({
            status: "success",
            data: singleID,

        })

    }
    catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Error in Getting Users details"
        })
    }
}

/*--------------------------Admin Get single users detail end-----------------------------*/


/*--------------------------Admin Get All users detail start-----------------------------*/
module.exports.getallusers = async (req, res) => {

    let query = {};
    let qNew = req.query.new

    if (req.query.firstname) {
        query.firstname = req.query.firstname
    } 

    let total = await User.countDocuments(query);
    let page = (req.query.page) ? parseInt(req.query.page) : 1;
    let perPage = (req.query.perPage) ? parseInt(req.query.perPage) : 10;
    let skip = (page - 1) * perPage;

    query.push = ({
        $skip: skip
    });
    query.push = ({
        $limit: perPage
    })

    if (req.query.firstname) {
        query.$or = [
            { "firstname": { $regex: req.query.firstname, $options: 'i' } },

        ]
    } else if (req.query.lastname) {
        query.$or = [
            { "lastname": { $regex: req.query.lastname, $options: 'i' } },

        ]
    }

    let diplayallUsers = await User.find(query)
        .sort({ createdAt: -1 });
    if (qNew) {
        diplayallUsers = await User.find().sort({ createdAt: -1 })

    }

    return res.status(200).json({
        message: "success",
        noofUsers: diplayallUsers.length,
        data: {

            data: diplayallUsers,
            meta: {
                total: total,
                currentPage: page,
                perPage: perPage,
                totalPages: Math.ceil(total / perPage)
            }
        }
    })
}

/*--------------------------Admin Get all users detail End-----------------------------*/



/*--------------------------Admin Delete single users detail start-----------------------------*/
module.exports.deleteuserbyid = async (req, res) => {
    const usersid = req.params.id
    try {
        await User.findByIdAndDelete(usersid)
        res.status(200).json({
            status: "success",
            message: "User Deleted Successfully"
        })
    }
    catch (error) {
       
        res.status(500).json({
            status: "Failed",
            message: "Error Occur"
        })
    }
}
/*--------------------------Admin delete single users detail end-----------------------------*/

module.exports.Logout = async (req, res) => {
    try {
        res.status(200).json({
            status: "success",
            message: "Logout"
        })
    }
    catch (error) {
       
        res.status(500).json({
            status: "Failed",
            message: "Error Occur"
        })
    }
}



