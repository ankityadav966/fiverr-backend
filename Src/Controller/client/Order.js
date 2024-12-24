

// POST /api/order   – Place an order (buyer's request to purchase a service).
// add post data clientid - token gigId - postman delivery date 

const Client = require("../../Models/Client.model");
const Order = require("../../Models/order.modal");

// params - orderId 



const CreateOrder = async (req, res) => {
        try {

                const { buyer_id, service_id, order_date, status, price, payment_status, cancel_reason } = req.body;
                const orderdata = await Order.create({
                        buyer_id: buyer_id,
                        service_id: service_id,
                        order_date: order_date,
                        status: status,
                        price: price,
                        payment_status: payment_status,
                        cancel_reason: cancel_reason
                })
                res.status(200).json({
                        status: "001",
                        data: orderdata
                });
        } catch (error) {
                console.log(error)
        }
}
const allordershow = async (req, res) => {
        try {
                const data = await Order.find();
                res.send(data)
        } catch (error) {
                console.log(error)
        }
}
const getorderwithid = async (req, res) => {
        try {


                console.log(req.user)

                const userDetails = await Client.findOne({email:req.user.email})

                

                const orderdata = await Order.find({ buyer_id: userDetails._id })
                        console.log(orderdata)

        } catch (error) {
                console.log(error)
        }
}



// const orderstatuschange = async (req, res) => {
//         try {
//                 const { id  } = req.body;
//                 const orderdata = await Order.find({ _id: id }) 
//                 if (orderdata) {
//                         const data = orderdata[0].status; 

//                         const change = await Order.updateMany({ id: orderdata[0].status }, req.body)

//                         res.send(change)
//                         console.log(change)
//                 }
//                 console.log(orderdata[0].status)



//         } catch (error) {

//         }
// }



const orderstatuschange = async (req, res) => {
        try {
                const { id, status } = req.body;
                const orderdata = await Order.find({ _id: id });

                if (orderdata.length > 0) {

                        const change = await Order.updateOne(
                                { _id: id },
                                { $set: { status: status } }
                        );

                        res.send(change);
                } else {
                        res.status(404).send({ message: "Order not found" });
                }
        } catch (error) {
                res.status(500).send({ message: "Server error", error: error.message });
                console.error(error);
        }
}

const ordercancel = async (req, res) => {
        try {
                const { id } = req.body;
                const orderfind = await Order.find({ _id: id })
                if (orderfind) {

                        const finddata = await Order.findOneAndUpdate({ id: orderfind.id },
                                { is_cancel: true })
                        res.status(200).json({
                                status: "0092",
                                data: finddata
                        })
                }
                else{
                        res.status(400).json({
                                msg: "data are not cancel : "
                        })
                }


        } catch (error) {
                console.log(error)
        }
}






module.exports = {
        CreateOrder,
        allordershow,
        getorderwithid,
        orderstatuschange,
        ordercancel
}