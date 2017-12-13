'use strict';

/**
 * Simple console handler.
 *
 * @constructor ConsoleHandler
 * @extends Handler
 * @param {number} [level]
 */
function ConsoleHandler(level) {
	Handler.call(this, level);
}
util.inherits(ConsoleHandler, Handler);

/** @inheritdoc */
ConsoleHandler.prototype.emit = function(record) {
	try {
		var method = record.levelno >= Logger.ERROR ? 'error' : 'log';

		console[method](this.format(record));
	}
	catch (err) {
		this.handleError(err, record);
	}
};

exports.ConsoleHandler = ConsoleHandler;
