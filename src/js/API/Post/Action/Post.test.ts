import chai from 'chai';
import { requestPost, REQUEST_POST } from './Post.js';
/* Global methods: describe, it */

const { expect } = chai;
describe('Action.Post', () => {
    it('creates an action for requesting post', () => {
        const expectedAction = {
            id: 1,
            type: REQUEST_POST
        };
        expect(requestPost(1)).to.deep.equal(expectedAction);
    });
});
