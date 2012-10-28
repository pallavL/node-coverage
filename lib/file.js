/**
 * This module has generic utilities to handle files, their name and their content
 *
 * It exports
 *    filterUnwanted -> From an array of paths return only non excluded files
 *    wanted -> Wheter a file is wanted or not according to a filtering array
 *    isInstrumented -> Whether or not the code is already instrumented
 *    markInstrumented -> Mark the code as already instrumented
 */

/**
 * Return an array containing only non excluded files.
 * Every file starting with one of the patterns in exclude will be excluded
 * It relies on the assumption that folder names end with '/'
 *
 * @param {Array} files Original list of paths (files and folders)
 * @param {Array|String} exclude List of starting paths to be excluded
 */
exports.filterUnwanted = function (files, exclude) {
	return files.filter(function (name) {
		// No folders
		if (name.charAt(name.length - 1) === "/") {
			return false;
		}
		if (typeof exclude === "string") {
			exclude = [exclude];
		}

		return wanted(name, exclude);
	});
};

/**
 * Whether a single file should be excluded or not.
 *
 * @param {String} file File to be checked
 * @param {Array} exclude List of starting paths to be excluded
 */
exports.wanted = wanted = function (file, exclude) {
	for (var i = 0, len = exclude.length; i < len; i += 1) {
		if (file.indexOf(exclude[i]) === 0) {
			return false;
		}
	}
	return true;
};


/**
 * Fist line of the generated file, it avoids instrumenting the same file twice
 */
var header = "//NODE-COVERAGE OFF\n";

/**
 * Whether the file is already instrumented or not
 *
 * @param {String} code File content
 */
exports.isInstrumented = function (code) {
	return (code.indexOf(header) === 0);
}

/**
 * Mark the code as already instrumented adding a specific header
 *
 * @param {String} code File content
 */
exports.markInstrumented = function (code) {
	return header + code;
}