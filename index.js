const { isArrayLike, isArguments } = require('@jonkemp/package-utils');
const forEach = require('for-each-plus');

const flatten = (input, shallow, strict, output = []) => {
	let idx = output.length;

	forEach(input, value => {
		if (isArrayLike(value) && (Array.isArray(value) || isArguments(value))) {
			if (shallow) {
				let j = 0;
				const len = value.length;

				while (j < len) output[idx++] = value[j++];
			} else {
				flatten(value, shallow, strict, output);
				idx = output.length;
			}
		} else if (!strict) {
			output[idx++] = value;
		}
	});

	return output;
};

module.exports = (array, shallow) => flatten(array, shallow, false);
