'use strict';

/**
 * Console handler.
 *
 * @constructor ConsoleHandler
 * @extends Handler
 * @param {number} [level]
 */
function ConsoleHandler(level) {
	lib.Handler.call(this, level);
}
util.inherits(ConsoleHandler, lib.Handler);

/** @inheritdoc */
ConsoleHandler.prototype.emit = function(record) {
	try {
		console.log(this.format(record));
	}
	catch (err) {
		this.handleError(err, record);
	}
};

exports.ConsoleHandler = ConsoleHandler;
