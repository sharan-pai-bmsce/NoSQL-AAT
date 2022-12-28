const User = require('../Model/User');
const bcryptjs = require('bcryptjs');

exports.putSignUp = async (req,res,next) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = await bcryptjs.hash(req.body.password,10);
        const dob = !req.body.DOB?new Date():new Date(req.body.DOB);
        const sex = req.body.sex;
        const user = new User({
            name: name,
            email:email,
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

exports.postUserLogin = async (req,res,next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({email: email});
        // console.log(user);
        if(user){
            const passVer = await bcryptjs.compare(password,user.password);
            if(passVer){
                res.status(201).json({
                    message: "Logged In"
                });
            }else{
                res.status(422).json({message:"Password incorrect"});
            }
        } else {
            res.status(422).json({message:"Password incorrect"});
        }
    } catch (error) {
        res.status(422).json({message:error});
    }
}
