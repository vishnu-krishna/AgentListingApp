# AgentListingApp
Download the package and run the following steps
1.	Install npm, bower and gulp as global package.
2.	Npm install
3.	Bower install
4.	Npm install karma-mocha karma-phantomjs-launcher –g
5.	Goto Bowercomponents>bootstrap>bower.json to point "dist/css/bootstrap.css" instead of "less/bootstrap.less"( this is required to wiredep bootstrap css  in index.html. Boostrap wont be added to index.html if this is not modified).
6.	Gulp serve-build for production code ( this will create a folder named build and then it will push all the code from dev to this folder. This is a minfied version of css, js and wired up dependencies).
7.	Gulp serve-dev – for development code
8.	Gulp serve-test /gulp test-browser – for unit testing and code coverage report.
9.  If you dont like to install gulp just type node server.js. it will fire the application in port 3000.
<br />
Screenshots of the application<br />
Home Page<br />
![Template](https://github.com/vishnucute05/AgentListingApp/blob/master/Screenshots/Homepage.PNG)<br />
Traverse to Agents Page by clicking the links in the navbar<br />
![Template](https://github.com/vishnucute05/AgentListingApp/blob/master/Screenshots/AgentsPage.PNG)<br />
Type in the agent name. Warning in case of less than 3 characters.<br />
![Template](https://github.com/vishnucute05/AgentListingApp/blob/master/Screenshots/Warning3Characters.PNG)<br />
Now enter the agent details and hit enter or click Search.<br />
![Template](https://github.com/vishnucute05/AgentListingApp/blob/master/Screenshots/Top10.PNG)<br />
Incase the agent is not found, the No results will be published with an error message.<br />
![Template](https://github.com/vishnucute05/AgentListingApp/blob/master/Screenshots/Error.PNG)<br />
