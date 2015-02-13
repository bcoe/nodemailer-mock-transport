var packageData = require('./package.json');

var MockTransport = function(options) {
  this.options = options || {};
  this.sentMail = [];
  this.name = 'Mock';
  this.version = packageData.version;
};

MockTransport.prototype.send = function(mail, callback) {
  this.sentMail.push(mail);
  return callback();
};

module.exports = function(options) {
  return new MockTransport(options);
};
