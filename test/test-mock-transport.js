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
      from: 'sender@address.com',
      to: 'receiver@address.com',
      subject: 'hello',
      text: 'hello world!'
    });

    transport.sentMail.length.should.equal(1);
    transport.sentMail[0].data.to.should.equal('receiver@address.com');
    transport.sentMail[0].message.content.should.equal('hello world!');
  });

  it('should return an error and not send an email if there is no `to` in the mail data object', function () {
    var transport = mockTransport({
      foo: 'bar'
    });

    var transporter = nodemailer.createTransport(transport);

    transporter.sendMail({
      from: 'sender@address.com',
      subject: 'hello',
      text: 'hello world!'
    });

    transport.sentMail.length.should.equal(0);
  });

  it('should return an error and not send an email if the `to` email address is invalid', function () {
    var transport = mockTransport({
      foo: 'bar'
    });

    var transporter = nodemailer.createTransport(transport);

    transporter.sendMail({
      to: 'lolbad@email',
      from: 'sender@address.com',
      subject: 'hello',
      text: 'hello world!'
    });

    transport.sentMail.length.should.equal(0);
  });

  it('should allow "to" to be an array of addresses', function(){
    var transport = mockTransport({
      foo: 'bar'
    });
    var transporter = nodemailer.createTransport(transport);
    var to = ['receiver@address.com','receiver2@address.com']; 
    transporter.sendMail({
      from: 'sender@address.com',
      to: to,
      subject: 'hello',
      text: 'hello world!'
    });
    transport.sentMail.length.should.equal(1);
    transport.sentMail[0].data.to.should.eql(to);
    transport.sentMail[0].message.content.should.equal('hello world!');

  });
  it('should not send an email if "to" is array and element isn\'t valid', function(){
    var transport = mockTransport({
      foo: 'bar'
    });
    var transporter = nodemailer.createTransport(transport);
    var to = ['receiver@address.com', 34]; 
    transporter.sendMail({
      from: 'sender@address.com',
      to: to,
      subject: 'hello',
      text: 'hello world!'
    });
    transport.sentMail.length.should.equal(0);

  });
});
