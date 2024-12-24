const Category = require("../../Models/categorys.modal")
 
const servicecategorys = async (req, res) => {
    try {
        const{name,description} = req.body
        const dataadd = await Category.create({
            name:name,
            description:description
        })
        res.status(200).json({
            status:"success",
            msg:"Category  Are Add Successfull : "
        })

    } catch (error) {
        console.log(error)
    }
}
const categorysShow = async(req,res)=>{
    try{
        const alldata = await Category.find({});
        res.status(200).json({
            data:alldata
        }) 
    }catch(error){
        console.log(error)
    }
} 

// const servicescategory = async(req,res)=>{
//     try{ 
//        const {id} = req.body; 
//        const findbycaterory = await Category.find({_id:id})
//        console.log(findbycaterory)
//     }catch(error){
//         console.log(error)
//     }
// }




module.exports = {
    servicecategorys,
    categorysShow,
    // servicescategory
}