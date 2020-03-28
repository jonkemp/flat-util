/* global flatten */
const { assert } = chai;

mocha.setup('bdd');
mocha.checkLeaks();

const range = (start, stop, step) => {
	if (stop == null) {
		stop = start || 0;
		start = 0;
	}
	if (!step) {
		step = stop < start ? -1 : 1;
	}

	const length = Math.max(Math.ceil((stop - start) / step), 0);
	const range = Array(length);

	for (let idx = 0; idx < length; idx++, start += step) {
		range[idx] = start;
	}

	return range;
};

describe('flatten', () => {
	it('supports null', () => {
		assert.deepEqual(flatten(null), []);
	});

	it('supports undefined', () => {
		assert.deepEqual(flatten(void 0), []);
	});

	it('supports empty arrays', () => {
		assert.deepEqual(flatten([[], [[]], []]), []);
	});

	it('can shallowly flatten empty arrays', () => {
		assert.deepEqual(flatten([[], [[]], []], true), [[]]);
	});

	it('can flatten nested arrays', () => {
		const list = [1, [2], [3, [[[4]]]]];

		assert.deepEqual(flatten(list), [1, 2, 3, 4]);
	});

	it('can shallowly flatten nested arrays', () => {
		const list = [1, [2], [3, [[[4]]]]];

		assert.deepEqual(flatten(list, true), [1, 2, 3, [[[4]]]]);
	});

	it('works on an arguments object', () => {
		const result = (function(){ return flatten(arguments); }(1, [2], [3, [[[4]]]]));

		assert.deepEqual(result, [1, 2, 3, 4]);
	});

	it('can shallowly flatten arrays containing only other arrays', () => {
		const list = [[1], [2], [3], [[4]]];

		assert.deepEqual(flatten(list, true), [1, 2, 3, [4]]);
	});

	it('can flatten medium length arrays', () => {
		assert.strictEqual(flatten([range(10), range(10), 5, 1, 3], true).length, 23);
	});

	it('can shallowly flatten medium length arrays', () => {
		assert.strictEqual(flatten([range(10), range(10), 5, 1, 3]).length, 23);
	});

	it('can flatten array with nulls of size n', () => {
		assert.strictEqual(flatten([new Array(10)]).length, 10);
	});

	it('can handle massive arrays', () => {
		assert.strictEqual(flatten([new Array(1000000), range(56000), 5, 1, 3]).length, 1056003);
	});

	it('can handle massive arrays in shallow mode', () => {
		assert.strictEqual(flatten([new Array(1000000), range(56000), 5, 1, 3], true).length, 1056003);
	});

	it('can handle very deep arrays', () => {
		let x = range(100000);

		for (let i = 0; i < 1000; i++) x = [x];
		assert.deepEqual(flatten(x), range(100000));
	});

	it('can handle very deep arrays in shallow mode', () => {
		let x = range(100000);

		for (let i = 0; i < 1000; i++) x = [x];
		assert.deepEqual(flatten(x, true), x[0]);
	});
});

mocha.run();
