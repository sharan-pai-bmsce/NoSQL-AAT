const User = require('../Model/User');
const Doctor = require('../Model/Doctor');
const Admin = require('../Model/Admin');
const bcryptjs = require('bcryptjs');

exports.putSignUp = async (req, res, next) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        // const password = await bcryptjs.hash(req.body.password,10);
        const password = req.body.password;
        const dob = !req.body.DOB ? new Date() : new Date(req.body.DOB);
        const sex = req.body.sex;
        const user = new User({
            name: name,
            email: email,
            password: password,
            DOB: dob,
            sex: sex
        })

        await user.save()

        res.status(201).json({
            message: "User registered"
        })
    } catch (error) {
        console.log(error);
        res.status(422).json({

            message: error
        })
    }
}

exports.postUserLogin = (req, res, next) => {
    console.log(req.body,req.method);
    const email = req.body.email;
    const password = req.body.password;
    const user = User.findOne({ email: email })
        .then((user) => {
            console.log(password, user.password);
            if (user) {
                console.log(password, user.password);
                // const passVer = await bcryptjs.compare(password,user.password);
                if (user.password === password) {
                    res.status(201).json({
                        userId: user._id.toString(),
                        message: "Logged In"
                    });
                } else {
                    res.status(422).json({ message: "Password incorrect" });
                }
            } else {
                res.status(422).json({ message: "Password incorrect" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(422).json({ message: err });
        })
}

exports.postDoctorLogin = (req, res, next) => {
    console.log(req.body,req.method);
    const email = req.body.email;
    const password = req.body.password;
    Doctor.findOne({ email: email })
        .then((user) => {
            console.log(password, user.password);
            if (user) {
                console.log(password, user.password);
                // const passVer = await bcryptjs.compare(password,user.password);
                if (user.password === password) {
                    res.status(201).json({
                        message: "Logged In"
                    });
                } else {
                    res.status(422).json({ message: "Password incorrect" });
                }
            } else {
                res.status(422).json({ message: "Password incorrect" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(422).json({ message: err });
        })
}


exports.postAdmin = (req,res,next) => {
    
    const admin = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })
    admin.save().then((admin)=>{
        return res.status(201).json({
            message: 'Admin created'
        })
    })
    .catch(err=>{
        return res.status(500).json({
            message: err
        })
    })
}

exports.postAdminLogin = (req, res, next) => {
    console.log(req.body,req.method);
    const email = req.body.email;
    const password = req.body.password;
    Admin.findOne({ email: email })
        .then((user) => {
            console.log(user);
            if (user) {
                console.log(password, user.password);
                // const passVer = await bcryptjs.compare(password,user.password);
                if (user.password === password) {
                    res.status(201).json({
                        message: "Logged In"
                    });
                } else {
                    res.status(422).json({ message: "Password incorrect" });
                }
            } else {
                res.status(422).json({ message: "Password incorrect" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(422).json({ message: err });
        })
}
