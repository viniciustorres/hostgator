# Hostgator Challenge

### System requirements

## For API
- A PHP WebServer version 7.3 or Higher with MySQL database.
- Composer for PHP Dependency management and Slim Framework Installation.

## Installation of API
- After installing the WebServer, MySQL and Composer, you must go to the API folder by the command prompt and run 'composer install' in order to the composer install the Slim Framework using the JSON which is located in the same folder.

- After installing the Slim Framework you need to configure the database credentials in the api\public\index.php and change the server, database, username and password like the following example:

```
$db = [
		'host' => 'localhost',
		'database' => 'desafio_hostgator',
		'username' => 'root',
		'password' => ''
	];
```

Then you can start the server by running the command 'composer start' inside the api folder. You must run at port 8080.

## The API

Methods:

- [GET] /prices: Lists the prices of all the products.
- [GET] /prices/{id}: Lists the prices of a specific product.


## Database
- First run the "structure.sql" to create the database structure and after that run the "inserts.sql" to insert the data.


## For Front End
- NodeJS Version 12.18.1 LTS or newer.
- After installing the NodeJS you have to go to inside the client folder with the command prompt and use the 'npm install' to NodeJS install the node_modules folder with it's dependencies.
- After the installation you can start the server with the 'npm start' command. The server must run at port 3000.

