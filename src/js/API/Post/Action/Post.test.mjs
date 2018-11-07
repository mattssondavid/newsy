import chai from 'chai';
import tap from 'tap';
import { requestPost, REQUEST_POST } from './Post';

const { mocha } = tap;
const { expect } = chai;
mocha.describe('Action.Post', () => {
    mocha.it('creates an action for requesting post', () => {
        const expectedAction = {
            id: 1,
            type: REQUEST_POST
        };
        expect(requestPost(1)).to.deep.equal(expectedAction);
    });
});
