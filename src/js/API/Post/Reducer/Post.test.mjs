import chai from 'chai';
import tap from 'tap';
import {
    REQUEST_POST,
    RECEIVE_POST,
    REQUEST_POST_ERROR
} from '../Action/Post.mjs';
import { postReducer } from './Post.mjs';

const { mocha } = tap;
const { expect } = chai;
mocha.describe('Reducer.Post', () => {
    mocha.it('can reduce a RECEIVED post', () => {
        expect(
            postReducer(
                null,
                {
                    payload: {
                        id: 1
                    },
                    type: RECEIVE_POST
                }
            )
        ).to.deep.equal(
            {
                id: 1,
                isFetching: false
            }
        );

        expect(
            postReducer(
                {
                    isFetching: true,
                    test: 'ok'
                },
                {
                    payload: {
                        id: 1
                    },
                    type: RECEIVE_POST
                }
            )
        ).to.deep.equal(
            {
                id: 1,
                isFetching: false,
                test: 'ok'
            }
        );
    });

    mocha.it('can reduce a REQUEST post', () => {
        expect(
            postReducer(
                null,
                {
                    id: 1,
                    type: REQUEST_POST
                }
            )
        ).to.deep.equal(
            {
                isFetching: true
            }
        );
    });

    mocha.it('can reduce a REQUEST post ERROR', () => {
        expect(
            postReducer(
                null,
                {
                    payload: {
                        message: 'world',
                        name: 'hello'
                    },
                    type: REQUEST_POST_ERROR
                }
            )
        ).to.deep.equal(
            {
                error: {
                    message: 'world',
                    status: 'hello'
                },
                isFetching: false
            }
        );
    });
});
