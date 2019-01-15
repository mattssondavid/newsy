/* eslint-disable no-undef */
import chai from 'chai';
import sinon from 'sinon';
import { RECEIVE_POST } from '../Action/Post.mjs';
import { convertImgTagToProgressiveImgTag } from './Post.mjs';
/* Global methods: describe, it */

const { expect } = chai;

const create = () => {
    const store = {
        dispatch: sinon.spy(),
        getState: sinon.stub().returns({})
    };
    const next = sinon.spy();
    const spied = sinon.spy(convertImgTagToProgressiveImgTag);
    const invoke = action => spied(store)(next)(action);

    return {
        invoke,
        next,
        spied,
        store
    };
};

describe('Middleware.Post', () => {
    describe('Middleware to replace <img> with <progressive-img>', () => {
        it('passes through non-targed action', () => {
            const { invoke, next, spied, store } = create();
            const nonTargetedAction = {
                payload: {
                    content: {
                        rendered: 'contento'
                    },
                    excerpt: {
                        rendered: 'excerpto'
                    }
                },
                type: 'non-targeted'
            };
            invoke(nonTargetedAction);
            expect(spied.called).to.be.true;
            expect(store.dispatch.notCalled).to.be.true;
            expect(store.getState.notCalled).to.be.true;
            expect(next.calledOnceWith(nonTargetedAction)).to.be.true;
        });

        it('can skip if content does not exist as payload property', () => {
            const { invoke, next, spied, store } = create();
            const action = { type: RECEIVE_POST };
            invoke(action);
            expect(spied.called).to.be.true;
            expect(store.dispatch.notCalled).to.be.true;
            expect(store.getState.notCalled).to.be.true;
            expect(next.calledOnceWith(action)).to.be.true;
        });

        it('does not change content if given as payload property but does not contain <img>', () => {
            const { invoke, next, spied, store } = create();
            const action = {
                payload: {
                    content: {
                        rendered: 'contento'
                    },
                    excerpt: {
                        rendered: 'excerpto'
                    }
                },
                type: RECEIVE_POST
            };
            invoke(action);
            expect(spied.called).to.be.true;
            expect(store.dispatch.notCalled).to.be.true;
            expect(store.getState.notCalled).to.be.true;
            expect(next.calledOnceWithExactly(action)).to.be.true;
        });

        it('changes content if given as payload property and contains <img>', () => {
            const { invoke, next, spied, store } = create();
            const action = {
                payload: {
                    content: {
                        rendered: 'contento <img src="test">'
                    },
                    excerpt: {
                        rendered: 'excerpto <img src="test2" />'
                    }
                },
                type: RECEIVE_POST
            };
            const expectedNextAction = {
                payload: {
                    content: {
                        rendered: 'contento <progressive-img src="test"></progressive-img>'
                    },
                    excerpt: {
                        rendered: 'excerpto <progressive-img src="test2" ></progressive-img>'
                    }
                },
                type: RECEIVE_POST
            };
            invoke(action);
            expect(spied.called).to.be.true;
            expect(store.dispatch.notCalled).to.be.true;
            expect(store.getState.notCalled).to.be.true;
            expect(next.calledOnceWithExactly(expectedNextAction)).to.be.true;
        });
    });
});
