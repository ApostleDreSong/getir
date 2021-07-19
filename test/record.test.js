const request = require('supertest');
const app = require('../server');

describe('Records Endpoint "/records"', () => {
    it('should return all records determined by constraint with a code of "0"', async () => {
        const res = await request(app)
            .post('/records')
            .send({
                "startDate": "2016-01-26",
                "endDate": "2018-02-02",
                "minCount": 2700,
                "maxCount": 3000
            });
        expect(res.body.code).toEqual(0);
    });
    it('should return "Please key in the necessary parameter" when one of the parameters are missing', async () => {
        const res = await request(app)
            .post('/records')
            .send({
                "startDate": "2016-01-26",
                "minCount": 2700,
                "maxCount": 3000
            });
        expect(res.body.msg).toEqual("Please key in the necessary parameter");
    });
    it('should return "Minimum count value should not be greater than maximum count value" when a minimum count value greater than maximum count value is inputed', async () => {
        const res = await request(app)
            .post('/records')
            .send({
                "startDate": "2016-01-26",
                "endDate": "2018-02-02",
                "minCount": 3500,
                "maxCount": 3000
            });
        expect(res.body.msg).toEqual("Minimum count value should not be greater than maximum count value");
    });
    it('should return "start date should not be greater than end date" when a start date that is greater than end date is inputed', async () => {
        const res = await request(app)
            .post('/records')
            .send({
                "startDate": "2019-01-26",
                "endDate": "2018-02-02",
                "minCount": 2700,
                "maxCount": 3000
            });
        expect(res.body.msg).toEqual("start date should not be greater than end date");
    });
    it('should return "Date has to be in the format YYYY-MM-DD" when a start date or end date is not properly formatted', async () => {
        const res = await request(app)
            .post('/records')
            .send({
                "startDate": "2019-1-26",
                "endDate": "2018-02-02",
                "minCount": 2700,
                "maxCount": 3000
            });
        expect(res.body.msg).toEqual("Date has to be in the format YYYY-MM-DD");
    });
    it('should return "Count has to be an integer" when count minCount or maxCount is not a number', async () => {
        const res = await request(app)
            .post('/records')
            .send({
                "startDate": "2019-01-26",
                "endDate": "2018-02-02",
                "minCount": "2700",
                "maxCount": 3000
            });
        expect(res.body.msg).toEqual("Count has to be an integer");
    });
});