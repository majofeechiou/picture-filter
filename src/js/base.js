// alert(123);


// export default function () { alert(123); }


// export default function api(data) {
//   return function(){
//   	alert(123);D
//   };
// }


// define(['jquery'] , function ($) {
//     return function () {};
// });

(function body () {

	function changeImage( obj_canvas, ctx ) {

		// Draw snowflakes.
		for (let i = 0; i <= 50; i++) {
			// Get random positions for flakes.
			var x = Math.floor(Math.random() * obj_canvas.width);
			var y = Math.floor(Math.random() * obj_canvas.height);

			// var x = i;
			// var y = i;

			// Make the flakes white
			ctx.fillStyle = "white";

			// Draw an individual flakes.
			ctx.beginPath();
			ctx.arc(x, y, 3, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();
		}

		document.getElementsByTagName('body')[0].appendChild(obj_canvas);

		let _data_url = obj_canvas.toDataURL();

		let _data = ctx.getImageData(0, 0, 200, 200).data;

		console.log( '_data_url :: ', _data_url );
		console.log( '_data :: ', _data );

		return _data;

	}

	function getImageData( str_name ){
		let _obj_img = new Image(),
			_obj_canvas = document.createElement( 'canvas' );

		if( _obj_canvas.getContext ){
			let ctx = _obj_canvas.getContext("2d");
			
			_obj_img.onload = function() {

				console.log( 'this.width :: ', this.width );

				_obj_canvas.width = this.width;
				_obj_canvas.height = this.height;

				// Load the image into the context.
				ctx.drawImage(_obj_img, 0, 0);

				// Get and modify the image data.
				changeImage( _obj_canvas, ctx );
			}

			_obj_img.crossOrigin = null;
			// _obj_img.crossOrigin = "Anonymous";
			// _obj_img.setAttribute('crossOrigin', '');

			_obj_img.src = str_name;
			// _obj_img.src = "./img/florence-1066307_960_720.jpg";
			// _obj_img.src = "http://samples.msdn.microsoft.com/workshop/samples/canvas/kestral.png";

		}

		console.log( '>>>', _obj_canvas );

	};

	(function init(){
		// getImageData();
		let _obj_file = document.getElementById('file-upload');
		_obj_file.onchange = function( e ){

			var reader = new FileReader();
			reader.readAsDataURL(this.files[0]);
			console.log( 'reader :: ', reader );

			console.log( 'reader.result :: ', reader.result );

			// let _aa = this.files[0].getAsDataURL();
			// console.log( '_aa :: ', _aa );

			let windowURL = window.URL || window.webkitURL;
			let _bb = windowURL.createObjectURL(this.files[0]);

			console.log( '_bb :: ', _bb );

			// console.log( 'this.files[0] :: ', this.files[0] );
			// console.log( 'this.files[0].name :: ', this.files[0].name );
			getImageData( _bb );
		};
	})();
})();

    // "bundle": "babel-node tools/run bundle",



// //Global variables
//       var myImage = new Image(); // Create a new blank image.
      
//       // Load the image and display it.
//       function displayImage() {

//         // Get the canvas element.
//         canvas = document.getElementById("myCanvas");

//         // Make sure you got it.
//         if (canvas.getContext) {

//           // Specify 2d canvas type.
//           ctx = canvas.getContext("2d");

//           console.log(1);

//           // When the image is loaded, draw it.
//           myImage.onload = function() {
//           console.log(2);

//             // Load the image into the context.
//             ctx.drawImage(myImage, 0, 0);

//             // Get and modify the image data.
//             changeImage();
//           }

//           // Define the source of the image.
//           // myImage.src = "./img/florence-1066307_960_720.jpg";
//           myImage.src = "http://samples.msdn.microsoft.com/workshop/samples/canvas/kestral.png";
//         }
//       };

//       function changeImage() {

//          // Draw snowflakes.
//         for (i = 0; i <= 50; i++) {
//           // Get random positions for flakes.
//           var x = Math.floor(Math.random() * 199);
//           var y = Math.floor(Math.random() * 199);

//           // Make the flakes white
//           ctx.fillStyle = "white";

//           // Draw an individual flakes.
//           ctx.beginPath();
//           ctx.arc(x, y, 3, 0, Math.PI * 2, true);
//           ctx.closePath();
//           ctx.fill();
//         }
//       }

//       window.onload = function () {
//       	displayImage();
//       }
