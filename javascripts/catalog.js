;(function() {

	"use strict";

	// filters container

	var filters = {};

	// functions

	function createFilter(property, sign, value) {
		
		var funcBody = "return el[\"" + property + "\"]" + sign + value + ";" ;
		var func = new Function("el", funcBody);
		
		return func;

	}

	function setFilter(property, sign, value) {
		
		var filterId = property + sign + value;
		
		if ( filters[filterId] ) {
			filters[filterId] = false;
		} else {
			filters[filterId] = createFilter(property, sign, value);
		}

	}

	function setFilterInterval(property, minValue, maxValue) {
		
		var filterIdMin = property + "Min";
		var filterIdMax = property + "Max";

		filters[filterIdMin] = createFilter(property, ">=", minValue);
		filters[filterIdMax] = createFilter(property, "<=", maxValue);

	}

	function renewCatalog(catalog, catalogFilters, containerId) {

		var newFiltersCache = createFiltersCache(catalogFilters);
		var newCatalog = getFilteredCatalog(catalog, newFiltersCache);
		var newCatalogHtml = createCatalogHtml(newCatalog, containerId);
		
		renewCatalogHtml(newCatalogHtml, containerId);
		
		/*console.group();
			console.table(newFiltersCache);
			console.table(newCatalog);
		console.groupEnd();*/
	}

	function createFiltersCache(filters) {
		
		var filtersCache = [];
		
		for (var filter in filters) {
			if (filters[filter]) {
				filtersCache.push( filters[filter] );
			}
		}

		return filtersCache;

	}

	function getFilteredCatalog(catalog, filtersCache) {
    	
    	return catalog.filter( function(el) {
    		return filtersCache.every( function(filterInCache) {
    			return filterInCache(el);
    		});
    	});

	}

	function createCatalogHtml(catalog, containerId) {
		
		var newCatalogEl = document.createElement("div");
		newCatalogEl.id = containerId;

		catalog.forEach( function(catalogItem) {

			var itemContainerEl = document.createElement("div");
			itemContainerEl.id = catalogItem.id;

			var designStatus = "Рабочий";
			var statusBuilt = "Построен 2015г.";

			var aEl = document.createElement("a");
			aEl.href = "#";

			var figureEl = document.createElement("figure");

			var imgEl = document.createElement("img");
			imgEl.src = catalogItem.imagesUrl + "thumb.jpg";

			var figcaptionEl = document.createElement("figcaption");

			var figcaptionInnerHTML;
			figcaptionInnerHTML = "<h2>Проект " + catalogItem.title + "</h2>";
			figcaptionInnerHTML += "<p>Площадь</p><p>" + catalogItem.area + "м<sup>2</sup></p>";
			figcaptionInnerHTML += "<p>Проект</p><p>" + designStatus + "</p>";
			figcaptionInnerHTML += "<p>Построен</p><p>" + statusBuilt + "</p>";

			figcaptionEl.innerHTML = figcaptionInnerHTML;

			figureEl.appendChild(imgEl);
			figureEl.appendChild(figcaptionEl);
			aEl.appendChild(figureEl);
			itemContainerEl.appendChild(aEl);
			newCatalogEl.appendChild(itemContainerEl);

		});

		return newCatalogEl;
	}

	function renewCatalogHtml(catalog, containerId) {
		
		var oldCatalog = document.getElementById(containerId);
		var catalogParent = oldCatalog.parentElement;

		catalog.className = oldCatalog.className;
		catalogParent.replaceChild(catalog, oldCatalog);

	}

	// init

	var houseplans;

	$.getJSON("houseplans/houseplans.json", function(catalog) {

		houseplans = catalog.items
		var mainCatalog = houseplans;
		var catalogContainerId = "catalog";
		var initCatalogHtml = createCatalogHtml(mainCatalog, catalogContainerId);
	
		renewCatalogHtml(initCatalogHtml, catalogContainerId);


		// console.log(houseplans.items);

	});

	// disable php actions
	// reset filters status, set all checked, set min and max area
	// check filters onReload of the page

	// filter controller

	var catalogFilterController = document.getElementById("filters");
	
	catalogFilterController.addEventListener("change", function(event) {
		
		var firedEl = event.target;
		var firedId = firedEl.id;
		var parent = firedEl.parentElement;
		var parentId = parent.id;
		var catalog = houseplans;
		var catalogFilters = filters;
		var containerId = "catalog";

		switch(parentId) {

			case "types":

				switch(firedId) {
					
					case "type-house":
					// setFilter(property, sign, "\"house\"");
					setFilter('type', '!==', '"house"');
					renewCatalog(catalog, catalogFilters, containerId);
					break;

					case "type-bath-house":
					setFilter('type', '!==', '"bath-house"');
					renewCatalog(catalog, catalogFilters, containerId);
					break;

					case "type-other":
					setFilter('type', '!==', '"other"');
					renewCatalog(catalog, catalogFilters, containerId);
					break;

				}

				break;

				case "area":

				var minValue = document.getElementById("area-min").value;
				var maxValue = document.getElementById("area-max").value;

				setFilterInterval('area', minValue, maxValue);
				renewCatalog(catalog, catalogFilters, containerId);
			
			break;

			case "floors":

				switch(firedId) {
					
					case "floors-1":
					setFilter('floors', '!==', 1);
					renewCatalog(catalog, catalogFilters, containerId);
					break;

					case "floors-2":
					setFilter('floors', '!==', 2);
					renewCatalog(catalog, catalogFilters, containerId);
					break;

					case "floors-socle":
					setFilter('floors', '!==', '"socle"');
					renewCatalog(catalog, catalogFilters, containerId);
					break;

				}

			break;

			case "bedrooms":

				switch(firedId) {
					
					case "bedrooms-1":
					setFilter('bedrooms', '!==', 1);
					renewCatalog(catalog, catalogFilters, containerId);
					break;

					case "bedrooms-2":
					setFilter('bedrooms', '!==', 2);
					renewCatalog(catalog, catalogFilters, containerId);
					break;

					case "bedrooms-3":
					setFilter('bedrooms', '!==', 3);
					renewCatalog(catalog, catalogFilters, containerId);
					break;

					case "bedrooms-4":
					setFilter('bedrooms', '!==', 4);
					renewCatalog(catalog, catalogFilters, containerId);
					break;

					case "bedrooms-5":
					setFilter('bedrooms', '!==', 5);
					renewCatalog(catalog, catalogFilters, containerId);
					break;

				}

			break;

			case "design-status":

				switch(firedId) {
					
					case "stage-schematic-design":
					setFilter('design-status', '!==', '"schematic-design"');
					renewCatalog(catalog, catalogFilters, containerId);
					break;

					case "stage-design-development":
					setFilter('design-status', '!==', '"design-development"');
					renewCatalog(catalog, catalogFilters, containerId);
					break;

					case "stage-construction-documents":
					setFilter('design-status', '!==', '"construction-documents"');
					renewCatalog(catalog, catalogFilters, containerId);
					break;

				}

			break;

			case "project-status":

				switch(firedId) {
					
					case "status-built":
					setFilter('project-status', '!==', '"built"');
					renewCatalog(catalog, catalogFilters, containerId);
					break;

					case "status-under-construction":
					setFilter('project-status', '!==', '"under-construction"');
					renewCatalog(catalog, catalogFilters, containerId);
					break;

					case "status-not-realised":
					setFilter('project-status', '!==', '"not-realised"');
					renewCatalog(catalog, catalogFilters, containerId);
					break;

				}

			break;

			case "wall-material":

				switch(firedId) {
					
					case "material-profiled-beams":
					setFilter('wall-material', '!==', '"profiled-beams"');
					renewCatalog(catalog, catalogFilters, containerId);
					break;

					case "material-handlaften":
					setFilter('wall-material', '!==', '"handlaften"');
					renewCatalog(catalog, catalogFilters, containerId);
					break;

					case "material-four-sided":
					setFilter('wall-material', '!==', '"four-sided\"');
					renewCatalog(catalog, catalogFilters, containerId);
					break;

					case "material-timber-framing":
					setFilter('wall-material', '!==', '"timber-framing"');
					renewCatalog(catalog, catalogFilters, containerId);
					break;

				}

			break;

			default:
			break;

		}

	});

}());