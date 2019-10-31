import chai from 'chai';
import pipe from './Pipe';

const { expect } = chai;

const add = (x: number) => (y: number) => x + y;
const multiply = (x: number) => (y: number) => x * y;

describe('Pipe', () => {
    it('can do f . g', () => {
        const mul2 = multiply(2);
        const add1 = add(1);
        const h = pipe(add1, mul2);
        const h2 = pipe(mul2, add1);
        expect(h(2)).to.be.equal(6);
        expect(h2(2)).to.be.equal(5);
        expect(h2(20) + 1).to.be.equal(42);
    });

    it('can do f . g . h', () => {
        const result = pipe(
            add(2),
            multiply(4),
            (x: number) => x / 2
        );
        expect(result(2)).to.be.equal(8);
    });
});
