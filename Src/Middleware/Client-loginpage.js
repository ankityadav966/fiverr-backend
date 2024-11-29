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



const validate = (validatewithzod) => async (req, res) => {
    try {
         const parsedData = await validatewithzod.parseAsync(req.body);

        res.status(200).json({
            message: "Validation successful",
            data: parsedData,
        });
    } catch (error) {
         if (error instanceof Zod.ZodError) {
            const formattedErrors = error.errors.map(err => ({
                path: err.path[0],  
                message: err.message,  
            }));

            res.status(400).json({
                message: "Validation failed",
                errors: formattedErrors,
            });
        } else {
            res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
        }
    }
};

module.exports = validate;
