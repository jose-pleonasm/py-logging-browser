(function (exports, util, Formatter) {
	'use strict';

	var ua = window && window.navigator && window.navigator.userAgent;
	var isIE = ua.indexOf('MSIE') > -1 || ua.indexOf('Trident') > -1;

	/**
	 * @constructor DebugConsoleFormatter
	 * @extends Formatter
	 * @param {Object} [config]
	 */
	function DebugConsoleFormatter(config) {
		this._config = {
			style: {
				name: 'color: green'
			}
		};
	}
	util.inherits(DebugConsoleFormatter, Formatter);

	DebugConsoleFormatter.prototype.format = function(record) {
		var rels = [
			'name',
			'message',
		];
		var result = [];

		rels.forEach(function (key) {
			var value = !isIE && this._config.style[key]
				? this._makeStyled(record[key], this._config.style[key])
				: record[key];

			result = result.concat(value);
		}, this);

		//TODO: asctime

		if (record.error) {
			result = result.concat('\n', record.error);
		}

		return result;
	};

	DebugConsoleFormatter.prototype._makeStyled = function(value, style) {
		return ['%c' + value, style];
	};


	exports.DebugConsoleFormatter = DebugConsoleFormatter;
}(
	window['PyLogging'],
	window['PyLogging'].util,
	window['PyLogging'].Formatter
));
