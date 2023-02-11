const express = require("express");

const router = express.Router();
const controllers = require("./user_controller");

router.route("/users/doctors").get(controllers.getDoctor)

router.route("/users/patient").get(controllers.getPatient)

router.route("/users/reservation").get(controllers.getReserveInfo)
    .post(controllers.addReserve)
module.exports = router;