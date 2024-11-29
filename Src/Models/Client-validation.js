const z = require('zod')

const Clientloginapi = z.object({
    name: z
        .string({ required_error: "Name is Required " })
        .trim()
        .min(3, { message: "Name Must be 3 char.. " })
        .max(300, { message: "Name Must be 300 char.. " }),
    email: z
        .string({ required_error: "email is Required " })
        // .trim()
        .min(3, { message: "Name Must be 3 char.. " })
        .max(300, { message: "Name Must be 300 char.. " }),
    password: z
        .string({ required_error: "password is Required " })
        .trim()
        .min(3, { message: "Password Must be 3 char.. " })
        .max(30, { message: "Password Must be 30 char.. " }),
    number: z
        .string().regex(/^[6789]\d{9}$/, {
            message: "Invalid phone number. Must start with 6, 7, 8, or 9 and be 10 digits long.",
        })
        .min(8, { message: "Number must be at least 8 characters." })
        .max(12, { message: "Number must be at most 12 characters." })

})


module.exports = Clientloginapi;