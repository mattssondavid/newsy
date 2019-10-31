/**
 * Compose unary functions from right to left
 *
 * @param {Function[]} fns The functions to compose
 *
 * @returns {Function} the composite function
 */
export default function compose (...fns: Function[]): Function {
    return (initialValue: any) =>
        fns.reduceRight(
            (previousValue: any, currentFunction) => currentFunction(previousValue),
            initialValue
        );
}
