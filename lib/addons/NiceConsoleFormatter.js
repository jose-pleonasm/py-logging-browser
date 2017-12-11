'use strict';

/**
 * @constructor NiceConsoleFormatter
 * @extends Formatter
 * @param {string} [format]
 * @param {string} [timeFormat]
 * @param {Object} [config]
 */
function NiceConsoleFormatter(format, timeFormat, config) {
	format = format || '%(name)-s %(message)-s';
	timeFormat = timeFormat || '%H:%M:%S';

	lib.Formatter.call(this, format, timeFormat);
}
util.inherits(NiceConsoleFormatter, lib.Formatter);

NiceConsoleFormatter.prototype.format = function(record) {
	var re = new RegExp(
		lib.Formatter.FORMAT_PATTERN.source,
		lib.Formatter.FORMAT_PATTERN.flags
	);
	var item = [];
	var s = this._format;
	var data = [];

	while ((item = re.exec(this._format)) !== null) {
		var match = item[0];
		var key = item[1];
		var flag = item[2] || '';
		var width = item[3] || NaN;
		var precision = item[4] || NaN;
		var type = item[5] || 's';
		var directive = getDirective(type, flag, width, precision);

		s = s.replace(match, directive);
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


function getDirective(type, flag, width, precision) {
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
