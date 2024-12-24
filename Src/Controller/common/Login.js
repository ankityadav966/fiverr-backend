const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const z = require("zod")
const Client = require("../../Models/Client.model");

const loginapi = async (req, res, next) => {
    try {
        const { email, password, number, name, Enum, bio } = req.body;
        const existingUser = await Client.findOne({ email })
        if(existingUser){

           return res.status(404).json({
                error: "useer aalerady exist : "
            })
        }
        const haspassword = await bcrypt.hash(password, 10);


        const token = jwt.sign({
            email
        }, 'secret', { expiresIn: '90000h' });
        const api = await Client.create({
            name: name,
            email: email,
            password: haspassword,
            number: number,
            Enum: Enum,
            bio: bio,
            token
        }
        )

        res.send({ status: '004', message: "user add successfully ", data: api })
    } catch (error) {
        console.log(error);
    }
}


const userpasswordresst = async (req, res) => {
    try {


        const { newpassword, oldpassword } = req.body;

        const userdata = await Client.findOne({ _id: req.user.email });
        if (!userdata) {
            return res.status(404).send('User not found');
        }


        const dbPassword = userdata.password;
        const checkPass = await bcrypt.compare(oldpassword, dbPassword);
        if (!checkPass) {
            return res.status(400).send('OLD password does  not match');

        }
        const isMatch = await bcrypt.compare(newpassword, dbPassword);
        console.log(isMatch);

        if (isMatch) {
            return res.status(400).send('New password cannot be the same as the old one');
        }

        const hashedPassword = await bcrypt.hash(newpassword, 10);

        await Client.findOneAndUpdate({ _id: user_id }, { password: hashedPassword });

        return res.status(200).send('Password updated successfully');

    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
};
// Get user details.

const userdetails = async (req, res) => {
    try {
        const { findid } = req.params;

        const findbyuserid = await Client.findOne({ _id: findid })
        res.send(findbyuserid)

    } catch (error) {
        console.log(error);

    }
}
// Update user profile.
const Updateuser = async (req, res) => {
    try {

        // console.log(req.user.email , "user")
        const profile = await Client.findOne({ email: req.user.email })
        if (profile) {
            const updateuserprofile = await Client.updateOne({ email: profile.email }, req.body);

            res.status(200).json({

                message: "profile updated successfully"
            })
        } else {
            res.status(400).json({

                message: "user Not Found"
            })

        }


    }
    catch (error) {
        console.log(error)
    }
}


module.exports = {

    userpasswordresst,
    loginapi,
    userdetails,
    Updateuser
}

