# nodemailer-mock-transport

[![Build Status](https://travis-ci.org/bcoe/nodemailer-mock-transport.png)](https://travis-ci.org/bcoe/nodemailer-mock-transport)
[![Coverage Status](https://coveralls.io/repos/bcoe/nodemailer-mock-transport/badge.svg?branch=)](https://coveralls.io/r/bcoe/nodemailer-mock-transport?branch=)

Mock nodemailer-transport, for testing services that rely on nodemailer.

```js
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
});
```
