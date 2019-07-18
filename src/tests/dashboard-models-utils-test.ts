import mocha from 'mocha';
let chai = require('chai');

describe('Hello function', () => {

  it('should return hello world', () => {
    const result = "Hello world!";
    chai.assert(result, 'Hello world!');
  });

});
