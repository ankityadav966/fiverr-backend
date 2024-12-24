const { z } = require('zod');

const Clientloginapi = z.object({
    name: z
        .string({ required_error: "Name is Required " })
        .trim()
        .min(3, { message: "Name Must be at least 3 characters." })
        .max(300, { message: "Name must be at most 300 characters." }),

    email: z
        .string({ required_error: "Email is Required " })
        .email({ message: "Invalid email address." })
        .min(3, { message: "Email must be at least 3 characters." })
        .max(300, { message: "Email must be at most 300 characters." }),

    password: z
        .string({ required_error: "Password is Required " })
        .trim()
        .min(3, { message: "Password must be at least 3 characters." })
        .max(30, { message: "Password must be at most 30 characters." }),

    number: z
        .string()
        .regex(/^[6789]\d{9}$/, {
            message: "Invalid phone number. Must start with 6, 7, 8, or 9 and be 10 digits long.",
        })
        .length(10, { message: "Phone number must be exactly 10 digits long." }) // Ensure it's exactly 10 digits long
});

module.exports = Clientloginapi;
