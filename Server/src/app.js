const express = require("express")
const cors = require("cors");
const { Dbconnect } = require("./config/DB");
const { UserRouter } = require("./Router/UserRouter");
const cookieParser = require('cookie-parser');
const { verify_token } = require("./controller/JWT");
const { UserModel } = require("./Models/User");
const { RechargeRoute } = require("./Router/Recharge");
const { walletRouter } = require("./Router/Wallet");


require("dotenv").config();


const PORT = process.env.PORT;
const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/user',UserRouter)

app.use('/recharge',RechargeRoute)

app.use('/wallet',walletRouter)

app.use('/logout', (req, res) => {
    let msg = 'Logged out successfully';
    const cookieOptions = {
        path: '/',
        httpOnly: false,
        secure: false,
        sameSite: 'Lax'
    };
    const cookieNames = ['auth_token'];
    cookieNames.forEach(cookieName => {
        if (req.cookies[cookieName]) {
            res.clearCookie(cookieName, cookieOptions);
        }
    });
    res.json({ message: msg });
});




app.use('/token_verify',async(req,res)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    //console.log(token)
    if(token){
        const data = await verify_token(token);
        if(data.status){
            const uid = data.decode.u_id
            try {
                const user = await UserModel.findOne({_id:uid},{__v:0,password:0,tokens:0});
                if (!user) {
                    return res.status(401).json({ status: 0, message: 'User not found' });
                  }
                return res.json({ status: 1, user });
            } catch (error) {
                
            }
        }
    }
    res.status(401).json({ status: 0, message: 'Invalid token' });
})

app.get("/",(req,res)=>{
    res.json({messege:"From Server"})
});

app.listen(PORT,(err)=>{
    if (err) {
        console.log(err);
    } else {
        try {
            Dbconnect(process.env.DB_URL)
            console.log(`server is running at port http://localhost:${PORT}`)
        } catch (error) {
            console.log(error)
        }
    }
})