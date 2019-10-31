/**
 * Compose unary functions from left to right (pipe)
 *
 * @param {Function[]} fns The functions to pipe
 *
 * @returns {Function} the (composite as) pipe function
 */
 export default function pipe(...fns: Function[]): Function {
    return (initialValue: any) =>
        fns.reduce(
            (previousValue: any, currentFn) => currentFn(previousValue),
            initialValue
        );
}
