import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config({
    path:"../config/.env"
})


// Authentication
export let isAuth = async (req, res, next) => {

  try {
    let { token } = req.cookies;
    // console.log(token);

    if (!token) {
        return res.status(401).json({
            massage: 'you are not Authenticated',
            success:false
        })
    }

    let isVerifyTocken = await jwt.verify(token,process.env.TOKEN_SECRET)
    // console.log(isVerifyTocken);
    // req.user = isVerifyTocken.id     // todo check
    next()
  } catch (error) {
    console.log(error);
  }
};
