const assert = require('assert');
const flat = require('./');

describe('flat', () => {
	it('should flatten nested arrays to any depth', () => {
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

		const arr6 = flat([1, [2], [3, [[4]]]]);
		assert(arr6);
		assert.deepEqual(arr6, [1, 2, 3, 4]);

		const arr7 = flat([1, [2, [3, [4]], 5]]);
		assert(arr7);
		assert.deepEqual(arr7, [1, 2, 3, 4, 5]);
	});

	it('should flatten nested arrays one level', () => {
		const arr1 = flat([1, [2], [3, [[4]]]], true);
		assert(arr1);
		assert.deepEqual(arr1, [1, 2, 3, [[4]]]);

		const arr2 = flat([1, [2, [3, [4]], 5]], true);
		assert(arr2);
		assert.deepEqual(arr2, [1, 2, [3, [4]], 5]);
	});
});
