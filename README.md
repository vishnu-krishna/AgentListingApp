# AgentListingApp
Download the package and run the following steps<br />
1.	Install npm, bower and gulp as global package.<br />
2.	Npm install<br />
3.	Bower install<br />
4.	Npm install karma-mocha karma-phantomjs-launcher –g<br />
5.	Goto Bowercomponents>bootstrap>bower.json to point "dist/css/bootstrap.css" instead of "less/bootstrap.less"( this is required to wiredep bootstrap css  in index.html. Boostrap wont be added to index.html if this is not modified).<br />
6.	Gulp serve-build for production code ( this will create a folder named build and then it will push all the code from dev to this folder. This is a minfied version of css, js and wired up dependencies).<br />
7.	Gulp serve-dev – for development code<br />
8.	Gulp serve-test /gulp test-browser – for unit testing and code coverage report.<br />
9.  If you dont like to install gulp just type node server.js. it will fire the application in port 3000.<br />
<br />
Screenshots of the application<br /><br />
Home Page<br /><br />
![Template](https://github.com/vishnucute05/AgentListingApp/blob/master/Screenshots/Homepage.PNG)<br /><br />
Traverse to Agents Page by clicking the links in the navbar<br /><br />
![Template](https://github.com/vishnucute05/AgentListingApp/blob/master/Screenshots/AgentsPage.PNG)<br /><br />
Type in the agent name. Warning in case of less than 3 characters.<br /><br />
![Template](https://github.com/vishnucute05/AgentListingApp/blob/master/Screenshots/Warning3Characters.PNG)<br /><br />
Now enter the agent details and hit enter or click Search.<br /><br />
![Template](https://github.com/vishnucute05/AgentListingApp/blob/master/Screenshots/Top10.PNG)<br /><br />
Incase the agent is not found, the No results will be published with an error message.<br /><br />
![Template](https://github.com/vishnucute05/AgentListingApp/blob/master/Screenshots/Error.PNG)<br />
