angular.module("AgentListing",["ui.router","ngAnimate"]).controller("ContactController",["$http","$scope",function(t,e){}]).controller("AgentController",["$http","$scope",function(t,e){e.details={},e.showHeading=!1,e.findAgents=function(){e.showHeading=!0,t.get("https://api.ratemyagent.com.au/autosearch/agents?SearchTerm="+e.details.agent).then(function(t){console.log(t),e.agents=t.data.Results})}}]).config(["$urlRouterProvider","$stateProvider",function(t,e){t.otherwise("/"),e.state("Home",{url:"/",templateUrl:"/views/Home.html"}).state("Agents",{url:"/Agents",templateUrl:"/views/Agents.html",controller:"AgentController"})}]);