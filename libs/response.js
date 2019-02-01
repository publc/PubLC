const Response = function(res) {
  this.res = res;
};

Response.prototype.error = function() {
  return this.res.status(500).json({
    message: 'Internal Server Error',
  });
};

Response.prototype.notFound = function() {
  return this.res.status(404).json({
    code: 1,
    message: 'Resource you try to access is not found',
  });
};

Response.prototype.success = function(data) {
  return this.res.status(200).json({
    code: 1,
    message: 'OK',
    data,
  });
};

module.exports = Response;
