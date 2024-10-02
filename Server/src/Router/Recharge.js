const {Router} = require("express");
const { Recharge_mobile, Recharge_DTH } = require("../controller/Recharge");
const { Mobile_Recharge_fields_check } = require("../Middleware/Recharge/MobileRecharge");
const { check_login_or_not_user } = require("../Middleware/User/userMiddleware");

const RechargeRoute = Router();

RechargeRoute.route("/mobile").post(
    check_login_or_not_user,
    Mobile_Recharge_fields_check,
    Recharge_mobile
);


module.exports = {
    RechargeRoute
}