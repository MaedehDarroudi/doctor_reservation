const connection = require("../db");
const boom = require("boom")
const queries = require("../../queries/user.queries");

exports.getDoctor = (req, res, next) => {
    connection.query(queries.getDoctorInfo(), function (err, data, fields) {
        if (err) return next(boom.badRequest(err))
        res.status(200).json({
            status: "success",
            length: data?.length,
            data: data,
        });
    });
}


exports.getPatient = (req, res, next) => {
    connection.query(queries.getPatientInfo(), function (err, data, fields) {
        if (err) return next(boom.badRequest(err))
        res.status(200).json({
            status: "success",
            length: data?.length,
            data: data,
        });
    });
}

exports.getReserveInfo = (req, res, next) => {
    connection.query(queries.getReserveInfo(), function (err, data, fields) {
        if (err) return next(boom.badRequest(err))
        res.status(200).json({
            status: "success",
            length: data?.length,
            data: data,
        });
    });
}

exports.addReserve = async (req, res, next) => {
    connection.query(queries.countUsers(req.body.userId), (err, data) => {
        if (err) throw err;
        if (data && data[0] && data[0].CNT < 1) {
            connection.query(queries.checkReservation(req.body.doctorId, req.body.userId), (err, data) => {
                if (err) throw err;
                if (data && data[0] && data[0].CAPACITY) {

                    connection.query(queries.addReserve(req.body.userId, req.body.doctorId), (err, result) => {
                        if (err) boom.badRequest(err);

                        connection.query(queries.updateCapacity(req.body.doctorId, data[0].CAPACITY - 1, data[0].ID), (err, result) => {
                            if (err) boom.badRequest(err);
                        });
                    })
                    res.status(200).json(
                        { status: "Reservation successful" });
                } else
                    res.status(200).json(
                        { status: "No available slots for this Doctor" });
            });
        }
        else {
            res.status(200).json(
                { status: "No available slots for this Doctor" });
        }
    })
}

