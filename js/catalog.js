var main = function() {
	"use strict";

	// 

	var houseplans = [
		{
			id: "hp-15-001",
			area: 100,
			floors: 1,
			bedrooms: 3,
			"design-status": "schematic"
		},
		{
			id: "hp-15-002",
			area: 150,
			floors: 2,
			bedrooms: 4,
			"design-status": "design"
		},
		{
			id: "hp-15-003",
			area: 200,
			floors: 2,
			bedrooms: 2,
			"design-status": "construction"
		}
	]

	var filters = {};

	function createFilter(property, sign, value) {
		var funcBody = "return el[" + property + "]" + sign + value;
		var func = new Function("el", funcBody);
		return func;
	}

	function setFilter(property, sign, value) {
		var filterId = property + sign + value;
		
		if ( filters[filterId] ) {
			filters[filterId] = false
		} else {
			filters[filterId] = createFilter(property, sign, value);
		};

		var filtersCache = createFiltersCache(filters);

		filtersCache.forEach( function(item, i) {
			alert("filtersCache[" + i + "] == " + item);
		});

	}

	function createFiltersCache(filters) {
		var filtersCache = [];
		for (var filter in filters) {
			if (filters[filter]) {
				filtersCache.push( filters[filter] );
			};
		};
		return filtersCache;
	}

	// testing

	var prop = "area";
	var sig = "==";
	var val = 100;

	setFilter(prop, sig, val);

	for (var filter in filters) {
		alert(filters[filter]);
	}

	var prop = "floors";
	var sig = "==";
	var val = 2;

	setFilter(prop, sig, val);	

	for (var filter in filters) {
		alert(filters[filter]);
	}

	var prop = "area";
	var sig = "==";
	var val = 100;

	setFilter(prop, sig, val);	

	for (var filter in filters) {
		alert(filters[filter]);
	}

};

main();