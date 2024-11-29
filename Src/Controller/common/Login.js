const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const z = require("zod")
const Client = require("../../Models/Client.model");

const loginapi = async (req, res) => {
    try {
        const { email, password, number, name } = req.body;
        const haspassword = await bcrypt.hash(password, 10);

        const tokenPayload = { email };
        const token = jwt.sign({
            tokenPayload
        }, 'secret', { expiresIn: '90000h' }); 
        const api = await Client.create({
            name: name,
            email: email,
            password: haspassword,
            number: number,
            token
        }
    )
        res.send({ status: '004', message: "user add successfully ", data: api })
    } catch (error) {
        console.log(error);
    }
}




module.exports = loginapi;