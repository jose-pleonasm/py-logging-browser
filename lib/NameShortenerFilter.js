(function (exports, util, Filter) {
	'use strict';

	function NameShortenerFilter() {
		
	}
	util.inherits(NameShortenerFilter, Filter);

	NameShortenerFilter.prototype.filter = function(record) {
		var modules = record.name.split('.');

		record.originalname = record.name;
		record.name = modules.pop();

		return true;
	};


	exports.NameShortenerFilter = NameShortenerFilter;
}(
	window['PyLogging'],
	window['PyLogging'].util,
	window['PyLogging'].Filter
));