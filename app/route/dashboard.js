const { Router } = require('express');
const {totalSales, totalPurchase} = require("../controller/dashboard");
const adminAuth = require("../middleware/adminAuth");
const router = Router();

router.get('/total_sales', adminAuth('Dashboard:total_sales'), totalSales)
router.get('/total_purchase', adminAuth('Dashboard:total_purchase'), totalPurchase)

module.exports = router;