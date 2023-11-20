import User from "../models/UserModel.js";

const adminCheck = async (req,res,next) => {
    const user = await User.findOne({_id: req.locals});
    if(user.isAdmin){
        next()
    }else{
        return res.status(401).json({ message: 'You are not authorized. Only admins are allowed' })
    }
}

export default adminCheck;

