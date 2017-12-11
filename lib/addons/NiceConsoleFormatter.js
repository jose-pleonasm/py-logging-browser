'use strict';

/**
 * @constructor NiceConsoleFormatter
 * @extends Formatter
 * @param {string} [format]
 * @param {string} [timeFormat]
 */
function NiceConsoleFormatter(format, timeFormat) {
	format = format || '%(name)-s %(message)-s';
	timeFormat = timeFormat || '%H:%M:%S';

	lib.Formatter.call(this, format, timeFormat);

	this._compiledFormat = compile(format);
}
util.inherits(NiceConsoleFormatter, lib.Formatter);

NiceConsoleFormatter.prototype.format = function(record) {
	var re = new RegExp(
		lib.Formatter.FORMAT_PATTERN.source,
		lib.Formatter.FORMAT_PATTERN.flags
	);
	var item = [];
	var s = this._compiledFormat;
	var data = [];

	while ((item = re.exec(this._format)) !== null) {
		var match = item[0];
		var key = item[1];
		var flag = item[2] || '';
		var width = item[3] || NaN;
		var precision = item[4] || NaN;
		var type = item[5] || 's';

		data.push(this._getValue(record, key, flag, width, precision, type));
	}

	if (record.error) {
		s = s + '%o';
		data.push(record.error);
	}

	return [s].concat(data);
};

NiceConsoleFormatter.prototype._getValue = function(record, key,
                                                    flag, width, precision, type) {
	if (key === 'asctime') {
		return this.formatTime(record);
	}
	if (!record[key]) {
		return '';
	}
	if (type === 's') {
		return this._getReplacement(record, null, key, flag, width, precision, type);
	}

	return record[key];
};


exports.NiceConsoleFormatter = NiceConsoleFormatter;


function compile(format) {
	return format.replace(lib.Formatter.FORMAT_PATTERN, getDirective);
}

function getDirective(match, key, flag, width, precision, type) {
	if (type === 's') {
		return '%s';

	} else if (type === 'd') {
		var w = width || '';
		var p = precision || '';
		return '%' + w + (p ? '.' : '') + p + 'd';

	} else if (type === 'f') {
		var w = width || '';
		var p = precision || '';
		return '%' + w + (p ? '.' : '') + p + 'f';

	} else if (type === 'o') {
		return '%o';
	}
}
