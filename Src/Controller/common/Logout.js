const Client = require("../../Models/Client.model");

const userlogout = async (req, res, next) => {
    try {
        const { email } = req.body;

        const logoutapi = await Client.findOneAndUpdate({ email }, { token: null ,  status: "inactive"})
        if (!logoutapi) {
            return res.status(400).json({ message: "Logout failed: user not found" });
        }
        return res.status(200).json({
            success: true,
            message: 'User logged out successfully'
        });
    } catch (error) {
        console.log(error);
        next(error)

    }
}

module.exports = userlogout