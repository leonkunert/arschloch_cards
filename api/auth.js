// Authentication with key
exports.checkAuth = function (req, res) {
    if (typeof req.body.authKey == "undefined" || req.body.authKey == "") {
        res.send({"error": "Authentication failed"});
    }
}