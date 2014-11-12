<?php
	if( isset($_GET['_escaped_fragment_']) ){
		require_once('DB.class.php');
		$workID = $_GET['_escaped_fragment_'];
		$work = DB::getWork( $workID );
		
		$imgsHTML = '';
		foreach( $work['images'] as $img ){
			$imgsHTML .= "
				<div class='slide'>
					<img src='$img[src]' alt='$img[description]'>
					<h3>$img[description]</h3>
				</div>
			";
		}
		$snippet = "
			<div id='$work[id]' class='workDetail'>
				<div class='workSlider'>
					$imgsHTML
				</div>
				<a href='#' class='close'>cerrar</a>
			</div>
		";
		if( isset($_GET['ajax']) ) die( $snippet );

		echo "<!doctype html>
		<html lang=\"en\">
		<head>
			<meta charset=\"UTF-8\">
			<title>Sergio Minutoli $workID</title>
		</head>
		<body>
			$snippet
		</body>
		</html>";

		die();
	}
?>