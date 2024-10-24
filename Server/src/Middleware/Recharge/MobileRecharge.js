const Mobile_Recharge_fields_check = async (req, res, next) => {

    const { amount, operator, mobileno, service } = req.body;

    if (!amount || !operator || !mobileno || !service) {
        return res.status(400).json({ message: "All fields (amount, operator, mobileno, service) are required" });
    }

    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ message: "Invalid amount should be a number greater than 0" });
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
    const userId = req.user.user_id;
    //console.log(userId)
    req.rechargeData = {amount, operator, mobileno, service, userId}
    next();
};


const dth_Recharge_fields_check = async (req, res, next) => {

    const { amount, operator, customerId } = req.body;

    if (!amount || !operator || !customerId ) {
        return res.status(400).json({ message: "All fields (amount, operator, customerId) are required" });
    }

    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ message: "Invalid amount should be a number greater than 0" });
    }

    const validOperators = ['ADT', 'SD', 'DTV', 'VDT'];
    if (!validOperators.includes(operator)) {
        return res.status(400).json({ message: `Invalid operator. Valid operators are: ${validOperators.join(', ')}` });
    }

    const customerIDRegex = /^[6-9]\d{8,12}$/;
    if (!customerIDRegex.test(customerId)) {
        return res.status(400).json({ message: "Invalid Customer ID. It should be a valid 8-12 Digit number " });
    }

    const userId = req.user.user_id;
    //console.log(userId)
    req.rechargeData = {amount, operator, customerId, userId}
    next();
};



module.exports = {
    Mobile_Recharge_fields_check,
    dth_Recharge_fields_check
};
