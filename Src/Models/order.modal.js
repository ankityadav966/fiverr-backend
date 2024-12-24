const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    // {
    //     status: {
    //         type: String,
    //         default:"pending"
    //     },
    //     gig_id: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'gigs'
    //     },

    //     client_id: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'buyers'
    //     },

    //     quantity: {
    //         type: Number,
    //         required: true
    //     },

    //     delivery_date:[
    //         {
    //             type: Date,
    //             ref: 'gigs'
    //         }
    //     ],
    //     delivered_on:[
    //         {
    //             type: Date,
    //             ref: 'gigs'
    //         }
    //     ]
    // },
    {
        service_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'gigs'
        },
        buyer_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'buyers'
        },
        order_date: {
            type:Date
        },
        status: {
            type: String,
            default: "pending"
        },
        is_cancel: {
            type: Boolean,
            default:false
        },
        cancel_reason: {
            type: String,
        },
        price: {
            type: Number,
            required: true
        },
        payment_status: {
            Enum: ["paid", "unpaid"]
        },
        delivery_date: [
            {
                type: Date,
                ref: 'gigs'
            }
        ],
        delivered_on: [
            {
                type: Date,
                ref: 'gigs'
            }
        ]
    },

    { timestamps: true }
);


const Order = mongoose.model("orders", OrderSchema);

module.exports = Order;

