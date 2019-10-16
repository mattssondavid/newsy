import chai from 'chai';
import tap from 'tap';
const mocha = tap.mocha;
const expect = chai.expect;

const hello = 'hello world';

mocha.describe('test', () => {
    mocha.it('works', () => {
        expect(hello).to.equal('hello world');
    });
});
