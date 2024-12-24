const Client = require("../../../Models/Client.model");
const Order = require("../../../Models/order.modal");
const Ratting = require("../../../Models/review.modal");
const Service = require("../../../Models/service_gig.modal");

const Reviewadd = async (req, res) => {
    try {
        const { ratting, gig_id, client_id, comment, order_id } = req.body;
        // console.log(req.user)

        // const findbyid = Client.findOne({email:req.user.email})
        const datacreate = await Ratting.create({
            ratting: ratting,
            gig_id: gig_id,
            client_id: client_id,
            comment: comment,
            order_id:order_id
        })
        res.status(200).json({
            success: "001",
            Review: datacreate
        })
    } catch (error) {
        console.log(error)
    }
}
const reviewsforspecificservice = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ success: false, message: "Gig ID is required." });
        }
        const reviews = await Service.find({ freelancer_id: id });
        if (reviews.length === 0) {
            return res.status(404).json({ success: false, message: "No reviews found for this gig." });
        }
        res.status(200).json({
            success: true,
            data: reviews
        });
    } catch (error) {
        console.error("Error finding reviews:", error.message);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
}
const reviewsforspecificuser = async (req, res) => {
    try {
        const { id } = req.body
        const findbyuserserviec = await Ratting.find({ client_id: id })
        if (findbyuserserviec.length === 0) {
            return res.status(404).json({ success: false, message: "No reviews found for this gig." });
        }
        res.status(200).json({
            success: "Success : ",
            data: findbyuserserviec
        })
    } catch (error) {
        console.error("Error finding reviews:", error.message);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
}
const orderdetails = async (req, res) => {
    try {
        const {id} = req.body;
        const data = await Ratting.find({order_id:id})
        res.status(200).json({
            status: "success",
            data: data
        })
    }
    catch (error) {
        return res.status(500).json({
            message:"Order Are not Exist : "
        })
    }
}

module.exports = {
    Reviewadd,
    reviewsforspecificservice,
    reviewsforspecificuser,
    orderdetails
}