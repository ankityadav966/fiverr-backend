const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
    {
        ratting: {
            type: Number
        },

        gig_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'gigs'
        },

        client_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'buyers'
        },
        comment:{
            type:String,

        },
    //    review_text:{
    //     type:String
    //    }
    order_id:{
        type:String
    }
    },

    { timestamps: true }
);


const Ratting = mongoose.model("reviews", ReviewSchema);

module.exports = Ratting;

// add - token - clientId gigId - bakisab req.body
// get req.query - gigId find(gigId)
// get token - id find(clientId)


