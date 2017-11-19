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
			name: 'font-weight: bold;'
		}
	};

	this._colors = [
		'#4D0D26',
		'#6b460d',
		'#922563',
		'#58598a',
		'#063c7b',
		'#116EBF',
		'#037215',
		'#fd3a0a',
		'#8c2fe6',
		'#aa4b0d',
		'#f7199b',
		'#0e9472'
	];

	this._store = {};
}
util.inherits(DebugConsoleFormatter, lib.Formatter);

DebugConsoleFormatter.prototype.format = function(record) {
	var rels = [
		'name',
		'message',
	];
	var result = [];

	rels.forEach(function (key) {
		var value = !isIE && this._config.style[key]
			? this._makeStyled(key, record[key], this._config.style[key])
			: record[key];

		result = result.concat(value);
	}, this);

	//TODO: asctime
	if (record.data && Array.isArray(record.data)) {
		result.push(record.data);
	}
	if (record.error) {
		result = result.concat('\n', record.error);
	}

	return result;
};

DebugConsoleFormatter.prototype._makeStyled = function(key, value, style) {
	if (style.indexOf('%(color)') > -1) {
		var storeKey = key + value;
		var storeValue = this._store[storeKey];

		if (!storeValue) {
			storeValue = this._getColor();
			this._store[storeKey] = storeValue;
		}

		style = style.replace('%(color)', storeValue);
	}
	return ['%c' + value, style];
};

DebugConsoleFormatter.prototype._getColor = function() {
	if (this._colors.length) {
		return this._colors.shift();
	}

	return '#'
		+ (0x1000000 + Math.random() * 0xffffff)
		.toString(16).substr(1,6);
};


exports.DebugConsoleFormatter = DebugConsoleFormatter;
