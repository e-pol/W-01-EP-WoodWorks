var projects = [
	{
		id: "hp-15-001",
		area: 100
	},
	{
		id: "hp-15-002",
		area: 150
	},
	{
		id: "hp-15-003",
		area: 100
	}
];

function Catalog(catalog) {
	this._catalog = catalog;
}

Catalog.prototype.getItemById = function(itemId) {
	var catalog = this._catalog;
	for (var i = 0 ; i < catalog.length ; i++) {
		if (catalog[i].id === itemId) {
			return catalog[i];
		};
	};
};

Catalog.prototype.getItemsByPropertyValue = function(property, value) {
	var catalog = this._catalog;
	var arr = [];

	catalog.forEach(function(item) {
		if (item[property] === value) {
			arr.push(item);
		};
	});

	return arr;
};

Catalog.prototype.createSelection = function(selectionName) {
	
}

var homeplans = new Catalog(projects);
var item1 = homeplans.getItemById('hp-15-001');

console.log(item1.area);

var itemsList1 = homeplans.getItemsByPropertyValue('area', 100);

console.log(itemsList1[0].id);
console.log(itemsList1[1].id);

