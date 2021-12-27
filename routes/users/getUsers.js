const User = require("../../models/user");

async  function getUserById (req, res)  {
    const { id } = req.params;
    try {
        // get users list
        if(id === "all"){
            let users = await User.find().select("name lastname resumes").lean();
        
            res.status(200).json({
              message: "Success",
              data: users,
              length: users.length,
            });

            return;
        }
        
        // get users
        const user = await User.findOne({ _id: id }).select(
            "name email gender lastname birthday resumes._id resumes.title"
        );

        res.json({
            message: "Success",
            data: user,
        });
    } catch (error) {
        res.status(404).json({ message: "User is not found", error: error.stack });
    }
}

module.exports = getUserById