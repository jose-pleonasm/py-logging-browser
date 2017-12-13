var py_logging_$lib = null;
var py_logging_$addon_exports = null;
var py_logging_$util = null;

if (typeof window === 'object' && window) {
	if (!window.py_logging) {
		throw new Error('There isn\'t py_logging variable.');
	}

	py_logging_$lib = py_logging_$addon_exports = window.py_logging;
	py_logging_$util = window.py_logging._util;

} else if (typeof require === 'function') {
	py_logging_$lib = require('./logging');
	py_logging_$addon_exports = module.exports;
	py_logging_$util = require('util');
}

(function (exports, lib, util) {
<%= content %>
}(py_logging_$addon_exports, py_logging_$lib, py_logging_$util));