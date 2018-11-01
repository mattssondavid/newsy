export const logToConsole = store => next => action => {
    console.group(action.type);
    console.log('Previous state', store.getState());
    console.info('Action', action);
    const result = next(action);
    console.log('Next state', store.getState());
    console.groupEnd();
    return result;
};
