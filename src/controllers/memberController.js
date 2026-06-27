const {
    fetchMembers,
    removeMember
} = require("../services/memberServices");

module.exports.getMembers = async (req, res, next) => {
    try {
        const member = await fetchMembers();

        res.status(200).json({
            success: true,
            status: 200,
            message: member.message,
            data: member.data
        });
    } catch(err) {
        next(err);
    };
};

module.exports.deleteMember = async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!id) {
            const err = new Error("Provide a valid ID");
            err.status = 405;

            throw err;
        };
        
        const message = await removeMember(id);

        res.status(200).json({
            success: true,
            status: 200,
            message,
        });
    } catch (err) {
        next(err);
    };
};