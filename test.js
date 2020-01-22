const assert = require('assert');
const flat = require('./');

describe('flat', () => {
    it('should flatten nested arrays', () => {
		const arr1 = flat([1, 2, [3, 4]]);
        assert(arr1);
		assert.deepEqual(arr1, [1, 2, 3, 4]);

		const arr2 = flat([1, 2, [3, 4, [5, 6]]]);
		assert(arr2);
		assert.deepEqual(arr2, [1, 2, 3, 4, 5, 6]);

		const arr3 = flat([1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]]);
		assert(arr3);
		assert.deepEqual(arr3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

		const arr4 = flat([1, [2, [3, [4, [5], 6], 7], 8], 9]);
		assert(arr4);
		assert.deepEqual(arr4, [1, 2, 3, 4, 5, 6, 7, 8, 9]);

		const arr5 = flat([[1, 2], [3, 4]]);
        assert(arr5);
		assert.deepEqual(arr5, [1, 2, 3, 4]);
    });
});
