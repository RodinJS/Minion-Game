/**
 * Linearly interpolates between two numbers,
 * if given objects goes through them recursively
 * and does the same for all numerical values.
 * Non numerical values of objects are directly assigned
 * @param {Number|Object} a
 * @param {Number|Object} b
 * @param {Number} v
 * @returns {Number|Object}
 */
export const lerp = (a, b, v) => {
    if (typeof a === 'object') {
        const res = {};
        for (let i in a) {
            if (typeof a[i] !== 'object' && typeof a[i] !== 'number') {
                res[i] = b;
                continue;
            }
            res[i] = lerp(a[i], b[i], v);
        }
        return res;
    }

    return a + (b - a) * v;
};