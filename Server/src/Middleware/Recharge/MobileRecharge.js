const { verify_token } = require("../../controller/JWT");

const Mobile_Recharge_fields_check = async (req, res, next) => {

    const { amount, operator, mobileno, service } = req.body;

    if (!amount || !operator || !mobileno || !service) {
        return res.status(400).json({ message: "All fields (amount, operator, mobileno, service) are required" });
    }

    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ message: "Invalid amount. Amount should be a number greater than 0" });
    }

    const validOperators = ['Airtel', 'Jio', 'Vodafone', 'BSNL'];
    if (!validOperators.includes(operator)) {
        return res.status(400).json({ message: `Invalid operator. Valid operators are: ${validOperators.join(', ')}` });
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobileno)) {
        return res.status(400).json({ message: "Invalid mobile number. It should be a valid 10-digit number starting with 6-9" });
    }

    if (!['prepaid', 'postpaid'].includes(service)) {
        return res.status(400).json({ message: "Invalid service type. Must be 'prepaid' or 'postpaid'" });
    }
    const token = req.cookies.auth_token;
    const decoded = await verify_token(token, process.env.JWT_PRIVATE_KEY);
    //console.log(decoded);
    const userId = decoded.decode.u_id;
    console.log(userId)
    req.rechargeData = {amount, operator, mobileno, service, userId}
    
    next();
};



module.exports = {
    Mobile_Recharge_fields_check
};
