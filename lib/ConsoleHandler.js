(function (exports, util, Handler) {
	'use strict';

	/**
	 * Console handler.
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
			console.log(this.format(record));
		}
		catch (err) {
			this.handleError(err, record);
		}
	};


	exports.ConsoleHandler = ConsoleHandler;
}(
	window['PyLogging'],
	window['PyLogging'].util,
	window['PyLogging'].Handler
));