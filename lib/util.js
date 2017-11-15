(function (exports) {
	'use strict';

	function inherits(child, parent) {
		child.prototype = Object.create(parent.prototype);
		child.prototype.constructor = child;
	}


	exports.util = {
		inherits: inherits
	};
}(window['PyLogging']));