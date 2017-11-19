if (!window.PyLogging) {
	throw new Error('There isn\'t PyLogging library.');
}
(function (exports, lib, util) {
<%= content %>
}(window.PyLogging, window.PyLogging, window.PyLogging._util));