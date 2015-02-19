var packageData = require('./package.json');

var MockTransport = function(options) {
  this.options = options || {};
  this.sentMail = [];
  this.name = 'Mock';
  this.version = packageData.version;
};

MockTransport.prototype.send = function(mail, callback) {
  if (!mail.data.to) {
    return callback(new Error('I need to know who this email is being sent to :-('));
  }

  this.sentMail.push(mail);
  return callback();
};

module.exports = function(options) {
  return new MockTransport(options);
};
