const bp = require('body-parser')
const express = require("express");
const errorHandler = require("./server/utils/errorHandler");
const router = require("./server/Services/users/user_index");
app = express()


app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use("/api", router);

app.all("*", (req, res, next) => {
    next(new AppError(`The URL ${req.originalUrl} does not exists`, 404));
});
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

module.exports = app;
