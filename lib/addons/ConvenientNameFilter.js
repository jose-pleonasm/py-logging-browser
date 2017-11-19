'use strict';

function ConvenientNameFilter() {
	
}
util.inherits(ConvenientNameFilter, lib.Filter);

ConvenientNameFilter.prototype.filter = function(record) {
	record.originalname = record.name;
	record.name = record.name.replace(/\./g, '.');

	return true;
};


exports.ConvenientNameFilter = ConvenientNameFilter;
