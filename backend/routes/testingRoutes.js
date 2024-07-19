const express = require("express");
const router = express.Router();
const { checkSSLCertificate } = require("../controllers/testControllers/ssl");
const {
  measurePerformanceMetrics,
} = require("../controllers/testControllers/performance");
const { checkPageLoad } = require("../controllers/testControllers/page");
const { checkLinks } = require("../controllers/testControllers/linkCheck");
const { checkImg } = require("../controllers/testControllers/imageCheck");
const { checkLoadTime } = require("../controllers/testControllers/checkLoad");
const {
  checkPerformance,
} = require("../controllers/testControllers/performanceController");
const XSSController = require("../controllers/testControllers/security/xss");
const CSRFController = require("../controllers/testControllers/security/csrf");
const StressTestController = require("../controllers/testControllers/stressTest");
const {
  checkResponsiveness,
} = require("../controllers/testControllers/compatibility/deviceCheck");
const {
  checkReadability,
} = require("../controllers/testControllers/compatibility/readCompatibility");
const {
  checkCompatibility,
} = require("../controllers/testControllers/compatibility/compatibility");

router.get("/ssl", checkSSLCertificate);
router.get("/performance", measurePerformanceMetrics);
router.get("/linkCheck", checkLinks);
router.get("/images", checkImg);
router.get("/checkLoadTime", checkLoadTime);
router.get("/perform", checkPerformance);
router.get("/performance", measurePerformanceMetrics);
router.get("/xss", XSSController.checkXSS);
router.get("/csrf", CSRFController.checkCSRF);
router.get("/stress", StressTestController.stressTest);
router.get("/deviceCheck", checkResponsiveness);
router.get("/readCompatibility", checkReadability);
router.get("/checkCompatibility", checkCompatibility);
module.exports = router; // Corrected "module.exports"
