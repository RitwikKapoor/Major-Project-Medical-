import User from "../models/UserModel.js";

const doctorOrAdminCheck = async (req,res,next) => {
    const user = await User.findOne({_id: req.locals});
    if(user.isDoctor || user.isAdmin){
        next()
    }else{
        return res.status(401).json({ message: 'You are not authorized. O' })
    }
    
}

export default doctorOrAdminCheck;
