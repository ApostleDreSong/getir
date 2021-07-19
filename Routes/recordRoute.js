var express = require('express');
const router = express.Router();
const records = require("../Models/records");
const moment = require("moment");

router.post('/', async (req, res) => {
    const { startDate, endDate, minCount, maxCount } = req.body;

    let start = new Date(startDate);
    let end = new Date(endDate);
    //Missing Parameter Validation
    if (!startDate || !endDate || !minCount || !maxCount) {
        code = 1;
        msg = "Please key in the necessary parameter";
        let result = {
            code: code,
            msg: msg
        }
        return res.status(200).send(result);
    }
    //Date Format Validation
    if (!moment(startDate, 'YYYY-MM-DD', true).isValid() || !moment(endDate, 'YYYY-MM-DD', true).isValid()) {
        code = 2;
        msg = "Date has to be in the format YYYY-MM-DD";
        let result = {
            code: code,
            msg: msg
        }
        return res.status(200).send(result);
    }
    //Count Type Validation
    if (typeof (minCount) !== 'number' || typeof (maxCount) !== 'number' ) {
        code = 3;
        msg = "Count has to be an integer";
        let result = {
            code: code,
            msg: msg
        }
        return res.status(200).send(result);
    }
    //Count Validation
    if (minCount > maxCount) {
        code = 4;
        msg = "Minimum count value should not be greater than maximum count value";
        let result = {
            code: code,
            msg: msg
        }
        return res.status(200).send(result);
    }
    //Date Validation
    if (start > end) {
        code = 5;
        msg = "start date should not be greater than end date";
        let result = {
            code: code,
            msg: msg
        }
        return res.status(200).send(result);
    }

    const pipeline = [
        {
            $match: { createdAt: { $gte: start, $lte: end } }
        },
        {
            $project: {
                _id: 0,
                key: 1,
                createdAt: 1,
                totalCount: { "$sum": "$counts" },
            }
        },
        {
            $match: { totalCount: { $lte: maxCount, $gte: minCount } }
        }
    ]
    let response = await records.aggregate(pipeline);
    let result = {
        code: 0,
        msg: "Success",
        records: response
    }
    return res.status(200).send(result);
});

module.exports = router;