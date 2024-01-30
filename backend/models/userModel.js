const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    email:{
        type: String,
        required: [true, "Please add a email"],
        unique: true,
        trim: true,
        match: [
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, "Please enter a valid email"
        ],
    },
    password: {
        type: String,
        required: [6, "Password add a password"],
        minLenght: [6, "Password must be up to 6 characters"]
    },
    role: {
        type: String,
        required: [true],
        default: "customer",
        enum: ["customer", "admin"],
    },
    photo: {
        type: String,
        required: [true, "Please add a photo"],
        default: "https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE="
    },
    phone: {
        type: String,
        default: "+91",
    },
    address: {
        type: Object
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;