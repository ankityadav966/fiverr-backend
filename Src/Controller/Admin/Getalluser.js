const Client = require("../../Models/Client.model");
const contactmodal = require("../../Models/ContactTable");
const Order = require("../../Models/order.modal");
const Service = require("../../Models/service_gig.modal");
const settingModel = require("../../Models/Setting.modal");

const Allusershow = async (req, res) => {
    try {
        const data = await Client.find();
        res.status(200).json({
            status: "success : ",
            data: data
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error');
    }
}
const Changeuserstatus = async (req, res) => {
    try {

        const { id } = req.body;
        const userstatuschange = await Client.find({ _id: id });
        if (userstatuschange) {
            const data = userstatuschange[0].role;
            const updatestaus = await Client.updateOne({ _id: id }, { role: req.body.changerole })

            res.status(200).json({
                status: "success",
                data: updatestaus
            })
        }
        else {
            re.status(400).json({
                msg: "data not exist : "
            })
        }

        console.log(userstatuschange)




    } catch (error) {
        console.log(error)
    }
}
const allservice = async (req, res) => {
    try {
        const data = await Service.find({});
        res.status(200).json({
            status: "success",
            userdata: data
        })
    } catch (error) {
        console.log(error)
    }
}
const rejectservice = async (req, res) => {
    try {
        const { id } = req.body
        const rejectservice = await Service.find({ _id: id })
        // console.log("Data : ", rejectservice[0].approved)
        if (rejectservice) {
            const updatedata = await Service.updateOne({ _id: id }, req.body)
        }
        return res.status(200).json({ message: "Service rejected successfully" }, { data: updatedata })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
const allOrder = async (req, res) => {
    try {
        const data = await Order.find({});
        res.status(200).json({
            status: "001",
            data: data
        })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}
const rejectreson = async (req, res) => {
    try {
        const { cancel } = req.body;
        const data = await Order.find({ is_cancel: cancel });
        res.send({ data: data });
    } catch (error) {
        console.log(error)
    }
}
const total_revenue_active_users_top_services = async (req, res) => {
    try {
        const { service } = req.body;
        const data = await Order.find({ service_id: service });
        if (data) {
            const buyerIds = data.map(item => item.buyer_id);
            const servicedata = await Client.find({ _id: buyerIds })
            // console.log(Client.countdocuments())
            const allcount = await Client.countDocuments({ _id: buyerIds });
            res.status(200).json({
                User: servicedata,
                AllCount: allcount
            })
        } else {
            return res.status(400).json({
                message: "data not found : "
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Service Error"
        })
    }
}
const Getplatform_wide = async (req, res) => {
    try {
        const data = await Order.find();
        console.log(data, 'data')
        const allprice = data.map(item => item.price)
        console.log(allprice, "priceeee")
        const totalPrice = allprice.reduce((prev, curr) => {
            return prev + curr;
        })
        console.log(totalPrice, "tp")

        const totalRevenue = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalPrice: { $sum: "$price" }
                }
            }
        ])

        console.log(totalRevenue, "tr")
        res.send({
            status: "001",
            data: totalRevenue[0].totalRevenue
        })
    } catch (error) {
        console.log(error)
    }
}
const contactapi = async (req, res) => {
    try {
        const { email, description, phone, query_solved, result } = req.body;
        const data = await contactmodal.create({
            email: email,
            description: description,
            phonr: phone,
            query_solved: query_solved,
            result: result
        })

        res.status(200).json({
            status: "sccesss",
            data: data
        })
    } catch (error) {
        console.log(error)
    }
}
const All_query_solved = async (req, res) => {
    try {
        const data = await contactmodal.find({});
        res.status(200).json({
            status: "001",
            data: data
        })
    } catch (error) {
        console.log(error)
    }
}
const query_solvedupdate = async (req, res) => {
    try {
        const { query_solved, result } = req.body;
        const find = await contactmodal.find()
        const old = find.query_solved
        const oldresult = find.result;

        const data = await contactmodal.updateOne({ old, query_solved }, { oldresult, result })

        res.send({
            data: data
        })
    } catch (error) {
        console.log(error)
    }
}
const settingA_Api = async (req, res) => {
    try {
        const { service_Id, fees, gst, delivery_charge, maxPrice, minPrice } = req.body
        const user_data = await settingModel.create({
            service_Id: service_Id,
            fees: fees,
            gst: gst,
            delivery_charge: delivery_charge,
            maxPrice: maxPrice,
            minPrice: minPrice

        })
        res.status(200).json({
            status: "001",
            data: user_data
        })
    } catch (error) {
        console.log(error)
    }
}
const settingupdate = async (req, res) => {
    try {
        const { id } = req.body;
        const updatesetting = await settingModel.updateMany({ _id: id }, req.body)
        const data = await settingModel.find({});
        res.status(200).json({
            status: "001",
            data: data
        })
    } catch (error) {
        console.log(error)
    }
}
const Allsetting_Allservice = async (req, res) => {
    try {
        const setting = await settingModel.find({});
        const Allservice = await Service.find({});
        // res.status(200).josn({
        //     status:"001",
        //     setting_data:setting,
        //     Service_data:Allservice
        // })
        console.log(Allservice, setting)
        res.status(200).json({
            status: "001",
            data: setting,
            service: Allservice
        })
    } catch (error) {
        console.log(error)
    }
}

const oneservicetoallprice = async (req, res) => {
    try {
        const { serviceId } = req.body;
        const data = await settingModel.find({});
        const datafindbygig = await Service.find({ _id: serviceId });
        let totalSum = 0;
        const serviceprice = datafindbygig[0].price;
        data.forEach(value => {
            totalSum += value.fees || 0;
            totalSum += value.delivery_charge || 0;
            totalSum += value.maxPrice || 0;
            totalSum += value.minPrice || 0;
        });

        const sumofalldatatoprice = parseInt(serviceprice)

        const showtoalldata = sumofalldatatoprice + totalSum

        const with_gst = ((showtoalldata * 18) / 100) + showtoalldata

        // console.log(((showtoalldata*18)/100)+showtoalldata)

        res.status(200).json({
            status: "success",
            service: datafindbygig,
            Total_Amount: with_gst
        })












        // const all = data.map(item=>item.service_Id)
        // console.log("All",all)





    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    Allusershow,
    Changeuserstatus,
    allservice,
    rejectservice,
    allOrder,
    rejectreson,
    total_revenue_active_users_top_services,
    contactapi,
    query_solvedupdate,
    All_query_solved,
    Getplatform_wide,
    settingA_Api,
    settingupdate,
    Allsetting_Allservice,
    oneservicetoallprice
}
// contact table -
// user_id
// desc
// email
// phone
// query_solved - true and false  default - false
// result - string



// setting schema


// id
// service_id
// platform fees
// gst
// dilvery_charge
// max_price
// min_price


// api - add particular service
// get with serviice
// edit data of a particular service



