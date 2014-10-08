'use strict';

// Configuring the Poems module
angular.module('poems').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Poems', 'poems', 'dropdown', '/poems(/create)?');
		Menus.addSubMenuItem('topbar', 'poems', 'Discover Poems', 'poems');
		Menus.addSubMenuItem('topbar', 'poems', 'New Poem', 'poems/create');
		Menus.addSubMenuItem('topbar', 'poems', 'My Poems', 'mypoems');
	}
]);