/*
All thests should be in this file..
*/

// Test
import {hello} from './test';
import chai from 'chai';
import tap from 'tap';
const mocha = tap.mocha;
const expect = chai.expect;

mocha.describe('test', () => {
    mocha.it('works', () => {
        expect(hello).to.equal('hello world');
    });
});