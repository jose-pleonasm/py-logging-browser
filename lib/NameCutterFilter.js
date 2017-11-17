(function (exports, util, Filter) {
	'use strict';

	function NameCutterFilter(cutStr) {
		cutStr = cutStr || '';

		this._cutStr = cutStr;
	}
	util.inherits(NameCutterFilter, Filter);

	NameCutterFilter.prototype.filter = function(record) {
		record.originalname = record.name;
		record.name = record.name.replace(this._cutStr, '');

		return true;
	};


	exports.NameCutterFilter = NameCutterFilter;
}(
	window['PyLogging'],
	window['PyLogging'].util,
	window['PyLogging'].Filter
));