const isArrayLike = require('./lib/is-array-like');

const isArguments = obj => toString.call(obj) === '[object Arguments]';

const flatten = (input, shallow, strict, output = []) => {
	let idx = output.length;
	input.forEach(value => {
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
