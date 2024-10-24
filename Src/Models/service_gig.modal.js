const mongoose = require('mongoose');

const GigSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        about: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        price:{
            type: String,
            required: true
        },

        freelancer_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'sellers'
        },

        category: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'categories'
            }
        ],
        
        ratting:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'reviews'
            }
        ]
    },

    { timestamps: true }
);


const Service = mongoose.model("gigs", GigSchema);

module.exports = Service;

//   sub category,   d-time