exports.getUserInfo = () => {
    return `
    SELECT * FROM user_role;`
}

exports.getDoctorInfo = () => {
    return `
    SELECT *
        FROM users u
        inner join user_role ur on u.id = ur.USER_ID
    where ur.ROLE_ID = 2;`
}
exports.getPatientInfo = () => {
    return `
    SELECT *
    FROM users u
        inner join user_role ur on u.id=ur.USER_ID
    where ur.ROLE_ID=1;`
}

exports.addReserve = (userId, doctorId) => {    
    const a= `
    INSERT INTO reservation (PATIENT_ID, DOCTOR_ID) VALUES ('${userId}', '${doctorId}');`    
    return a
}
exports.getReserveInfo = () => {
    return `
    SELECT * FROM reservation;`
}

exports.checkReservation = (doctorId, patientId) => {
    return `
     SELECT  t.CAPACITY,t.ID
    FROM turn t
    left join reservation r on t.DOCTOR_ID=r.DOCTOR_ID
    where t.doctor_id=${doctorId}
    and t.capacity > 0
    LIMIT 1;`
}


exports.updateCapacity = (doctorId, value,id) => {
    return `
    UPDATE turn SET CAPACITY = '${value}' WHERE (DOCTOR_ID = '${doctorId}' and id=${id});`     
}

exports.countUsers = (userId) => {
    return `
    SELECT count(*) CNT FROM reservation where PATIENT_ID=${userId}`    
}

