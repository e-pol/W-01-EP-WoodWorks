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

	// catalog

	function Catalog(id, items) {
		this._id = id;
		this._node = document.getElementById(id);
		this._items = items;
		this._selection = items;
		this._filtersByValue = {};
		this._filtersByInterval = {};
		this._filters = [];

		console.log("Created: Object Catalog id=\"" + this._id + "\"");
	}

	Catalog.prototype.filterByValue = function(filterId, property, value) {
		console.log("Object Catalog id=\"" + this._id + "\" method: .filterByValue" + " property=" + property + " value=" + value);
		
		// define: add or remove filter;

		if (this._filtersByValue[filterId]) {

			// remove
			
			this._filtersByValue[filterId] = false;

			this.removeFilter();

		} else {
			
			// add

			this._filtersByValue[filterId] = {};
			this._filtersByValue[filterId][property] = value;
			
			this.addFilter(property, value);

		}		
	}

	Catalog.prototype.addFilter = function(property, value) {
		
		var func = function(el) {
			return el[property] === value;
		}
			this._filters.push(func);
		}
		
	}

	Catalog.prototype.removeFilter = function() {

	}

	Catalog.prototype.createCatalogHtml = function() {
		console.log("Object Catalog id=\"" + this._id + "\" method: .createCatalogHtml");
		
		for (var filter in this._filtersByValue) {
			console.log(this._filtersByValue[filter]);

			for (var property in this._filtersByValue[filter]) {
				console.log(property + ":" + this._filtersByValue[filter][property])
			}
		}

		// make new catalog HTML code;
		// delete old catalog HTML code;
		// append new catalog;

	}

	Catalog.prototype.modifyCatalogHtmls = function() {
		console.log("Object Catalog id=\"" + this._id + "\" method: .modifyCatalogHtml");
		// filter existing selection;
		// remove obsolete nodes;
	}

	Catalog.prototype.filterByInterval = function() {

	}


	// filters

	function Filter(id, initialCatalog) {
		this._id = id;
		this._node = document.getElementById(id);
		this._filters = {};
		this._catalogs = [];
		this._catalogs[0] = initialCatalog;

		console.log("Created: Object Filter id=\"" + this._id + "\"");
	}

	Filter.prototype.applyChanges = function() {
		console.log("Object Filter id=\"" + this._id + "\" method: .applyChanges");
		var filtersArr = [];
		this._catalogs[0].applyFilters(filtersArr);
	}

	Filter.prototype.setFilterPropertyValue = function(filterId, property, value) {
		console.log("Object Filter id=\"" + this._id + "\" method: .setFilterPropertyValue");
		

		

		this.applyChanges();	
	}


	Filter.prototype.setFilterPropertyInterval = function(filterId, property, min, max) {
		console.log("Object Filter id=\"" + this._id + "\" method: .setFilterPropertyInterval");
		console.log("Received: property=" + property + " min=" + min + " max=" + max);
		this.applyChanges();
	}

	// init

	// Add resetFilters();

	var hpCatalog = new Catalog("catalog", houseplans);
	var hpFilter = new Filter("filters", hpCatalog);


	// Controller
	// Remove node ids from controller calls of methods

	var catalogFilter = document.getElementById("filters");

	catalogFilter.addEventListener("change", function (event) {
		
		var firedEl = event.target;
		var firedElId = firedEl.id;
		var firedElParent = firedEl.parentElement;
		var firedElParentId = firedElParent.id;
		
		switch(firedElParentId) {
			
			case "area":
			var childrenElems = firedElParent.children;
			var interval = [];

			for (var i = 0; i < childrenElems.length; i++) {
				if (childrenElems[i].tagName === "INPUT" && childrenElems[i].type === "number") {
					interval.push(childrenElems[i].value);
				};

			};

			hpFilter.setFilterPropertyInterval(firedElId, firedElParentId, interval[0], interval[1]);
			break;

			default:
			hpFilter.setFilterPropertyValue(firedElId, firedElParentId, firedEl.value);
			break;

		}


	}, true);

};

main();