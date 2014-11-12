<?php
	
	class DB {

		//simulo una base de datos
		public static function getWork( $name ){
			$works['fleet'] = array('id'=>1, 'description'=>'Sitio web y desarrollo de plugins para Fleet Studio.');
			$works['fleet']['images'][] = array('src'=>'img/works/fleet_detail_1.jpg', 'description'=>'Desarrollo de plugin jquery <a href="http://fleet-studio.com/js/fleetSlideShow.jquery.js" target="blank">FleetSlider</a>');
			
			$works['vocacion-de-la-alegria'] = array('id'=>2, 'description'=>'Arte de tapa, conceptualización, fotografías y diseño de disco');
			$works['vocacion-de-la-alegria']['images'][] = array('src'=>'img/works/vocacion_detail_1.jpg', 'description'=>'Producción de tipografía corporea y fotografía');
			$works['vocacion-de-la-alegria']['images'][] = array('src'=>'img/works/vocacion_detail_2.jpg', 'description'=>'Diseño de almacenamiento de CD sin pegamento');
			$works['vocacion-de-la-alegria']['images'][] = array('src'=>'img/works/vocacion_detail_3.jpg', 'description'=>'Diseño gráfico interior');

			$works['sapo-pepe'] = array('id'=>2, 'description'=>'Arte de tapa, conceptualización, fotografías y diseño de disco');
			$works['sapo-pepe']['images'][] = array('src'=>'img/works/sapopepe_detail_1.jpg', 'description'=>'Desarrollo de memotest');
			$works['sapo-pepe']['images'][] = array('src'=>'img/works/sapopepe_detail_2.jpg', 'description'=>'Desarrollo de juego de vestir a las pepas');
			$works['sapo-pepe']['images'][] = array('src'=>'img/works/sapopepe_detail_3.jpg', 'description'=>'Desarrollo de rompecabezas');			

			return $works[$name];
		}

	}
	

?>