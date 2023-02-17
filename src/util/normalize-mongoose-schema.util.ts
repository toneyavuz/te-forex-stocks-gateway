const normalizeMongoose = schema => {
	const {
		normalizeId,
		removeVersion,
		removePrivatePaths,
		toJSON = {},
	} = schema.options;

	const json = {
		transform(doc, returnValue, options) {
			if (!removePrivatePaths) {
				const {paths} = schema;

				for (const path in paths) {
					if (paths[path].options && paths[path].options.private && returnValue[path]) {
						delete returnValue[path];
					}
				}
			}

			if (!removeVersion) {
				const {__v} = returnValue;

				if (!__v) {
					delete returnValue.__v;
				}
			}

			if (!normalizeId) {
				const {_id, id} = returnValue;

				if (_id && !id) {
					returnValue.id = _id.toString();
					delete returnValue._id;
				}
			}

			if (toJSON.transform) {
				return toJSON.transform(doc, returnValue, options);
			}
		},
	};

	schema.options.toJSON = {...toJSON, ...json};
};

export {normalizeMongoose};