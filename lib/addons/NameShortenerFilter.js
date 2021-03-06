'use strict';

function NameShortenerFilter(maxAmount) {
	maxAmount = typeof maxAmount !== 'undefined' ? maxAmount : 2;

	this._maxAmount = maxAmount;
}
util.inherits(NameShortenerFilter, lib.Filter);

NameShortenerFilter.prototype.filter = function(record) {
	var parts = record.name.split('.');

	record.originalname = record.name;
	record.name = parts.slice(-this._maxAmount).join('.');

	return true;
};


exports.NameShortenerFilter = NameShortenerFilter;
