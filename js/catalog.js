var main = function() {
	"use strict";

	// catalog

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
			floors: 3,
			bedrooms: 2,
			"design-status": "construction"
		}
	];

	// filters container

	var filters = {};

	// filtering functions

	function createFilter(property, sign, value) {
		var funcBody = "return el[\"" + property + "\"]" + sign + value + ";" ;
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

	function getFilteredCatalog(catalog, filtersCache) {
    	return catalog.filter( function(el) {
    		return filtersCache.every( function(filterInCache) {
    			return filterInCache(el);
    		});
    	});
	};

	// testing

	var prop = "area";
	var sig = "!==";
	var val = 100;

	setFilter(prop, sig, val);
	var filtersCache01 = createFiltersCache(filters);
	var catalog01 = getFilteredCatalog(houseplans, filtersCache01);
	
	console.group();
		console.info(filters);
		console.info(filtersCache01);
		console.table(catalog01);
	console.groupEnd();

	var prop = "floors";
	var sig = "!==";
	var val = 2;

	setFilter(prop, sig, val);
	var filtersCache02 = createFiltersCache(filters);
	var catalog02 = getFilteredCatalog(houseplans, filtersCache02);

	console.group();
		console.info(filters);
		console.info(filtersCache02);
		console.table(catalog02);
	console.groupEnd();

	var prop = "area";
	var sig = "!==";
	var val = 100;

	setFilter(prop, sig, val);
	var filtersCache03 = createFiltersCache(filters);
	var catalog03 = getFilteredCatalog(houseplans, filtersCache03);

	console.group();
		console.info(filters);
		console.info(filtersCache03);
		console.table(catalog03);
	console.groupEnd();

};

main();