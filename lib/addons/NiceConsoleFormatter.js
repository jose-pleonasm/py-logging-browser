'use strict';

var ua = window && window.navigator && window.navigator.userAgent;
var isIE = ua.indexOf('MSIE') > -1 || ua.indexOf('Trident') > -1;

/**
 * @constructor NiceConsoleFormatter
 * @extends Formatter
 * @param {Object} [config]
 */
function NiceConsoleFormatter(config) {
	this._config = {
		style: {
			name: 'font-weight: bold; color: %(color);'
		}
	};

	/*this._colors = [
		'#4D0D26',
		'#922563',
		'#58598a',
		'#063c7b',
		'#116EBF',
		'#0e9472',
		'#fd3a0a',
		'#f7199b',
		'#8c2fe6',
		'#aa4b0d',
		'#6b460d',
		'#006666'
	];*/
	/*this._colors = [
		'#000066',
		'#006666',
		'#009966',
		'#330066',
		'#336666',
		'#339966',
		'#660066',
		'#663366',
		'#666666',
		'#669966',
		'#996666',
		'#999966'
	];*/
	this._colors = [
		'#404040',
		'#6DBDD6',
		'#B71427',
		'#9D8501',
		'#585858',
		'#118C4E',
		'#FF9009',
		'#9A2747',
		'#85A40C',
		'#265273',
		'#BF8E40',
		'#CC6666',
		'#133925',
		'#6668CC'
	];

	this._store = {};
}
util.inherits(NiceConsoleFormatter, lib.Formatter);

NiceConsoleFormatter.prototype.format = function(record) {
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
	if (record.data) {
		result.push(record.data);
	}
	if (record.error) {
		result = result.concat('\n', record.error);
	}

	return result;
};

NiceConsoleFormatter.prototype._makeStyled = function(key, value, style) {
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

NiceConsoleFormatter.prototype._getColor = function() {
	if (this._colors.length) {
		return this._colors.shift();
	}

	return '#'
		+ (0x1000000 + Math.random() * 0xffffff)
		.toString(16).substr(1,6);
};


exports.NiceConsoleFormatter = NiceConsoleFormatter;
