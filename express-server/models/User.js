import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name: {
        
    },
    email: {

    }
})

const User = mongoose.model("User", UserSchema);

export default User;