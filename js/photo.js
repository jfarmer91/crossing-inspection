// --------------- get querystring value ----------------------------
// this function gets the photo url of the crossing the user was viewing from
// the url so that it can be used for query tasks in the report page
// -----------------------------------------------------------------------
function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
// ----------------------------------------------------------------


var photoUrl = getParameterByName("url");

document.getElementById("info").innerHTML = "<img src='" + photoUrl + "' id='image' alt='site-image' width='100%'>";



// function zoom (x) {
//   var previousWidth = document.getElementById("save-old-width").innerHTML;
//
//   console.log(previousWidth);
//   var width = x.width;
//   document.getElementById("save-old-width").innerHTML = width;
//   console.log(previousWidth);
//   console.log(width);
//
//   var widthRatio = ( width / previousWidth );
//   console.log(widthRatio);
//
//   if ( previousWidth === "" ) {
//     x.style.width = "200%";
//   } else if ( widthRatio === 2 ) {
//     x.style.width = "300%";
//   } else if ( widthRatio === 1.5 ) {
//     console.log("eh");
//     x.style.width = "200%";
//   } else if ( widthRatio === (2/3) ) {
//     x.style.width = "100%";
//   } else if (widthRatio === 0.5 ) {
//     x.style.width = "200%";
//   }
// }

var pictureDiv = document.getElementById("info");

var hammertime = new Hammer(pictureDiv);

// hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });

hammertime.get('pinch').set({ enable: true});

hammertime.on('pinch pinchin pinchout tap', function(ev) {
  console.log(ev.type + "whatever");
  document.getElementById("pinch-event").innerHTML = "<h3>" + ev.type + window.event + "</h3>";
  if (ev.type === "pinchin") {
    image.style.width = Math.max(200, Math.min(4320, image.width - 10)) + "px";
  } else if (ev.type === "pinchout") {
    image.style.width = Math.max(200, Math.min(4320, image.width + 10)) + "px";
  }
});

var image = document.getElementById("image");

if (image.addEventListener) {
	// IE9, Chrome, Safari, Opera
	image.addEventListener("mousewheel", MouseWheelHandler, false);
	// Firefox
	image.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
}

function MouseWheelHandler() {
  var e = window.event || e; // old IE support
  var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
  console.log(window.event);
  console.log(e.wheelDelta);
  console.log(e.detail);
  console.log(delta);

  image.style.width = Math.max(200, Math.min(4320, image.width + (100 * delta))) + "px";

  return false;
}
