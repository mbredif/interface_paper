
	var renderer, scene, camera, controls, mesh,raycaster,mouse;
	
	var scatterPlot_MesoNH_O_2, 
	scatterPlot_MesoNH_U_2, 
	scatterPlot_MesoNH_V_2, 
	scatterPlot_MesoNH_W_2,
	scatterPlot_MesoNH_F_2; 
	
	var data_points_O_2,
	data_points_U_2,
	data_points_V_2,
	data_points_W_2,
	data_points_F_2;
	
	var data_ni;
	var data_nj;
	
	var grid = null;
	
	var grid_plane = null;
	
	var grid_plane_point = null;
	
	var grid_regular_points = null;
	
	var grid_road = null;
	
	var h_factor;
	var temp_array;
	var id_meso_array = [];
	var id_sbl_array = [];
	var id_meso_array_real_plane_points = [];
	var id_sbl_array_real_plane_points = [];
	var id_meso_array_real_plane = [];
	var id_sbl_array_real_plane = [];
	var id_meso_array_regular_points = [];
	var id_sbl_array_regular_points = [];
	var id_meso_array_roads = [];
	var id_sbl_array_roads = [];
	var regular_size = 1;
	var particle_density = 0.0004;
	var relative_density_factor = 1;
	var relative_size_factor = 1;
	var transparency_factor = 1;
	var h_min;
	var h_max;
	var z_min;
	var z_max;
	var x_min;
	var x_max;
	var y_min;
	var y_max;
	var is_animated = false;
	var animation_parameter = 'temp';
	//var animation_parameter = 'temp';
	//var animation_parameter = 'Z';
	//var animation_parameter = 'X';
	//var animation_parameter = 'Y';
	var animation_speed_factor = 0.01;
	
	var number_of_points_real_plane = 10;
	
	var temp_min_factor = 0;
	temp_max_factor = 1*2*Math.PI;
	z_min_factor = 0;
	z_max_factor = 1;
	h_min_factor = 0;
	h_max_factor = 1;
	x_min_factor = 0;
	x_max_factor = 1;
	y_min_factor = 0;
	y_max_factor = 1;
	
	
	var coord_meso_NH_level_2;
	var coord_meso_NH_level_3;
	
	//var cst_X = 100000,
	//cst_Y = 100000,
	//cst_Z = 10;
	
	var cst_X = 1,
	cst_Y = 1,
	cst_Z = 3,
	cst_Z_original = 3;
	
	var Coord_Y_paris = 6861944.0;
	var Coord_X_paris = 651948.0;
	//var Coord_Y_paris = 48.864716;
	//var Coord_X_paris = 2.349014;
	
	//TODO verifier
	var THAT = [-30.0,30.0,96.0,175.2,270.2,384.3,521.1,685.4,882.4,1118.9,1402.7,1743.3,2151.9,2642.3,3230.8,3901.8,4601.8,5301.8,6001.8,6701.8,7401.8,8101.8,8801.8,9501.8,10201.8,10901.8,11601.8,12301.8,13001.8,13701.8,14401.8,15101.8];
	var THAT_W = [-60.0,0.0,60.0,132.0,218.4,322.1,446.5,595.8,775.0,989.9,1247.9,1557.5,1929.0,2374.8,2909.8,3551.8,4251.8,4951.8,5651.8,6351.8,7051.8,7751.8,8451.8,9151.8,9851.8,10551.8,11251.8,11951.8,12651.8,13351.8,14051.8,14751.8];
	var HCanopy = [0.5,2,4, 6.5, 10, 29];
	var HCanopy_w = [0,1,3,5,8,12];
	
	var HCL_color_scales = [
	{'name':'sequential_red_sotr','scale':['#FADDC3','#F9C29C','#F6A173','#F17B51','#EA4C3B']},
	{'name':'sequential_red_2_sotr','scale':['#FDF5EB','#FFD3A7','#FE945C','#DD3B24','#88002D']},
	{'name':'sequential_blue_sotr','scale':['#4A6FE3','#9DA8E2','#E2E2E2','#E495A5','#D33F6A']},
	{'name':'HCL_white_purple_1_sotr','scale':['#ECE6C9','#CBE4BB','#A8D8B3','#84CCAD','#5FC1A8','#5AC1A9','#14BAAC','#00B5CB','#1895C8','#647DBD','#8567AC','#9652A0','#A9328E']},
	{'name':'HCL_white_purple_2_sotr','scale':['#E9E2C5','#ECE5CA','#D9D5BA','#CDC8AF','#CECAB0','#6FC5AF','#59C1A9','#40BBA0','#43A2CE','#2C95BF','#1887B1','#BE569E','#B14899','#AB3493']},
	{'name':'black_white','scale':["#1B1B1B","#585858","#969696","#D0D0D0","#F9F9F9"]},
	{'name':'white_black','scale':["#F9F9F9","#D0D0D0","#969696","#585858","#1B1B1B"]},
	{'name':'white_blue','scale':["#E2E2E2","#CBCDD9","#A1A6C8","#6A76B2","#023FA5"]},
	{'name':'blue_white','scale':["#023FA5","#6A76B2","#A1A6C8","#CBCDD9","#E2E2E2"]},
	{'name':'white_red','scale':["#F1F1F1","#E2CBCB","#CA9496","#A9565A","#7F000D"]},
	{'name':'red_white','scale':["#7F000D","#A9565A","#CA9496","#E2CBCB","#F1F1F1"]},
	{'name':'blue_white_red','scale':["#023FA5","#A1A6C8","#E2E2E2","#CA9CA4","#8E063B"]},
	{'name':'blue_white_red_2','scale':["#4A6FE3","#9DA8E2","#E2E2E2","#E495A5","#D33F6A"]},
	{'name':'blue_yellow','scale':["#4F53B7","#AAABD5","#F1F1F1","#B5AF80","#6B6100"]},
	{'name':'blue_yellow_2','scale':["#9FA2FF","#D7D9FF","#F1F1F1","#EAE191","#BAAE00"]}
	];	
	
	var HCL_html = "";
	for(var i=0; i<HCL_color_scales.length; i++){
		HCL_html = HCL_html + "<option value='HCL_" + i + "'>" + HCL_color_scales[i].name + "</option>";
	}
	
	$("#color_control_input").html(HCL_html);
	
	var active_HCL_id = parseInt($("#color_control_input").val().split("_")[1]);
	
	var active_color_class = $("#color_class_control_input").val();
	
	var data_volume_3D;
		
	var temp_values = [];
	
	//var coord_lambert_paris_X = 650672;
	//var coord_lambert_paris_Y = 6861924;
	
	var radius, alpha, theta;
	
	init();
	render();

	function init(){
		// on initialise le moteur de rendu
		var canvas = document.createElement( 'canvas' );
		var context = canvas.getContext( 'webgl2', { alpha: false, antialias: false } );
			renderer = new THREE.WebGLRenderer( { canvas: canvas, context: context } );
		
		//renderer = new THREE.WebGLRenderer();

		// si WebGL ne fonctionne pas sur votre navigateur vous pouvez utiliser le moteur de rendu Canvas à la place
		// renderer = new THREE.CanvasRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.getElementById('container').appendChild(renderer.domElement);

		// on initialise la scène
		scene = new THREE.Scene();

		// on initialise la camera que l’on place ensuite sur la scène
		radius = 2000;
		alpha = Math.PI;
		theta = 0;
		
		//var camera_x = radius*Math.sin(alpha)* Math.cos( theta ), 
		//camera_y = radius*Math.cos(alpha)* Math.cos( theta ),
		//camera_z = radius*Math.sin(theta);
		//camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 100000 );
		//
		//camera.position.set(200, 0, 200);
		////camera.position.set(0, -10000, 0);
		////camera.lookAt(new THREE.Vector3(0,0,0));
		//camera.rotation.x = Math.PI/2;
		//camera.rotation.y = 0;
		//camera.rotation.z = 0;
		//
		//scene.add(camera);
		
		camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
		controls = new THREE.OrbitControls( camera, renderer.domElement );
		//controls.update() must be called after any manual changes to the camera's transform
		camera.position.set( 200, 600, 200 );
		controls.update();
		
		var light = new THREE.PointLight( 0xffffff, 1, 0 );
		light.position.set(1000,1000,2000);
		scene.add( light );
		
		var light2 = new THREE.PointLight( 0xffffff, 1, 0 );
		light2.position.set(-1000,1000,-3000);
		scene.add( light2 );
		
		
		raycaster = new THREE.Raycaster();
		mouse = new THREE.Vector2();
						
		data_points_O_2 = [];
		data_points_U_2 = [];
		data_points_V_2 = [];
		data_points_W_2 = [];
		data_points_F_2 = [];
		
		data_points_O_3 = [];
		data_points_U_3 = [];
		data_points_V_3 = [];
		data_points_W_3 = [];
		data_points_F_3 = [];
		
		scatterPlot_MesoNH_O_2 = new THREE.Object3D();
		scene.add(scatterPlot_MesoNH_O_2);		
		scatterPlot_MesoNH_O_3 = new THREE.Object3D();
		scene.add(scatterPlot_MesoNH_O_3);
		scatterPlot_MesoNH_U_2 = new THREE.Object3D();
		scene.add(scatterPlot_MesoNH_U_2);		
		scatterPlot_MesoNH_U_3 = new THREE.Object3D();
		scene.add(scatterPlot_MesoNH_U_3);
		scatterPlot_MesoNH_V_2 = new THREE.Object3D();
		scene.add(scatterPlot_MesoNH_V_2);		
		scatterPlot_MesoNH_V_3 = new THREE.Object3D();
		scene.add(scatterPlot_MesoNH_V_3);
		scatterPlot_MesoNH_W_2 = new THREE.Object3D();
		scene.add(scatterPlot_MesoNH_W_2);		
		scatterPlot_MesoNH_W_3 = new THREE.Object3D();
		scene.add(scatterPlot_MesoNH_W_3);
		scatterPlot_MesoNH_F_2 = new THREE.Object3D();
		scene.add(scatterPlot_MesoNH_F_2);		
		scatterPlot_MesoNH_F_3 = new THREE.Object3D();
		scene.add(scatterPlot_MesoNH_F_3);
		
		//var geometry = new THREE.BoxGeometry( 100, 100, 100 );
		//var material = new THREE.MeshPhongMaterial( { color: 0x156289, emissive: 0x072534, side: THREE.DoubleSide, flatShading: true } );
		//// var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
		//var cube = new THREE.Mesh( geometry, material );
		//scene.add(cube);		

		var data_url = "_paris_beaubourg.csv";
		var url_data_road = "./geojson/paris_beaubourg_roads_points.geojson";
		//var url_data_road = "./geojson/road_mnt.geojson";
		//var url_data_road = "./geojson/fond_roads_points_points_test.geojson";
		
		var url_data_bat = "./geojson/paris_beaubourg_mapuce.geojson";
		data_ni = 1;
		data_nj = 1;
		
		load_Data("O",
		"./CSV/lambert_O" + data_url, 
		[{'level':2, 'data':data_points_O_2}, {'level':3, 'data':data_points_O_3}], 
		[{'level':2, 'data':scatterPlot_MesoNH_O_2}, {'level':3, 'data':scatterPlot_MesoNH_O_3}],
		"#ff5733");
		
		load_Data("U",
		"./CSV/lambert_U" + data_url, 
		[{'level':2, 'data':data_points_U_2}, {'level':3, 'data':data_points_U_3}], 
		[{'level':2, 'data':scatterPlot_MesoNH_U_2}, {'level':3, 'data':scatterPlot_MesoNH_U_3}],
		"#3346ff");
		
		load_Data("V",
		"./CSV/lambert_V" + data_url, 
		[{'level':2, 'data':data_points_V_2}, {'level':3, 'data':data_points_V_3}], 
		[{'level':2, 'data':scatterPlot_MesoNH_V_2}, {'level':3, 'data':scatterPlot_MesoNH_V_3}],
		"#33ff80");
		
		load_Data("W",
		"./CSV/lambert_W" + data_url, 
		[{'level':2, 'data':data_points_W_2}, {'level':3, 'data':data_points_W_3}], 
		[{'level':2, 'data':scatterPlot_MesoNH_W_2}, {'level':3, 'data':scatterPlot_MesoNH_W_3}],
		"#f6ff33");
		
							
				
		var axesHelper = new THREE.AxesHelper( 100 );
		scene.add( axesHelper );
		
		
		//var url_data = "test_batiment.geojson";
		var grid_bat = null;
		grid_bat = new THREE.Object3D();	
		$.getJSON( url_data_bat, function( data ) {
			//import_geojson(data,grid_bat,scene,$('type_bati').val;);
			//import_geojson(data,grid_bat,scene,$("#type_bati").val());
		});
		
		$( "#type_bati" ).on( "change", function() {
			if(grid_bat == null){
			} else {
				scene.remove(grid_bat);
			}
			grid_bat = new THREE.Object3D();
			$.getJSON( url_data_bat, function( data ) {
			//import_geojson(data,grid_bat,scene,$('type_bati').val;);
			import_geojson(data,grid_bat,scene,$("#type_bati").val());
		});
		});
		
		
		
		h_factor = 1;
		temp_array = [293.15,303.15];
		
		var ckbx_length = $(".data_ckbx").length;
		  for(var c=0; c<ckbx_length;c++){
			if($(".data_ckbx")[c].checked == true){
				if($(".data_ckbx")[c].id.split("_")[0] == "SBL"){
					id_sbl_array.push(parseInt($(".data_ckbx")[c].id.split("_")[1]));
				} else if($(".data_ckbx")[c].id.split("_")[0] == "Meso"){
					id_meso_array.push(parseInt($(".data_ckbx")[c].id.split("_")[1]));
				}				
			}
		  }
		
		document.onkeydown = checkKey;
		
		$(".data_ckbx").on( "click", function() {
			//add_discard_data(this);
			id_meso_array = [];
			id_sbl_array = [];
			var ckbx_length = $(".data_ckbx").length;
			for(var c=0; c<ckbx_length;c++){
				if($(".data_ckbx")[c].checked == true){
					if($(".data_ckbx")[c].id.split("_")[0] == "SBL"){
						id_sbl_array.push(parseInt($(".data_ckbx")[c].id.split("_")[1]));
					} else if($(".data_ckbx")[c].id.split("_")[0] == "Meso"){
						id_meso_array.push(parseInt($(".data_ckbx")[c].id.split("_")[1]));
					}				
				}
			}
			if(grid == null){
			} else {
				scene.remove(grid);
			}
			grid = new THREE.Object3D();
			create_meso_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid,id_sbl_array,id_meso_array,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);
		});
		
		$(".data_ckbx_real_plane").on( "click", function() {
			id_meso_array_real_plane = [];
			id_sbl_array_real_plane = [];
			var ckbx_length_real_plane = $(".data_ckbx_real_plane").length;
			for(var c=0; c<ckbx_length_real_plane;c++){
				if($(".data_ckbx_real_plane")[c].checked == true){
					if($(".data_ckbx_real_plane")[c].id.split("_")[0] == "SBL"){
						id_sbl_array_real_plane.push(parseInt($(".data_ckbx_real_plane")[c].id.split("_")[1]));
					} else if($(".data_ckbx_real_plane")[c].id.split("_")[0] == "Meso"){
						id_meso_array_real_plane.push(parseInt($(".data_ckbx_real_plane")[c].id.split("_")[1]));
					}				
				}
			}
			if(grid_plane == null){
			} else {
				scene.remove(grid_plane);
			}
			grid_plane = new THREE.Object3D();
			create_meso_real_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane,id_sbl_array_real_plane,id_meso_array_real_plane,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);
		
		});
		
		$(".data_ckbx_real_plane_points").on( "click", function() {
			id_meso_array_real_plane_points = [];
			id_sbl_array_real_plane_points = [];
			var ckbx_length_real_plane_points = $(".data_ckbx_real_plane_points").length;
			for(var c=0; c<ckbx_length_real_plane_points;c++){
				if($(".data_ckbx_real_plane_points")[c].checked == true){
					if($(".data_ckbx_real_plane_points")[c].id.split("_")[0] == "SBL"){
						id_sbl_array_real_plane_points.push(parseInt($(".data_ckbx_real_plane_points")[c].id.split("_")[1]));
					} else if($(".data_ckbx_real_plane_points")[c].id.split("_")[0] == "Meso"){
						id_meso_array_real_plane_points.push(parseInt($(".data_ckbx_real_plane_points")[c].id.split("_")[1]));
					}				
				}
			}
			if(grid_plane_point == null){
			} else {
				scene.remove(grid_plane_point);
			}
			grid_plane_point = new THREE.Object3D();
			create_meso_real_plane_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane_point,id_sbl_array_real_plane_points,id_meso_array_real_plane_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor,number_of_points_real_plane)
		
		});
		
		$(".data_ckbx_regular_points").on( "click", function() {
			id_meso_array_regular_points = [];
			id_sbl_array_regular_points = [];
			var ckbx_length_regular_points = $(".data_ckbx_regular_points").length;
			for(var c=0; c<ckbx_length_regular_points;c++){
				if($(".data_ckbx_regular_points")[c].checked == true){
					if($(".data_ckbx_regular_points")[c].id.split("_")[0] == "SBL"){
						id_sbl_array_regular_points.push(parseInt($(".data_ckbx_regular_points")[c].id.split("_")[1]));
					} else if($(".data_ckbx_regular_points")[c].id.split("_")[0] == "Meso"){
						id_meso_array_regular_points.push(parseInt($(".data_ckbx_regular_points")[c].id.split("_")[1]));
					}				
				}
			}
			if(grid_regular_points == null){
			} else {
				scene.remove(grid_regular_points);
			}
			grid_regular_points = new THREE.Object3D();
			create_meso_plane_regular_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_regular_points,id_sbl_array_regular_points,id_meso_array_regular_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor)
		
		});
		
		$( "#number_of_points_real_plane_slider" ).on( "change", function() {
			number_of_points_real_plane = this.value;
			$("#number_of_points_real_plane_label").html("number_of_points_real_plane : " + number_of_points_real_plane)
			if($('.data_ckbx').is(':checked')){
				if(grid == null){
				} else {
					scene.remove(grid);
				}
				grid = new THREE.Object3D();
				create_meso_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid,id_sbl_array,id_meso_array,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

			} else if($('.data_ckbx_real_plane').is(':checked')){
				if(grid_plane == null){
				} else {
					scene.remove(grid_plane);
				}
				grid_plane = new THREE.Object3D();
				create_meso_real_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane,id_sbl_array_real_plane,id_meso_array_real_plane,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

			} else if($('.data_ckbx_real_plane_points').is(':checked')){
				if(grid_plane_point == null){
				} else {
					scene.remove(grid_plane_point);
				}
				grid_plane_point = new THREE.Object3D();
				create_meso_real_plane_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane_point,id_sbl_array_real_plane_points,id_meso_array_real_plane_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor,number_of_points_real_plane);

			} else if($('.data_ckbx_regular_points').is(':checked')){
				if(grid_regular_points == null){
				} else {
					scene.remove(grid_regular_points);
				}
				grid_regular_points = new THREE.Object3D();
				create_meso_plane_regular_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_regular_points,id_sbl_array_regular_points,id_meso_array_regular_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);
			}
		});
		
				
		$( "#h_slider" ).on( "change", function() {
			if(this.value > 10){
				h_factor = this.value - 9;
			} else {
				h_factor = this.value/10;
			}
			cst_Z = cst_Z_original*h_factor;
			$("#h_control_label").html("h_factor : " + h_factor);
			if(grid_bat == null){
			} else {
				scene.remove(grid);
			}
			grid_bat = new THREE.Object3D();
			$.getJSON( url_data_bat,grid_bat, function( data ) {
				import_geojson(data,scene);
			});
			if($('.data_ckbx').is(':checked')){
				if(grid == null){
				} else {
					scene.remove(grid);
				}
				grid = new THREE.Object3D();
				create_meso_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid,id_sbl_array,id_meso_array,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

			} else if($('.data_ckbx_real_plane').is(':checked')){
				if(grid_plane == null){
				} else {
					scene.remove(grid_plane);
				}
				grid_plane = new THREE.Object3D();
				create_meso_real_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane,id_sbl_array_real_plane,id_meso_array_real_plane,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

			} else if($('.data_ckbx_real_plane_points').is(':checked')){
				if(grid_plane_point == null){
				} else {
					scene.remove(grid_plane_point);
				}
				grid_plane_point = new THREE.Object3D();
				create_meso_real_plane_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane_point,id_sbl_array_real_plane_points,id_meso_array_real_plane_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor,number_of_points_real_plane);

			} else if($('.data_ckbx_regular_points').is(':checked')){
				if(grid_regular_points == null){
				} else {
					scene.remove(grid_regular_points);
				}
				grid_regular_points = new THREE.Object3D();
				create_meso_plane_regular_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_regular_points,id_sbl_array_regular_points,id_meso_array_regular_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);
			}
		});
		
		$( "#size_slider" ).on( "change", function() {
			regular_size = this.value/150;
			$("#size_text_input").val(regular_size);
			if($('.data_ckbx').is(':checked')){
				if(grid == null){
				} else {
					scene.remove(grid);
				}
				grid = new THREE.Object3D();
				create_meso_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid,id_sbl_array,id_meso_array,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

			} else if($('.data_ckbx_real_plane').is(':checked')){
				if(grid_plane == null){
				} else {
					scene.remove(grid_plane);
				}
				grid_plane = new THREE.Object3D();
				create_meso_real_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane,id_sbl_array_real_plane,id_meso_array_real_plane,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

			} else if($('.data_ckbx_real_plane_points').is(':checked')){
				if(grid_plane_point == null){
				} else {
					scene.remove(grid_plane_point);
				}
				grid_plane_point = new THREE.Object3D();
				create_meso_real_plane_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane_point,id_sbl_array_real_plane_points,id_meso_array_real_plane_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor,number_of_points_real_plane);

			} else if($('.data_ckbx_regular_points').is(':checked')){
				if(grid_regular_points == null){
				} else {
					scene.remove(grid_regular_points);
				}
				grid_regular_points = new THREE.Object3D();
				create_meso_plane_regular_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_regular_points,id_sbl_array_regular_points,id_meso_array_regular_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);
			}
		});
		
		$( "#relative_size_factor_size_slider" ).on( "change", function() {
			relative_size_factor = this.value/100;
			if(relative_size_factor == 1){
				$("#relative_size_factor_control_label").html("relative_size_factor : " + 0);
			} else if(relative_size_factor < 1){
				var label_value = parseInt((1-relative_size_factor)*100)/100;
				$("#relative_size_factor_control_label").html("relative_size_factor : " + label_value + " less values");
			} else if(relative_size_factor > 1){
				var label_value = parseInt((relative_size_factor-1)*100)/100;
				$("#relative_size_factor_control_label").html("relative_size_factor : " + label_value + " high values");
			}
			if($('.data_ckbx').is(':checked')){
				if(grid == null){
				} else {
					scene.remove(grid);
				}
				grid = new THREE.Object3D();
				create_meso_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid,id_sbl_array,id_meso_array,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

			} else if($('.data_ckbx_real_plane').is(':checked')){
				if(grid_plane == null){
				} else {
					scene.remove(grid_plane);
				}
				grid_plane = new THREE.Object3D();
				create_meso_real_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane,id_sbl_array_real_plane,id_meso_array_real_plane,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

			} else if($('.data_ckbx_real_plane_points').is(':checked')){
				if(grid_plane_point == null){
				} else {
					scene.remove(grid_plane_point);
				}
				grid_plane_point = new THREE.Object3D();
				create_meso_real_plane_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane_point,id_sbl_array_real_plane_points,id_meso_array_real_plane_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor,number_of_points_real_plane);

			} else if($('.data_ckbx_regular_points').is(':checked')){
				if(grid_regular_points == null){
				} else {
					scene.remove(grid_regular_points);
				}
				grid_regular_points = new THREE.Object3D();
				create_meso_plane_regular_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_regular_points,id_sbl_array_regular_points,id_meso_array_regular_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);
			}
		});
		
		$( "#density_slider" ).on( "change", function() {
			particle_density = parseInt(this.value)/10000;
			$("#density_text_input").val(particle_density)
			if($('.data_ckbx').is(':checked')){
				if(grid == null){
				} else {
					scene.remove(grid);
				}
				grid = new THREE.Object3D();
				create_meso_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid,id_sbl_array,id_meso_array,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

			} else if($('.data_ckbx_real_plane').is(':checked')){
				if(grid_plane == null){
				} else {
					scene.remove(grid_plane);
				}
				grid_plane = new THREE.Object3D();
				create_meso_real_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane,id_sbl_array_real_plane,id_meso_array_real_plane,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

			} else if($('.data_ckbx_real_plane_points').is(':checked')){
				if(grid_plane_point == null){
				} else {
					scene.remove(grid_plane_point);
				}
				grid_plane_point = new THREE.Object3D();
				create_meso_real_plane_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane_point,id_sbl_array_real_plane_points,id_meso_array_real_plane_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor,number_of_points_real_plane);

			} else if($('.data_ckbx_regular_points').is(':checked')){
				if(grid_regular_points == null){
				} else {
					scene.remove(grid_regular_points);
				}
				grid_regular_points = new THREE.Object3D();
				create_meso_plane_regular_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_regular_points,id_sbl_array_regular_points,id_meso_array_regular_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);
			}
		});
		
		$( "#relative_density_factor_slider" ).on( "change", function() {
			relative_density_factor = this.value/100;
			if(relative_density_factor == 1){
				$("#relative_density_factor_control_label").html("relative_density_factor : " + 0);
			} else if(relative_density_factor < 1){
				var label_value = parseInt((1-relative_density_factor)*100)/100;
				$("#relative_density_factor_control_label").html("relative_density_factor : " + label_value + " less values");
			} else if(relative_density_factor > 1){
				var label_value = parseInt((relative_density_factor-1)*100)/100;
				$("#relative_density_factor_control_label").html("relative_density_factor : " + label_value + " high values");
			}
			if($('.data_ckbx').is(':checked')){
				if(grid == null){
				} else {
					scene.remove(grid);
				}
				grid = new THREE.Object3D();
				create_meso_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid,id_sbl_array,id_meso_array,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

			} else if($('.data_ckbx_real_plane').is(':checked')){
				if(grid_plane == null){
				} else {
					scene.remove(grid_plane);
				}
				grid_plane = new THREE.Object3D();
				create_meso_real_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane,id_sbl_array_real_plane,id_meso_array_real_plane,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

			} else if($('.data_ckbx_real_plane_points').is(':checked')){
				if(grid_plane_point == null){
				} else {
					scene.remove(grid_plane_point);
				}
				grid_plane_point = new THREE.Object3D();
				create_meso_real_plane_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane_point,id_sbl_array_real_plane_points,id_meso_array_real_plane_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor,number_of_points_real_plane);

			} else if($('.data_ckbx_regular_points').is(':checked')){
				if(grid_regular_points == null){
				} else {
					scene.remove(grid_regular_points);
				}
				grid_regular_points = new THREE.Object3D();
				create_meso_plane_regular_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_regular_points,id_sbl_array_regular_points,id_meso_array_regular_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);
			}
		});
		
		
		$("#size_text_input").on( "keyup", function(e) {
			if (e.keyCode == 13) {
				$( "#size_slider" ).val(this.value*150);
				regular_size = this.value;
				if($('.data_ckbx').is(':checked')){
					if(grid == null){
					} else {
						scene.remove(grid);
					}
					grid = new THREE.Object3D();
					create_meso_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid,id_sbl_array,id_meso_array,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

				} else if($('.data_ckbx_real_plane').is(':checked')){
					if(grid_plane == null){
					} else {
						scene.remove(grid_plane);
					}
					grid_plane = new THREE.Object3D();
					create_meso_real_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane,id_sbl_array_real_plane,id_meso_array_real_plane,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

				} else if($('.data_ckbx_real_plane_points').is(':checked')){
					if(grid_plane_point == null){
					} else {
						scene.remove(grid_plane_point);
					}
					grid_plane_point = new THREE.Object3D();
					create_meso_real_plane_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane_point,id_sbl_array_real_plane_points,id_meso_array_real_plane_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor,number_of_points_real_plane);

				} else if($('.data_ckbx_regular_points').is(':checked')){
					if(grid_regular_points == null){
					} else {
						scene.remove(grid_regular_points);
					}
					grid_regular_points = new THREE.Object3D();
					create_meso_plane_regular_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_regular_points,id_sbl_array_regular_points,id_meso_array_regular_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);
				}
			}
		});
			
		$("#density_text_input").on( "keyup", function(e) {
			if (e.keyCode == 13) {
				$( "#density_slider" ).val(this.value*10000);
				particle_density = this.value;
				if($('.data_ckbx').is(':checked')){
					if(grid == null){
					} else {
						scene.remove(grid);
					}
					grid = new THREE.Object3D();
					create_meso_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid,id_sbl_array,id_meso_array,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

				} else if($('.data_ckbx_real_plane').is(':checked')){
					if(grid_plane == null){
					} else {
						scene.remove(grid_plane);
					}
					grid_plane = new THREE.Object3D();
					create_meso_real_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane,id_sbl_array_real_plane,id_meso_array_real_plane,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

				} else if($('.data_ckbx_real_plane_points').is(':checked')){
					if(grid_plane_point == null){
					} else {
						scene.remove(grid_plane_point);
					}
					grid_plane_point = new THREE.Object3D();
					create_meso_real_plane_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane_point,id_sbl_array_real_plane_points,id_meso_array_real_plane_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor,number_of_points_real_plane);

				} else if($('.data_ckbx_regular_points').is(':checked')){
					if(grid_regular_points == null){
					} else {
						scene.remove(grid_regular_points);
					}
					grid_regular_points = new THREE.Object3D();
					create_meso_plane_regular_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_regular_points,id_sbl_array_regular_points,id_meso_array_regular_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);
				}
			}
		});
		
		$("#temp_min_input").on( "keyup", function(e) {
			if (e.keyCode == 13) {
				temp_array = [parseFloat($("#temp_min_input").val())+273.15,parseFloat($("#temp_max_input").val())+273.15];
				if($('.data_ckbx').is(':checked')){
					if(grid == null){
					} else {
						scene.remove(grid);
					}
					grid = new THREE.Object3D();
					create_meso_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid,id_sbl_array,id_meso_array,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

				} else if($('.data_ckbx_real_plane').is(':checked')){
					if(grid_plane == null){
					} else {
						scene.remove(grid_plane);
					}
					grid_plane = new THREE.Object3D();
					create_meso_real_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane,id_sbl_array_real_plane,id_meso_array_real_plane,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

				} else if($('.data_ckbx_real_plane_points').is(':checked')){
					if(grid_plane_point == null){
					} else {
						scene.remove(grid_plane_point);
					}
					grid_plane_point = new THREE.Object3D();
					create_meso_real_plane_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane_point,id_sbl_array_real_plane_points,id_meso_array_real_plane_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor,number_of_points_real_plane);

				} else if($('.data_ckbx_regular_points').is(':checked')){
					if(grid_regular_points == null){
					} else {
						scene.remove(grid_regular_points);
					}
					grid_regular_points = new THREE.Object3D();
					create_meso_plane_regular_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_regular_points,id_sbl_array_regular_points,id_meso_array_regular_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);
				}
				}
		});
		
		
		$("#temp_max_input").on( "keyup", function(e) {
			if (e.keyCode == 13) {
				temp_array = [parseFloat($("#temp_min_input").val())+273.15,parseFloat($("#temp_max_input").val())+273.15];
			
				if($('.data_ckbx').is(':checked')){
					if(grid == null){
					} else {
						scene.remove(grid);
					}
					grid = new THREE.Object3D();
					create_meso_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid,id_sbl_array,id_meso_array,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

				} else if($('.data_ckbx_real_plane').is(':checked')){
					if(grid_plane == null){
					} else {
						scene.remove(grid_plane);
					}
					grid_plane = new THREE.Object3D();
					create_meso_real_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane,id_sbl_array_real_plane,id_meso_array_real_plane,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

				} else if($('.data_ckbx_real_plane_points').is(':checked')){
					if(grid_plane_point == null){
					} else {
						scene.remove(grid_plane_point);
					}
					grid_plane_point = new THREE.Object3D();
					create_meso_real_plane_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane_point,id_sbl_array_real_plane_points,id_meso_array_real_plane_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor,number_of_points_real_plane);

				} else if($('.data_ckbx_regular_points').is(':checked')){
					if(grid_regular_points == null){
					} else {
						scene.remove(grid_regular_points);
					}
					grid_regular_points = new THREE.Object3D();
					create_meso_plane_regular_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_regular_points,id_sbl_array_regular_points,id_meso_array_regular_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);
				}
				}
		});
		
		
		$("#color_control_input").on( "change", function(e) {
				active_HCL_id = parseInt($("#color_control_input").val().split("_")[1]);
			
				if($('.data_ckbx').is(':checked')){
					if(grid == null){
					} else {
						scene.remove(grid);
					}
					grid = new THREE.Object3D();
					create_meso_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid,id_sbl_array,id_meso_array,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

				} 
				if($('.data_ckbx_real_plane').is(':checked')){
					if(grid_plane == null){
					} else {
						scene.remove(grid_plane);
					}
					grid_plane = new THREE.Object3D();
					create_meso_real_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane,id_sbl_array_real_plane,id_meso_array_real_plane,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

				} 
				if($('.data_ckbx_real_plane_points').is(':checked')){
					if(grid_plane_point == null){
					} else {
						scene.remove(grid_plane_point);
					}
					grid_plane_point = new THREE.Object3D();
					create_meso_real_plane_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane_point,id_sbl_array_real_plane_points,id_meso_array_real_plane_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor,number_of_points_real_plane);

				} 
				if($('.data_ckbx_regular_points').is(':checked')){
					if(grid_regular_points == null){
					} else {
						scene.remove(grid_regular_points);
					}
					grid_regular_points = new THREE.Object3D();
					create_meso_plane_regular_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_regular_points,id_sbl_array_regular_points,id_meso_array_regular_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);
				}
				
		});
		
		$("#color_class_control_input").on( "change", function(e) {
				active_color_class = $("#color_class_control_input").val();
			
				if($('.data_ckbx').is(':checked')){
					if(grid == null){
					} else {
						scene.remove(grid);
					}
					grid = new THREE.Object3D();
					create_meso_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid,id_sbl_array,id_meso_array,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

				} 
				if($('.data_ckbx_real_plane').is(':checked')){
					if(grid_plane == null){
					} else {
						scene.remove(grid_plane);
					}
					grid_plane = new THREE.Object3D();
					create_meso_real_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane,id_sbl_array_real_plane,id_meso_array_real_plane,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

				} 
				if($('.data_ckbx_real_plane_points').is(':checked')){
					if(grid_plane_point == null){
					} else {
						scene.remove(grid_plane_point);
					}
					grid_plane_point = new THREE.Object3D();
					create_meso_real_plane_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane_point,id_sbl_array_real_plane_points,id_meso_array_real_plane_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor,number_of_points_real_plane);

				} 
				if($('.data_ckbx_regular_points').is(':checked')){
					if(grid_regular_points == null){
					} else {
						scene.remove(grid_regular_points);
					}
					grid_regular_points = new THREE.Object3D();
					create_meso_plane_regular_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_regular_points,id_sbl_array_regular_points,id_meso_array_regular_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);
				}
				
		});
		
		
		$( "#transparency_slider" ).on( "change", function() {
			transparency_factor = this.value/100;
			$("#transparency_slider").html("transparency_factor: " + transparency_factor)
			if($('.data_ckbx').is(':checked')){
				if(grid == null){
				} else {
					scene.remove(grid);
				}
				grid = new THREE.Object3D();
				create_meso_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid,id_sbl_array,id_meso_array,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

			} 
			if($('.data_ckbx_real_plane').is(':checked')){
				if(grid_plane == null){
				} else {
					scene.remove(grid_plane);
				}
				grid_plane = new THREE.Object3D();
				create_meso_real_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane,id_sbl_array_real_plane,id_meso_array_real_plane,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

			} 
			if($('.data_ckbx_real_plane_points').is(':checked')){
				if(grid_plane_point == null){
				} else {
					scene.remove(grid_plane_point);
				}
				grid_plane_point = new THREE.Object3D();
				create_meso_real_plane_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane_point,id_sbl_array_real_plane_points,id_meso_array_real_plane_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor,number_of_points_real_plane);

			} 
			if($('.data_ckbx_regular_points').is(':checked')){
				if(grid_regular_points == null){
				} else {
					scene.remove(grid_regular_points);
				}
				grid_regular_points = new THREE.Object3D();
				create_meso_plane_regular_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_regular_points,id_sbl_array_regular_points,id_meso_array_regular_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);
			}
		});
		
		$("#animation_ckbx").on( "click", function() {
			//add_discard_data(this);
			if($("#animation_ckbx")[0].checked == true){
				is_animated = true;
			} else {
				is_animated = false;
			}
				var material;
				if(is_animated == false){
					material = new THREE.ShaderMaterial( {
						uniforms: {
							color: { value: new THREE.Color( 0xffffff ) },
							pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
							regularSize: { value: regular_size },
							u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
						},
						vertexShader: document.getElementById( 'vertexshader_fix' ).textContent,
						fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
						// blending: THREE.AdditiveBlending,
						//depthTest: false,
						transparent: true
					} );
				} else if (is_animated == true){
					if(animation_parameter == 'temp'){
						material = new THREE.ShaderMaterial( {
							uniforms: {
								color: { value: new THREE.Color( 0xffffff ) },
								pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
								regularSize: { value: regular_size },
								u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
							},
							vertexShader: document.getElementById( 'vertexshader_anim_temp' ).textContent,
							fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
							// blending: THREE.AdditiveBlending,
							//depthTest: false,
							transparent: true
						} );
						
					} else if(animation_parameter == 'Z'){
						material = new THREE.ShaderMaterial( {
							uniforms: {
								color: { value: new THREE.Color( 0xffffff ) },
								pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
								regularSize: { value: regular_size },
								u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
							},
							vertexShader: document.getElementById( 'vertexshader_anim_z' ).textContent,
							fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
							// blending: THREE.AdditiveBlending,
							//depthTest: false,
							transparent: true
						} );
						
					}
				} else if(animation_parameter == 'X'){
					material = new THREE.ShaderMaterial( {
						uniforms: {
							color: { value: new THREE.Color( 0xffffff ) },
							pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
							regularSize: { value: regular_size },
							u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
						},
						vertexShader: document.getElementById( 'vertexshader_anim_x' ).textContent,
						fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
						// blending: THREE.AdditiveBlending,
						//depthTest: false,
						transparent: true
					} );
					
				} else if(animation_parameter == 'Y'){
					material = new THREE.ShaderMaterial( {
						uniforms: {
							color: { value: new THREE.Color( 0xffffff ) },
							pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
							regularSize: { value: regular_size },
							u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
						},
						vertexShader: document.getElementById( 'vertexshader_anim_y' ).textContent,
						fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
						// blending: THREE.AdditiveBlending,
						//depthTest: false,
						transparent: true
					} );
				
				}
			if(grid != null){	
				grid.children[0].material = material;
			}
			if(grid_plane != null){	
				grid_plane.children[0].material = material;
			}
			if(grid_plane_point != null){	
				grid_plane_point.children[0].material = material;
			}
			if(grid_regular_points != null){	
				grid_regular_points.children[0].material = material;
			}
		});
		
		
		$("#graphic_control_label").on( "click", function() {
			$("#graphic_control_container").css("display", "block");
			$("#data_control_container").css("display", "none");
			$("#animation_control_container").css("display", "none");
			$("#filter_control_container").css("display", "none");
		});
		
		$("#data_control_label").on( "click", function() {
			$("#data_control_container").css("display", "block");
			$("#animation_control_container").css("display", "none");
			$("#graphic_control_container").css("display", "none");
			$("#filter_control_container").css("display", "none");
		});
		
		$("#animation_control_label").on( "click", function() {
			$("#animation_control_container").css("display", "block");
			$("#data_control_container").css("display", "none");
			$("#graphic_control_container").css("display", "none");
			$("#filter_control_container").css("display", "none");
		});
		
		$("#filter_control_label").on( "click", function() {
			$("#animation_control_container").css("display", "none");
			$("#data_control_container").css("display", "none");
			$("#graphic_control_container").css("display", "none");
			$("#filter_control_container").css("display", "block");
		});
		
		$( "#filter_control_temp_min_slider" ).on( "change", function() {
				temp_min_factor = (this.value/100)*2*Math.PI;
				temp_min_factor_label = (temp_array[0] + (this.value/100) * (temp_array[1] - temp_array[0])) -273.15;
				$("#filter_control_temp_min_label").html("temp min: " + temp_min_factor_label)
				if($('.data_ckbx').is(':checked')){
					if(grid == null){
					} else {
						scene.remove(grid);
					}
					grid = new THREE.Object3D();
					create_meso_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid,id_sbl_array,id_meso_array,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

				} 
				if($('.data_ckbx_real_plane').is(':checked')){
					if(grid_plane == null){
					} else {
						scene.remove(grid_plane);
					}
					grid_plane = new THREE.Object3D();
					create_meso_real_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane,id_sbl_array_real_plane,id_meso_array_real_plane,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

				} 
				if($('.data_ckbx_real_plane_points').is(':checked')){
					if(grid_plane_point == null){
					} else {
						scene.remove(grid_plane_point);
					}
					grid_plane_point = new THREE.Object3D();
					create_meso_real_plane_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane_point,id_sbl_array_real_plane_points,id_meso_array_real_plane_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor,number_of_points_real_plane)

				} 
				if($('.data_ckbx_regular_points').is(':checked')){
					if(grid_regular_points == null){
					} else {
						scene.remove(grid_regular_points);
					}
					grid_regular_points = new THREE.Object3D();
					create_meso_plane_regular_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_regular_points,id_sbl_array_regular_points,id_meso_array_regular_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor)
				}
			});
			
		$( "#filter_control_temp_max_slider" ).on( "change", function() {
				temp_max_factor = (this.value/100)*2*Math.PI;
				temp_max_factor_label = (temp_array[0] + (this.value/100) * (temp_array[1] - temp_array[0])) -273.15;
				$("#filter_control_temp_max_label").html("temp max: " + temp_max_factor_label)
				if($('.data_ckbx').is(':checked')){
					if(grid == null){
					} else {
						scene.remove(grid);
					}
					grid = new THREE.Object3D();
					create_meso_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid,id_sbl_array,id_meso_array,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

				} 
				if($('.data_ckbx_real_plane').is(':checked')){
					if(grid_plane == null){
					} else {
						scene.remove(grid_plane);
					}
					grid_plane = new THREE.Object3D();
					create_meso_real_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane,id_sbl_array_real_plane,id_meso_array_real_plane,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

				} 
				if($('.data_ckbx_real_plane_points').is(':checked')){
					if(grid_plane_point == null){
					} else {
						scene.remove(grid_plane_point);
					}
					grid_plane_point = new THREE.Object3D();
					create_meso_real_plane_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane_point,id_sbl_array_real_plane_points,id_meso_array_real_plane_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor,number_of_points_real_plane)

				} 
				if($('.data_ckbx_regular_points').is(':checked')){
					if(grid_regular_points == null){
					} else {
						scene.remove(grid_regular_points);
					}
					grid_regular_points = new THREE.Object3D();
					create_meso_plane_regular_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_regular_points,id_sbl_array_regular_points,id_meso_array_regular_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor)
				}
			});
			
		$( "#filter_control_z_min_slider" ).on( "change", function() {
				z_min_factor = this.value/100;
				z_min_factor_label = z_min + (this.value/100) * (z_max - z_min);
				$("#filter_control_z_min_label").html("z min: " + z_min_factor_label)
				if($('.data_ckbx').is(':checked')){
					if(grid == null){
					} else {
						scene.remove(grid);
					}
					grid = new THREE.Object3D();
					create_meso_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid,id_sbl_array,id_meso_array,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

				} 
				if($('.data_ckbx_real_plane').is(':checked')){
					if(grid_plane == null){
					} else {
						scene.remove(grid_plane);
					}
					grid_plane = new THREE.Object3D();
					create_meso_real_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane,id_sbl_array_real_plane,id_meso_array_real_plane,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

				} 
				if($('.data_ckbx_real_plane_points').is(':checked')){
					if(grid_plane_point == null){
					} else {
						scene.remove(grid_plane_point);
					}
					grid_plane_point = new THREE.Object3D();
					create_meso_real_plane_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane_point,id_sbl_array_real_plane_points,id_meso_array_real_plane_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor,number_of_points_real_plane)

				} 
				if($('.data_ckbx_regular_points').is(':checked')){
					if(grid_regular_points == null){
					} else {
						scene.remove(grid_regular_points);
					}
					grid_regular_points = new THREE.Object3D();
					create_meso_plane_regular_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_regular_points,id_sbl_array_regular_points,id_meso_array_regular_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor)
				}
			});
			
		$( "#filter_control_z_max_slider" ).on( "change", function() {
				z_max_factor = this.value/100;
				z_max_factor_label = z_min + (this.value/100) * (z_max - z_min);
				$("#filter_control_z_max_label").html("z max: " + z_max_factor_label)
				if($('.data_ckbx').is(':checked')){
					if(grid == null){
					} else {
						scene.remove(grid);
					}
					grid = new THREE.Object3D();
					create_meso_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid,id_sbl_array,id_meso_array,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

				} 
				if($('.data_ckbx_real_plane').is(':checked')){
					if(grid_plane == null){
					} else {
						scene.remove(grid_plane);
					}
					grid_plane = new THREE.Object3D();
					create_meso_real_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane,id_sbl_array_real_plane,id_meso_array_real_plane,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

				} 
				if($('.data_ckbx_real_plane_points').is(':checked')){
					if(grid_plane_point == null){
					} else {
						scene.remove(grid_plane_point);
					}
					grid_plane_point = new THREE.Object3D();
					create_meso_real_plane_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane_point,id_sbl_array_real_plane_points,id_meso_array_real_plane_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor,number_of_points_real_plane)

				} 
				if($('.data_ckbx_regular_points').is(':checked')){
					if(grid_regular_points == null){
					} else {
						scene.remove(grid_regular_points);
					}
					grid_regular_points = new THREE.Object3D();
					create_meso_plane_regular_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_regular_points,id_sbl_array_regular_points,id_meso_array_regular_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor)
				}
			});
			
			$( "#filter_control_h_min_slider" ).on( "change", function() {
					h_min_factor = this.value/100;
					h_min_factor_label = h_min + (this.value/100) * (h_max - h_min);
					$("#filter_control_h_min_label").html("h min: " + h_min_factor_label)
					if($('.data_ckbx').is(':checked')){
					if(grid == null){
					} else {
						scene.remove(grid);
					}
					grid = new THREE.Object3D();
					create_meso_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid,id_sbl_array,id_meso_array,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

				} 
				if($('.data_ckbx_real_plane').is(':checked')){
					if(grid_plane == null){
					} else {
						scene.remove(grid_plane);
					}
					grid_plane = new THREE.Object3D();
					create_meso_real_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane,id_sbl_array_real_plane,id_meso_array_real_plane,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

				} 
				if($('.data_ckbx_real_plane_points').is(':checked')){
					if(grid_plane_point == null){
					} else {
						scene.remove(grid_plane_point);
					}
					grid_plane_point = new THREE.Object3D();
					create_meso_real_plane_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane_point,id_sbl_array_real_plane_points,id_meso_array_real_plane_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor,number_of_points_real_plane)

				} 
				if($('.data_ckbx_regular_points').is(':checked')){
					if(grid_regular_points == null){
					} else {
						scene.remove(grid_regular_points);
					}
					grid_regular_points = new THREE.Object3D();
					create_meso_plane_regular_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_regular_points,id_sbl_array_regular_points,id_meso_array_regular_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor)
				}
				});
				
			$( "#filter_control_h_max_slider" ).on( "change", function() {
					h_max_factor = this.value/100;
					h_max_factor_label = h_min + (this.value/100) * (h_max - h_min);
					$("#filter_control_h_max_label").html("h max: " + h_max_factor_label)
					if($('.data_ckbx').is(':checked')){
					if(grid == null){
					} else {
						scene.remove(grid);
					}
					grid = new THREE.Object3D();
					create_meso_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid,id_sbl_array,id_meso_array,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

				} 
				if($('.data_ckbx_real_plane').is(':checked')){
					if(grid_plane == null){
					} else {
						scene.remove(grid_plane);
					}
					grid_plane = new THREE.Object3D();
					create_meso_real_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane,id_sbl_array_real_plane,id_meso_array_real_plane,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

				} 
				if($('.data_ckbx_real_plane_points').is(':checked')){
					if(grid_plane_point == null){
					} else {
						scene.remove(grid_plane_point);
					}
					grid_plane_point = new THREE.Object3D();
					create_meso_real_plane_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane_point,id_sbl_array_real_plane_points,id_meso_array_real_plane_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor,number_of_points_real_plane)

				} 
				if($('.data_ckbx_regular_points').is(':checked')){
					if(grid_regular_points == null){
					} else {
						scene.remove(grid_regular_points);
					}
					grid_regular_points = new THREE.Object3D();
					create_meso_plane_regular_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_regular_points,id_sbl_array_regular_points,id_meso_array_regular_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor)
				}
				});
				
			$( "#filter_control_x_min_slider" ).on( "change", function() {
					x_min_factor = this.value/100;
					x_min_factor_label = x_min + (this.value/100) * (x_max - x_min);
					$("#filter_control_x_min_label").html("x min: " + x_min_factor_label)
					if($('.data_ckbx').is(':checked')){
					if(grid == null){
					} else {
						scene.remove(grid);
					}
					grid = new THREE.Object3D();
					create_meso_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid,id_sbl_array,id_meso_array,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

				} 
				if($('.data_ckbx_real_plane').is(':checked')){
					if(grid_plane == null){
					} else {
						scene.remove(grid_plane);
					}
					grid_plane = new THREE.Object3D();
					create_meso_real_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane,id_sbl_array_real_plane,id_meso_array_real_plane,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

				} 
				if($('.data_ckbx_real_plane_points').is(':checked')){
					if(grid_plane_point == null){
					} else {
						scene.remove(grid_plane_point);
					}
					grid_plane_point = new THREE.Object3D();
					create_meso_real_plane_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane_point,id_sbl_array_real_plane_points,id_meso_array_real_plane_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor,number_of_points_real_plane)

				} 
				if($('.data_ckbx_regular_points').is(':checked')){
					if(grid_regular_points == null){
					} else {
						scene.remove(grid_regular_points);
					}
					grid_regular_points = new THREE.Object3D();
					create_meso_plane_regular_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_regular_points,id_sbl_array_regular_points,id_meso_array_regular_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor)
				}
				});
				
			$( "#filter_control_x_max_slider" ).on( "change", function() {
					x_max_factor = this.value/100;
					x_max_factor_label = x_min + (this.value/100) * (x_max - x_min);
					$("#filter_control_x_max_label").html("x max: " + x_max_factor_label)
					if($('.data_ckbx').is(':checked')){
					if(grid == null){
					} else {
						scene.remove(grid);
					}
					grid = new THREE.Object3D();
					create_meso_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid,id_sbl_array,id_meso_array,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

				} 
				if($('.data_ckbx_real_plane').is(':checked')){
					if(grid_plane == null){
					} else {
						scene.remove(grid_plane);
					}
					grid_plane = new THREE.Object3D();
					create_meso_real_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane,id_sbl_array_real_plane,id_meso_array_real_plane,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

				} 
				if($('.data_ckbx_real_plane_points').is(':checked')){
					if(grid_plane_point == null){
					} else {
						scene.remove(grid_plane_point);
					}
					grid_plane_point = new THREE.Object3D();
					create_meso_real_plane_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane_point,id_sbl_array_real_plane_points,id_meso_array_real_plane_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor,number_of_points_real_plane)

				} 
				if($('.data_ckbx_regular_points').is(':checked')){
					if(grid_regular_points == null){
					} else {
						scene.remove(grid_regular_points);
					}
					grid_regular_points = new THREE.Object3D();
					create_meso_plane_regular_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_regular_points,id_sbl_array_regular_points,id_meso_array_regular_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor)
				}
				});
				
			$( "#filter_control_y_min_slider" ).on( "change", function() {
					y_min_factor = this.value/100;
					y_min_factor_label = y_min + (this.value/100) * (y_max - y_min);
					$("#filter_control_y_min_label").html("y min: " + y_min_factor_label)
					if($('.data_ckbx').is(':checked')){
					if(grid == null){
					} else {
						scene.remove(grid);
					}
					grid = new THREE.Object3D();
					create_meso_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid,id_sbl_array,id_meso_array,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

				} 
				if($('.data_ckbx_real_plane').is(':checked')){
					if(grid_plane == null){
					} else {
						scene.remove(grid_plane);
					}
					grid_plane = new THREE.Object3D();
					create_meso_real_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane,id_sbl_array_real_plane,id_meso_array_real_plane,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

				} 
				if($('.data_ckbx_real_plane_points').is(':checked')){
					if(grid_plane_point == null){
					} else {
						scene.remove(grid_plane_point);
					}
					grid_plane_point = new THREE.Object3D();
					create_meso_real_plane_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane_point,id_sbl_array_real_plane_points,id_meso_array_real_plane_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor,number_of_points_real_plane)

				} 
				if($('.data_ckbx_regular_points').is(':checked')){
					if(grid_regular_points == null){
					} else {
						scene.remove(grid_regular_points);
					}
					grid_regular_points = new THREE.Object3D();
					create_meso_plane_regular_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_regular_points,id_sbl_array_regular_points,id_meso_array_regular_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor)
				}
				});
				
			$( "#filter_control_y_max_slider" ).on( "change", function() {
					y_max_factor = this.value/100;
					y_max_factor_label = y_min + (this.value/100) * (y_max - y_min);
					$("#filter_control_y_max_label").html("y max: " + y_max_factor_label)
					if($('.data_ckbx').is(':checked')){
					if(grid == null){
					} else {
						scene.remove(grid);
					}
					grid = new THREE.Object3D();
					create_meso_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid,id_sbl_array,id_meso_array,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

				} 
				if($('.data_ckbx_real_plane').is(':checked')){
					if(grid_plane == null){
					} else {
						scene.remove(grid_plane);
					}
					grid_plane = new THREE.Object3D();
					create_meso_real_plane(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane,id_sbl_array_real_plane,id_meso_array_real_plane,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor);

				} 
				if($('.data_ckbx_real_plane_points').is(':checked')){
					if(grid_plane_point == null){
					} else {
						scene.remove(grid_plane_point);
					}
					grid_plane_point = new THREE.Object3D();
					create_meso_real_plane_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_plane_point,id_sbl_array_real_plane_points,id_meso_array_real_plane_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor,number_of_points_real_plane)

				} 
				if($('.data_ckbx_regular_points').is(':checked')){
					if(grid_regular_points == null){
					} else {
						scene.remove(grid_regular_points);
					}
					grid_regular_points = new THREE.Object3D();
					create_meso_plane_regular_points(data_points_O_2,data_points_U_2,data_points_V_2,data_points_W_2,grid_regular_points,id_sbl_array_regular_points,id_meso_array_regular_points,temp_array,THAT,THAT_W,HCanopy,HCanopy_w,h_factor)
				}
				});
		
		$("#animation_type_temp").on( "click", function() {
			$('#animation_type_x').prop("checked", false);
			$('#animation_type_y').prop("checked", false);
			$('#animation_type_z').prop("checked", false);
			animation_parameter = 'temp';
			
				var material;
				if(is_animated == false){
					material = new THREE.ShaderMaterial( {
						uniforms: {
							color: { value: new THREE.Color( 0xffffff ) },
							pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
							regularSize: { value: regular_size },
							u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
						},
						vertexShader: document.getElementById( 'vertexshader_fix' ).textContent,
						fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
						// blending: THREE.AdditiveBlending,
						//depthTest: false,
						transparent: true
					} );
				} else if (is_animated == true){
					if(animation_parameter == 'temp'){
						material = new THREE.ShaderMaterial( {
							uniforms: {
								color: { value: new THREE.Color( 0xffffff ) },
								pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
								regularSize: { value: regular_size },
								u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
							},
							vertexShader: document.getElementById( 'vertexshader_anim_temp' ).textContent,
							fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
							// blending: THREE.AdditiveBlending,
							//depthTest: false,
							transparent: true
						} );
						
					} else if(animation_parameter == 'Z'){
						material = new THREE.ShaderMaterial( {
							uniforms: {
								color: { value: new THREE.Color( 0xffffff ) },
								pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
								regularSize: { value: regular_size },
								u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
							},
							vertexShader: document.getElementById( 'vertexshader_anim_z' ).textContent,
							fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
							// blending: THREE.AdditiveBlending,
							//depthTest: false,
							transparent: true
						} );
						
					}
				} else if(animation_parameter == 'X'){
					material = new THREE.ShaderMaterial( {
						uniforms: {
							color: { value: new THREE.Color( 0xffffff ) },
							pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
							regularSize: { value: regular_size },
							u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
						},
						vertexShader: document.getElementById( 'vertexshader_anim_x' ).textContent,
						fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
						// blending: THREE.AdditiveBlending,
						//depthTest: false,
						transparent: true
					} );
					
				} else if(animation_parameter == 'Y'){
					material = new THREE.ShaderMaterial( {
						uniforms: {
							color: { value: new THREE.Color( 0xffffff ) },
							pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
							regularSize: { value: regular_size },
							u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
						},
						vertexShader: document.getElementById( 'vertexshader_anim_y' ).textContent,
						fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
						// blending: THREE.AdditiveBlending,
						//depthTest: false,
						transparent: true
					} );
				
				}
			if(grid != null){
				grid.children[0].material = material;
			}
			if(grid_plane != null){
				grid_plane.children[0].material = material;
			}
			if(grid_plane_point != null){
				grid_plane_point.children[0].material = material;
			}
			if(grid_regular_points != null){
				grid_regular_points.children[0].material = material;
			}
		});
		$("#animation_type_x").on( "click", function() {
			$('#animation_type_temp').prop("checked", false);
			$('#animation_type_y').prop("checked", false);
			$('#animation_type_z').prop("checked", false);
			animation_parameter = 'X';
			
				var material;
				if(is_animated == false){
					material = new THREE.ShaderMaterial( {
						uniforms: {
							color: { value: new THREE.Color( 0xffffff ) },
							pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
							regularSize: { value: regular_size },
							u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
						},
						vertexShader: document.getElementById( 'vertexshader_fix' ).textContent,
						fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
						// blending: THREE.AdditiveBlending,
						//depthTest: false,
						transparent: true
					} );
				} else if (is_animated == true){
					if(animation_parameter == 'temp'){
						material = new THREE.ShaderMaterial( {
							uniforms: {
								color: { value: new THREE.Color( 0xffffff ) },
								pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
								regularSize: { value: regular_size },
								u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
							},
							vertexShader: document.getElementById( 'vertexshader_anim_temp' ).textContent,
							fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
							// blending: THREE.AdditiveBlending,
							//depthTest: false,
							transparent: true
						} );
						
					} else if(animation_parameter == 'Z'){
						material = new THREE.ShaderMaterial( {
							uniforms: {
								color: { value: new THREE.Color( 0xffffff ) },
								pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
								regularSize: { value: regular_size },
								u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
							},
							vertexShader: document.getElementById( 'vertexshader_anim_z' ).textContent,
							fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
							// blending: THREE.AdditiveBlending,
							//depthTest: false,
							transparent: true
						} );
						
					}
				} else if(animation_parameter == 'X'){
					material = new THREE.ShaderMaterial( {
						uniforms: {
							color: { value: new THREE.Color( 0xffffff ) },
							pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
							regularSize: { value: regular_size },
							u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
						},
						vertexShader: document.getElementById( 'vertexshader_anim_x' ).textContent,
						fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
						// blending: THREE.AdditiveBlending,
						//depthTest: false,
						transparent: true
					} );
					
				} else if(animation_parameter == 'Y'){
					material = new THREE.ShaderMaterial( {
						uniforms: {
							color: { value: new THREE.Color( 0xffffff ) },
							pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
							regularSize: { value: regular_size },
							u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
						},
						vertexShader: document.getElementById( 'vertexshader_anim_y' ).textContent,
						fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
						// blending: THREE.AdditiveBlending,
						//depthTest: false,
						transparent: true
					} );
				
				}
				if(grid != null){
				grid.children[0].material = material;
			}
			if(grid_plane != null){
				grid_plane.children[0].material = material;
			}
			if(grid_plane_point != null){
				grid_plane_point.children[0].material = material;
			}
			if(grid_regular_points != null){
				grid_regular_points.children[0].material = material;
			}
		});
		$("#animation_type_y").on( "click", function() {
			$('#animation_type_x').prop("checked", false);
			$('#animation_type_temp').prop("checked", false);
			$('#animation_type_z').prop("checked", false);
			animation_parameter = 'Y';
			
				var material;
				if(is_animated == false){
					material = new THREE.ShaderMaterial( {
						uniforms: {
							color: { value: new THREE.Color( 0xffffff ) },
							pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
							regularSize: { value: regular_size },
							u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
						},
						vertexShader: document.getElementById( 'vertexshader_fix' ).textContent,
						fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
						// blending: THREE.AdditiveBlending,
						//depthTest: false,
						transparent: true
					} );
				} else if (is_animated == true){
					if(animation_parameter == 'temp'){
						material = new THREE.ShaderMaterial( {
							uniforms: {
								color: { value: new THREE.Color( 0xffffff ) },
								pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
								regularSize: { value: regular_size },
								u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
							},
							vertexShader: document.getElementById( 'vertexshader_anim_temp' ).textContent,
							fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
							// blending: THREE.AdditiveBlending,
							//depthTest: false,
							transparent: true
						} );
						
					} else if(animation_parameter == 'Z'){
						material = new THREE.ShaderMaterial( {
							uniforms: {
								color: { value: new THREE.Color( 0xffffff ) },
								pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
								regularSize: { value: regular_size },
								u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
							},
							vertexShader: document.getElementById( 'vertexshader_anim_z' ).textContent,
							fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
							// blending: THREE.AdditiveBlending,
							//depthTest: false,
							transparent: true
						} );
						
					}
				} else if(animation_parameter == 'X'){
					material = new THREE.ShaderMaterial( {
						uniforms: {
							color: { value: new THREE.Color( 0xffffff ) },
							pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
							regularSize: { value: regular_size },
							u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
						},
						vertexShader: document.getElementById( 'vertexshader_anim_x' ).textContent,
						fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
						// blending: THREE.AdditiveBlending,
						//depthTest: false,
						transparent: true
					} );
					
				} else if(animation_parameter == 'Y'){
					material = new THREE.ShaderMaterial( {
						uniforms: {
							color: { value: new THREE.Color( 0xffffff ) },
							pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
							regularSize: { value: regular_size },
							u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
						},
						vertexShader: document.getElementById( 'vertexshader_anim_y' ).textContent,
						fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
						// blending: THREE.AdditiveBlending,
						//depthTest: false,
						transparent: true
					} );
				
				}
				if(grid != null){
				grid.children[0].material = material;
			}
			if(grid_plane != null){
				grid_plane.children[0].material = material;
			}
			if(grid_plane_point != null){
				grid_plane_point.children[0].material = material;
			}
			if(grid_regular_points != null){
				grid_regular_points.children[0].material = material;
			}
		});
		$("#animation_type_z").on( "click", function() {
			$('#animation_type_x').prop("checked", false);
			$('#animation_type_y').prop("checked", false);
			$('#animation_type_temp').prop("checked", false);
			animation_parameter = 'Z';
			
				var material;
				if(is_animated == false){
					material = new THREE.ShaderMaterial( {
						uniforms: {
							color: { value: new THREE.Color( 0xffffff ) },
							pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
							regularSize: { value: regular_size },
							u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
						},
						vertexShader: document.getElementById( 'vertexshader_fix' ).textContent,
						fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
						// blending: THREE.AdditiveBlending,
						//depthTest: false,
						transparent: true
					} );
				} else if (is_animated == true){
					if(animation_parameter == 'temp'){
						material = new THREE.ShaderMaterial( {
							uniforms: {
								color: { value: new THREE.Color( 0xffffff ) },
								pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
								regularSize: { value: regular_size },
								u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
							},
							vertexShader: document.getElementById( 'vertexshader_anim_temp' ).textContent,
							fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
							// blending: THREE.AdditiveBlending,
							//depthTest: false,
							transparent: true
						} );
						
					} else if(animation_parameter == 'Z'){
						material = new THREE.ShaderMaterial( {
							uniforms: {
								color: { value: new THREE.Color( 0xffffff ) },
								pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
								regularSize: { value: regular_size },
								u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
							},
							vertexShader: document.getElementById( 'vertexshader_anim_z' ).textContent,
							fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
							// blending: THREE.AdditiveBlending,
							//depthTest: false,
							transparent: true
						} );
						
					}
				} else if(animation_parameter == 'X'){
					material = new THREE.ShaderMaterial( {
						uniforms: {
							color: { value: new THREE.Color( 0xffffff ) },
							pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
							regularSize: { value: regular_size },
							u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
						},
						vertexShader: document.getElementById( 'vertexshader_anim_x' ).textContent,
						fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
						// blending: THREE.AdditiveBlending,
						//depthTest: false,
						transparent: true
					} );
					
				} else if(animation_parameter == 'Y'){
					material = new THREE.ShaderMaterial( {
						uniforms: {
							color: { value: new THREE.Color( 0xffffff ) },
							pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
							regularSize: { value: regular_size },
							u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
						},
						vertexShader: document.getElementById( 'vertexshader_anim_y' ).textContent,
						fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
						// blending: THREE.AdditiveBlending,
						//depthTest: false,
						transparent: true
					} );
				
				}
				if(grid != null){
				grid.children[0].material = material;
			}
			if(grid_plane != null){
				grid_plane.children[0].material = material;
			}
			if(grid_plane_point != null){
				grid_plane_point.children[0].material = material;
			}
			if(grid_regular_points != null){
				grid_regular_points.children[0].material = material;
			}
		});
		
		
		$( "#animation_speed_slider" ).on( "change", function() {
			animation_speed_factor = (this.value - 100)/10000;
			$("#animation_speed_control_label").html("animation_speed_factor: " + animation_speed_factor);
		});
				
		//$( function() {
		//    $( "#h_control_slider" ).slider({
		//	  range: true,
		//	  min: 1,
		//	  max: 19,
		//	  values: 10,
		//	  slide: function( event, ui ) {
		//		if(ui.value > 10){
		//			h_factor = ui.value -9;
		//		} else {
		//			h_factor = ui.value/10;
		//		}
		//		create_meso_plane(data_points_O_2,data_points_U_2,data_points_V_2,grid,id_sbl_array,id_meso_array,temp_array,THAT,h_factor);
		//	  }
		//	  });
		//	 $( "#temp_control_slider" ).slider({
		//	  range: true,
		//	  min: 290,
		//	  max: 310,
		//	  values: [ 295, 302 ],
		//	  slide: function( event, ui ) {
		//		temp_array = [ui.values[ 0 ],ui.values[ 1 ]]
		//		create_meso_plane(data_points_O_2,data_points_U_2,data_points_V_2,grid,id_sbl_array,id_meso_array,temp_array,THAT,h_factor);
		//	  }
		//	  });
		//	  
		//	  })
		
		
		
		
		
		
		
		$(".data_ckbx_roads").on( "click", function() {
			id_meso_array_roads = [];
			id_sbl_array_roads = [];
			var ckbx_length_real_plane = $(".data_ckbx_roads").length;
			for(var c=0; c<ckbx_length_real_plane;c++){
				if($(".data_ckbx_roads")[c].checked == true){
					if($(".data_ckbx_roads")[c].id.split("_")[0] == "SBL"){
						id_sbl_array_roads.push(parseInt($(".data_ckbx_roads")[c].id.split("_")[1]));
					} else if($(".data_ckbx_roads")[c].id.split("_")[0] == "Meso"){
						id_meso_array_roads.push(parseInt($(".data_ckbx_roads")[c].id.split("_")[1]));
					}				
				}
			}
			
			if(grid_road == null){
				} else {
					scene.remove(grid_road);
				}
				grid_road = new THREE.Object3D();	
			$.getJSON( url_data_road, function( data ) {
				//import_geojson(data,grid_bat,scene,$('type_bati').val;);
				import_road_geojson(data,grid_road,scene);
			});
			
			
			
		
		});
		
		
		
		
		
		
		
		
		
	}
	
	
	function create_meso_plane(MesoNH_O_array,MesoNH_U_array,MesoNH_V_array,MesoNH_W_array,grid,id_sbl_array,id_meso_array,temperature_scale,THAT,THAT_W,HCanopy,HCanopy_w,h_factor,color_array){
		
		temp_values = [];
		// //all
		//var ni = 26, 
		//nj = 22;
		// paris_centre
		//var ni = 9, 
		//nj = 6;
		// paris_beaubourg
		//var ni = 7, 
		//nj = 8;
		var ni = data_ni, 
		nj = data_nj;
		
		var coord_array = [];
		var colors = [];
		var sizes = [];
		var transparency_factor_array = [];
		var custompercentagearray = [];
		var z_position_array = [];
		var x_position_array = [];
		var y_position_array = [];
		
		var h_position_array = [];
		
		z_min = null;
		z_max = null;
		x_min = null;
		x_max = null;
		y_min = null;
		y_max = null;
		
		h_min = null;
		h_max = null;
		
		for(var m=0; m<id_sbl_array.length; m++){
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					var index_1 = j*ni + i;
					var h;
					var h_w;
					switch(id_sbl_array[m]){
						case 1:
							h = HCanopy[0];
							h_w = HCanopy_w[0];
							break;
						case 2:
							h = HCanopy[1];
							h_w = HCanopy_w[1];
							break;
						case 3:
							h = HCanopy[2];
							h_w = HCanopy_w[2];
							break;
						case 4:
							h = HCanopy[3];
							h_w = HCanopy_w[3];
							break;
						case 5:
							h = HCanopy[4];
							h_w = HCanopy_w[4];
							break;
						case 6:
							h = HCanopy[5];
							h_w = HCanopy_w[5];
							break;
						default:
							return;
					}
					
					
					var x_o = MesoNH_O_array[index_1].x - Coord_X_paris;
					var y_o = MesoNH_O_array[index_1].y - Coord_Y_paris;					
					var z_o = MesoNH_O_array[index_1].zs + h;
									
					var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
					var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
					var l_z = (h - h_w)*2;
					
					if(h_min != null && h_max != null){
						if(h_w < h_min){
							h_min = h_w;
						}
						if((h_w + l_z) > h_max){
							h_max = (h_w + l_z);
						}
					} else {
						h_min = h_w;
						h_max = (h_w + l_z);
					}
					
					if(z_min != null && z_max != null){
						if((z_o - l_z/2) < z_min){
							z_min = z_o - l_z/2;
						}
						if((z_o + l_z/2) > z_max){
							z_max = z_o + l_z/2;
						}
					} else {
						z_min = z_o - l_z/2;
						z_max = z_o + l_z/2;
					}
					
					if(x_min != null && x_max != null){
						if((x_o - l_x/2) < x_min){
							x_min = x_o - l_x/2;
						}
						if((x_o + l_x/2) > x_max){
							x_max = x_o + l_x/2;
						}
					} else {
						x_min = x_o - l_x/2;
						x_max = x_o + l_x/2;
					}
					
					if(y_min != null && y_max != null){
						if((y_o - l_y/2) < y_min){
							y_min = y_o - l_y/2;
						}
						if((y_o + l_y/2) > y_max){
							y_max = y_o + l_y/2;
						}
					} else {
						y_min = y_o - l_y/2;
						y_max = y_o + l_y/2;
					}
					
				}
			}
		}	
		

		for(var m=0; m<id_meso_array.length; m++){
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					var index_1 = j*ni + i;
					
					var h;
					var h_w;
					switch(id_meso_array[m]){
						case 2:
							h = THAT[1];
							h_w = THAT_W[1];
							break;
						case 3:
							h = THAT[2];
							h_w = THAT_W[2];
							break;
						case 4:
							h = THAT[3];
							h_w = THAT_W[3];
							break;
						case 5:
							h = THAT[4];
							h_w = THAT_W[4];
							break;
						case 6:
							h = THAT[5];
							h_w = THAT_W[5];
							break;
						case 7:
							h = THAT[6];
							h_w = THAT_W[6];
							break;
						case 8:
							h = THAT[7];
							h_w = THAT_W[7];
							break;
						case 9:
							h = THAT[8];
							h_w = THAT_W[8];
							break;
						case 10:
							h = THAT[9];
							h_w = THAT_W[9];
							break;
						case 11:
							h = THAT[10];
							h_w = THAT_W[10];
							break;
						case 12:
							h = THAT[11];
							h_w = THAT_W[11];
							break;
						case 13:
							h = THAT[12];
							h_w = THAT_W[12];
							break;
						case 14:
							h = THAT[13];
							h_w = THAT_W[13];
							break;
						case 15:
							h = THAT[14];
							h_w = THAT_W[14];
							break;
						case 16:
							h = THAT[15];
							h_w = THAT_W[15];
							break;
						case 17:
							h = THAT[16];
							h_w = THAT_W[16];
							break;
						case 18:
							h = THAT[17];
							h_w = THAT_W[17];
							break;
						case 19:
							h = THAT[18];
							h_w = THAT_W[18];
							break;
						case 20:
							h = THAT[19];
							h_w = THAT_W[19];
							break;
						case 21:
							h = THAT[20];
							h_w = THAT_W[20];
							break;
						case 22:
							h = THAT[21];
							h_w = THAT_W[21];
							break;
						case 23:
							h = THAT[22];
							h_w = THAT_W[22];
							break;
						case 24:
							h = THAT[23];
							h_w = THAT_W[23];
							break;
						case 25:
							h = THAT[24];
							h_w = THAT_W[24];
							break;
						case 26:
							h = THAT[25];
							h_w = THAT_W[25];
							break;
						case 27:
							h = THAT[26];
							h_w = THAT_W[26];
							break;
						case 28:
							h = THAT[27];
							h_w = THAT_W[27];
							break;
						case 29:
							h = THAT[28];
							h_w = THAT_W[28];
							break;
						case 30:
							h = THAT[29];
							h_w = THAT_W[29];
							break;
						case 31:
							h = THAT[30];
							h_w = THAT_W[30];
							break;
						case 32:
							h = THAT[31];
							h_w = THAT_W[31];
							break;
						default:
							return;
					}
													
					var x_o = MesoNH_O_array[index_1].x - Coord_X_paris;
					var y_o = MesoNH_O_array[index_1].y - Coord_Y_paris;					
					var z_o = MesoNH_O_array[index_1].zs + h;
					
					var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
					var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
					var l_z = (h-h_w)*2;
									
					if(h_min != null && h_max != null){
						if(h_w < h_min){
							h_min = h_w;
						}
						if((h_w + l_z) > h_max){
							h_max = (h_w + l_z);
						}
					} else {
						h_min = h_w;
						h_max = (h_w + l_z);
					}
						
					if(z_min != null && z_max != null){
						if((z_o - l_z/2) < z_min){
							z_min = z_o - l_z/2;
						}
						if((z_o + l_z/2) > z_max){
							z_max = z_o + l_z/2;
						}
					} else {
						z_min = z_o - l_z/2;
						z_max = z_o + l_z/2;
					}
					
					if(x_min != null && x_max != null){
						if((x_o - l_x/2) < x_min){
							x_min = x_o - l_x/2;
						}
						if((x_o + l_x/2) > x_max){
							x_max = x_o + l_x/2;
						}
					} else {
						x_min = x_o - l_x/2;
						x_max = x_o + l_x/2;
					}
					
					if(y_min != null && y_max != null){
						if((y_o - l_y/2) < y_min){
							y_min = y_o - l_y/2;
						}
						if((y_o + l_y/2) > y_max){
							y_max = y_o + l_y/2;
						}
					} else {
						y_min = y_o - l_y/2;
						y_max = y_o + l_y/2;
					}
				
					
				}
			}
		}	
		
		for(var m=0; m<id_sbl_array.length; m++){
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					var index_1 = j*ni + i;
					var temp;
					var h;
					var h_w;
					switch(id_sbl_array[m]){
						case 1:
							temp = MesoNH_O_array[index_1].teb_1;
							h = HCanopy[0];
							h_w = HCanopy_w[0];
							break;
						case 2:
							temp = MesoNH_O_array[index_1].teb_2;
							h = HCanopy[1];
							h_w = HCanopy_w[1];
							break;
						case 3:
							temp = MesoNH_O_array[index_1].teb_3;
							h = HCanopy[2];
							h_w = HCanopy_w[2];
							break;
						case 4:
							temp = MesoNH_O_array[index_1].teb_4;
							h = HCanopy[3];
							h_w = HCanopy_w[3];
							break;
						case 5:
							temp = MesoNH_O_array[index_1].teb_5;
							h = HCanopy[4];
							h_w = HCanopy_w[4];
							break;
						case 6:
							temp = MesoNH_O_array[index_1].teb_6;
							h = HCanopy[5];
							h_w = HCanopy_w[5];
							break;
						default:
							return;
					}
					
					
					var x_o = MesoNH_O_array[index_1].x - Coord_X_paris;
					var y_o = MesoNH_O_array[index_1].y - Coord_Y_paris;					
					var z_o = MesoNH_O_array[index_1].zs + h;
									
					var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
					var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
					var l_z = (h - h_w)*2;
					
													
					var tmin = temperature_scale[0];
					var tmax = temperature_scale[1];
					var percentage_color = (temp - tmin)/(tmax - tmin);
					if(percentage_color<0){
						percentage_color = 0;
					} else if(percentage_color >1){
						percentage_color = 1;
					}
					
					//var color_hex;
					//if(percentage_color<0.5){
					//	color_hex = approximateColor1ToColor2ByPercent(color_array[0], color_array[1], percentage_color*2)
					//} else {
					//	color_hex = approximateColor1ToColor2ByPercent(color_array[1], color_array[2], (percentage_color-0.5)*2)
					//}
					
					temp_values.push(parseFloat(temp));
					var color_hex = getHCLcolor(percentage_color,HCL_color_scales[active_HCL_id].scale);
												
					var color_rgb = hexToRgb(color_hex)
					
					var color_r = color_rgb.r/255;
					var color_g = color_rgb.g/255;
					var color_b = color_rgb.b/255;
						
					var cell_volume = l_x*l_y*l_z;
					
					var relative_density;
					
					if(relative_density_factor < 1){
						var add_factor = 1-relative_density_factor;
						if(percentage_color < 0.5){
							relative_density = particle_density + particle_density*add_factor*(0.5-percentage_color)*2;
						} else if(percentage_color == 0.5){
							relative_density = particle_density;
						} else if(percentage_color > 0.5){
							relative_density = particle_density - particle_density*add_factor*(percentage_color-0.5)*2;
						}
					} else if(relative_density_factor == 1){
						relative_density = particle_density;
					} else if(relative_density_factor >1){
						var add_factor = relative_density_factor-1;
						if(percentage_color < 0.5){
							relative_density = particle_density - particle_density*add_factor*(0.5-percentage_color)*2;
						} else if(percentage_color == 0.5){
							relative_density = particle_density;
						} else if(percentage_color > 0.5){
							relative_density = particle_density + particle_density*add_factor*(percentage_color-0.5)*2;
						}
					}
					
					//var relative_density = particle_density*(relative_density_factor+1)*percentage_color;
					var particle_length = parseInt(relative_density*cell_volume);
					
					//var size = percentage_color*100000;
					
					var size;
					var basic_size = 10000;
					
					if(relative_size_factor < 1){
						var add_factor = 1-relative_size_factor;
						if(percentage_color < 0.5){
							size = parseInt(basic_size + basic_size*add_factor*(0.5-percentage_color)*2);
						} else if(percentage_color == 0.5){
							size = basic_size;
						} else if(percentage_color > 0.5){
							size = parseInt(basic_size - basic_size*add_factor*(percentage_color-0.5)*2);
						}
					} else if(relative_size_factor == 1){
						size = basic_size;
					} else if(relative_size_factor >1){
						var add_factor = relative_size_factor-1;
						if(percentage_color < 0.5){
							size = parseInt(basic_size - basic_size*add_factor*(0.5-percentage_color)*2);
						} else if(percentage_color == 0.5){
							size = basic_size;
						} else if(percentage_color > 0.5){
							size = parseInt(basic_size + basic_size*add_factor*(percentage_color-0.5)*2);
						}
					}
											
					for(var p =0; p< particle_length; p++){
						var pX = (Math.random()-0.5)*2 * (l_x/2) + x_o,
						 pY = (Math.random()-0.5)*2 * (l_y/2) + y_o,
						 pZ = (Math.random()-0.5)*2 * (l_z/2) + z_o;
						coord_array.push(pX*cst_X);
						coord_array.push(pZ*cst_Z);
						coord_array.push(-pY*cst_Y);
						colors.push(color_r);colors.push(color_g);colors.push(color_b);
						sizes.push(size);
						transparency_factor_array.push(transparency_factor);
						custompercentagearray.push(percentage_color*2*Math.PI);
						z_position_array.push((pZ - z_min)/(z_max - z_min));
						x_position_array.push((pX - x_min)/(x_max - x_min));
						y_position_array.push((pY - y_min)/(y_max - y_min));
						h_position_array.push(((pZ-MesoNH_O_array[index_1].zs)-h_min)/(h_max - h_min));
					}
				}
			}
		}	
		

		for(var m=0; m<id_meso_array.length; m++){
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					var index_1 = j*ni + i;
					
					var temp;
					var h;
					var h_w;
					switch(id_meso_array[m]){
						case 2:
							temp = MesoNH_O_array[index_1].tht_2;
							h = THAT[1];
							h_w = THAT_W[1];
							break;
						case 3:
							temp = MesoNH_O_array[index_1].tht_3;
							h = THAT[2];
							h_w = THAT_W[2];
							break;
						case 4:
							temp = MesoNH_O_array[index_1].tht_4;
							h = THAT[3];
							h_w = THAT_W[3];
							break;
						case 5:
							temp = MesoNH_O_array[index_1].tht_5;
							h = THAT[4];
							h_w = THAT_W[4];
							break;
						case 6:
							temp = MesoNH_O_array[index_1].tht_6;
							h = THAT[5];
							h_w = THAT_W[5];
							break;
						case 7:
							temp = MesoNH_O_array[index_1].tht_7;
							h = THAT[6];
							h_w = THAT_W[6];
							break;
						case 8:
							temp = MesoNH_O_array[index_1].tht_8;
							h = THAT[7];
							h_w = THAT_W[7];
							break;
						case 9:
							temp = MesoNH_O_array[index_1].tht_9;
							h = THAT[8];
							h_w = THAT_W[8];
							break;
						case 10:
							temp = MesoNH_O_array[index_1].tht_10;
							h = THAT[9];
							h_w = THAT_W[9];
							break;
						case 11:
							temp = MesoNH_O_array[index_1].tht_11;
							h = THAT[10];
							h_w = THAT_W[10];
							break;
						case 12:
							temp = MesoNH_O_array[index_1].tht_12;
							h = THAT[11];
							h_w = THAT_W[11];
							break;
						case 13:
							temp = MesoNH_O_array[index_1].tht_13;
							h = THAT[12];
							h_w = THAT_W[12];
							break;
						case 14:
							temp = MesoNH_O_array[index_1].tht_14;
							h = THAT[13];
							h_w = THAT_W[13];
							break;
						case 15:
							temp = MesoNH_O_array[index_1].tht_15;
							h = THAT[14];
							h_w = THAT_W[14];
							break;
						case 16:
							temp = MesoNH_O_array[index_1].tht_16;
							h = THAT[15];
							h_w = THAT_W[15];
							break;
						case 17:
							temp = MesoNH_O_array[index_1].tht_17;
							h = THAT[16];
							h_w = THAT_W[16];
							break;
						case 18:
							temp = MesoNH_O_array[index_1].tht_18;
							h = THAT[17];
							h_w = THAT_W[17];
							break;
						case 19:
							temp = MesoNH_O_array[index_1].tht_19;
							h = THAT[18];
							h_w = THAT_W[18];
							break;
						case 20:
							temp = MesoNH_O_array[index_1].tht_20;
							h = THAT[19];
							h_w = THAT_W[19];
							break;
						case 21:
							temp = MesoNH_O_array[index_1].tht_21;
							h = THAT[20];
							h_w = THAT_W[20];
							break;
						case 22:
							temp = MesoNH_O_array[index_1].tht_22;
							h = THAT[21];
							h_w = THAT_W[21];
							break;
						case 23:
							temp = MesoNH_O_array[index_1].tht_23;
							h = THAT[22];
							h_w = THAT_W[22];
							break;
						case 24:
							temp = MesoNH_O_array[index_1].tht_24;
							h = THAT[23];
							h_w = THAT_W[23];
							break;
						case 25:
							temp = MesoNH_O_array[index_1].tht_25;
							h = THAT[24];
							h_w = THAT_W[24];
							break;
						case 26:
							temp = MesoNH_O_array[index_1].tht_26;
							h = THAT[25];
							h_w = THAT_W[25];
							break;
						case 27:
							temp = MesoNH_O_array[index_1].tht_27;
							h = THAT[26];
							h_w = THAT_W[26];
							break;
						case 28:
							temp = MesoNH_O_array[index_1].tht_28;
							h = THAT[27];
							h_w = THAT_W[27];
							break;
						case 29:
							temp = MesoNH_O_array[index_1].tht_29;
							h = THAT[28];
							h_w = THAT_W[28];
							break;
						case 30:
							temp = MesoNH_O_array[index_1].tht_30;
							h = THAT[29];
							h_w = THAT_W[29];
							break;
						case 31:
							temp = MesoNH_O_array[index_1].tht_31;
							h = THAT[30];
							h_w = THAT_W[30];
							break;
						case 32:
							temp = MesoNH_O_array[index_1].tht_32;
							h = THAT[31];
							h_w = THAT_W[31];
							break;
						default:
							return;
					}
													
					var x_o = MesoNH_O_array[index_1].x - Coord_X_paris;
					var y_o = MesoNH_O_array[index_1].y - Coord_Y_paris;					
					var z_o = MesoNH_O_array[index_1].zs + h;
					
					var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
					var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
					var l_z = (h-h_w)*2;
									
									
					var tmin = temperature_scale[0];
					var tmax = temperature_scale[1];
					var percentage_color = (temp - tmin)/(tmax - tmin);
					if(percentage_color<0){
						percentage_color = 0;
					} else if(percentage_color >1){
						percentage_color = 1;
					}
					
					//var color_hex;
					//if(percentage_color<0.5){
					//	color_hex = approximateColor1ToColor2ByPercent(color_array[0], color_array[1], percentage_color*2)
					//} else {
					//	color_hex = approximateColor1ToColor2ByPercent(color_array[1], color_array[2], (percentage_color-0.5)*2)
					//}
					
					temp_values.push(parseFloat(temp));
					var color_hex = getHCLcolor(percentage_color,HCL_color_scales[active_HCL_id].scale);
												
					var color_rgb = hexToRgb(color_hex)
					
					var color_r = color_rgb.r/255;
					var color_g = color_rgb.g/255;
					var color_b = color_rgb.b/255;
						
					var cell_volume = l_x*l_y*l_z;
					
					var relative_density;
					
					if(relative_density_factor < 1){
						var add_factor = 1-relative_density_factor;
						if(percentage_color < 0.5){
							relative_density = particle_density + particle_density*add_factor*(0.5-percentage_color)*2;
						} else if(percentage_color == 0.5){
							relative_density = particle_density;
						} else if(percentage_color > 0.5){
							relative_density = particle_density - particle_density*add_factor*(percentage_color-0.5)*2;
						}
					} else if(relative_density_factor == 1){
						relative_density = particle_density;
					} else if(relative_density_factor >1){
						var add_factor = relative_density_factor-1;
						if(percentage_color < 0.5){
							relative_density = particle_density - particle_density*add_factor*(0.5-percentage_color)*2;
						} else if(percentage_color == 0.5){
							relative_density = particle_density;
						} else if(percentage_color > 0.5){
							relative_density = particle_density + particle_density*add_factor*(percentage_color-0.5)*2;
						}
					}
					
					
					//var relative_density = particle_density*(relative_density_factor+1)*percentage_color;
					var particle_length = parseInt(relative_density*cell_volume);
					
										
					//var size = percentage_color*100000;
					
					var size;
					var basic_size = 10000;
					
					if(relative_size_factor < 1){
						var add_factor = 1-relative_size_factor;
						if(percentage_color < 0.5){
							size = parseInt(basic_size + basic_size*add_factor*(0.5-percentage_color)*2);
						} else if(percentage_color == 0.5){
							size = basic_size;
						} else if(percentage_color > 0.5){
							size = parseInt(basic_size - basic_size*add_factor*(percentage_color-0.5)*2);
						}
					} else if(relative_size_factor == 1){
						size = basic_size;
					} else if(relative_size_factor >1){
						var add_factor = relative_size_factor-1;
						if(percentage_color < 0.5){
							size = parseInt(basic_size - basic_size*add_factor*(0.5-percentage_color)*2);
						} else if(percentage_color == 0.5){
							size = basic_size;
						} else if(percentage_color > 0.5){
							size = parseInt(basic_size + basic_size*add_factor*(percentage_color-0.5)*2);
						}
					}
						
					//for(var p =0; p< particle_length; p++){
					for(var p =0; p< particle_length; p++){
						var pX = (Math.random()-0.5)*2 * (l_x/2) + x_o,
						  pY = (Math.random()-0.5)*2 * (l_y/2) + y_o,
						  pZ = (Math.random()-0.5)*2 * (l_z/2) + z_o;
						coord_array.push(pX*cst_X);
						coord_array.push(pZ*cst_Z);
						coord_array.push(-pY*cst_Y);
						colors.push(color_r);colors.push(color_g);colors.push(color_b);
						sizes.push(size);
						transparency_factor_array.push(transparency_factor);
						custompercentagearray.push(percentage_color*2*Math.PI);
						z_position_array.push((pZ - z_min)/(z_max - z_min));
						x_position_array.push((pX - x_min)/(x_max - x_min));
						y_position_array.push((pY - y_min)/(y_max - y_min));
						h_position_array.push(((pZ-MesoNH_O_array[index_1].zs)-h_min)/(h_max - h_min));
					}
					
				}
			}
		}	
		
		
		
				
		var coord_array_32 = new Float32Array(coord_array);
		var colors_32 = new Float32Array(colors);  
		var sizes_32 = new Float32Array(sizes);
		var transparency_factor_32 = new Float32Array(transparency_factor_array);
		var custompercentage_32 = new Float32Array(custompercentagearray);
		var z_position_array_32 = new Float32Array(z_position_array);
		var x_position_array_32 = new Float32Array(x_position_array);
		var y_position_array_32 = new Float32Array(y_position_array);
		var h_position_array_32 = new Float32Array(h_position_array);
		
			
		//var material = new THREE.PointsMaterial({  vertexColors: THREE.VertexColors  });
		
		var material;
		var bufferGeometry = new THREE.BufferGeometry();
		
		bufferGeometry.setAttribute( 'position', new THREE.BufferAttribute( coord_array_32, 3 ) );
		bufferGeometry.setAttribute( 'customColor', new THREE.BufferAttribute( colors_32, 3 ) );
		bufferGeometry.setAttribute( 'customsize', new THREE.BufferAttribute(sizes_32,1));
		bufferGeometry.setAttribute( 'customtransparency', new THREE.BufferAttribute(transparency_factor_32,1));
		bufferGeometry.setAttribute( 'custompercentage', new THREE.BufferAttribute(custompercentage_32,1));
		bufferGeometry.setAttribute( 'z_position', new THREE.BufferAttribute(z_position_array_32,1));
		bufferGeometry.setAttribute( 'x_position', new THREE.BufferAttribute(x_position_array_32,1));
		bufferGeometry.setAttribute( 'y_position', new THREE.BufferAttribute(y_position_array_32,1));
		bufferGeometry.setAttribute( 'h_position', new THREE.BufferAttribute(h_position_array_32,1));
			
		if(is_animated == false){
			material = new THREE.ShaderMaterial( {
				uniforms: {
					color: { value: new THREE.Color( 0xffffff ) },
					pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
					regularSize: { value: regular_size },
					u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
				},
				vertexShader: document.getElementById( 'vertexshader_fix' ).textContent,
				fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
				// blending: THREE.AdditiveBlending,
				//depthTest: false,
				transparent: true
			} );
		} else if (is_animated == true){
			if(animation_parameter == 'temp'){
				material = new THREE.ShaderMaterial( {
					uniforms: {
						color: { value: new THREE.Color( 0xffffff ) },
						pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
						regularSize: { value: regular_size },
						u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
					},
					vertexShader: document.getElementById( 'vertexshader_anim_temp' ).textContent,
					fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
					// blending: THREE.AdditiveBlending,
					//depthTest: false,
					transparent: true
				} );
				
			} else if(animation_parameter == 'Z'){
				material = new THREE.ShaderMaterial( {
					uniforms: {
						color: { value: new THREE.Color( 0xffffff ) },
						pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
						regularSize: { value: regular_size },
						u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
					},
					vertexShader: document.getElementById( 'vertexshader_anim_z' ).textContent,
					fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
					// blending: THREE.AdditiveBlending,
					//depthTest: false,
					transparent: true
				} );
				
			} else if(animation_parameter == 'X'){
				material = new THREE.ShaderMaterial( {
					uniforms: {
						color: { value: new THREE.Color( 0xffffff ) },
						pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
						regularSize: { value: regular_size },
						u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
					},
					vertexShader: document.getElementById( 'vertexshader_anim_x' ).textContent,
					fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
					// blending: THREE.AdditiveBlending,
					//depthTest: false,
					transparent: true
				} );
				
			} else if(animation_parameter == 'Y'){
				material = new THREE.ShaderMaterial( {
					uniforms: {
						color: { value: new THREE.Color( 0xffffff ) },
						pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
						regularSize: { value: regular_size },
						u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
					},
					vertexShader: document.getElementById( 'vertexshader_anim_y' ).textContent,
					fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
					// blending: THREE.AdditiveBlending,
					//depthTest: false,
					transparent: true
				} );
				
			}
		}
		
        
		// itemSize = 3 setAttribute there are 3 values (components) per vertex
		
		
		
	
		var point = new THREE.Points( bufferGeometry, material);
				
		create_temp_histogram();		
				
		grid.add(point);
		scene.add(grid);
	}
	
	function create_meso_real_plane(MesoNH_O_array,MesoNH_U_array,MesoNH_V_array,MesoNH_W_array,grid,id_sbl_array,id_meso_array,temperature_scale,THAT,THAT_W,HCanopy,HCanopy_w,h_factor,color_array){
	
		temp_values = [];
		// //all
		//var ni = 26, 
		//nj = 22;
		// paris_centre
		//var ni = 9, 
		//nj = 6;
		// paris_beaubourg
		var ni = data_ni, 
		nj = data_nj;
				
		var coord_array = [];
		var colors = [];
		var sizes = [];
		var transparency_factor_array = [];
		var custompercentagearray = [];
		var z_position_array = [];
		var x_position_array = [];
		var y_position_array = [];
		
		var h_position_array = [];
		
		z_min = null;
		z_max = null;
		x_min = null;
		x_max = null;
		y_min = null;
		y_max = null;
		
		h_min = null;
		h_max = null;
		
		for(var m=0; m<id_sbl_array.length; m++){
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					var index_1 = j*ni + i;
					var h;
					var h_w;
					switch(id_sbl_array[m]){
						case 1:
							h = HCanopy[0];
							h_w = HCanopy_w[0];
							break;
						case 2:
							h = HCanopy[1];
							h_w = HCanopy_w[1];
							break;
						case 3:
							h = HCanopy[2];
							h_w = HCanopy_w[2];
							break;
						case 4:
							h = HCanopy[3];
							h_w = HCanopy_w[3];
							break;
						case 5:
							h = HCanopy[4];
							h_w = HCanopy_w[4];
							break;
						case 6:
							h = HCanopy[5];
							h_w = HCanopy_w[5];
							break;
						default:
							return;
					}
					
					
					var x_o = MesoNH_O_array[index_1].x - Coord_X_paris;
					var y_o = MesoNH_O_array[index_1].y - Coord_Y_paris;					
					var z_o = MesoNH_O_array[index_1].zs + h;
									
					var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
					var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
					var l_z = (h - h_w)*2;
					
					if(h_min != null && h_max != null){
						if(h_w < h_min){
							h_min = h_w;
						}
						if((h_w + l_z) > h_max){
							h_max = (h_w + l_z);
						}
					} else {
						h_min = h_w;
						h_max = (h_w + l_z);
					}
					
					if(z_min != null && z_max != null){
						if((z_o - l_z/2) < z_min){
							z_min = z_o - l_z/2;
						}
						if((z_o + l_z/2) > z_max){
							z_max = z_o + l_z/2;
						}
					} else {
						z_min = z_o - l_z/2;
						z_max = z_o + l_z/2;
					}
					
					if(x_min != null && x_max != null){
						if((x_o - l_x/2) < x_min){
							x_min = x_o - l_x/2;
						}
						if((x_o + l_x/2) > x_max){
							x_max = x_o + l_x/2;
						}
					} else {
						x_min = x_o - l_x/2;
						x_max = x_o + l_x/2;
					}
					
					if(y_min != null && y_max != null){
						if((y_o - l_y/2) < y_min){
							y_min = y_o - l_y/2;
						}
						if((y_o + l_y/2) > y_max){
							y_max = y_o + l_y/2;
						}
					} else {
						y_min = y_o - l_y/2;
						y_max = y_o + l_y/2;
					}
					
				}
			}
		}	
		

		for(var m=0; m<id_meso_array.length; m++){
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					var index_1 = j*ni + i;
					
					var h;
					var h_w;
					switch(id_meso_array[m]){
						case 2:
							h = THAT[1];
							h_w = THAT_W[1];
							break;
						case 3:
							h = THAT[2];
							h_w = THAT_W[2];
							break;
						case 4:
							h = THAT[3];
							h_w = THAT_W[3];
							break;
						case 5:
							h = THAT[4];
							h_w = THAT_W[4];
							break;
						case 6:
							h = THAT[5];
							h_w = THAT_W[5];
							break;
						case 7:
							h = THAT[6];
							h_w = THAT_W[6];
							break;
						case 8:
							h = THAT[7];
							h_w = THAT_W[7];
							break;
						case 9:
							h = THAT[8];
							h_w = THAT_W[8];
							break;
						case 10:
							h = THAT[9];
							h_w = THAT_W[9];
							break;
						case 11:
							h = THAT[10];
							h_w = THAT_W[10];
							break;
						case 12:
							h = THAT[11];
							h_w = THAT_W[11];
							break;
						case 13:
							h = THAT[12];
							h_w = THAT_W[12];
							break;
						case 14:
							h = THAT[13];
							h_w = THAT_W[13];
							break;
						case 15:
							h = THAT[14];
							h_w = THAT_W[14];
							break;
						case 16:
							h = THAT[15];
							h_w = THAT_W[15];
							break;
						case 17:
							h = THAT[16];
							h_w = THAT_W[16];
							break;
						case 18:
							h = THAT[17];
							h_w = THAT_W[17];
							break;
						case 19:
							h = THAT[18];
							h_w = THAT_W[18];
							break;
						case 20:
							h = THAT[19];
							h_w = THAT_W[19];
							break;
						case 21:
							h = THAT[20];
							h_w = THAT_W[20];
							break;
						case 22:
							h = THAT[21];
							h_w = THAT_W[21];
							break;
						case 23:
							h = THAT[22];
							h_w = THAT_W[22];
							break;
						case 24:
							h = THAT[23];
							h_w = THAT_W[23];
							break;
						case 25:
							h = THAT[24];
							h_w = THAT_W[24];
							break;
						case 26:
							h = THAT[25];
							h_w = THAT_W[25];
							break;
						case 27:
							h = THAT[26];
							h_w = THAT_W[26];
							break;
						case 28:
							h = THAT[27];
							h_w = THAT_W[27];
							break;
						case 29:
							h = THAT[28];
							h_w = THAT_W[28];
							break;
						case 30:
							h = THAT[29];
							h_w = THAT_W[29];
							break;
						case 31:
							h = THAT[30];
							h_w = THAT_W[30];
							break;
						case 32:
							h = THAT[31];
							h_w = THAT_W[31];
							break;
						default:
							return;
					}
													
					var x_o = MesoNH_O_array[index_1].x - Coord_X_paris;
					var y_o = MesoNH_O_array[index_1].y - Coord_Y_paris;					
					var z_o = MesoNH_O_array[index_1].zs + h;
					
					var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
					var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
					var l_z = (h-h_w)*2;
									
					if(h_min != null && h_max != null){
						if(h_w < h_min){
							h_min = h_w;
						}
						if((h_w + l_z) > h_max){
							h_max = (h_w + l_z);
						}
					} else {
						h_min = h_w;
						h_max = (h_w + l_z);
					}
						
					if(z_min != null && z_max != null){
						if((z_o - l_z/2) < z_min){
							z_min = z_o - l_z/2;
						}
						if((z_o + l_z/2) > z_max){
							z_max = z_o + l_z/2;
						}
					} else {
						z_min = z_o - l_z/2;
						z_max = z_o + l_z/2;
					}
					
					if(x_min != null && x_max != null){
						if((x_o - l_x/2) < x_min){
							x_min = x_o - l_x/2;
						}
						if((x_o + l_x/2) > x_max){
							x_max = x_o + l_x/2;
						}
					} else {
						x_min = x_o - l_x/2;
						x_max = x_o + l_x/2;
					}
					
					if(y_min != null && y_max != null){
						if((y_o - l_y/2) < y_min){
							y_min = y_o - l_y/2;
						}
						if((y_o + l_y/2) > y_max){
							y_max = y_o + l_y/2;
						}
					} else {
						y_min = y_o - l_y/2;
						y_max = y_o + l_y/2;
					}
				
					
				}
			}
		}	
		
		for(var m=0; m<id_sbl_array.length; m++){
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					var index_1 = j*ni + i;
					var temp;
					var h;
					var h_w;
					switch(id_sbl_array[m]){
						case 1:
							temp = MesoNH_O_array[index_1].teb_1;
							h = HCanopy[0];
							h_w = HCanopy_w[0];
							break;
						case 2:
							temp = MesoNH_O_array[index_1].teb_2;
							h = HCanopy[1];
							h_w = HCanopy_w[1];
							break;
						case 3:
							temp = MesoNH_O_array[index_1].teb_3;
							h = HCanopy[2];
							h_w = HCanopy_w[2];
							break;
						case 4:
							temp = MesoNH_O_array[index_1].teb_4;
							h = HCanopy[3];
							h_w = HCanopy_w[3];
							break;
						case 5:
							temp = MesoNH_O_array[index_1].teb_5;
							h = HCanopy[4];
							h_w = HCanopy_w[4];
							break;
						case 6:
							temp = MesoNH_O_array[index_1].teb_6;
							h = HCanopy[5];
							h_w = HCanopy_w[5];
							break;
						default:
							return;
					}
					
					var x_u = MesoNH_U_array[index_1].x - Coord_X_paris;
					var y_u = MesoNH_U_array[index_1].y - Coord_Y_paris;
					var z_u = MesoNH_U_array[index_1].zs + h;
					
					var x_v = MesoNH_V_array[index_1].x - Coord_X_paris;
					var y_v = MesoNH_V_array[index_1].y - Coord_Y_paris;
					var z_v = MesoNH_V_array[index_1].zs + h;
					
					var z_o = MesoNH_O_array[index_1].zs + h;
					
					var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2
					var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2
					
					//up				
					coord_array.push(x_u*cst_X); 
					coord_array.push(z_o*cst_Z);
					coord_array.push(-(y_v + l_y)*cst_Y);
					coord_array.push(x_u*cst_X);
					coord_array.push(z_o*cst_Z); 
					coord_array.push(-y_v*cst_Y);
					coord_array.push((x_u + l_x)*cst_X); 
					coord_array.push(z_o*cst_Z);
					coord_array.push(-y_v*cst_Y);
					
					coord_array.push(x_u*cst_X); 
					coord_array.push(z_o*cst_Z);
					coord_array.push(-(y_v + l_y)*cst_Y);
					coord_array.push((x_u + l_x)*cst_X); 
					coord_array.push(z_o*cst_Z);
					coord_array.push(-y_v*cst_Y);
					coord_array.push((x_u + l_x)*cst_X); 
					coord_array.push(z_o*cst_Z);
					coord_array.push(-(y_v + l_y)*cst_Y);
					
					//down
					coord_array.push(x_u*cst_X); 
					coord_array.push(z_o*cst_Z);
					coord_array.push(-(y_v + l_y)*cst_Y);
					coord_array.push((x_u + l_x)*cst_X); 
					coord_array.push(z_o*cst_Z);
					coord_array.push(-y_v*cst_Y);
					coord_array.push(x_u*cst_X); 
					coord_array.push(z_o*cst_Z);
					coord_array.push(-y_v*cst_Y);
					
					coord_array.push(x_u*cst_X); 
					coord_array.push(z_o*cst_Z);
					coord_array.push(-(y_v + l_y)*cst_Y);
					coord_array.push((x_u + l_x)*cst_X); 
					coord_array.push(z_o*cst_Z);
					coord_array.push(-(y_v + l_y)*cst_Y);
					coord_array.push((x_u + l_x)*cst_X); 
					coord_array.push(z_o*cst_Z);
					coord_array.push(-y_v*cst_Y);
					
					
					var tmin = temperature_scale[0];
					var tmax = temperature_scale[1];
					var percentage_color = (temp - tmin)/(tmax - tmin);
					if(percentage_color<0){
						percentage_color = 0;
					} else if(percentage_color >1){
						percentage_color = 1;
					}
					
					//var color_hex;
					//if(percentage_color<0.5){
					//	color_hex = approximateColor1ToColor2ByPercent(color_array[0], color_array[1], percentage_color*2)
					//} else {
					//	color_hex = approximateColor1ToColor2ByPercent(color_array[1], color_array[2], (percentage_color-0.5)*2)
					//}
					
					temp_values.push(parseFloat(temp));
					var color_hex = getHCLcolor(percentage_color,HCL_color_scales[active_HCL_id].scale);
												
					var color_rgb = hexToRgb(color_hex)
					
					var color_r = color_rgb.r/255;
					var color_g = color_rgb.g/255;
					var color_b = color_rgb.b/255;
					var transparency = transparency_factor;
								
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					                                                               
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					
				}
			}
		}	

		for(var m=0; m<id_meso_array.length; m++){
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					var index_1 = j*ni + i;
					
					var temp;
					var h;
					var h_w;
					switch(id_meso_array[m]){
						case 2:
							temp = MesoNH_O_array[index_1].tht_2;
							h = THAT[1];
							h_w = THAT_W[1];
							break;
						case 3:
							temp = MesoNH_O_array[index_1].tht_3;
							h = THAT[2];
							h_w = THAT_W[2];
							break;
						case 4:
							temp = MesoNH_O_array[index_1].tht_4;
							h = THAT[3];
							h_w = THAT_W[3];
							break;
						case 5:
							temp = MesoNH_O_array[index_1].tht_5;
							h = THAT[4];
							h_w = THAT_W[4];
							break;
						case 6:
							temp = MesoNH_O_array[index_1].tht_6;
							h = THAT[5];
							h_w = THAT_W[5];
							break;
						case 7:
							temp = MesoNH_O_array[index_1].tht_7;
							h = THAT[6];
							h_w = THAT_W[6];
							break;
						case 8:
							temp = MesoNH_O_array[index_1].tht_8;
							h = THAT[7];
							h_w = THAT_W[7];
							break;
						case 9:
							temp = MesoNH_O_array[index_1].tht_9;
							h = THAT[8];
							h_w = THAT_W[8];
							break;
						case 10:
							temp = MesoNH_O_array[index_1].tht_10;
							h = THAT[9];
							h_w = THAT_W[9];
							break;
						case 11:
							temp = MesoNH_O_array[index_1].tht_11;
							h = THAT[10];
							h_w = THAT_W[10];
							break;
						case 12:
							temp = MesoNH_O_array[index_1].tht_12;
							h = THAT[11];
							h_w = THAT_W[11];
							break;
						case 13:
							temp = MesoNH_O_array[index_1].tht_13;
							h = THAT[12];
							h_w = THAT_W[12];
							break;
						case 14:
							temp = MesoNH_O_array[index_1].tht_14;
							h = THAT[13];
							h_w = THAT_W[13];
							break;
						case 15:
							temp = MesoNH_O_array[index_1].tht_15;
							h = THAT[14];
							h_w = THAT_W[14];
							break;
						case 16:
							temp = MesoNH_O_array[index_1].tht_16;
							h = THAT[15];
							h_w = THAT_W[15];
							break;
						case 17:
							temp = MesoNH_O_array[index_1].tht_17;
							h = THAT[16];
							h_w = THAT_W[16];
							break;
						case 18:
							temp = MesoNH_O_array[index_1].tht_18;
							h = THAT[17];
							h_w = THAT_W[17];
							break;
						case 19:
							temp = MesoNH_O_array[index_1].tht_19;
							h = THAT[18];
							h_w = THAT_W[18];
							break;
						case 20:
							temp = MesoNH_O_array[index_1].tht_20;
							h = THAT[19];
							h_w = THAT_W[19];
							break;
						case 21:
							temp = MesoNH_O_array[index_1].tht_21;
							h = THAT[20];
							h_w = THAT_W[20];
							break;
						case 22:
							temp = MesoNH_O_array[index_1].tht_22;
							h = THAT[21];
							h_w = THAT_W[21];
							break;
						case 23:
							temp = MesoNH_O_array[index_1].tht_23;
							h = THAT[22];
							h_w = THAT_W[22];
							break;
						case 24:
							temp = MesoNH_O_array[index_1].tht_24;
							h = THAT[23];
							h_w = THAT_W[23];
							break;
						case 25:
							temp = MesoNH_O_array[index_1].tht_25;
							h = THAT[24];
							h_w = THAT_W[24];
							break;
						case 26:
							temp = MesoNH_O_array[index_1].tht_26;
							h = THAT[25];
							h_w = THAT_W[25];
							break;
						case 27:
							temp = MesoNH_O_array[index_1].tht_27;
							h = THAT[26];
							h_w = THAT_W[26];
							break;
						case 28:
							temp = MesoNH_O_array[index_1].tht_28;
							h = THAT[27];
							h_w = THAT_W[27];
							break;
						case 29:
							temp = MesoNH_O_array[index_1].tht_29;
							h = THAT[28];
							h_w = THAT_W[28];
							break;
						case 30:
							temp = MesoNH_O_array[index_1].tht_30;
							h = THAT[29];
							h_w = THAT_W[29];
							break;
						case 31:
							temp = MesoNH_O_array[index_1].tht_31;
							h = THAT[30];
							h_w = THAT_W[30];
							break;
						case 32:
							temp = MesoNH_O_array[index_1].tht_32;
							h = THAT[31];
							h_w = THAT_W[31];
							break;
						default:
							return;
					}
													
					var x_u = MesoNH_U_array[index_1].x - Coord_X_paris;
					var y_u = MesoNH_U_array[index_1].y - Coord_Y_paris;
					var z_u = MesoNH_U_array[index_1].zs + h;
					
					var x_v = MesoNH_V_array[index_1].x - Coord_X_paris;
					var y_v = MesoNH_V_array[index_1].y - Coord_Y_paris;
					var z_v = MesoNH_V_array[index_1].zs + h;
					
					var z_o = MesoNH_O_array[index_1].zs + h;
					
					var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2
					var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2
					
					//up				
					coord_array.push(x_u*cst_X); 
					coord_array.push(z_o*cst_Z);
					coord_array.push(-(y_v + l_y)*cst_Y);
					coord_array.push(x_u*cst_X); 
					coord_array.push(z_o*cst_Z);
					coord_array.push(-y_v*cst_Y);
					coord_array.push((x_u + l_x)*cst_X); 
					coord_array.push(z_o*cst_Z);
					coord_array.push(-y_v*cst_Y);
					
					coord_array.push(x_u*cst_X); 
					coord_array.push(z_o*cst_Z);
					coord_array.push(-(y_v + l_y)*cst_Y);
					coord_array.push((x_u + l_x)*cst_X); 
					coord_array.push(z_o*cst_Z);
					coord_array.push(-y_v*cst_Y);
					coord_array.push((x_u + l_x)*cst_X); 
					coord_array.push(z_o*cst_Z);
					coord_array.push(-(y_v + l_y)*cst_Y);
					
					//down
					coord_array.push(x_u*cst_X); 
					coord_array.push(z_o*cst_Z);
					coord_array.push(-(y_v + l_y)*cst_Y);
					coord_array.push((x_u + l_x)*cst_X); 
					coord_array.push(z_o*cst_Z);
					coord_array.push(-y_v*cst_Y);
					coord_array.push(x_u*cst_X); 
					coord_array.push(z_o*cst_Z);
					coord_array.push(-y_v*cst_Y);
					
					coord_array.push(x_u*cst_X); 
					coord_array.push(z_o*cst_Z);
					coord_array.push(-(y_v + l_y)*cst_Y);
					coord_array.push((x_u + l_x)*cst_X); 
					coord_array.push(z_o*cst_Z);
					coord_array.push(-(y_v + l_y)*cst_Y);
					coord_array.push((x_u + l_x)*cst_X); 
					coord_array.push(z_o*cst_Z);
					coord_array.push(-y_v*cst_Y);
					
					
					var tmin = temperature_scale[0];
					var tmax = temperature_scale[1];
					var percentage_color = (temp - tmin)/(tmax - tmin);
					if(percentage_color<0){
						percentage_color = 0;
					} else if(percentage_color >1){
						percentage_color = 1;
					}
					
					//var color_hex;
					//if(percentage_color<0.5){
					//	color_hex = approximateColor1ToColor2ByPercent(color_array[0], color_array[1], percentage_color*2)
					//} else {
					//	color_hex = approximateColor1ToColor2ByPercent(color_array[1], color_array[2], (percentage_color-0.5)*2)
					//}
					
					temp_values.push(parseFloat(temp));
					var color_hex = getHCLcolor(percentage_color,HCL_color_scales[active_HCL_id].scale);
												
					var color_rgb = hexToRgb(color_hex)
					
					var color_r = color_rgb.r/255;
					var color_g = color_rgb.g/255;
					var color_b = color_rgb.b/255;
					var transparency = transparency_factor;
								
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					                                                              
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					
					
					
				}
			}
		}			
		
				
		var coord_array_32 = new Float32Array(coord_array);
		var colors_32 = new Float32Array(colors);  
		
		    
		var material = new THREE.MeshBasicMaterial({  opacity:transparency_factor, transparent: true,vertexColors: THREE.VertexColors  });
		var bufferGeometry = new THREE.BufferGeometry();
        
		// itemSize = 3 setAttribute there are 3 values (components) per vertex
		bufferGeometry.setAttribute( 'position', new THREE.BufferAttribute( coord_array_32, 3 ) );
		bufferGeometry.setAttribute( 'color', new THREE.BufferAttribute( colors_32, 3 ) );
		var mesh = new THREE.Mesh( bufferGeometry, material);
				
		create_temp_histogram();
				
		grid.add(mesh);
		scene.add(grid);
	}
	
	function create_meso_real_plane_points(MesoNH_O_array,MesoNH_U_array,MesoNH_V_array,MesoNH_W_array,grid,id_sbl_array,id_meso_array,temperature_scale,THAT,THAT_W,HCanopy,HCanopy_w,h_factor,number_points){
		
		temp_values = [];
		// //all
		//var ni = 26, 
		//nj = 22;
		// paris_centre
		//var ni = 9, 
		//nj = 6;
		// paris_beaubourg
		var ni = data_ni, 
		nj = data_nj;
				
		var coord_array = [];
		var colors = [];
		var sizes = [];
		var transparency_factor_array = [];
		var custompercentagearray = [];
		var z_position_array = [];
		var x_position_array = [];
		var y_position_array = [];
		
		var h_position_array = [];
		
		z_min = null;
		z_max = null;
		x_min = null;
		x_max = null;
		y_min = null;
		y_max = null;
		
		h_min = null;
		h_max = null;
		for(var m=0; m<id_sbl_array.length; m++){
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					var index_1 = j*ni + i;
					var h;
					var h_w;
					switch(id_sbl_array[m]){
						case 1:
							h = HCanopy[0];
							h_w = HCanopy_w[0];
							break;
						case 2:
							h = HCanopy[1];
							h_w = HCanopy_w[1];
							break;
						case 3:
							h = HCanopy[2];
							h_w = HCanopy_w[2];
							break;
						case 4:
							h = HCanopy[3];
							h_w = HCanopy_w[3];
							break;
						case 5:
							h = HCanopy[4];
							h_w = HCanopy_w[4];
							break;
						case 6:
							h = HCanopy[5];
							h_w = HCanopy_w[5];
							break;
						default:
							return;
					}
					
					
					var x_o = MesoNH_O_array[index_1].x - Coord_X_paris;
					var y_o = MesoNH_O_array[index_1].y - Coord_Y_paris;					
					var z_o = MesoNH_O_array[index_1].zs + h;
									
					var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
					var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
					var l_z = (h - h_w)*2;
					
					if(h_min != null && h_max != null){
						if(h_w < h_min){
							h_min = h_w;
						}
						if((h_w + l_z) > h_max){
							h_max = (h_w + l_z);
						}
					} else {
						h_min = h_w;
						h_max = (h_w + l_z);
					}
					
					if(z_min != null && z_max != null){
						if((z_o - l_z/2) < z_min){
							z_min = z_o - l_z/2;
						}
						if((z_o + l_z/2) > z_max){
							z_max = z_o + l_z/2;
						}
					} else {
						z_min = z_o - l_z/2;
						z_max = z_o + l_z/2;
					}
					
					if(x_min != null && x_max != null){
						if((x_o - l_x/2) < x_min){
							x_min = x_o - l_x/2;
						}
						if((x_o + l_x/2) > x_max){
							x_max = x_o + l_x/2;
						}
					} else {
						x_min = x_o - l_x/2;
						x_max = x_o + l_x/2;
					}
					
					if(y_min != null && y_max != null){
						if((y_o - l_y/2) < y_min){
							y_min = y_o - l_y/2;
						}
						if((y_o + l_y/2) > y_max){
							y_max = y_o + l_y/2;
						}
					} else {
						y_min = y_o - l_y/2;
						y_max = y_o + l_y/2;
					}
					
				}
			}
		}	
		

		for(var m=0; m<id_meso_array.length; m++){
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					var index_1 = j*ni + i;
					
					var h;
					var h_w;
					switch(id_meso_array[m]){
						case 2:
							h = THAT[1];
							h_w = THAT_W[1];
							break;
						case 3:
							h = THAT[2];
							h_w = THAT_W[2];
							break;
						case 4:
							h = THAT[3];
							h_w = THAT_W[3];
							break;
						case 5:
							h = THAT[4];
							h_w = THAT_W[4];
							break;
						case 6:
							h = THAT[5];
							h_w = THAT_W[5];
							break;
						case 7:
							h = THAT[6];
							h_w = THAT_W[6];
							break;
						case 8:
							h = THAT[7];
							h_w = THAT_W[7];
							break;
						case 9:
							h = THAT[8];
							h_w = THAT_W[8];
							break;
						case 10:
							h = THAT[9];
							h_w = THAT_W[9];
							break;
						case 11:
							h = THAT[10];
							h_w = THAT_W[10];
							break;
						case 12:
							h = THAT[11];
							h_w = THAT_W[11];
							break;
						case 13:
							h = THAT[12];
							h_w = THAT_W[12];
							break;
						case 14:
							h = THAT[13];
							h_w = THAT_W[13];
							break;
						case 15:
							h = THAT[14];
							h_w = THAT_W[14];
							break;
						case 16:
							h = THAT[15];
							h_w = THAT_W[15];
							break;
						case 17:
							h = THAT[16];
							h_w = THAT_W[16];
							break;
						case 18:
							h = THAT[17];
							h_w = THAT_W[17];
							break;
						case 19:
							h = THAT[18];
							h_w = THAT_W[18];
							break;
						case 20:
							h = THAT[19];
							h_w = THAT_W[19];
							break;
						case 21:
							h = THAT[20];
							h_w = THAT_W[20];
							break;
						case 22:
							h = THAT[21];
							h_w = THAT_W[21];
							break;
						case 23:
							h = THAT[22];
							h_w = THAT_W[22];
							break;
						case 24:
							h = THAT[23];
							h_w = THAT_W[23];
							break;
						case 25:
							h = THAT[24];
							h_w = THAT_W[24];
							break;
						case 26:
							h = THAT[25];
							h_w = THAT_W[25];
							break;
						case 27:
							h = THAT[26];
							h_w = THAT_W[26];
							break;
						case 28:
							h = THAT[27];
							h_w = THAT_W[27];
							break;
						case 29:
							h = THAT[28];
							h_w = THAT_W[28];
							break;
						case 30:
							h = THAT[29];
							h_w = THAT_W[29];
							break;
						case 31:
							h = THAT[30];
							h_w = THAT_W[30];
							break;
						case 32:
							h = THAT[31];
							h_w = THAT_W[31];
							break;
						default:
							return;
					}
													
					var x_o = MesoNH_O_array[index_1].x - Coord_X_paris;
					var y_o = MesoNH_O_array[index_1].y - Coord_Y_paris;					
					var z_o = MesoNH_O_array[index_1].zs + h;
					
					var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
					var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
					var l_z = (h-h_w)*2;
									
					if(h_min != null && h_max != null){
						if(h_w < h_min){
							h_min = h_w;
						}
						if((h_w + l_z) > h_max){
							h_max = (h_w + l_z);
						}
					} else {
						h_min = h_w;
						h_max = (h_w + l_z);
					}
						
					if(z_min != null && z_max != null){
						if((z_o - l_z/2) < z_min){
							z_min = z_o - l_z/2;
						}
						if((z_o + l_z/2) > z_max){
							z_max = z_o + l_z/2;
						}
					} else {
						z_min = z_o - l_z/2;
						z_max = z_o + l_z/2;
					}
					
					if(x_min != null && x_max != null){
						if((x_o - l_x/2) < x_min){
							x_min = x_o - l_x/2;
						}
						if((x_o + l_x/2) > x_max){
							x_max = x_o + l_x/2;
						}
					} else {
						x_min = x_o - l_x/2;
						x_max = x_o + l_x/2;
					}
					
					if(y_min != null && y_max != null){
						if((y_o - l_y/2) < y_min){
							y_min = y_o - l_y/2;
						}
						if((y_o + l_y/2) > y_max){
							y_max = y_o + l_y/2;
						}
					} else {
						y_min = y_o - l_y/2;
						y_max = y_o + l_y/2;
					}
				
					
				}
			}
		}	
		
		for(var m=0; m<id_sbl_array.length; m++){
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					var index_1 = j*ni + i;
					var temp;
					var h;
					var h_w;
					switch(id_sbl_array[m]){
						case 1:
							temp = MesoNH_O_array[index_1].teb_1;
							h = HCanopy[0];
							h_w = HCanopy_w[0];
							break;
						case 2:
							temp = MesoNH_O_array[index_1].teb_2;
							h = HCanopy[1];
							h_w = HCanopy_w[1];
							break;
						case 3:
							temp = MesoNH_O_array[index_1].teb_3;
							h = HCanopy[2];
							h_w = HCanopy_w[2];
							break;
						case 4:
							temp = MesoNH_O_array[index_1].teb_4;
							h = HCanopy[3];
							h_w = HCanopy_w[3];
							break;
						case 5:
							temp = MesoNH_O_array[index_1].teb_5;
							h = HCanopy[4];
							h_w = HCanopy_w[4];
							break;
						case 6:
							temp = MesoNH_O_array[index_1].teb_6;
							h = HCanopy[5];
							h_w = HCanopy_w[5];
							break;
						default:
							return;
					}
					
					var x_u = MesoNH_U_array[index_1].x - Coord_X_paris;
					var y_u = MesoNH_U_array[index_1].y - Coord_Y_paris;
					var z_u = MesoNH_U_array[index_1].zs + h;
					
					var x_v = MesoNH_V_array[index_1].x - Coord_X_paris;
					var y_v = MesoNH_V_array[index_1].y - Coord_Y_paris;
					var z_v = MesoNH_V_array[index_1].zs + h;
					
					var z_o = MesoNH_O_array[index_1].zs + h;
					
					var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
					var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
					var l_z = (h-h_w)*2;
					
					var tmin = temperature_scale[0];
					var tmax = temperature_scale[1];
					var percentage_color = (temp - tmin)/(tmax - tmin);
					if(percentage_color<0){
						percentage_color = 0;
					} else if(percentage_color >1){
						percentage_color = 1;
					}
					
					//var color_hex;
					//if(percentage_color<0.5){
					//	color_hex = approximateColor1ToColor2ByPercent(color_array[0], color_array[1], percentage_color*2)
					//} else {
					//	color_hex = approximateColor1ToColor2ByPercent(color_array[1], color_array[2], (percentage_color-0.5)*2)
					//}
					
					temp_values.push(parseFloat(temp));
					var color_hex = getHCLcolor(percentage_color,HCL_color_scales[active_HCL_id].scale);
												
					var color_rgb = hexToRgb(color_hex)
					
					var color_r = color_rgb.r/255;
					var color_g = color_rgb.g/255;
					var color_b = color_rgb.b/255;
					
										
					var size;
					var basic_size = 10000;
					
					if(relative_size_factor < 1){
						var add_factor = 1-relative_size_factor;
						if(percentage_color < 0.5){
							size = parseInt(basic_size + basic_size*add_factor*(0.5-percentage_color)*2);
						} else if(percentage_color == 0.5){
							size = basic_size;
						} else if(percentage_color > 0.5){
							size = parseInt(basic_size - basic_size*add_factor*(percentage_color-0.5)*2);
						}
					} else if(relative_size_factor == 1){
						size = basic_size;
					} else if(relative_size_factor >1){
						var add_factor = relative_size_factor-1;
						if(percentage_color < 0.5){
							size = parseInt(basic_size - basic_size*add_factor*(0.5-percentage_color)*2);
						} else if(percentage_color == 0.5){
							size = basic_size;
						} else if(percentage_color > 0.5){
							size = parseInt(basic_size + basic_size*add_factor*(percentage_color-0.5)*2);
						}
					}
								
					var number_points_offset_x = l_x/number_points;
					var number_points_offset_y = l_y/number_points;
					
					for(var a=0; a<number_points; a++){
						for(var b=0; b<number_points; b++){
							var pX = (x_u + a*number_points_offset_x);
							var pY = (y_v + b*number_points_offset_y);
							var pZ = z_o;
							coord_array.push(pX*cst_X); 
							coord_array.push(pZ*cst_Z);
							coord_array.push(-pY*cst_Y);
							colors.push(color_r);colors.push(color_g);colors.push(color_b);
							sizes.push(size);
							transparency_factor_array.push(transparency_factor);
							custompercentagearray.push(percentage_color*2*Math.PI);
							z_position_array.push((pZ - z_min)/(z_max - z_min));
							x_position_array.push((pX - x_min)/(x_max - x_min));
							y_position_array.push((pY - y_min)/(y_max - y_min));
							h_position_array.push(((pZ-MesoNH_O_array[index_1].zs)-h_min)/(h_max - h_min));
						}
					}
						
				}
			}
		}	

		for(var m=0; m<id_meso_array.length; m++){
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					var index_1 = j*ni + i;
					
					var temp;
					var h;
					var h_w;
					switch(id_meso_array[m]){
						case 2:
							temp = MesoNH_O_array[index_1].tht_2;
							h = THAT[1];
							h_w = THAT_W[1];
							break;
						case 3:
							temp = MesoNH_O_array[index_1].tht_3;
							h = THAT[2];
							h_w = THAT_W[2];
							break;
						case 4:
							temp = MesoNH_O_array[index_1].tht_4;
							h = THAT[3];
							h_w = THAT_W[3];
							break;
						case 5:
							temp = MesoNH_O_array[index_1].tht_5;
							h = THAT[4];
							h_w = THAT_W[4];
							break;
						case 6:
							temp = MesoNH_O_array[index_1].tht_6;
							h = THAT[5];
							h_w = THAT_W[5];
							break;
						case 7:
							temp = MesoNH_O_array[index_1].tht_7;
							h = THAT[6];
							h_w = THAT_W[6];
							break;
						case 8:
							temp = MesoNH_O_array[index_1].tht_8;
							h = THAT[7];
							h_w = THAT_W[7];
							break;
						case 9:
							temp = MesoNH_O_array[index_1].tht_9;
							h = THAT[8];
							h_w = THAT_W[8];
							break;
						case 10:
							temp = MesoNH_O_array[index_1].tht_10;
							h = THAT[9];
							h_w = THAT_W[9];
							break;
						case 11:
							temp = MesoNH_O_array[index_1].tht_11;
							h = THAT[10];
							h_w = THAT_W[10];
							break;
						case 12:
							temp = MesoNH_O_array[index_1].tht_12;
							h = THAT[11];
							h_w = THAT_W[11];
							break;
						case 13:
							temp = MesoNH_O_array[index_1].tht_13;
							h = THAT[12];
							h_w = THAT_W[12];
							break;
						case 14:
							temp = MesoNH_O_array[index_1].tht_14;
							h = THAT[13];
							h_w = THAT_W[13];
							break;
						case 15:
							temp = MesoNH_O_array[index_1].tht_15;
							h = THAT[14];
							h_w = THAT_W[14];
							break;
						case 16:
							temp = MesoNH_O_array[index_1].tht_16;
							h = THAT[15];
							h_w = THAT_W[15];
							break;
						case 17:
							temp = MesoNH_O_array[index_1].tht_17;
							h = THAT[16];
							h_w = THAT_W[16];
							break;
						case 18:
							temp = MesoNH_O_array[index_1].tht_18;
							h = THAT[17];
							h_w = THAT_W[17];
							break;
						case 19:
							temp = MesoNH_O_array[index_1].tht_19;
							h = THAT[18];
							h_w = THAT_W[18];
							break;
						case 20:
							temp = MesoNH_O_array[index_1].tht_20;
							h = THAT[19];
							h_w = THAT_W[19];
							break;
						case 21:
							temp = MesoNH_O_array[index_1].tht_21;
							h = THAT[20];
							h_w = THAT_W[20];
							break;
						case 22:
							temp = MesoNH_O_array[index_1].tht_22;
							h = THAT[21];
							h_w = THAT_W[21];
							break;
						case 23:
							temp = MesoNH_O_array[index_1].tht_23;
							h = THAT[22];
							h_w = THAT_W[22];
							break;
						case 24:
							temp = MesoNH_O_array[index_1].tht_24;
							h = THAT[23];
							h_w = THAT_W[23];
							break;
						case 25:
							temp = MesoNH_O_array[index_1].tht_25;
							h = THAT[24];
							h_w = THAT_W[24];
							break;
						case 26:
							temp = MesoNH_O_array[index_1].tht_26;
							h = THAT[25];
							h_w = THAT_W[25];
							break;
						case 27:
							temp = MesoNH_O_array[index_1].tht_27;
							h = THAT[26];
							h_w = THAT_W[26];
							break;
						case 28:
							temp = MesoNH_O_array[index_1].tht_28;
							h = THAT[27];
							h_w = THAT_W[27];
							break;
						case 29:
							temp = MesoNH_O_array[index_1].tht_29;
							h = THAT[28];
							h_w = THAT_W[28];
							break;
						case 30:
							temp = MesoNH_O_array[index_1].tht_30;
							h = THAT[29];
							h_w = THAT_W[29];
							break;
						case 31:
							temp = MesoNH_O_array[index_1].tht_31;
							h = THAT[30];
							h_w = THAT_W[30];
							break;
						case 32:
							temp = MesoNH_O_array[index_1].tht_32;
							h = THAT[31];
							h_w = THAT_W[31];
							break;
						default:
							return;
					}
													
					var x_u = MesoNH_U_array[index_1].x - Coord_X_paris;
					var y_u = MesoNH_U_array[index_1].y - Coord_Y_paris;
					var z_u = MesoNH_U_array[index_1].zs + h;
					
					var x_v = MesoNH_V_array[index_1].x - Coord_X_paris;
					var y_v = MesoNH_V_array[index_1].y - Coord_Y_paris;
					var z_v = MesoNH_V_array[index_1].zs + h;
					
					var z_o = MesoNH_O_array[index_1].zs + h;
					
					var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
					var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
					var l_z = (h-h_w)*2;
							
					
					var tmin = temperature_scale[0];
					var tmax = temperature_scale[1];
					var percentage_color = (temp - tmin)/(tmax - tmin);
					if(percentage_color<0){
						percentage_color = 0;
					} else if(percentage_color >1){
						percentage_color = 1;
					}
					
					//var color_hex;
					//if(percentage_color<0.5){
					//	color_hex = approximateColor1ToColor2ByPercent(color_array[0], color_array[1], percentage_color*2)
					//} else {
					//	color_hex = approximateColor1ToColor2ByPercent(color_array[1], color_array[2], (percentage_color-0.5)*2)
					//}
					
					temp_values.push(parseFloat(temp));
					var color_hex = getHCLcolor(percentage_color,HCL_color_scales[active_HCL_id].scale);
												
					var color_rgb = hexToRgb(color_hex)
					
					var color_r = color_rgb.r/255;
					var color_g = color_rgb.g/255;
					var color_b = color_rgb.b/255;
					
										
					var size;
					var basic_size = 10000;
					
					if(relative_size_factor < 1){
						var add_factor = 1-relative_size_factor;
						if(percentage_color < 0.5){
							size = parseInt(basic_size + basic_size*add_factor*(0.5-percentage_color)*2);
						} else if(percentage_color == 0.5){
							size = basic_size;
						} else if(percentage_color > 0.5){
							size = parseInt(basic_size - basic_size*add_factor*(percentage_color-0.5)*2);
						}
					} else if(relative_size_factor == 1){
						size = basic_size;
					} else if(relative_size_factor >1){
						var add_factor = relative_size_factor-1;
						if(percentage_color < 0.5){
							size = parseInt(basic_size - basic_size*add_factor*(0.5-percentage_color)*2);
						} else if(percentage_color == 0.5){
							size = basic_size;
						} else if(percentage_color > 0.5){
							size = parseInt(basic_size + basic_size*add_factor*(percentage_color-0.5)*2);
						}
					}
								
					var number_points_offset_x = l_x/number_points;
					var number_points_offset_y = l_y/number_points;
					
					for(var a=0; a<number_points; a++){
						for(var b=0; b<number_points; b++){
							var pX = (x_u + a*number_points_offset_x);
							var pY = (y_v + b*number_points_offset_y);
							var pZ = z_o;
							coord_array.push(pX*cst_X); 
							coord_array.push(pZ*cst_Z);
							coord_array.push(-pY*cst_Y);
							colors.push(color_r);colors.push(color_g);colors.push(color_b);
							sizes.push(size);
							transparency_factor_array.push(transparency_factor);
							custompercentagearray.push(percentage_color*2*Math.PI);
							z_position_array.push((pZ - z_min)/(z_max - z_min));
							x_position_array.push((pX - x_min)/(x_max - x_min));
							y_position_array.push((pY - y_min)/(y_max - y_min));
							h_position_array.push(((pZ-MesoNH_O_array[index_1].zs)-h_min)/(h_max - h_min));
						}
					}
										
				}
			}
		}			
		
		var coord_array_32 = new Float32Array(coord_array);
		var colors_32 = new Float32Array(colors);  
		var sizes_32 = new Float32Array(sizes);
		var transparency_factor_32 = new Float32Array(transparency_factor_array);
		var custompercentage_32 = new Float32Array(custompercentagearray);
		var z_position_array_32 = new Float32Array(z_position_array);
		var x_position_array_32 = new Float32Array(x_position_array);
		var y_position_array_32 = new Float32Array(y_position_array);
		var h_position_array_32 = new Float32Array(h_position_array);
			
			
		//var material = new THREE.PointsMaterial({  vertexColors: THREE.VertexColors  });
		
		var material;
		var bufferGeometry = new THREE.BufferGeometry();
		
		bufferGeometry.setAttribute( 'position', new THREE.BufferAttribute( coord_array_32, 3 ) );
		bufferGeometry.setAttribute( 'customColor', new THREE.BufferAttribute( colors_32, 3 ) );
		bufferGeometry.setAttribute( 'customsize', new THREE.BufferAttribute(sizes_32,1));
		bufferGeometry.setAttribute( 'customtransparency', new THREE.BufferAttribute(transparency_factor_32,1));
		bufferGeometry.setAttribute( 'custompercentage', new THREE.BufferAttribute(custompercentage_32,1));
		bufferGeometry.setAttribute( 'z_position', new THREE.BufferAttribute(z_position_array_32,1));
		bufferGeometry.setAttribute( 'x_position', new THREE.BufferAttribute(x_position_array_32,1));
		bufferGeometry.setAttribute( 'y_position', new THREE.BufferAttribute(y_position_array_32,1));
		bufferGeometry.setAttribute( 'h_position', new THREE.BufferAttribute(h_position_array_32,1));
        
		if(is_animated == false){
			material = new THREE.ShaderMaterial( {
				uniforms: {
					color: { value: new THREE.Color( 0xffffff ) },
					pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
					regularSize: { value: regular_size },
					u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
				},
				vertexShader: document.getElementById( 'vertexshader_fix' ).textContent,
				fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
				// blending: THREE.AdditiveBlending,
				//depthTest: false,
				transparent: true
			} );
		} else if (is_animated == true){
			if(animation_parameter == 'temp'){
				material = new THREE.ShaderMaterial( {
					uniforms: {
						color: { value: new THREE.Color( 0xffffff ) },
						pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
						regularSize: { value: regular_size },
						u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
					},
					vertexShader: document.getElementById( 'vertexshader_anim_temp' ).textContent,
					fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
					// blending: THREE.AdditiveBlending,
					//depthTest: false,
					transparent: true
				} );
				
			} else if(animation_parameter == 'Z'){
				material = new THREE.ShaderMaterial( {
					uniforms: {
						color: { value: new THREE.Color( 0xffffff ) },
						pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
						regularSize: { value: regular_size },
						u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
					},
					vertexShader: document.getElementById( 'vertexshader_anim_z' ).textContent,
					fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
					// blending: THREE.AdditiveBlending,
					//depthTest: false,
					transparent: true
				} );
				
			} else if(animation_parameter == 'X'){
				material = new THREE.ShaderMaterial( {
					uniforms: {
						color: { value: new THREE.Color( 0xffffff ) },
						pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
						regularSize: { value: regular_size },
						u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
					},
					vertexShader: document.getElementById( 'vertexshader_anim_x' ).textContent,
					fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
					// blending: THREE.AdditiveBlending,
					//depthTest: false,
					transparent: true
				} );
				
			} else if(animation_parameter == 'Y'){
				material = new THREE.ShaderMaterial( {
					uniforms: {
						color: { value: new THREE.Color( 0xffffff ) },
						pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
						regularSize: { value: regular_size },
						u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
					},
					vertexShader: document.getElementById( 'vertexshader_anim_y' ).textContent,
					fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
					// blending: THREE.AdditiveBlending,
					//depthTest: false,
					transparent: true
				} );
				
			}
		}
		
	
		var point = new THREE.Points( bufferGeometry, material);
			
		create_temp_histogram();
			
		grid.add(point);
		scene.add(grid);
	}
	
	function create_meso_plane_regular_points(MesoNH_O_array,MesoNH_U_array,MesoNH_V_array,MesoNH_W_array,grid,id_sbl_array,id_meso_array,temperature_scale,THAT,THAT_W,HCanopy,HCanopy_w,h_factor,color_array){
	
		temp_values = [];
		// //all
		//var ni = 26, 
		//nj = 22;
		// paris_centre
		//var ni = 9, 
		//nj = 6;
		// paris_beaubourg
		var ni = data_ni, 
		nj = data_nj;
		
		var coord_array = [];
		var colors = [];
		var sizes = [];
		var transparency_factor_array = [];
		var custompercentagearray = [];
		var z_position_array = [];
		var x_position_array = [];
		var y_position_array = [];
		
		var h_position_array = [];
		
		z_min = null;
		z_max = null;
		x_min = null;
		x_max = null;
		y_min = null;
		y_max = null;
		
		h_min = null;
		h_max = null;
		
		for(var m=0; m<id_sbl_array.length; m++){
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					var index_1 = j*ni + i;
					var h;
					var h_w;
					switch(id_sbl_array[m]){
						case 1:
							h = HCanopy[0];
							h_w = HCanopy_w[0];
							break;
						case 2:
							h = HCanopy[1];
							h_w = HCanopy_w[1];
							break;
						case 3:
							h = HCanopy[2];
							h_w = HCanopy_w[2];
							break;
						case 4:
							h = HCanopy[3];
							h_w = HCanopy_w[3];
							break;
						case 5:
							h = HCanopy[4];
							h_w = HCanopy_w[4];
							break;
						case 6:
							h = HCanopy[5];
							h_w = HCanopy_w[5];
							break;
						default:
							return;
					}
					
					
					var x_o = MesoNH_O_array[index_1].x - Coord_X_paris;
					var y_o = MesoNH_O_array[index_1].y - Coord_Y_paris;					
					var z_o = MesoNH_O_array[index_1].zs + h;
									
					var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
					var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
					var l_z = (h - h_w)*2;
					
					if(h_min != null && h_max != null){
						if(h_w < h_min){
							h_min = h_w;
						}
						if((h_w + l_z) > h_max){
							h_max = (h_w + l_z);
						}
					} else {
						h_min = h_w;
						h_max = (h_w + l_z);
					}
					
					if(z_min != null && z_max != null){
						if((z_o - l_z/2) < z_min){
							z_min = z_o - l_z/2;
						}
						if((z_o + l_z/2) > z_max){
							z_max = z_o + l_z/2;
						}
					} else {
						z_min = z_o - l_z/2;
						z_max = z_o + l_z/2;
					}
					
					if(x_min != null && x_max != null){
						if((x_o - l_x/2) < x_min){
							x_min = x_o - l_x/2;
						}
						if((x_o + l_x/2) > x_max){
							x_max = x_o + l_x/2;
						}
					} else {
						x_min = x_o - l_x/2;
						x_max = x_o + l_x/2;
					}
					
					if(y_min != null && y_max != null){
						if((y_o - l_y/2) < y_min){
							y_min = y_o - l_y/2;
						}
						if((y_o + l_y/2) > y_max){
							y_max = y_o + l_y/2;
						}
					} else {
						y_min = y_o - l_y/2;
						y_max = y_o + l_y/2;
					}
					
				}
			}
		}	
		

		for(var m=0; m<id_meso_array.length; m++){
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					var index_1 = j*ni + i;
					
					var h;
					var h_w;
					switch(id_meso_array[m]){
						case 2:
							h = THAT[1];
							h_w = THAT_W[1];
							break;
						case 3:
							h = THAT[2];
							h_w = THAT_W[2];
							break;
						case 4:
							h = THAT[3];
							h_w = THAT_W[3];
							break;
						case 5:
							h = THAT[4];
							h_w = THAT_W[4];
							break;
						case 6:
							h = THAT[5];
							h_w = THAT_W[5];
							break;
						case 7:
							h = THAT[6];
							h_w = THAT_W[6];
							break;
						case 8:
							h = THAT[7];
							h_w = THAT_W[7];
							break;
						case 9:
							h = THAT[8];
							h_w = THAT_W[8];
							break;
						case 10:
							h = THAT[9];
							h_w = THAT_W[9];
							break;
						case 11:
							h = THAT[10];
							h_w = THAT_W[10];
							break;
						case 12:
							h = THAT[11];
							h_w = THAT_W[11];
							break;
						case 13:
							h = THAT[12];
							h_w = THAT_W[12];
							break;
						case 14:
							h = THAT[13];
							h_w = THAT_W[13];
							break;
						case 15:
							h = THAT[14];
							h_w = THAT_W[14];
							break;
						case 16:
							h = THAT[15];
							h_w = THAT_W[15];
							break;
						case 17:
							h = THAT[16];
							h_w = THAT_W[16];
							break;
						case 18:
							h = THAT[17];
							h_w = THAT_W[17];
							break;
						case 19:
							h = THAT[18];
							h_w = THAT_W[18];
							break;
						case 20:
							h = THAT[19];
							h_w = THAT_W[19];
							break;
						case 21:
							h = THAT[20];
							h_w = THAT_W[20];
							break;
						case 22:
							h = THAT[21];
							h_w = THAT_W[21];
							break;
						case 23:
							h = THAT[22];
							h_w = THAT_W[22];
							break;
						case 24:
							h = THAT[23];
							h_w = THAT_W[23];
							break;
						case 25:
							h = THAT[24];
							h_w = THAT_W[24];
							break;
						case 26:
							h = THAT[25];
							h_w = THAT_W[25];
							break;
						case 27:
							h = THAT[26];
							h_w = THAT_W[26];
							break;
						case 28:
							h = THAT[27];
							h_w = THAT_W[27];
							break;
						case 29:
							h = THAT[28];
							h_w = THAT_W[28];
							break;
						case 30:
							h = THAT[29];
							h_w = THAT_W[29];
							break;
						case 31:
							h = THAT[30];
							h_w = THAT_W[30];
							break;
						case 32:
							h = THAT[31];
							h_w = THAT_W[31];
							break;
						default:
							return;
					}
													
					var x_o = MesoNH_O_array[index_1].x - Coord_X_paris;
					var y_o = MesoNH_O_array[index_1].y - Coord_Y_paris;					
					var z_o = MesoNH_O_array[index_1].zs + h;
					
					var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
					var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
					var l_z = (h-h_w)*2;
									
					if(h_min != null && h_max != null){
						if(h_w < h_min){
							h_min = h_w;
						}
						if((h_w + l_z) > h_max){
							h_max = (h_w + l_z);
						}
					} else {
						h_min = h_w;
						h_max = (h_w + l_z);
					}
						
					if(z_min != null && z_max != null){
						if((z_o - l_z/2) < z_min){
							z_min = z_o - l_z/2;
						}
						if((z_o + l_z/2) > z_max){
							z_max = z_o + l_z/2;
						}
					} else {
						z_min = z_o - l_z/2;
						z_max = z_o + l_z/2;
					}
					
					if(x_min != null && x_max != null){
						if((x_o - l_x/2) < x_min){
							x_min = x_o - l_x/2;
						}
						if((x_o + l_x/2) > x_max){
							x_max = x_o + l_x/2;
						}
					} else {
						x_min = x_o - l_x/2;
						x_max = x_o + l_x/2;
					}
					
					if(y_min != null && y_max != null){
						if((y_o - l_y/2) < y_min){
							y_min = y_o - l_y/2;
						}
						if((y_o + l_y/2) > y_max){
							y_max = y_o + l_y/2;
						}
					} else {
						y_min = y_o - l_y/2;
						y_max = y_o + l_y/2;
					}
				
					
				}
			}
		}	
		
		
		for(var m=0; m<id_sbl_array.length; m++){
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					var index_1 = j*ni + i;
					var temp;
					var h;
					var h_w;
					switch(id_sbl_array[m]){
						case 1:
							temp = MesoNH_O_array[index_1].teb_1;
							h = HCanopy[0];
							h_w = HCanopy_w[0];
							break;
						case 2:
							temp = MesoNH_O_array[index_1].teb_2;
							h = HCanopy[1];
							h_w = HCanopy_w[1];
							break;
						case 3:
							temp = MesoNH_O_array[index_1].teb_3;
							h = HCanopy[2];
							h_w = HCanopy_w[2];
							break;
						case 4:
							temp = MesoNH_O_array[index_1].teb_4;
							h = HCanopy[3];
							h_w = HCanopy_w[3];
							break;
						case 5:
							temp = MesoNH_O_array[index_1].teb_5;
							h = HCanopy[4];
							h_w = HCanopy_w[4];
							break;
						case 6:
							temp = MesoNH_O_array[index_1].teb_6;
							h = HCanopy[5];
							h_w = HCanopy_w[5];
							break;
						default:
							return;
					}
					
					
					var x_o = MesoNH_O_array[index_1].x - Coord_X_paris;
					var y_o = MesoNH_O_array[index_1].y - Coord_Y_paris;					
					var z_o = MesoNH_O_array[index_1].zs + h;
									
					var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
					var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
					var l_z = (h - h_w)*2;
					
								
					var tmin = temperature_scale[0];
					var tmax = temperature_scale[1];
					var percentage_color = (temp - tmin)/(tmax - tmin);
					if(percentage_color<0){
						percentage_color = 0;
					} else if(percentage_color >1){
						percentage_color = 1;
					}
					
					//var color_hex;
					//if(percentage_color<0.5){
					//	color_hex = approximateColor1ToColor2ByPercent(color_array[0], color_array[1], percentage_color*2)
					//} else {
					//	color_hex = approximateColor1ToColor2ByPercent(color_array[1], color_array[2], (percentage_color-0.5)*2)
					//}
					
					temp_values.push(parseFloat(temp));
					var color_hex = getHCLcolor(percentage_color,HCL_color_scales[active_HCL_id].scale);
												
					var color_rgb = hexToRgb(color_hex)
					
					var color_r = color_rgb.r/255;
					var color_g = color_rgb.g/255;
					var color_b = color_rgb.b/255;
						
					var cell_volume = l_x*l_y*l_z;
					
					var relative_density;
					
					if(relative_density_factor < 1){
						var add_factor = 1-relative_density_factor;
						if(percentage_color < 0.5){
							relative_density = particle_density + particle_density*add_factor*(0.5-percentage_color)*2;
						} else if(percentage_color == 0.5){
							relative_density = particle_density;
						} else if(percentage_color > 0.5){
							relative_density = particle_density - particle_density*add_factor*(percentage_color-0.5)*2;
						}
					} else if(relative_density_factor == 1){
						relative_density = particle_density;
					} else if(relative_density_factor >1){
						var add_factor = relative_density_factor-1;
						if(percentage_color < 0.5){
							relative_density = particle_density - particle_density*add_factor*(0.5-percentage_color)*2;
						} else if(percentage_color == 0.5){
							relative_density = particle_density;
						} else if(percentage_color > 0.5){
							relative_density = particle_density + particle_density*add_factor*(percentage_color-0.5)*2;
						}
					}
										
					var size;
					var basic_size = 10000;
					
					if(relative_size_factor < 1){
						var add_factor = 1-relative_size_factor;
						if(percentage_color < 0.5){
							size = parseInt(basic_size + basic_size*add_factor*(0.5-percentage_color)*2);
						} else if(percentage_color == 0.5){
							size = basic_size;
						} else if(percentage_color > 0.5){
							size = parseInt(basic_size - basic_size*add_factor*(percentage_color-0.5)*2);
						}
					} else if(relative_size_factor == 1){
						size = basic_size;
					} else if(relative_size_factor >1){
						var add_factor = relative_size_factor-1;
						if(percentage_color < 0.5){
							size = parseInt(basic_size - basic_size*add_factor*(0.5-percentage_color)*2);
						} else if(percentage_color == 0.5){
							size = basic_size;
						} else if(percentage_color > 0.5){
							size = parseInt(basic_size + basic_size*add_factor*(percentage_color-0.5)*2);
						}
					}
						
					var particle_length_XY = parseInt(relative_density*l_x*l_y);
					
					var offset_xy = l_x/Math.sqrt(particle_length_XY);
					
					var number_particule_x = parseInt(Math.sqrt(particle_length_XY));
					var number_particule_y = parseInt(Math.sqrt(particle_length_XY));
					var number_particule_z = parseInt((l_z*cst_Z)/(offset_xy*cst_X));
					
					
					
					if(number_particule_x <1){
					number_particule_x=1;
					}
					if(number_particule_y <1){
					number_particule_y=1;
					}
					if(number_particule_z <1){
					number_particule_z=1;
					}
					var offset_z = l_z/number_particule_z;
					var counter =0;									
					for(var a=0; a<number_particule_x; a++){
						for(var b=0; b<number_particule_y; b++){
							for(var c=0; c<number_particule_z; c++){
								var pX = (x_o - l_x/2 + a*offset_xy);
								var pY = (y_o - l_y/2 + b*offset_xy);
								var pZ = (z_o - l_z/2 + c*offset_z);
								coord_array.push(pX*cst_X);
								coord_array.push(pZ*cst_Z);
								coord_array.push(-pY*cst_Y);
								colors.push(color_r);colors.push(color_g);colors.push(color_b);
								sizes.push(size);
								transparency_factor_array.push(transparency_factor);
								custompercentagearray.push(percentage_color*2*Math.PI);
								z_position_array.push((pZ - z_min)/(z_max - z_min));
								x_position_array.push((pX - x_min)/(x_max - x_min));
								y_position_array.push((pY - y_min)/(y_max - y_min));
								h_position_array.push(((pZ-MesoNH_O_array[index_1].zs)-h_min)/(h_max - h_min));
							}
						}
					}
												
				}
			}
		}	
		for(var m=0; m<id_meso_array.length; m++){
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					var index_1 = j*ni + i;
					
					var temp;
					var h;
					var h_w;
					switch(id_meso_array[m]){
						case 2:
							temp = MesoNH_O_array[index_1].tht_2;
							h = THAT[1];
							h_w = THAT_W[1];
							break;
						case 3:
							temp = MesoNH_O_array[index_1].tht_3;
							h = THAT[2];
							h_w = THAT_W[2];
							break;
						case 4:
							temp = MesoNH_O_array[index_1].tht_4;
							h = THAT[3];
							h_w = THAT_W[3];
							break;
						case 5:
							temp = MesoNH_O_array[index_1].tht_5;
							h = THAT[4];
							h_w = THAT_W[4];
							break;
						case 6:
							temp = MesoNH_O_array[index_1].tht_6;
							h = THAT[5];
							h_w = THAT_W[5];
							break;
						case 7:
							temp = MesoNH_O_array[index_1].tht_7;
							h = THAT[6];
							h_w = THAT_W[6];
							break;
						case 8:
							temp = MesoNH_O_array[index_1].tht_8;
							h = THAT[7];
							h_w = THAT_W[7];
							break;
						case 9:
							temp = MesoNH_O_array[index_1].tht_9;
							h = THAT[8];
							h_w = THAT_W[8];
							break;
						case 10:
							temp = MesoNH_O_array[index_1].tht_10;
							h = THAT[9];
							h_w = THAT_W[9];
							break;
						case 11:
							temp = MesoNH_O_array[index_1].tht_11;
							h = THAT[10];
							h_w = THAT_W[10];
							break;
						case 12:
							temp = MesoNH_O_array[index_1].tht_12;
							h = THAT[11];
							h_w = THAT_W[11];
							break;
						case 13:
							temp = MesoNH_O_array[index_1].tht_13;
							h = THAT[12];
							h_w = THAT_W[12];
							break;
						case 14:
							temp = MesoNH_O_array[index_1].tht_14;
							h = THAT[13];
							h_w = THAT_W[13];
							break;
						case 15:
							temp = MesoNH_O_array[index_1].tht_15;
							h = THAT[14];
							h_w = THAT_W[14];
							break;
						case 16:
							temp = MesoNH_O_array[index_1].tht_16;
							h = THAT[15];
							h_w = THAT_W[15];
							break;
						case 17:
							temp = MesoNH_O_array[index_1].tht_17;
							h = THAT[16];
							h_w = THAT_W[16];
							break;
						case 18:
							temp = MesoNH_O_array[index_1].tht_18;
							h = THAT[17];
							h_w = THAT_W[17];
							break;
						case 19:
							temp = MesoNH_O_array[index_1].tht_19;
							h = THAT[18];
							h_w = THAT_W[18];
							break;
						case 20:
							temp = MesoNH_O_array[index_1].tht_20;
							h = THAT[19];
							h_w = THAT_W[19];
							break;
						case 21:
							temp = MesoNH_O_array[index_1].tht_21;
							h = THAT[20];
							h_w = THAT_W[20];
							break;
						case 22:
							temp = MesoNH_O_array[index_1].tht_22;
							h = THAT[21];
							h_w = THAT_W[21];
							break;
						case 23:
							temp = MesoNH_O_array[index_1].tht_23;
							h = THAT[22];
							h_w = THAT_W[22];
							break;
						case 24:
							temp = MesoNH_O_array[index_1].tht_24;
							h = THAT[23];
							h_w = THAT_W[23];
							break;
						case 25:
							temp = MesoNH_O_array[index_1].tht_25;
							h = THAT[24];
							h_w = THAT_W[24];
							break;
						case 26:
							temp = MesoNH_O_array[index_1].tht_26;
							h = THAT[25];
							h_w = THAT_W[25];
							break;
						case 27:
							temp = MesoNH_O_array[index_1].tht_27;
							h = THAT[26];
							h_w = THAT_W[26];
							break;
						case 28:
							temp = MesoNH_O_array[index_1].tht_28;
							h = THAT[27];
							h_w = THAT_W[27];
							break;
						case 29:
							temp = MesoNH_O_array[index_1].tht_29;
							h = THAT[28];
							h_w = THAT_W[28];
							break;
						case 30:
							temp = MesoNH_O_array[index_1].tht_30;
							h = THAT[29];
							h_w = THAT_W[29];
							break;
						case 31:
							temp = MesoNH_O_array[index_1].tht_31;
							h = THAT[30];
							h_w = THAT_W[30];
							break;
						case 32:
							temp = MesoNH_O_array[index_1].tht_32;
							h = THAT[31];
							h_w = THAT_W[31];
							break;
						default:
							return;
					}
													
					var x_o = MesoNH_O_array[index_1].x - Coord_X_paris;
					var y_o = MesoNH_O_array[index_1].y - Coord_Y_paris;					
					var z_o = MesoNH_O_array[index_1].zs + h;
					
					var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
					var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
					var l_z = (h-h_w)*2;
									
									
					var tmin = temperature_scale[0];
					var tmax = temperature_scale[1];
					var percentage_color = (temp - tmin)/(tmax - tmin);
					if(percentage_color<0){
						percentage_color = 0;
					} else if(percentage_color >1){
						percentage_color = 1;
					}
					
					//var color_hex;
					//if(percentage_color<0.5){
					//	color_hex = approximateColor1ToColor2ByPercent(color_array[0], color_array[1], percentage_color*2)
					//} else {
					//	color_hex = approximateColor1ToColor2ByPercent(color_array[1], color_array[2], (percentage_color-0.5)*2)
					//}
					
					temp_values.push(parseFloat(temp));
					var color_hex = getHCLcolor(percentage_color,HCL_color_scales[active_HCL_id].scale);
												
					var color_rgb = hexToRgb(color_hex)
					
					var color_r = color_rgb.r/255;
					var color_g = color_rgb.g/255;
					var color_b = color_rgb.b/255;
						
					var cell_volume = l_x*l_y*l_z;
					
					var relative_density;
					
					if(relative_density_factor < 1){
						var add_factor = 1-relative_density_factor;
						if(percentage_color < 0.5){
							relative_density = particle_density + particle_density*add_factor*(0.5-percentage_color)*2;
						} else if(percentage_color == 0.5){
							relative_density = particle_density;
						} else if(percentage_color > 0.5){
							relative_density = particle_density - particle_density*add_factor*(percentage_color-0.5)*2;
						}
					} else if(relative_density_factor == 1){
						relative_density = particle_density;
					} else if(relative_density_factor >1){
						var add_factor = relative_density_factor-1;
						if(percentage_color < 0.5){
							relative_density = particle_density - particle_density*add_factor*(0.5-percentage_color)*2;
						} else if(percentage_color == 0.5){
							relative_density = particle_density;
						} else if(percentage_color > 0.5){
							relative_density = particle_density + particle_density*add_factor*(percentage_color-0.5)*2;
						}
					}
					
					
					
					var size;
					var basic_size = 10000;
					
					if(relative_size_factor < 1){
						var add_factor = 1-relative_size_factor;
						if(percentage_color < 0.5){
							size = parseInt(basic_size + basic_size*add_factor*(0.5-percentage_color)*2);
						} else if(percentage_color == 0.5){
							size = basic_size;
						} else if(percentage_color > 0.5){
							size = parseInt(basic_size - basic_size*add_factor*(percentage_color-0.5)*2);
						}
					} else if(relative_size_factor == 1){
						size = basic_size;
					} else if(relative_size_factor >1){
						var add_factor = relative_size_factor-1;
						if(percentage_color < 0.5){
							size = parseInt(basic_size - basic_size*add_factor*(0.5-percentage_color)*2);
						} else if(percentage_color == 0.5){
							size = basic_size;
						} else if(percentage_color > 0.5){
							size = parseInt(basic_size + basic_size*add_factor*(percentage_color-0.5)*2);
						}
					}
						
					var particle_length_XY = parseInt(relative_density*l_x*l_y);
					
					var offset_xy = l_x/Math.sqrt(particle_length_XY);
					
					var number_particule_x = parseInt(Math.sqrt(particle_length_XY));
					var number_particule_y = parseInt(Math.sqrt(particle_length_XY));
					var number_particule_z = parseInt((l_z*cst_Z)/(offset_xy*cst_X));
					
					
					
					if(number_particule_x <1){
					number_particule_x=1;
					}
					if(number_particule_y <1){
					number_particule_y=1;
					}
					if(number_particule_z <1){
					number_particule_z=1;
					}
					var offset_z = l_z/number_particule_z;
									
					for(var a=0; a<number_particule_x; a++){
						for(var b=0; b<number_particule_y; b++){
							for(var c=0; c<number_particule_z; c++){
								var pX = (x_o - l_x/2 + a*offset_xy);
								var pY = (y_o - l_y/2 + b*offset_xy);
								var pZ = (z_o - l_z/2 + c*offset_z);
								coord_array.push(pX*cst_X);
								coord_array.push(pZ*cst_Z);
								coord_array.push(-pY*cst_Y);
								colors.push(color_r);colors.push(color_g);colors.push(color_b);
								sizes.push(size);
								transparency_factor_array.push(transparency_factor);
								custompercentagearray.push(percentage_color*2*Math.PI);
								z_position_array.push((pZ - z_min)/(z_max - z_min));
								x_position_array.push((pX - x_min)/(x_max - x_min));
								y_position_array.push((pY - y_min)/(y_max - y_min));
								h_position_array.push(((pZ-MesoNH_O_array[index_1].zs)-h_min)/(h_max - h_min));
							}
						}
					}
					
					
					
				}
			}
		}			
						
		var coord_array_32 = new Float32Array(coord_array);
		var colors_32 = new Float32Array(colors);  
		var sizes_32 = new Float32Array(sizes);
		var transparency_factor_32 = new Float32Array(transparency_factor_array);
		var custompercentage_32 = new Float32Array(custompercentagearray);
		var z_position_array_32 = new Float32Array(z_position_array);
		var x_position_array_32 = new Float32Array(x_position_array);
		var y_position_array_32 = new Float32Array(y_position_array);
		var h_position_array_32 = new Float32Array(h_position_array);
		
			
		//var material = new THREE.PointsMaterial({  vertexColors: THREE.VertexColors  });
		
		var material;
		var bufferGeometry = new THREE.BufferGeometry();
		
		bufferGeometry.setAttribute( 'position', new THREE.BufferAttribute( coord_array_32, 3 ) );
		bufferGeometry.setAttribute( 'customColor', new THREE.BufferAttribute( colors_32, 3 ) );
		bufferGeometry.setAttribute( 'customsize', new THREE.BufferAttribute(sizes_32,1));
		bufferGeometry.setAttribute( 'customtransparency', new THREE.BufferAttribute(transparency_factor_32,1));
		bufferGeometry.setAttribute( 'custompercentage', new THREE.BufferAttribute(custompercentage_32,1));
		bufferGeometry.setAttribute( 'z_position', new THREE.BufferAttribute(z_position_array_32,1));
		bufferGeometry.setAttribute( 'x_position', new THREE.BufferAttribute(x_position_array_32,1));
		bufferGeometry.setAttribute( 'y_position', new THREE.BufferAttribute(y_position_array_32,1));
		bufferGeometry.setAttribute( 'h_position', new THREE.BufferAttribute(h_position_array_32,1));
			
		if(is_animated == false){
			material = new THREE.ShaderMaterial( {
				uniforms: {
					color: { value: new THREE.Color( 0xffffff ) },
					pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
					regularSize: { value: regular_size },
					u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
				},
				vertexShader: document.getElementById( 'vertexshader_fix' ).textContent,
				fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
				// blending: THREE.AdditiveBlending,
				//depthTest: false,
				transparent: true
			} );
		} else if (is_animated == true){
			if(animation_parameter == 'temp'){
				material = new THREE.ShaderMaterial( {
					uniforms: {
						color: { value: new THREE.Color( 0xffffff ) },
						pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
						regularSize: { value: regular_size },
						u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
					},
					vertexShader: document.getElementById( 'vertexshader_anim_temp' ).textContent,
					fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
					// blending: THREE.AdditiveBlending,
					//depthTest: false,
					transparent: true
				} );
				
			} else if(animation_parameter == 'Z'){
				material = new THREE.ShaderMaterial( {
					uniforms: {
						color: { value: new THREE.Color( 0xffffff ) },
						pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
						regularSize: { value: regular_size },
						u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
					},
					vertexShader: document.getElementById( 'vertexshader_anim_z' ).textContent,
					fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
					// blending: THREE.AdditiveBlending,
					//depthTest: false,
					transparent: true
				} );
				
			} else if(animation_parameter == 'X'){
				material = new THREE.ShaderMaterial( {
					uniforms: {
						color: { value: new THREE.Color( 0xffffff ) },
						pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
						regularSize: { value: regular_size },
						u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
					},
					vertexShader: document.getElementById( 'vertexshader_anim_x' ).textContent,
					fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
					// blending: THREE.AdditiveBlending,
					//depthTest: false,
					transparent: true
				} );
				
			} else if(animation_parameter == 'Y'){
				material = new THREE.ShaderMaterial( {
					uniforms: {
						color: { value: new THREE.Color( 0xffffff ) },
						pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
						regularSize: { value: regular_size },
						u_time: { type: "f", value: 0 },
							x_factor_min: { type: "f", value: x_min_factor },
							x_factor_max: { type: "f", value: x_max_factor },
							y_factor_min: { type: "f", value: y_min_factor },
							y_factor_max: { type: "f", value: y_max_factor },
							z_factor_min: { type: "f", value: z_min_factor },
							z_factor_max: { type: "f", value: z_max_factor },
							h_factor_min: { type: "f", value: h_min_factor },
							h_factor_max: { type: "f", value: h_max_factor },
							temp_factor_min: { type: "f", value: temp_min_factor },
							temp_factor_max: { type: "f", value: temp_max_factor }
					},
					vertexShader: document.getElementById( 'vertexshader_anim_y' ).textContent,
					fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
					// blending: THREE.AdditiveBlending,
					//depthTest: false,
					transparent: true
				} );
				
			}
		}
		
        
		// itemSize = 3 setAttribute there are 3 values (components) per vertex
		
		
		
	
		var point = new THREE.Points( bufferGeometry, material);
				
		create_temp_histogram();
				
		grid.add(point);
		scene.add(grid);
	}
	
	
	function load_Data(type_point, data_url, data_Meso_NH_to_load_list, meso_NH_scatterPlot_list, color){
				
		var height_array;
		if(type_point == "W" || type_point == "F"){
			height_array=THAT_W;
		} else {
			height_array=THAT;
		}
		var data = d3.csv(data_url, function (d) {
			var temp_max = 0; 
			var temp_min = 0;
			d.forEach(function (d,i) {
				for(var o = 0; o< data_Meso_NH_to_load_list.length; o++){
														
					var altitude_1 = parseFloat(d.ZS) + height_array[data_Meso_NH_to_load_list[o].level - 1]*((height_array[height_array.length - 1] - parseFloat(d.ZS))/height_array[height_array.length - 1]);
					var altitude = parseFloat(d.MNT) + height_array[data_Meso_NH_to_load_list[o].level - 1]*((height_array[height_array.length - 1] - parseFloat(d.MNT))/height_array[height_array.length - 1]);
					
					//console.log(altitude - altitude_1)
					var data_x,
					data_y,
					data_z;
					//if(isNaN(d.longitude)) {
					//	data_x = 999;
					//} else {
					//	data_x =  parseFloat(d.longitude);
					//}
					//if(isNaN(d.latitude)) {
					//	data_y = 999;
					//} else {
					//	data_y =  parseFloat(d.latitude);
					//}
					//if(isNaN(altitude)) {
					//	data_z = 999;
					//} else {
					//	data_z =  altitude;
					//}
					
					//if(isNaN(d.X)) {
					//	data_x = 999;
					//} else {
					//	if(d.X < 649233 || d.X > 654291) {
					//		continue;
					//	}
					//}
					//if(isNaN(d.Y)) {
					//	data_y = 999;
					//} else {
					//	if(d.Y < 6860334 || d.Y > 6863733) {
					//		continue;
					//	}
					//}
				
					
					if(isNaN(d.X)) {
						data_x = 999;
					} else {
						data_x =  parseFloat(d.X);
					}
					if(isNaN(d.Y)) {
						data_y = 999;
					} else {
						data_y =  parseFloat(d.Y);
					}
					if(isNaN(altitude)) {
						data_z = 999;
					} else {
						//data_z =  altitude_1;
						data_z =  altitude_1;
					}
					var zs_var;
					if(isNaN(d.ZS)) {
						zs_var = 999;
					} else {
						//zs_var =  parseFloat(d.ZS);
						zs_var =  parseFloat(d.ZS);
					}
					
					var tht_2_var = null,
					tht_3_var = null,
					tht_4_var = null,
					tht_5_var = null,
					tht_6_var = null,
					tht_7_var = null,
					tht_8_var = null,
					tht_9_var = null,
					tht_10_var = null,
					tht_11_var = null,
					tht_12_var = null,
					tht_13_var = null,
					tht_14_var = null,
					tht_15_var = null,
					tht_16_var = null,
					tht_17_var = null,
					tht_18_var = null,
					tht_19_var = null,
					tht_20_var = null,
					tht_21_var = null,
					tht_22_var = null,
					tht_23_var = null,
					tht_24_var = null,
					tht_25_var = null,
					tht_26_var = null,
					tht_27_var = null,
					tht_28_var = null,
					tht_29_var = null,
					tht_30_var = null,
					tht_31_var = null,
					tht_32_var = null;
					
					var TEB_1_var = null,
					TEB_2_var = null,
					TEB_3_var = null,
					TEB_4_var = null,
					TEB_5_var = null,
					TEB_6_var = null;
					
					if(type_point == "O"){
						tht_2_var = d.THT_2;
						tht_3_var = d.THT_3; 
						tht_4_var = d.THT_4; 
						tht_5_var = d.THT_5; 
						tht_6_var = d.THT_6; 
						tht_7_var = d.THT_7; 
						tht_8_var = d.THT_8; 
						tht_9_var = d.THT_9; 
						tht_10_var = d.THT_10;
						tht_11_var = d.THT_11;
						tht_12_var = d.THT_12;
						tht_13_var = d.THT_13;
						tht_14_var = d.THT_14;
						tht_15_var = d.THT_15;
						tht_16_var = d.THT_16;
						tht_17_var = d.THT_17;
						tht_18_var = d.THT_18;
						tht_19_var = d.THT_19;
						tht_20_var = d.THT_20;
						tht_21_var = d.THT_21;
						tht_22_var = d.THT_22;
						tht_23_var = d.THT_23;
						tht_24_var = d.THT_24;
						tht_25_var = d.THT_25;
						tht_26_var = d.THT_26;
						tht_27_var = d.THT_27;
						tht_28_var = d.THT_28;
						tht_29_var = d.THT_29;
						tht_30_var = d.THT_30;
						tht_31_var = d.THT_31;
						tht_32_var = d.THT_32;
						TEB_1_var = d.TEB_T1;
						TEB_2_var = d.TEB_T2;
						TEB_3_var = d.TEB_T3;
						TEB_4_var = d.TEB_T4;
						TEB_5_var = d.TEB_T5;
						TEB_6_var = d.TEB_T6;
						
						temp_min = TEB_6_var;
						temp_max = TEB_6_var;
						
						if(tht_2_var < temp_min){temp_min = tht_2_var;};if(tht_3_var < temp_min){temp_min = tht_3_var;};if(tht_4_var < temp_min){temp_min = tht_4_var;};if(tht_5_var < temp_min){temp_min = tht_5_var;};if(tht_6_var < temp_min){temp_min = tht_6_var;};if(tht_7_var < temp_min){temp_min = tht_7_var;};if(tht_8_var < temp_min){temp_min = tht_8_var;};if(tht_9_var < temp_min){temp_min = tht_9_var;};if(tht_10_var < temp_min){temp_min = tht_10_var;};if(tht_11_var < temp_min){temp_min = tht_11_var;};if(tht_12_var < temp_min){temp_min = tht_12_var;};if(tht_13_var < temp_min){temp_min = tht_13_var;};if(tht_14_var < temp_min){temp_min = tht_14_var;};if(tht_15_var < temp_min){temp_min = tht_15_var;};if(tht_16_var < temp_min){temp_min = tht_16_var;};if(tht_17_var < temp_min){temp_min = tht_17_var;};if(tht_18_var < temp_min){temp_min = tht_18_var;};if(tht_19_var < temp_min){temp_min = tht_19_var;};if(tht_20_var < temp_min){temp_min = tht_20_var;};if(tht_21_var < temp_min){temp_min = tht_21_var;};if(tht_22_var < temp_min){temp_min = tht_22_var;};if(tht_23_var < temp_min){temp_min = tht_23_var;};if(tht_24_var < temp_min){temp_min = tht_24_var;};if(tht_25_var < temp_min){temp_min = tht_25_var;};if(tht_26_var < temp_min){temp_min = tht_26_var;};if(tht_27_var < temp_min){temp_min = tht_27_var;};if(tht_28_var < temp_min){temp_min = tht_28_var;};if(tht_29_var < temp_min){temp_min = tht_29_var;};if(tht_30_var < temp_min){temp_min = tht_30_var;};if(tht_31_var < temp_min){temp_min = tht_31_var;};if(tht_32_var < temp_min){temp_min = tht_32_var;};if(TEB_1_var < temp_min){temp_min = TEB_1_var;};if(TEB_2_var < temp_min){temp_min = TEB_2_var;};if(TEB_3_var < temp_min){temp_min = TEB_3_var;};if(TEB_4_var < temp_min){temp_min = TEB_4_var;};if(TEB_5_var < temp_min){temp_min = TEB_5_var;};if(TEB_6_var < temp_min){temp_min = TEB_6_var;};
						
						if(tht_2_var > temp_max){temp_max = tht_2_var;};if(tht_3_var > temp_max){temp_max = tht_3_var;};if(tht_4_var > temp_max){temp_max = tht_4_var;};if(tht_5_var > temp_max){temp_max = tht_5_var;};if(tht_6_var > temp_max){temp_max = tht_6_var;};if(tht_7_var > temp_max){temp_max = tht_7_var;};if(tht_8_var > temp_max){temp_max = tht_8_var;};if(tht_9_var > temp_max){temp_max = tht_9_var;};if(tht_10_var > temp_max){temp_max = tht_10_var;};if(tht_11_var > temp_max){temp_max = tht_11_var;};if(tht_12_var > temp_max){temp_max = tht_12_var;};if(tht_13_var > temp_max){temp_max = tht_13_var;};if(tht_14_var > temp_max){temp_max = tht_14_var;};if(tht_15_var > temp_max){temp_max = tht_15_var;};if(tht_16_var > temp_max){temp_max = tht_16_var;};if(tht_17_var > temp_max){temp_max = tht_17_var;};if(tht_18_var > temp_max){temp_max = tht_18_var;};if(tht_19_var > temp_max){temp_max = tht_19_var;};if(tht_20_var > temp_max){temp_max = tht_20_var;};if(tht_21_var > temp_max){temp_max = tht_21_var;};if(tht_22_var > temp_max){temp_max = tht_22_var;};if(tht_23_var > temp_max){temp_max = tht_23_var;};if(tht_24_var > temp_max){temp_max = tht_24_var;};if(tht_25_var > temp_max){temp_max = tht_25_var;};if(tht_26_var > temp_max){temp_max = tht_26_var;};if(tht_27_var > temp_max){temp_max = tht_27_var;};if(tht_28_var > temp_max){temp_max = tht_28_var;};if(tht_29_var > temp_max){temp_max = tht_29_var;};if(tht_30_var > temp_max){temp_max = tht_30_var;};if(tht_31_var > temp_max){temp_max = tht_31_var;};if(tht_32_var > temp_max){temp_max = tht_32_var;};if(TEB_1_var > temp_max){temp_max = TEB_1_var;};if(TEB_2_var > temp_max){temp_max = TEB_2_var;};if(TEB_3_var > temp_max){temp_max = TEB_3_var;};if(TEB_4_var > temp_max){temp_max = TEB_4_var;};if(TEB_5_var > temp_max){temp_max = TEB_5_var;};if(TEB_6_var > temp_max){temp_max = TEB_6_var;};
					}
					
					data_Meso_NH_to_load_list[o].data.push({
						x: data_x,
						y: data_y,
						z: data_z,
						tht_2: tht_2_var,
						tht_3: tht_2_var, 
						tht_4: tht_3_var, 
						tht_5: tht_4_var, 
						tht_6: tht_5_var, 
						tht_7: tht_6_var, 
						tht_8: tht_7_var, 
						tht_9: tht_8_var, 
						tht_9: tht_9_var, 
						tht_10: tht_10_var,
						tht_11: tht_11_var,
						tht_12: tht_12_var,
						tht_13: tht_13_var,
						tht_14: tht_14_var,
						tht_15: tht_15_var,
						tht_16: tht_16_var,
						tht_17: tht_17_var,
						tht_18: tht_18_var,
						tht_19: tht_19_var,
						tht_20: tht_20_var,
						tht_21: tht_21_var,
						tht_22: tht_22_var,
						tht_23: tht_23_var,
						tht_24: tht_24_var,
						tht_25: tht_25_var,
						tht_26: tht_26_var,
						tht_27: tht_27_var,
						tht_28: tht_28_var,
						tht_29: tht_29_var,
						tht_30: tht_30_var,
						tht_31: tht_31_var,
						tht_32: tht_32_var,
						teb_1: TEB_1_var,
						teb_2: TEB_2_var,
						teb_3: TEB_3_var,
						teb_4: TEB_4_var,
						teb_5: TEB_5_var,
						teb_6: TEB_6_var,
						zs: zs_var
					})
				}
				
				
			})
			
			if(type_point == "O"){
				data_volume_3D = create_data_texture(data_points_O_2, data_ni, data_nj, 31 + 6,temp_min,temp_max);
			}
			
			return data_Meso_NH_to_load_list
		});
	}
		
	
	
	function render(){
		requestAnimationFrame( render );
		if(grid != null && is_animated == true){
			grid.children[0].material.uniforms.u_time.value += animation_speed_factor;
		}
		////mesh.rotation.x += 0.01;
		////scatterPlot_MesoNH_2.rotation.y += 0.02;
		////renderer.domElement.addEventListener("click", getClicked3DPoint, true);
		
		controls.update();
		//renderer.render( scene, camera );
		
		renderer.render( scene, camera );
	}
	
	
	
	function checkKey(e) {

		e = e || window.event;

		if (e.keyCode == '38') {
			// up arrow
			camera.position.x = camera.position.x;
			camera.position.y = camera.position.y;
			camera.position.z = camera.position.z - 5;
			controls.update();
			//camera.rotation.x = camera.rotation.x - Math.PI/100;
			//camera.lookAt(new THREE.Vector3(0,0,0));
		}
		else if (e.keyCode == '40') {
			// down arrow
			camera.position.x = camera.position.x;
			camera.position.y = camera.position.y;
			camera.position.z = camera.position.z + 5;
			controls.update();
			//camera.rotation.x = camera.rotation.x + Math.PI/100;
			//camera.lookAt(new THREE.Vector3(0,0,0));
		}
		else if (e.keyCode == '37') {
		   // left arrow
		   camera.position.x = camera.position.x - 5;
			camera.position.y = camera.position.y;
			camera.position.z = camera.position.z;
			controls.update();
			//camera.rotation.y = camera.rotation.y + Math.PI/100;
			//camera.lookAt(new THREE.Vector3(0,0,0));
		}
		else if (e.keyCode == '39') {
		   // right arrow
		   camera.position.x = camera.position.x + 5;
			camera.position.y = camera.position.y;
			camera.position.z = camera.position.z;
			controls.update();
			//camera.rotation.y = camera.rotation.y - Math.PI/100;
			//camera.lookAt(new THREE.Vector3(0,0,0));
		}
		else if (e.keyCode == '107') {
		   // add
		   camera.position.x = camera.position.x;
			camera.position.y = camera.position.y +5;
			camera.position.z = camera.position.z;
			controls.update();
				//camera.lookAt(new THREE.Vector3(0,0,0));
			
		}
		else if (e.keyCode == '109') {
		   // sustract
		  camera.position.x = camera.position.x;
			camera.position.y = camera.position.y -5;
			camera.position.z = camera.position.z;
			controls.update();
				//camera.lookAt(new THREE.Vector3(0,0,0));
			
		}
		else if (e.keyCode == '90') {
		   // z
		   camera.rotation.x = camera.rotation.x + Math.PI / 400;
		   controls.update();
		}
		else if (e.keyCode == '83') {
		   // s
		   camera.rotation.x = camera.rotation.x - Math.PI / 400;
		   controls.update();
		}
		else if (e.keyCode == '81') {
		   // q
		   camera.rotation.z = camera.rotation.z + Math.PI / 400;
		   controls.update();
		}
		else if (e.keyCode == '68') {
		   // d
		   camera.rotation.z = camera.rotation.z - Math.PI / 400;
		   controls.update();
		}
		else if (e.keyCode == '65') {
		   // a
		   camera.rotation.y = camera.rotation.y + Math.PI / 400;
		   controls.update();
		}
		else if (e.keyCode == '69') {
		   // e
		   camera.rotation.y = camera.rotation.y - Math.PI / 400;
		   controls.update();
		}

	}
	
	
	function hexToRgb(hex) {
	  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	  return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	  } : null;
	}
	
	function approximateColor1ToColor2ByPercent(color1, color2, percent) {
	
	  var red1 = parseInt(color1[1] + color1[2], 16);
	  var green1 = parseInt(color1[3] + color1[4], 16);
	  var blue1 = parseInt(color1[5] + color1[6], 16);

	  var red2 = parseInt(color2[1] + color2[2], 16);
	  var green2 = parseInt(color2[3] + color2[4], 16);
	  var blue2 = parseInt(color2[5] + color2[6], 16);

	  var red = Math.round(mix(red1, red2, percent));
	  var green = Math.round(mix(green1, green2, percent));
	  var blue = Math.round(mix(blue1, blue2, percent));

	  return generateHex(red, green, blue);
	}

	function generateHex(r, g, b) {
	  r = r.toString(16);
	  g = g.toString(16);
	  b = b.toString(16);

	  // to address problem mentioned by Alexis Wilke:
	  while (r.length < 2) { r = "0" + r; }
	  while (g.length < 2) { g = "0" + g; }
	  while (b.length < 2) { b = "0" + b; }

	  return "#" + r + g + b;
	}

	function mix(start, end, percent) {
		return start + ((percent) * (end - start));
	}
	
	function import_geojson(geojson_file,grid,scene,nature_type) {
	var features_points_array = [];
	var features_color_array = [];
	var features_normal_array = [];
	  for(var a =0; a< geojson_file.features.length; a++){
	  //for(var a =0; a< 10000; a++){
			var feature = geojson_file.features[a];
			
			var polygon_coordinate = [];
			
			
			var building_color;
			switch(nature_type){
				case 'typo_maj':
					building_color = return_building_color(feature.properties.typo_maj,'typo_maj');
					break;
				case 'typo_second':
					building_color = return_building_color(feature.properties.typo_second,'typo_second');
					break;
				case 'build_dens':
					building_color = return_building_color(feature.properties.build_dens,'build_dens');
					break;
				case 'hydro_dens':
					building_color = return_building_color(feature.properties.hydro_dens,'hydro_dens');
					break;
				case 'veget_dens':
					building_color = return_building_color(feature.properties.veget_dens,'veget_dens');
					break;
				case 'road_dens':
					building_color = return_building_color(feature.properties.road_dens,'road_dens');
					break;
				case 'ba':
					building_color = return_building_color(feature.properties.ba,'ba');
					break;
				case 'bgh':
					building_color = return_building_color(feature.properties.bgh,'bgh');
					break;
				case 'icif':
					building_color = return_building_color(feature.properties.icif,'icif');
					break;
				case 'icio':
					building_color = return_building_color(feature.properties.icio,'icio');
					break;
				case 'id':
					building_color = return_building_color(feature.properties.id,'id');
					break;
				case 'local':
					building_color = return_building_color(feature.properties.local,'local');
					break;
				case 'pcif':
					building_color = return_building_color(feature.properties.pcif,'pcif');
					break;
				case 'pcio':
					building_color = return_building_color(feature.properties.pcio,'pcio');
					break;
				case 'pd':
					building_color = return_building_color(feature.properties.pd,'pd');
					break;
				case 'psc':
					building_color = return_building_color(feature.properties.psc,'psc');
					break;
				case 'autre':
					building_color = return_building_color(null,'autre');
					break;
			}
			
			
			for(var j =0; j< feature.geometry.coordinates[0][0].length; j++){
				var index_1 = j;
				var index_2;
				if(j == feature.geometry.coordinates[0][0].length - 1){
					index_2 = 0;
				} else {
					index_2 = j+1;
				}
				
				polygon_coordinate.push((feature.geometry.coordinates[0][0][index_1][0]-Coord_X_paris)*cst_X);
				polygon_coordinate.push((feature.geometry.coordinates[0][0][index_1][1]-Coord_Y_paris)*cst_Y);
				
				features_points_array.push((feature.geometry.coordinates[0][0][index_1][0]-Coord_X_paris)*cst_X);features_points_array.push(feature.properties.altitude_s*cst_Z);features_points_array.push(-(feature.geometry.coordinates[0][0][index_1][1]-Coord_Y_paris)*cst_Y);
				features_points_array.push((feature.geometry.coordinates[0][0][index_1][0]-Coord_X_paris)*cst_X);features_points_array.push(feature.properties.altitude_t*cst_Z);features_points_array.push(-(feature.geometry.coordinates[0][0][index_1][1]-Coord_Y_paris)*cst_Y);
				features_points_array.push((feature.geometry.coordinates[0][0][index_2][0]-Coord_X_paris)*cst_X);features_points_array.push(feature.properties.altitude_s*cst_Z);features_points_array.push(-(feature.geometry.coordinates[0][0][index_2][1]-Coord_Y_paris)*cst_Y);
				
				features_points_array.push((feature.geometry.coordinates[0][0][index_1][0]-Coord_X_paris)*cst_X);features_points_array.push(feature.properties.altitude_t*cst_Z);features_points_array.push(-(feature.geometry.coordinates[0][0][index_1][1]-Coord_Y_paris)*cst_Y);
				features_points_array.push((feature.geometry.coordinates[0][0][index_2][0]-Coord_X_paris)*cst_X);features_points_array.push(feature.properties.altitude_t*cst_Z);features_points_array.push(-(feature.geometry.coordinates[0][0][index_2][1]-Coord_Y_paris)*cst_Y);
				features_points_array.push((feature.geometry.coordinates[0][0][index_2][0]-Coord_X_paris)*cst_X);features_points_array.push(feature.properties.altitude_s*cst_Z);features_points_array.push(-(feature.geometry.coordinates[0][0][index_2][1]-Coord_Y_paris)*cst_Y);
				
				var N_X = - (feature.properties.altitude_t*cst_Z-feature.properties.altitude_s*cst_Z)*((feature.geometry.coordinates[0][0][index_2][1]-Coord_Y_paris)*cst_Y-(feature.geometry.coordinates[0][0][index_1][1]-Coord_Y_paris)*cst_Y);
				var N_Y = (feature.properties.altitude_t*cst_Z-feature.properties.altitude_s*cst_Z)*((feature.geometry.coordinates[0][0][index_2][0]-Coord_X_paris)*cst_X-(feature.geometry.coordinates[0][0][index_1][0]-Coord_X_paris)*cst_X);
				//var N_Z = ((feature.geometry.coordinates[0][0][index_1][0]-Coord_X_paris)*cst_X-(feature.geometry.coordinates[0][0][index_1][0]-Coord_X_paris)*cst_X)*((feature.geometry.coordinates[0][0][index_2][1]-Coord_Y_paris)*cst_Y-(feature.geometry.coordinates[0][0][index_1][1]-Coord_Y_paris)*cst_Y) - ((feature.geometry.coordinates[0][0][index_1][1]-Coord_Y_paris)*cst_Y-(feature.geometry.coordinates[0][0][index_1][1]-Coord_Y_paris)*cst_Y)*((feature.geometry.coordinates[0][0][index_2][0]-Coord_X_paris)*cst_X-(feature.geometry.coordinates[0][0][index_1][0]-Coord_X_paris)*cst_X);
				
				var normal_vector = new THREE.Vector2( N_X, N_Y );
				normal_vector.normalize();
				
				features_normal_array.push(normal_vector.x);features_normal_array.push(0);features_normal_array.push(normal_vector.y);
				features_normal_array.push(normal_vector.x);features_normal_array.push(0);features_normal_array.push(normal_vector.y);
				features_normal_array.push(normal_vector.x);features_normal_array.push(0);features_normal_array.push(normal_vector.y);
				features_normal_array.push(normal_vector.x);features_normal_array.push(0);features_normal_array.push(normal_vector.y);
				features_normal_array.push(normal_vector.x);features_normal_array.push(0);features_normal_array.push(normal_vector.y);
				features_normal_array.push(normal_vector.x);features_normal_array.push(0);features_normal_array.push(normal_vector.y);
												
				features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
				features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
				features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
				features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
				features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
				features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
			}
			
			var polygon_triangulate = earcut(polygon_coordinate,null,2);
			for(var t=0; t<polygon_triangulate.length; t++){
				features_points_array.push(polygon_coordinate[polygon_triangulate[t]*2]);
				features_points_array.push(feature.properties.altitude_t*cst_Z);
				features_points_array.push(-polygon_coordinate[polygon_triangulate[t]*2 + 1]);
				
				features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
				features_normal_array.push(0);features_normal_array.push(1);features_normal_array.push(0);
			}
			for(var t=0; t<polygon_triangulate.length; t++){
				features_points_array.push(polygon_coordinate[polygon_triangulate[t]*2]);
				features_points_array.push(feature.properties.altitude_s*cst_Z);
				features_points_array.push(-polygon_coordinate[polygon_triangulate[t]*2 + 1]);
				
				features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
				features_normal_array.push(0);features_normal_array.push(1);features_normal_array.push(0);
			}
			
			
	  }
	  var feature_coord_array_32 = new Float32Array(features_points_array);
		var feature_colors_32 = new Float32Array(features_color_array);
		var feature_normal_32 = new Float32Array(features_normal_array);		
		    
		//var feature_material = new THREE.MeshBasicMaterial({  vertexColors: THREE.VertexColors  });
		var feature_material = new THREE.MeshPhongMaterial( { vertexColors: THREE.VertexColors, emissive: 0x072534, side: THREE.DoubleSide, flatShading: true } );
		var feature_bufferGeometry = new THREE.BufferGeometry();
        
		// itemSize = 3 setAttribute there are 3 values (components) per vertex
		feature_bufferGeometry.setAttribute( 'position', new THREE.BufferAttribute( feature_coord_array_32, 3 ) );
		feature_bufferGeometry.setAttribute( 'normal', new THREE.BufferAttribute( feature_normal_32, 3 ) );
		feature_bufferGeometry.setAttribute( 'color', new THREE.BufferAttribute( feature_colors_32, 3 ) );
		var feature_mesh = new THREE.Mesh( feature_bufferGeometry, feature_material);
		
		
			
		grid.add(feature_mesh);
		scene.add(grid);
		

	}
	
	function return_building_color(type,nature_type){
		var color_hex = '#7f7f7f';
		var color = {'r':null,'g':null,'b':null};
		if(nature_type == "typo_maj"){
			switch(type){
				case 'ba':
					color_hex = '#8f8f8f';
					break;
				case 'bgh':
					color_hex = '#000d00';
					break;
				case 'icif':
					color_hex = '#d52623';
					break;
				case 'icio':
					color_hex = '#f07923';
					break;
				case 'id':
					color_hex = '#eccb27';
					break;
				case 'local':
					color_hex = '#d728ac';
					break;
				case 'pcif':
					color_hex = '#2b6724';
					break;
				case 'pcio':
					color_hex = '#36884a';
					break;
				case 'pd':
					color_hex = '#22be2f';
					break;
				case 'psc':
					color_hex = '#05ff58';
					break;
				default:
					color_hex = '#7f7f7f';
			}
		} else if(nature_type == "typo_second"){
			switch(type){
				case 'ba':
					color_hex = '#8f8f8f';
					break;
				case 'bgh':
					color_hex = '#000d00';
					break;
				case 'icif':
					color_hex = '#d52623';
					break;
				case 'icio':
					color_hex = '#f07923';
					break;
				case 'id':
					color_hex = '#eccb27';
					break;
				case 'local':
					color_hex = '#d728ac';
					break;
				case 'pcif':
					color_hex = '#2b6724';
					break;
				case 'na':
					color_hex = '#36884a';
					break;
				case 'pd':
					color_hex = '#22be2f';
					break;
				case 'psc':
					color_hex = '#05ff58';
					break;
				default:
					color_hex = '#7f7f7f';
			}		
		} else if (nature_type == 'build_dens'){
			var color_1 = '#F6CAE5';
			var color_2 = '#94002F';
			if(type != null && type != undefined){
				color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type);
			} else {
				color_hex = '#7f7f7f';
			}	
		} else if (nature_type == 'hydro_dens'){
			var color_1 = '#7198EC';
			var color_2 = '#04065A';
			if(type != null && type != undefined){
				color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type);
			} else {
				color_hex = '#7f7f7f';
			}	
		} else if (nature_type == 'veget_dens'){
			var color_1 = '#FFF4B9';
			var color_2 = '#005F13';
			if(type != null && type != undefined){
				color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type);
			} else {
				color_hex = '#7f7f7f';
			}	
		} else if (nature_type == 'road_dens'){
			var color_1 = '#EEEEEE';
			var color_2 = '#676767';
			if(type != null && type != undefined){
				color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type);
			} else {
				color_hex = '#7f7f7f';
			}	
		} else if (nature_type == 'ba'){
			var color_1 = '#EEEEEE';
			var color_2 = '#676767';
			if(type != null && type != undefined){
				color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type/100);
			} else {
				color_hex = '#7f7f7f';
			}	
		} else if (nature_type == 'bgh'){
			var color_1 = '#EEEEEE';
			var color_2 = '#676767';
			if(type != null && type != undefined){
				color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type/100);
			} else {
				color_hex = '#7f7f7f';
			}	
		} else if (nature_type == 'icif'){
			var color_1 = '#EEEEEE';
			var color_2 = '#676767';
			if(type != null && type != undefined){
				color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type/100);
			} else {
				color_hex = '#7f7f7f';
			}	
		} else if (nature_type == 'icio'){
			var color_1 = '#EEEEEE';
			var color_2 = '#676767';
			if(type != null && type != undefined){
				color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type/100);
			} else {
				color_hex = '#7f7f7f';
			}	
		} else if (nature_type == 'id'){
			var color_1 = '#EEEEEE';
			var color_2 = '#676767';
			if(type != null && type != undefined){
				color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type/100);
			} else {
				color_hex = '#7f7f7f';
			}	
		} else if (nature_type == 'local'){
			var color_1 = '#EEEEEE';
			var color_2 = '#676767';
			if(type != null && type != undefined){
				color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type/100);
			} else {
				color_hex = '#7f7f7f';
			}	
		} else if (nature_type == 'pcif'){
			var color_1 = '#EEEEEE';
			var color_2 = '#676767';
			if(type != null && type != undefined){
				color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type/100);
			} else {
				color_hex = '#7f7f7f';
			}	
		} else if (nature_type == 'pcio'){
			var color_1 = '#EEEEEE';
			var color_2 = '#676767';
			if(type != null && type != undefined){
				color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type/100);
			} else {
				color_hex = '#7f7f7f';
			}	
		} else if (nature_type == 'pd'){
			var color_1 = '#EEEEEE';
			var color_2 = '#676767';
			if(type != null && type != undefined){
				color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type/100);
			} else {
				color_hex = '#7f7f7f';
			}	
		} else if (nature_type == 'psc'){
			var color_1 = '#EEEEEE';
			var color_2 = '#676767';
			if(type != null && type != undefined){
				color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type/100);
			} else {
				color_hex = '#7f7f7f';
			}	
		}
				
		
		var color_rgb = hexToRgb(color_hex);
					
		color.r = color_rgb.r/255;
		color.g = color_rgb.g/255;
		color.b = color_rgb.b/255;
		
		return color;
	}
	
	function getHCLcolor(percentage,HCLscale){
		if(active_color_class == "ecarts_egaux"){
			var percentage_slice = 1/HCLscale.length;
			if(Math.trunc(percentage/percentage_slice) < HCLscale.length){
				color = HCLscale[Math.trunc(percentage/percentage_slice)];
				}
			return color;
		}
	}
	
	function create_temp_histogram(){
		var temp_deg=[];
		for(var j = 0; j<temp_values.length; j++){
			temp_deg.push(temp_values[j] - 273.15);
		}
		//console.log(temp_deg)
	}
	
	function import_road_geojson(geojson_file,grid,scene) {

	var features_points_array = [];
	var features_color_array = [];
	var features_normal_array = [];
	
	var roads_height = 25;
	
	var texture = new THREE.DataTexture3D( data_volume_3D.data_temp, data_volume_3D.x_length, data_volume_3D.y_length, data_volume_3D.z_length );
	texture.format = THREE.RedFormat;
	texture.type = THREE.FloatType;
	//texture.minFilter = texture.magFilter = THREE.LinearFilter;
	texture.unpackAlignment = 1;

	var texture_zs = new THREE.DataTexture( data_volume_3D.data_zs, data_volume_3D.x_length, data_volume_3D.y_length);
	texture_zs.format = THREE.RedFormat;
	texture_zs.type = THREE.FloatType;
	//texture_zs.minFilter = texture.magFilter = THREE.LinearFilter;
	texture_zs.unpackAlignment = 1;
	
	// Colormap textures
	cmtextures = {
		blue_red_2: new THREE.TextureLoader().load( 'color/blue_red_2.png', render )
	};
	
	
	var clim_1 = (temp_array[0] - data_volume_3D.temp_min)/(data_volume_3D.temp_max - data_volume_3D.temp_min);
	var clim_2 = (temp_array[1] - data_volume_3D.temp_min)/(data_volume_3D.temp_max - data_volume_3D.temp_min);
	if(clim_1 < 0){
		clim_1 = 0;
	}
	if(clim_1 > 1){
		clim_1 = 1;
	}
	if(clim_2 < 0){
		clim_2 = 0;
	}
	if(clim_2 > 1){
		clim_2 = 1;
	}
	//console.log(data_volume_3D);
	//var limit_meso_array = [0.0,1.0,3.0,5.0,8.0,12.0,45.0,60.0,132.0,218.4,322.1,446.5,595.8,775.0,989.9,1247.9,1557.5,1929.0,2374.8,2909.8,3551.8,4251.8,4951.8,5651.8,6351.8,7051.8,7751.8,8451.8,9151.8,9851.8,10551.8,11251.8,11951.8,12651.8,13351.8,14051.8,14751.8,15451.8];
	
	//var limit_meso_array = [0.0,1.0,3.0,5.0,8.0,12.0,46.0,60.0,132.0,218.4,322.1,446.5,595.8,775.0,989.9,1247.9,1557.5,1929.0,2374.8,2909.8,3551.8,4251.8,4951.8,5651.8,6351.8,7051.8,7751.8,8451.8,9151.8,9851.8,10551.8,11251.8,11951.8,12651.8,13351.8,14051.8,14751.8,15451.8];
	
	var limit_meso_array = [1.0,2.0,4.0,6.0,9.0,13.0,47.0,60.0,132.0,218.4,322.1,446.5,595.8,775.0,989.9,1247.9,1557.5,1929.0,2374.8,2909.8,3551.8,4251.8,4951.8,5651.8,6351.8,7051.8,7751.8,8451.8,9151.8,9851.8,10551.8,11251.8,11951.8,12651.8,13351.8,14051.8,14751.8,15451.8];
		
	console.log(data_volume_3D.data_temp);
		
	//var pos = [];		
	var road_material = new THREE.ShaderMaterial( {
						side: THREE.DoubleSide,
						uniforms: {
							u_data: { value: texture },
							zs_data: { value: texture_zs},
							u_cmdata: { value: cmtextures.blue_red_2 },
							u_clim: { value: [temp_array[0],temp_array[1]] },
							u_size: { value: [data_volume_3D.x_length, data_volume_3D.y_length, data_volume_3D.z_length] },
							x_min:{type: "f", value: 154.3850000000093},
							x_max:{type: "f", value: 779.4010000000708},
							y_min:{type: "f", value: 604.3519999999553},
							y_max:{type: "f", value: 1227.0260000005364},
							zs: {type: "f", value: 46.81231},
							//zs: {type: "f", value: 35.0},
							mesolimit: {value: limit_meso_array},
							cst_X: {value: cst_X},
							cst_Y: {value: cst_Y},
							cst_Z: {value: cst_Z},
						},
						vertexShader: document.getElementById( 'vertexshader_3D_plane' ).textContent,
						fragmentShader: document.getElementById( 'fragmentshader_3D_plane' ).textContent
					} );

		
	  for(var a =0; a< geojson_file.features.length - 1; a++){
	  //for(var a =0; a< 10000; a++){
			var feature_1 = geojson_file.features[a];
			var feature_2 = geojson_file.features[a+1];
			
			if(feature_2.properties.id_road != feature_1.properties.id_road){
				continue;
			} else {
			
			//var v_position = [feature_1.geometry.coordinates[0]-Coord_X_paris];
			//
			//var voxel_position_x = (v_position[0] - x_min)/(x_max - x_min)*u_size[0];
			//var voxel_position_y = -(v_position[2] - y_min)/(y_max - y_min)*u_size[2];
			//var voxel_position_z = 0.0;
			//for(var i=1; i< 38; i++){
			//	if(limit_meso_array[i] > v_position[1]){
			//		var z_min = zs + limit_meso_array[i-1];
			//		var z_max = zs + limit_meso_array[i];
			//		voxel_position_z = (v_position[1] - z_min)/(z_max - z_min) + (i-1.0);
			//		break;
			//	}				
			//}
			
			
			var building_color = getRoadColor(feature_1.properties.type); 
						
			features_points_array.push((feature_1.geometry.coordinates[0]-Coord_X_paris)*cst_X);features_points_array.push(feature_1.properties.MNT*cst_Z);features_points_array.push(-(feature_1.geometry.coordinates[1]-Coord_Y_paris)*cst_Y);
			features_points_array.push((feature_1.geometry.coordinates[0]-Coord_X_paris)*cst_X);features_points_array.push((feature_1.properties.MNT + roads_height)*cst_Z);features_points_array.push(-(feature_1.geometry.coordinates[1]-Coord_Y_paris)*cst_Y);
			features_points_array.push((feature_2.geometry.coordinates[0]-Coord_X_paris)*cst_X);features_points_array.push(feature_2.properties.MNT*cst_Z);features_points_array.push(-(feature_2.geometry.coordinates[1]-Coord_Y_paris)*cst_Y);
			
			features_points_array.push((feature_1.geometry.coordinates[0]-Coord_X_paris)*cst_X);features_points_array.push((feature_1.properties.MNT + roads_height)*cst_Z);features_points_array.push(-(feature_1.geometry.coordinates[1]-Coord_Y_paris)*cst_Y);
			features_points_array.push((feature_2.geometry.coordinates[0]-Coord_X_paris)*cst_X);features_points_array.push((feature_2.properties.MNT + roads_height)*cst_Z);features_points_array.push(-(feature_2.geometry.coordinates[1]-Coord_Y_paris)*cst_Y);
			features_points_array.push((feature_2.geometry.coordinates[0]-Coord_X_paris)*cst_X);features_points_array.push(feature_2.properties.MNT*cst_Z);features_points_array.push(-(feature_2.geometry.coordinates[1]-Coord_Y_paris)*cst_Y);
			
			var N_X = - ((feature_2.properties.MNT + roads_height)*cst_Z-feature_1.properties.MNT*cst_Z)*((feature_2.geometry.coordinates[1]-Coord_Y_paris)*cst_Y-(feature_1.geometry.coordinates[1]-Coord_Y_paris)*cst_Y);
			var N_Y = ((feature_2.properties.MNT + roads_height)*cst_Z-feature_1.properties.MNT*cst_Z)*((feature_2.geometry.coordinates[0]-Coord_X_paris)*cst_X-(feature_1.geometry.coordinates[0]-Coord_X_paris)*cst_X);
			//var N_Z = ((feature.geometry.coordinates[0][0][index_1][0]-Coord_X_paris)*cst_X-(feature.geometry.coordinates[0][0][index_1][0]-Coord_X_paris)*cst_X)*((feature.geometry.coordinates[0][0][index_2][1]-Coord_Y_paris)*cst_Y-(feature.geometry.coordinates[0][0][index_1][1]-Coord_Y_paris)*cst_Y) - ((feature.geometry.coordinates[0][0][index_1][1]-Coord_Y_paris)*cst_Y-(feature.geometry.coordinates[0][0][index_1][1]-Coord_Y_paris)*cst_Y)*((feature.geometry.coordinates[0][0][index_2][0]-Coord_X_paris)*cst_X-(feature.geometry.coordinates[0][0][index_1][0]-Coord_X_paris)*cst_X);
			
			var normal_vector = new THREE.Vector2( N_X, N_Y );
			normal_vector.normalize();
			
			features_normal_array.push(normal_vector.x);features_normal_array.push(0);features_normal_array.push(normal_vector.y);
			features_normal_array.push(normal_vector.x);features_normal_array.push(0);features_normal_array.push(normal_vector.y);
			features_normal_array.push(normal_vector.x);features_normal_array.push(0);features_normal_array.push(normal_vector.y);
			features_normal_array.push(normal_vector.x);features_normal_array.push(0);features_normal_array.push(normal_vector.y);
			features_normal_array.push(normal_vector.x);features_normal_array.push(0);features_normal_array.push(normal_vector.y);
			features_normal_array.push(normal_vector.x);features_normal_array.push(0);features_normal_array.push(normal_vector.y);
											
			features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
			features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
			features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
			features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
			features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
			features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
			}
						
			
	  }
	  
	  var feature_coord_array_32 = new Float32Array(features_points_array);
		var feature_colors_32 = new Float32Array(features_color_array);
		var feature_normal_32 = new Float32Array(features_normal_array);		
		    
		//var feature_material = new THREE.MeshBasicMaterial({  vertexColors: THREE.VertexColors  });
		var feature_material = new THREE.MeshPhongMaterial( { vertexColors: THREE.VertexColors, emissive: 0x072534, side: THREE.DoubleSide, flatShading: true } );
		var feature_bufferGeometry = new THREE.BufferGeometry();
        
		// itemSize = 3 setAttribute there are 3 values (components) per vertex
		feature_bufferGeometry.setAttribute( 'position', new THREE.BufferAttribute( feature_coord_array_32, 3 ) );
		feature_bufferGeometry.setAttribute( 'normal', new THREE.BufferAttribute( feature_normal_32, 3 ) );
		feature_bufferGeometry.setAttribute( 'color', new THREE.BufferAttribute( feature_colors_32, 3 ) );
		//var feature_mesh = new THREE.Mesh( feature_bufferGeometry, feature_material);		
		var feature_mesh = new THREE.Mesh( feature_bufferGeometry, road_material);
			
		grid.add(feature_mesh);
		scene.add(grid);
		

	}
	
	function getRoadColor(type){
		var color = {"r":100, "g":100, "b":100};
		var color_hex;
		switch(type){
				case 'highway':
					color_hex = '#a71d1d';
					break;
				case 'primary':
					color_hex = '#a71d1d';
					break;
				case 'secondary':
					color_hex = '#f4ad05';
					break;
				case 'residential':
					color_hex = '#f4ad05';
					break;
				case 'tertiary':
					color_hex = '#06e270';
					break;
				case 'unclassified':
					color_hex = '#06e270';
					break;
				default:
					color_hex = '#06e270';
			}
			
		var color_rgb = hexToRgb(color_hex);
		color.r = color_rgb.r/255;
		color.g = color_rgb.g/255;
		color.b = color_rgb.b/255;
		
		return color;
	}
	
	function create_data_texture(Meso_NH, x_length, y_length, z_length, temp_min, temp_max){
		var volume = {
			"x_length": x_length,
			"y_length": y_length,
			"z_length": z_length,
			"data": null,
			"data_temp": null,
			"data_zs": null,
			"temp_min":parseFloat(temp_min),
			"temp_max":parseFloat(temp_max)
			};
			
		var data_array = [];
		var data_array_temp = [];
		var data_zs = [];
		
		for (var t=0; t< Meso_NH.length; t++){
			data_zs.push(Meso_NH[t].zs);
		}
		
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].teb_1- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].teb_1);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].teb_2- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].teb_2);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].teb_3- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].teb_3);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].teb_4- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].teb_4);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].teb_5- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].teb_5);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].teb_6- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].teb_6);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_2- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_2);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_3- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_3);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_4- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_4);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_5- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_5);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_6- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_6);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_7- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_7);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_8- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_8);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_9- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_9);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_10- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_10);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_11- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_11);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_12- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_12);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_13- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_13);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_14- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_14);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_15- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_15);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_16- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_16);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_17- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_17);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_18- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_18);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_19- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_19);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_20- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_20);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_21- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_21);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_22- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_22);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_23- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_23);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_24- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_24);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_25- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_25);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_26- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_26);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_27- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_27);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_28- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_28);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_29- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_29);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_30- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_30);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_31- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_31);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_32- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_32);
		}
		
		var data_array_32 = new Float32Array(data_array);
		var data_array_temp_32 = new Float32Array(data_array_temp);	
		var data_zs_32 = new Float32Array(data_zs);			
		
		
		volume.data = data_array_32;
		volume.data_temp = data_array_temp_32;
		volume.data_zs = data_zs_32;
		return volume;
		
		//enlever le calcule de min et max d'ici
		//on calcule le min et le max une fois pour toute au début, on calcule les valeurs entre 0 et 1 au début une fois pour toute, et ensuite, les valeurs min et max pour lequel on montre des températures, on l'envoie en uniform dans le shader et c'est dans le shader que ça se passe (clim1, clim2)
		// comme ça on recalcule pas le datatexture3D à chaque fois
		
		//var data_array = [];
		//
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].teb_1- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].teb_2- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//	
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].teb_3- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].teb_4- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].teb_5- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].teb_6- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].tht_2- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].tht_3- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].tht_4- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].tht_5- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].tht_6- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].tht_7- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].tht_8- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].tht_9- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].tht_10- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].tht_11- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].tht_12- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].tht_13- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].tht_14- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].tht_15- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].tht_16- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].tht_17- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].tht_18- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].tht_19- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].tht_20- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].tht_21- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].tht_22- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].tht_23- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].tht_24- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].tht_25- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].tht_26- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].tht_27- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].tht_28- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].tht_29- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].tht_30- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].tht_31- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//for (var t=0; t< Meso_NH.length; t++){
		//	var ratio_temp = (Meso_NH[t].tht_32- temp_array[0])/(temp_array[1]-temp_array[0]);
		//	if(ratio_temp<0){ratio_temp = 0;};if(ratio_temp>1){ratio_temp = 1;};data_array.push(ratio_temp);
		//}
		//
		//var data_array_32 = new Float32Array(data_array);	
		//
		//volume.data = data_array_32;
		//
		//return volume;
	}
	