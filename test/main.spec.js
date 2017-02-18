var assert = chai.assert;
var expect = chai.expect;

describe("The Agent Listing App",function(){
	describe("The Backend Call",function(){
		beforeEach(function(){
			module("AgentListing");
			inject(function($injector){
				$httpBackend = $injector.get("$httpBackend");
			});
		});
		it ("should call the backend",function(){
			$httpBackend.expectGET("https://api.ratemyagent.com.au/autosearch/agents?SearchTerm={Holly}")
				.respond(200,[]);
		});
	});

	describe("the Agent controller",function(){
		beforeEach(function(){
			module("AgentListing");
			inject(function($injector,$rootScope){
				$scope = $rootScope.$new();
				$httpBackend = $injector.get("$httpBackend");
				$controller = $injector.get("$controller");
			});
		});
		it ("should store an array of Agents in scope",function(){
			$controller("AgentController",{$scope:$scope});
			assert.isNotArray($scope.agents);
		});
	});
});