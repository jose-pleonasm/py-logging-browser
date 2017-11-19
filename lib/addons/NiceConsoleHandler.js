'use strict';

var methodMap = {
	'DEBUG': 'debug',
	'INFO': 'info',
	'WARNING': 'warn',
	'ERROR': 'error',
	'CRITICAL': 'error'
};

function NiceConsoleHandler(level) {
	lib.Handler.call(this, level);
}
util.inherits(NiceConsoleHandler, lib.Handler);

NiceConsoleHandler.prototype.emit = function(record) {
	var consoleMethod = methodMap[record.levelname] || 'log';
	var consoleMsg = this.format(record);
	var consoleArgs = [].concat(consoleMsg);

	console[consoleMethod].apply(console, consoleArgs);
};


exports.NiceConsoleHandler = NiceConsoleHandler;
