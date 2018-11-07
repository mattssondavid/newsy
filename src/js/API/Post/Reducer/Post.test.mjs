import chai from 'chai';
import tap from 'tap';
import {
    REQUEST_POST,
    RECEIVE_POST,
    REQUEST_POST_ERROR
} from '../Action/Post.mjs';
import { postReducer } from './Post.mjs';

const mocha = tap.mocha;
const expect = chai.expect;

mocha.describe('Reducer.Post', () => {
    mocha.it('can reduce a RECEIVED post', () => {
        expect(
            postReducer(
                null,
                {
                    type: RECEIVE_POST,
                    payload: {
                        id: 1
                    }
                }
            )
        ).to.deep.equal(
            {
                id: 1,
                isFetching: false
            }
        );
    });
});
