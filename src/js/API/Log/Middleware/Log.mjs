/* eslint-disable no-console */
/**
 * @param {Redux} store A Redux store
 *
 * @returns {Function} A `next` function
 */
export const logToConsole = store => next => action => {
    console.group(action.type);
    console.log('Previous state', store.getState());
    console.info('Action', action);
    // eslint-disable-next-line callback-return
    const result = next(action);
    console.log('Next state', store.getState());
    console.groupEnd();

    return result;
};
