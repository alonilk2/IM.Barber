module.exports = function imageIdMiddleware(req, res, next) {
  req.AWSImgId = -1;
  next();
}