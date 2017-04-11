## Node.js APP (StuffMapper)
________________________


#### steps to run program

```shell
npm install
node bin/www

OR

npm start
http://localhost:3000

PS: This project uses Twilio Test account credential, It actually don't send sms upon login, but pertends that it has sent 
message, SO you need to open developer tools and then tab to console and copy `phone_authentication_token` value

Example response
{id: "2", username: "arsalan", phone_number: "+92332000000", phone_authentication_token: "348804"}

```

#### config

```shell
Put your all config varibale related to db etc here
./config/appConfig.js

If map is not rendering, then you may need to put api key in `index.html` located in frontend 
```

### About Project

This project is built using node.js with angular.js framework.

It is simple app that use phone verification on login using twilio
and later all requests use jwt token thhp header for sending authenticated requested 


#### Frontend
On frontend, we use angular.js(v1), angular router with twitter bootstrap v3 for designing and some custom plugin such as google maps.

##### Structure
All Static data is in `frontend` folder
	
	|-- stuffmapper
		|-- frontend
		|   |-- index.html
		|   |-- css
		|   |   |-- angular-growl.min.css
		|   |   |-- bootstrap.min.css
		|   |   |-- font-awesome.min.css
		|   |-- fonts
		|   |   |-- fontawesome-webfont.eot
		|   |   |-- fontawesome-webfont.svg
		|   |   |-- fontawesome-webfont.ttf
		|   |   |-- fontawesome-webfont.woff
		|   |   |-- fontawesome-webfont.woff2
		|   |   |-- FontAwesome.otf
		|   |   |-- glyphicons-halflings-regular.eot
		|   |   |-- glyphicons-halflings-regular.svg
		|   |   |-- glyphicons-halflings-regular.ttf
		|   |   |-- glyphicons-halflings-regular.woff
		|   |   |-- glyphicons-halflings-regular.woff2
		|   |-- ico
		|   |   |-- apple-touch-icon-114-precomposed.png
		|   |   |-- apple-touch-icon-144-precomposed.png
		|   |   |-- apple-touch-icon-57-precomposed.png
		|   |   |-- apple-touch-icon-72-precomposed.png
		|   |   |-- favicon.ico
		|   |-- img
		|   |-- js
		|       |-- app		# all anglar app data
		|       |   |-- app.js
		|       |   |-- authInterceptorFactory.js
		|       |   |-- authServices.js
		|       |   |-- config.js
		|       |   |-- components
		|       |       |-- auth
		|       |       |   |-- auth.controller.js
		|       |       |   |-- auth.login.code.view.html
		|       |       |   |-- auth.login.view.html
		|       |       |   |-- auth.register.view.html
		|       |       |-- post
		|       |           |-- post.add.view.html
		|       |           |-- post.all.view.html
		|       |           |-- post.controller.js
		|       |           |-- post.single.view.html
		|       |-- lib
		|           |-- angular-google-maps-street-view.min.js
		|           |-- angular-google-maps-street-view_dev_mapped.min.js.map
		|           |-- angular-google-maps.min.js
		|           |-- angular-growl.min.js
		|           |-- angular-route.min.js
		|           |-- angular-route.min.js.map
		|           |-- angular-simple-logger.min.js
		|           |-- angular.min.js
		|           |-- angular.min.js.map
		|           |-- bootstrap.min.js
		|           |-- jquery-1.11.1.min.js
		|           |-- lodash.min.js
		|           |-- ngStorage.min.js


#### Backend

Backend use node.js with express.js framework.
Routing has functionality for changing routing quickly with with quick option to change api version
It uses Twilio for authenticate user and server all content from single server.
 
	|-- stuffmapper
		|-- .editorconfig
		|-- .eslintrc
		|-- .gitignore
		|-- .jscsrc
		|-- .npmignore
		|-- app.js
		|-- package.json
		|-- pm2.json
		|-- Readme.md
		|-- bin
		|   |-- www
		|-- config
		|   |-- appConfig.js	#file for setting env etc in app
		|   |-- dbConfig.js
		|   |-- dbQuery.js
		|-- controller
		|   |-- authenticationController.js
		|   |-- postController.js
		|   |-- twilio.js
		|-- routes
		|   |-- index.js
		|   |-- v1
		|       |-- authentication.js
		|       |-- posts.js
		|-- service
			|-- authenticationService.js
			|-- postService.js
			|-- tokenService.js


##### In future
Adding support of grunt to minify content
