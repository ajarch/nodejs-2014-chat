Chat.App = angular.module('Chat', ['ngRoute']);

Chat.App.config(['$routeProvider', function($routeProvider) {
	/**
	 * Routes
	 */
	$routeProvider.
		when('/', {
			templateUrl: Chat.Config.templateUrl + 'chat.html',
			controller: 'ChatController'
		}).
		otherwise({redirectTo: '/'});
	}
]);

Chat.App.run(['Chat', function (Chat) {
	// initialise the app
}]);