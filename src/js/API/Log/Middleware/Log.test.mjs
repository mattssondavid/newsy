/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import chai from 'chai';
import tap from 'tap';
import sinon from 'sinon';
import { logToConsole } from './Log';

const { mocha } = tap;
const { expect } = chai;

const thunk = ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
        return action(dispatch, getState);
    }

    return next(action);
};

const create = () => {
    const store = {
        dispatch: sinon.spy(),
        getState: sinon.spy()
    };
    const next = sinon.spy();
    const invoke = action => thunk(store)(next)(action);

    return {
        invoke,
        next,
        store
    };
};

mocha.describe('Log middleware', () => {
    mocha.it('passes through non-function action', () => {
        const { next, invoke } = create();
        const action = { type: 'test' };
        invoke(action);
        expect(next.calledWith(action)).to.be.true;
    });

    mocha.it('calls the function', () => {
        const { invoke } = create();
        const fn = sinon.spy();
        invoke(fn);
        expect(fn.called).to.be.true;
    });

    mocha.it('passes dispatch and getState', () => {
        const { store, invoke } = create();
        invoke((dispatch, getState) => {
            dispatch('test');
            getState();
        });
        expect(store.dispatch.calledWith('test')).to.be.true;
        expect(store.getState.called).to.be.true;
    });

    mocha.it('can run logToConsole', () => {
        const { store, next } = create();
        const spied = sinon.spy(logToConsole);
        const invoke = action => spied(store)(next)(action);
        sinon.spy(console, 'log');
        invoke({ type: 'test' });
        expect(store.dispatch.notCalled).to.be.true;
        expect(store.getState.called).to.be.true;
        expect(next.calledWith({ type: 'test' })).to.be.true;
        expect(console.log.called).to.be.true;
        console.log.restore;
    });
});
