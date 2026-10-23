const expense = require('express')
const router = expense.Router();
const {getReports}=require('../controllers/reports.controller');


router.get('/',getReports);

module.exports = router;
