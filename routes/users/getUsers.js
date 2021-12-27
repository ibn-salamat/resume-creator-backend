const User = require("../../models/user");

async  function getUsers (req, res)  {
    try {
        let users = await User.find().select("name lastname resumes").lean();
    
        res.status(200).json({
            message: "Success",
            data: users,
            length: users.length,
        });

    } catch (error) {
        res.status(404).json({ message: "Something has happened. Try again", error: error.stack });
    }
}

module.exports = getUsers