var py_logging_$exports = null;

if (typeof window === 'object' && window) {
	if (window.py_logging) {
		throw new Error('Variable "py_logging" is already in use.');
	}

	py_logging_$exports = window.py_logging = {};

} else if (typeof module === 'object' && module && module.exports) {
	py_logging_$exports = module.exports;

} else {
	throw new Error('Unsupported platform.');
}

(function (exports) {
<%= content %>
}(py_logging_$exports));