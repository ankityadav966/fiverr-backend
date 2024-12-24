const Zod = require('zod')


// const validate = (validatewithzod)=>async(req,res ,next)=>{
// try {
//     // console.log(req.body.number)
//     // let a = req.body.number;
//     // // console.log(a.length)
//     const parseBody = await validatewithzod.parseAsync(req.body);
//     req.body = parseBody;
//     next();
// } catch (error) {
//     console.log(error);   
// }
// }

// module.exports = validate;


const validate = (validatewithzod) => async (req, res, next) => {
    try {
        const parsedData = await validatewithzod.parseAsync(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: "Validation failed", errors: error.errors });
        }
        res.status(500).json({ message: "Internal server error" });
    }
};
module.exports = validate;
