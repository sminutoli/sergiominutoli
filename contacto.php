<?php
	require_once("phpmailer/class.pop3.php");
	require_once("phpmailer/class.smtp.php");
	require_once("phpmailer/class.phpmailer.php");
	
	$name = $_POST['name'];
	$email = $_POST['email'];
	$comment = $_POST['comment'];
	
	if( !$name || !$email || !$comment ){
		$response = "<div id='response' class='error'>Datos insuficientes</div>";
	} else {
		$mail  = new PHPMailer();
		$mail->IsSMTP(); // telling the class to use SMTP
		$mail->SMTPAuth   = true;                  // enable SMTP authentication
		$mail->SMTPSecure = "tls";                 // sets the prefix to the servier
		$mail->Host       = "smtp.gmail.com";      // sets GMAIL as the SMTP server
		$mail->Port       = 587;                   // set the SMTP port for the GMAIL server
		$mail->Username   = "sminutoli.it@gmail.com";  // GMAIL username
		$mail->Password   = "dungadunga";            // GMAIL password
		$mail->CharSet = "UTF-8";
		
		$body = "<p>nombre: <strong>$name</strong></p>
		<p>email: <strong>$email</strong></p>
		<p>mensaje: $comment</p>";
			
		$mail->SetFrom('contacto@sergiominutoli.com.ar', 'Sergio Minutoli');
		$mail->AddReplyTo('contacto@sergiominutoli.com.ar', 'Sergio Minutoli');
		$mail->Subject    = "Contacto desde Sergio Minutoli";
		$mail->AltBody    = strip_tags($body); // optional, comment out and test
		$mail->MsgHTML($body);
		$address = "contacto@sergiominutoli.com.ar";
		$mail->AddAddress($address, "Sergio Minutoli | Contacto");
		if(!$mail->Send()) {
		  $response = "<div id='response' class='error'>Ha surgido un error en el envio</div>";
		} else {
		  $response = "<div id='response' class='ok'>El mensaje ha sido enviado con exito<br />Contestaré su consulta a la brevedad</div>";
		}
		
		$mail  = new PHPMailer();
		$mail->IsSMTP(); // telling the class to use SMTP
		$mail->SMTPAuth   = true;                  // enable SMTP authentication
		$mail->SMTPSecure = "tls";                 // sets the prefix to the servier
		$mail->Host       = "smtp.gmail.com";      // sets GMAIL as the SMTP server
		$mail->Port       = 587;                   // set the SMTP port for the GMAIL server
		$mail->Username   = "sminutoli.it@gmail.com";  // GMAIL username
		$mail->Password   = "dungadunga";            // GMAIL password
		$mail->CharSet = "UTF-8";
		
		$body = "<p>Hola, $name, en breve contestare sus dudas.</p>
		<p>Saludos cordiales.</p>
		<strong>Sergio Ariel Minutoli</strong>";
		
		$mail->SetFrom('contacto@sergiominutoli.com.ar', 'Sergio Minutoli');
		$mail->AddReplyTo('contacto@sergiominutoli.com.ar', 'Sergio Minutoli');
		$mail->Subject    = "Gracias por contactarse";
		$mail->AltBody    = strip_tags($body); // optional, comment out and test
		$mail->MsgHTML($body);
		$mail->AddAddress($email, $nombre);
		$mail->Send();		
	}	
?>