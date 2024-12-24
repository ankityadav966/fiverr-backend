// POST /api/service   – Create a new service (by seller).
// isme add service schema feild voh req.body and frelancerid - token  
// 1 id find - params 
// 1 update - params 
// const Category = require("../../Models/categorys.modal")
const Category = require("../../Models/categorys.modal");
const Service = require("../../Models/service_gig.modal")



const servicradd = async (req, res) => {
    const { name, about, description, price, freelancer_id,approved, Id } = req.body;

    if (!name || !about || !description || !price) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        const { Id } = await req.body;
        const findbycaterory = await Category.findOne({ _id: Id })
        // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", findbycaterory)
        const servicedataadd = await Service.create({
            name: name,
            about: about,
            description: description,
            price: price,
            freelancer_id: freelancer_id,
            approved:approved,
            category: [findbycaterory],
        });
        res.status(200).json({
            status: 'success',
            message: "Service Added Successfully",
            data: servicedataadd,
        });

    } catch (error) {
        console.error("Error Adding Service:", error.message);

        res.status(500).json({
            status: 'error',
            message: "Failed to add service",
            error: error.message,
        });
    }

}
const findbyservice = async (req, res) => {
    try {
        const { id } = req.body
        console.log(id)
        const findservice = await Service.findOne({ _id: id })
        res.send(findservice)
    } catch (error) {
        console.log(error)
    }
}
const serviceupdate = async (req, res) => {
    try {
        const { serviceid } = req.params;
        const findservice = await Service.findOne({ _id: serviceid })
        if (findservice) {
            const update = await Service.updateOne({ id: findbyservice }, req.body) 
            res.status(200).json({
                status: "successfully",
                msg: "your service are change successfully"
            })
        }
        else {
            res.status(400)({
                message: "Service are Not Found "
            })
        }
    } catch (error) {
        console.log(error)
    }
}
const servicedelete = async (req, res) => {
    try {
        const serviceid = req.params.serviceid

        const findservice = await Service.findOne({ _id: serviceid })
        if (findservice) {
            const servicedelete = await Service.findByIdAndDelete({ _id: serviceid })
            console.log(servicedelete)
            res.status(200).json({
                status: "009",
                msg: "service are delete successfully : "
            })
        }
        else {
            res.status(400)({
                message: "service are not exist : "
            })
        }
    } catch (error) {
        console.log(error)
    }
}
const getallservice = async (req, res) => {
    try {
        const alldata = await Service.find().populate({
            path: "category"
        });
        return res.status(200).json({
            status: "success",
            data: alldata
        });
    } catch (error) {
        console.log(error)
    }
}
const servicescategory = async (req, res) => {
    try {
        const { id } = req.body;
        console.log(id)
        if (id) {
            const findbycaterory = await Service.find({ category: id })
            res.status(200).json({
                status: "success",
                data: findbycaterory
            })
        } else {
            res.status(400).json({
                msg: "THis content Are not Exist : "
            })
        }
    } catch (error) {
        console.log(error)
    }
}
const searchapi = async (req, res) => {
    try {
      
        console.log(req.query ,"e")
        const {search='' , page =1, limit=10} = req.query
        const offset = parseInt((page-1)*limit)
    //    const data = await Service.find({ });
       const data = await Service.find({ name: { $regex: `${search}` , $options: 'i' } }).skip(offset).limit(limit)

        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'No matching records found' });
        }

        return res.status(200).json(data);


    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Internal server error', error: error.message });

    }

}


module.exports = {
    servicradd,
    findbyservice,
    serviceupdate,
    servicedelete,
    getallservice,
    servicescategory,
    searchapi
}


// cancel order - orderId  , cancel reason
// token - id 


