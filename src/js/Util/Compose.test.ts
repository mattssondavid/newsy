
import chai from 'chai';
import compose from './Compose';

const { expect } = chai;

const add = (x: number) => (y: number) => x + y;
const multiply = (x: number) => (y: number) => x * y;

const add1 = add(1);
const mul2 = multiply(2);

describe('Compose', () => {
    it('can do f . g', () => {
        const h = compose(add1, mul2);
        const h2 = compose(mul2, add1);
        expect(h(2)).to.be.equal(5);
        expect(h2(2)).to.be.equal(6);
        expect(h(20) + 1).to.be.equal(42);
    });

    it('can do f . g . h', () => {
        const result = compose(
            (x: number) => x / 2,
            mul2,
            add1
        );
        expect(result(2)).to.be.equal(3);
    });
});
