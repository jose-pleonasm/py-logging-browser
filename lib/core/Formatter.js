'use strict';

/**
 * Default formatter.
 *
 * @constructor Formatter
 * @param {string} [format]
 * @param {string} [timeFormat]
 */
function Formatter(format, timeFormat) {
	format = format || '%(message)';
	timeFormat = timeFormat || '%Y-%m-%d %H:%M:%S';

	/**
	 * @private
	 * @type {string}
	 */
	this._format = format;

	/**
	 * @private
	 * @type {string}
	 */
	this._timeFormat = timeFormat;
}

/**
 * Return the text representation of this formatter.
 *
 * @return {string}
 */
Formatter.prototype.toString = function() {
	return '[object Formatter <' + this._format + '>]';
};

/**
 * Return the creation time of the specified LogRecord as formatted text.
 *
 * @param  {module:py-logging.LogRecord} record
 * @return {string}
 */
Formatter.prototype.formatTime = function(record) {
	return strftime(new Date(record.created), this._timeFormat);
};

/**
 * Return the specified Error object as formatted text.
 *
 * @param  {Object} error
 * @return {string}
 */
Formatter.prototype.formatError = function(error) {
	var msg = error.toString();
	var stack = typeof error.stack === 'string' ? error.stack : '';
	var file = typeof error.fileName === 'string' ? error.fileName : '';
	var line = typeof error.lineNumber === 'string' ? error.lineNumber : '';
	var s = '';

	if (stack) {
		s = stack.indexOf(msg) > -1 ? stack : msg + '\n' + stack;
	} else {
		s = msg + (file ? ' in ' + file + ':' + line : '');
	}

	return s;
};

/**
 * Return the specified LogRecord as formatted text.
 *
 * @param  {module:py-logging.LogRecord} record
 * @return {string}
 */
Formatter.prototype.format = function(record) {
	var cb = this._getReplacement.bind(this, record);
	var s = '';

	s = this._format.replace(/%\(([a-z]+)\)/g, cb);
	if (record.error) {
		record.errorText = this.formatError(record.error);
	}
	if (record.errorText) {
		s = s + '\n' + record.errorText;
	}

	return s;
};

/**
 * @private
 * @param  {module:py-logging.LogRecord} record
 * @param  {string} match
 * @param  {string} attr
 * @return {string}
 */
Formatter.prototype._getReplacement = function(record, match, attr) {
	var r = '';

	if (attr === 'asctime') {
		r = this.formatTime(record);
	} else if (record[attr]) {
		r = record[attr];
	}

	return r;
};