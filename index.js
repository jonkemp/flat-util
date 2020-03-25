const shallowProperty = key => obj => obj == null ? void 0 : obj[key];
const MAX_ARRAY_INDEX = 2 ** 53 - 1;
const getLength = shallowProperty('length');
const isArrayLike = (collection) => {
	const length = getLength(collection);

	return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};
const isArguments = obj => toString.call(obj) === '[object Arguments]';
const isObject = obj => {
	const type = typeof obj;

	return type === 'function' || type === 'object' && !!obj;
};
const optimizeCb = (func, context, argCount) => {
	if (context === void 0) return func;
	switch (argCount == null ? 3 : argCount) {
		case 1: return value => func.call(context, value);
			// The 2-argument case is omitted because we’re not using it.
		case 3: return (value, index, collection) => func.call(context, value, index, collection);
		case 4: return (accumulator, value, index, collection) => func.call(context, accumulator, value, index, collection);
	}

	return (...args) => func.apply(context, args);
};
const getKeys = (obj) => {
	if (!isObject(obj)) return [];

	return Object.keys(obj);
};
const forEach = (obj, iteratee, context) => {
	iteratee = optimizeCb(iteratee, context);
	if (isArrayLike(obj)) {
		let i = 0;

		for (const item of obj) {
			iteratee(item, i++, obj);
		}
	} else {
		const keys = getKeys(obj);

		for (const key of keys) {
			iteratee(obj[key], key, obj);
		}
	}

	return obj;
};

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
