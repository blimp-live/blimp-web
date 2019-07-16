import mocha from 'mocha';
import {assert} from 'chai';

describe('Hello function', () => {

  it('should return hello world', () => {
    const result = "Hello world!";
    assert(result, 'Hello world!');
  });

});
