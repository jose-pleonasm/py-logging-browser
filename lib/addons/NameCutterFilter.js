'use strict';

function NameCutterFilter(cutStr) {
	cutStr = cutStr || '';

	this._cutStr = cutStr;
}
util.inherits(NameCutterFilter, lib.Filter);

NameCutterFilter.prototype.filter = function(record) {
	record.originalname = record.name;
	record.name = record.name.replace(this._cutStr, '');

	return true;
};


exports.NameCutterFilter = NameCutterFilter;
