(function (exports, util, Filter) {
	'use strict';

	function ConvenientNameFilter() {
		
	}
	util.inherits(ConvenientNameFilter, Filter);

	ConvenientNameFilter.prototype.filter = function(record) {
		record.originalname = record.name;
		record.name = record.name.replace(/\./g, ' / ');

		return true;
	};


	exports.ConvenientNameFilter = ConvenientNameFilter;
}(
	window['PyLogging'],
	window['PyLogging'].util,
	window['PyLogging'].Filter
));