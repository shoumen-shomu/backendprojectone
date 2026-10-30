const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { emailVerification, forgetPasswordEmail } = require("../utils/emailSender");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const registrationController = async (req, res) => {
  let { fullName, email, password, confirmPassword, terms } = req.body;

  let existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "Email already exists",
    });
  }
  if (!fullName || !email || !password || !confirmPassword || !terms) {
    return res.status(400).json({
      success: false,
      message: "Please fill the all fields",
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Please enter a correct password",
    });
  }

  const hash = bcrypt.hashSync(password, 10);

  const user =await new User({
    fullName: fullName,
    email: email,
    password: hash,
    terms: terms,
  }).save();

  const verificationToken = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_VERIFY_SECRET,
    { expiresIn: "7d" },
  );

  //console.log(verificationToken);

  emailVerification(email, verificationToken);

  res.status(201).json({
    success: true,
    message: "Registration Done",
  });
};

const loginController = async (req, res) => {
  let { email, password } = req.body;
  let existingUser = await User.findOne({ email: email });

  if (!existingUser) {
    return res.status(400).json({
      success: false,
      message: "Invalid Credentials",
    });
  }

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill the all fields",
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email",
    });
  }

  if (!existingUser.isVerified) {
  return res.status(403).json({
    success: false,
    message: "Please verify your email first",
  });
}

  let passCompare = bcrypt.compareSync(password, existingUser.password);

  if (passCompare) {
    const accessToken = jwt.sign(
    {
      _id: existingUser._id,
      email: existingUser.email,
      role: existingUser.role,
    },
    process.env.JWT_VERIFY_SECRET,
    { expiresIn: "7d" },
  );
    res.status(201).json({
      success: true,
      message: "Login Successfully",
       data: {
        _id: existingUser._id,
        fullName: existingUser.fullName,
        email: existingUser.email,
        role: existingUser.role,
      },
   accessToken : accessToken
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid Credentials",
     
    });
  }
};

const verifyEmailController = async (req,res)=>{
  let {token} =req.params   

  var decoded = jwt.verify(token,process.env.JWT_VERIFY_SECRET);

await User.findByIdAndUpdate({_id:decoded._id},{isVerified:true})

res.status(200).json({
    success: true,
    message: "Email Verified",
  });
  
}


const forgotPassword = async(req,res)=>{
  let {email}=req.body
  let existingUser = await User.findOne({ email: email });

  if (!existingUser) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

   const resetPasswordToken = jwt.sign(
    {
      _id: existingUser._id,
      email: existingUser.email,
    },
    process.env.JWT_VERIFY_SECRET,
    { expiresIn: "3d" },
  );

  forgetPasswordEmail(email,resetPasswordToken)
  res.status(200).json({
    success : false,
    message : "Please Check Email for resetting password"
  })

}


const resetPassword = async(req,res)=>{
  let {token} = req.params
  let {newPassword,confirmPassword} = req.body

  let decoded = jwt.verify(token,process.env.JWT_VERIFY_SECRET);
 
if(decoded){
  if(newPassword === confirmPassword){
    const hash = bcrypt.hashSync(newPassword, 10);
    await User.findByIdAndUpdate({_id:decoded._id},{password :hash})
  }else{
    return res.status(400).json({
      success : false,
      messsage : "Password not match"
    })
  }
}else{
  return res.status(400).json({
    success : false,
    message : "Invalid token"
  })
}
return res.status(200).json({
  success : true,
  message : "Password Update Done"
})

  

}
module.exports = { registrationController, loginController,verifyEmailController,forgotPassword,resetPassword};
