var main = function() {
	"use strict";

	// init

	var filterCatalog = function(filterId, filterApply) {
		console.log("filterId:" + filterId + " filterApply:" + filterApply);
	}

	var filterCatalogInterval = function(filterId, interval) {
		console.log("filterId:" + filterId + " min:" + interval[0] + " max:" + interval[1]);
	}

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

			filterCatalogInterval(firedElParentId, interval);
			break;

			default:
			filterCatalog(firedElId, firedEl.checked);
			break;

		}


	}, true);

};

main();