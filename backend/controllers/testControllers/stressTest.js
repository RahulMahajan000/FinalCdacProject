const now = require("performance-now");
const axios = require("axios");

class StressTestController {
  static async stressTest(req, res) {
    const url = req.body.url || "https://www.w3schools.com/";
    const numRequests = 60 || req.body.numRequests;
    let times = [];
    let requests = [];

    for (let i = 0; i < numRequests; i++) {
      let start = now();
      requests.push(
        axios
          .get(url)
          .then(function (response) {
            let end = now();
            times.push({ request: i + 1, time: (end - start).toFixed(2) });
          })
          .catch(function (error) {
            console.log(error);
          })
      );
    }

    await Promise.all(requests);

    let sum = times.reduce((a, b) => a.time + b.time, 0);
    let avg = sum / times.length || 0;
    let result = {
      averageResponseTime: avg.toFixed(2),
      requests: times,
    };

    res.json(result);
  }
}

module.exports = StressTestController;
