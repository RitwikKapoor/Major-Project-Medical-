import User from "../models/UserModel.js";

const doctorCheck = async (req,res,next) => {
    const user = await User.findOne({_id: req.locals});
    if(user.isDoctor){
        next()
    }else{
        return res.status(401).json({ msg: 'You are not authorized doctor' })
    }
}

export default doctorCheck;
