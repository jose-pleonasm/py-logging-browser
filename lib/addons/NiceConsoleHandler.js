'use strict';

var methodMap = {
	'DEBUG': 'debug',
	'INFO': 'info',
	'WARNING': 'warn',
	'ERROR': 'error',
	'CRITICAL': 'error'
};

function NiceConsoleHandler(level, config) {
	config = config || {};

	lib.Handler.call(this, level);

	this._config = {
		grouping: typeof config.grouping !== 'undefined'
		          ? config.grouping : true
	}
	this._openGroup = '';
}
util.inherits(NiceConsoleHandler, lib.Handler);

NiceConsoleHandler.prototype.emit = function(record) {
	var consoleMethod = methodMap[record.levelname] || 'log';
	var consoleMsg = this.format(record);
	var consoleArgs = [].concat(consoleMsg);

	if (this._config.grouping && record.name !== this._openGroup) {
		if (this._openGroup) {
			console.groupEnd();
		}

		this._openGroup = record.name;
		console.group(this._openGroup);
	}

	console[consoleMethod].apply(console, consoleArgs);
};


exports.NiceConsoleHandler = NiceConsoleHandler;
