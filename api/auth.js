// Authentication with key
exports.checkAuth = function (req, res) {
    if (typeof req.body.authKey == "undefined" || req.body.authKey == "") {
        res.status(403);
        res.send({"error" : "Authentication failed"});
        return false;
    } else {
        return true;
    }
}