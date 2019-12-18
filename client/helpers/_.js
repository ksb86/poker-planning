export const _get = fn => {
    try {
        return fn();
    } catch (e) {
        return undefined;
    }
};
