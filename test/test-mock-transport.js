var chai = require('chai').should(),
  nodemailer = require('nodemailer'),
  mockTransport = require('../index');

describe('mock-transport', function() {
  it('should store configuration options so that they can be asserted against', function() {
    var transport = mockTransport({
      foo: 'bar'
    });
    transport.options.foo.should.equal('bar');
  });

  it('should store emails sent with nodemailer, so that they can be asserted against', function() {
    var transport = mockTransport({
      foo: 'bar'
    });

    var transporter = nodemailer.createTransport(transport);

    transporter.sendMail({
      from: 'sender@address',
      to: 'receiver@address',
      subject: 'hello',
      text: 'hello world!'
    });

    transport.sentMail.length.should.equal(1);
    transport.sentMail[0].data.to.should.equal('receiver@address');
    transport.sentMail[0].message.content.should.equal('hello world!');
  });

  it('should return an error and not send an email if there is no `to` in the mail data object', function () {
    var transport = mockTransport({
      foo: 'bar'
    });

    var transporter = nodemailer.createTransport(transport);

    transporter.sendMail({
      from: 'sender@address',
      subject: 'hello',
      text: 'hello world!'
    });

    transport.sentMail.length.should.equal(0);
  });
});
