const User = require('../models/User');

module.exports.fetchMembers = async () => {
    const members = await User.find();

    if (members.length === 0) {
        const err = new Error("Members yet to be added found");
        err.status = 404;
        
        throw err;
    };

    return {
        data: members,
        message: "Members list fetched successfully",
    };
};

module.exports.removeMember = async (id) => {
    const member = await User.findById(id);
    
    if (!member) {
        const err = new Error("Member not found");
        err.status = 404;
        
        throw err;
    };

    const librarianCount = await User.countDocuments({
        role: "Librarian",
    });

    if (librarianCount === 1 && member.role === "Librarian") {
        const err = new Error("Only one member remains and is librarian, cant delete the member");
        err.status = 400;
        
        throw err;
    };

    await User.findByIdAndDelete(id);

    return "Member deleted successfully";
};