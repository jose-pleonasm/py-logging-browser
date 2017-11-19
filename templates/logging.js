if (window.PyLogging) {
	throw new Error('Variable "PyLogging" is already in use.');
}
(function (exports) {
<%= content %>
}(window.PyLogging = {}));