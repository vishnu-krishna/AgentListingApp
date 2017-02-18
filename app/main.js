angular.module("AgentListing", ['ui.router','ngAnimate'])
.controller("HomeController", ['$http','$scope', function ($http, $scope) {
	//empty HomeController
}])
.controller("AgentController", ['$http','$scope', function ($http, $scope) {
	$scope.details={};
	$scope.showHeading = false;
	$scope.loading = false;
	$scope.findAgents = function(){
		$scope.showHeading = true;
		$scope.loading = true;
		$scope.results = false;
		$http.get("https://api.ratemyagent.com.au/autosearch/agents?SearchTerm=" + $scope.details.agent)
		.then(function (res) {
			$scope.loading = false;
			if(res.data.Results.length == 0){
				$scope.results = true;
			}
			console.log(res);
			$scope.agents = res.data.Results;
		});
	};
	
}])
.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('Home', {
			url: '/',
			templateUrl: '/views/Home.html'
		})

		.state('Agents', {
			url: '/Agents',
			templateUrl: '/views/Agents.html',
			controller:'AgentController'
		});

}]);