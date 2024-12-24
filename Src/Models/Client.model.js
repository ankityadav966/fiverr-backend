const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },

        email: {
            type: String,
            unique: true,
            required: true
        },

        password: {
            type: String,
            required: true
        },

        number: {
            type: Number
        },
        token: {
            type: String
        },
        bio: {
            type: String
        },
        role: {
            type: String,
            Enum: ['buyer', 'seller', 'admin'],
            default: 'buyer'
        },
        status:{
            type:String,
            default:"active"
        }
    },



    { timestamps: true }
);


const Client = mongoose.model("buyers", ClientSchema);

module.exports = Client;

