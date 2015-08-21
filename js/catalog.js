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

	/*function Catalog(id, items) {
		this._id = id;
		this._node = document.getElementById(id);
		this._items = items;
		this._selection = items;

		console.log("Created: Object Catalog id=\"" + this._id + "\"");
	}

	Catalog.prototype.applyFilters = function(filters) {
		console.log("Object Catalog id=\"" + this._id + "\" method: .applyFilters");
		console.log("Received: " + filters);
		// change selection
	}

	Catalog.prototype.createCatalogHtml = function() {
		console.log("Object Catalog id=\"" + this._id + "\" method: .createCatalogHtml");
		// create from selection
	}

	Catalog.prototype.appendCatalogHtml = function() {
		console.log("Object Catalog id=\"" + this._id + "\" method: .appendCatalogHtml");
		// remove old
		// append new
	}*/

	// init

	/*var hpCatalog = new Catalog("catalog", houseplans);
	var hpFilter = new Filter("filters", hpCatalog);*/


	// filter

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

			// hpFilter.setFilterPropertyInterval(firedElParentId, interval[0], interval[1]);
			break;

			default:
			// hpFilter.setFilterPropertyValue(firedElParentId, firedEl.value);
			break;

		}


	}, true);

};

main();