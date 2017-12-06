'use strict';

function NameRenamerFilter(searchvalue, newvalue) {
	this._searchvalue = searchvalue;
	this._newvalue = newvalue;
}
util.inherits(NameRenamerFilter, lib.Filter);

NameRenamerFilter.prototype.filter = function(record) {
	record.originalname = record.name;
	record.name = record.name.replace(this._searchvalue, this._newvalue);

	return true;
};


exports.NameRenamerFilter = NameRenamerFilter;
