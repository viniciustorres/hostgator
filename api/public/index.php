<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();

// Move this function to dependencies.php/settings.php later
function getConnection() {
	$db = [
		'host' => 'localhost',
		'database' => 'desafio_hostgator',
		'username' => 'root',
		'password' => ''
	];

	$dbh = new PDO("mysql:host=".$db['host'].";dbname=".$db['database'], $db['username'], $db['password']);
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
	
	return $dbh;
}

$app->get('/', function (Request $request, Response $response, $args) {
	$response->getBody()->write('Welcome to the Hostgator Challenge. Please feel free to use the public methods:<br/>');
	$response->getBody()->write('[GET] /prices: Lists the prices of all the products.<br/>');
	$response->getBody()->write('[GET] /prices/{id}: Lists the prices of a specific product.');
    return $response;
});

$app->get('/prices[/[{id}]]', function (Request $request, Response $response, $args) {

	$whereCondition = ''; // Variable for where condition
	$idProduct = null; // Variable to keep the id of the product if the user want to select a specific product
	
	if (!is_null($request->getAttribute('id'))){
		$idProduct = $request->getAttribute('id');
		$whereCondition .= ' where p.idProduct = :idProduct ';
	}

	// Creating the database connection object.
	$dbh = getConnection();

	// Building the query with specific joins to retrieve all necessary data from the database.
	$query = ' select 
		p.idProduct,
		p.`name` as productName,
		p.presentationName,
		c.`name` as cycleName,
		c.months,
		pc.priceRenew,
		pc.priceOrder
	FROM 
	desafio_hostgator.products p
	inner join desafio_hostgator.productcycle pc
	on p.idProduct = pc.idProduct
	inner join desafio_hostgator.cycles c
	on c.idCycle = pc.idCycle '
	.$whereCondition;

	$sth = $dbh->prepare($query);

	if (!is_null($idProduct)){
		$sth->bindParam(':idProduct', $idProduct, PDO::PARAM_INT);
	}

	$sth->execute();

	$result = $sth->fetchAll(PDO::FETCH_ASSOC);	

	// Inicial structure of the JSON to be returned. (This could also be build at the end of the script).
	$products = [
		"shared" => [
			"products" => []
		]
	];

	// For each product cycle found I do the following:
	foreach($result as $key => $product){
			
		// I keep the presentation name (E.g "Plano Turbo") and it's ID.
		$products['shared']['products'][$product['productName']]['name'] = $product['presentationName'];
		$products['shared']['products'][$product['productName']]['id'] = (int) $product['idProduct'];		

		// Then I create the cycle prop to keep all the product cycles (monthly, annualy, etc).
		$products['shared']['products'][$product['productName']]['cycle'][$product['cycleName']]['priceRenew'] = $product['priceRenew'];
		$products['shared']['products'][$product['productName']]['cycle'][$product['cycleName']]['priceOrder'] = $product['priceOrder'];
		$products['shared']['products'][$product['productName']]['cycle'][$product['cycleName']]['months'] = (int) $product['months'];

	}

	if ( empty($products['shared']['products']) )
		$statusCode = 404; // No products then I'm returning the 404 status (Not Found)
	else
		$statusCode = 200; // status for Created

	// Converting the array to JSON format.
	$products = json_encode($products);

	// Preparing to write the content to the API user.
	$response->getBody()->write($products);

	

	// Returning the data with specific header and status.
	return $response
			// Allowing CORS
			->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
			->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
			
			->withHeader('Content-Type', 'application/json')
			->withStatus($statusCode);

});

$app->run();