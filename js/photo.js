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
var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);


var pictureDiv = document.getElementById("info");

var hammertime = new Hammer(pictureDiv);

hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
hammertime.get('pinch').set({ enable: true});

hammertime.on('pinch pinchstart pinchin pinchout pan panstart panleft panright panup pandown swipeup swipedown swipeleft swiperight tap', function(ev) {

  document.getElementById("pinch-event").innerHTML = "<h3>" + ev.type + window.event + "</h3>";
  if (ev.type === "panstart") {
    console.log(ev);
    console.log(ev.center.x);
    ev.target.x = "500";
    // console.log(ev.target.x);
  }

  if (ev.type === "pinchin") {
    image.style.width = Math.max(width, Math.min(4320, image.width - 25)) + "px";

    pictureDiv.scrollLeft -= ev.center.x - (width / 2);
    pictureDiv.scrollTop += ev.center.y - (height / 2);
    // imageWidth = Math.max(width, Math.min(4320, image.width - 500)) + "px";

    // $("#info").animate({
    //   width: imageWidth
    // }, 500)
  } else if (ev.type === "pinchout") {
    image.style.width = Math.max(width, Math.min(4320, image.width + 10)) + "px";

    pictureDiv.scrollLeft -= ev.center.x - (width / 2);
    pictureDiv.scrollTop += ev.center.y - (height / 2);

    // imageWidth = Math.max(width, Math.min(4320, image.width + 250)) + "px";

    // $("#info").animate({
    //   width: imageWidth
    // }, 500)
  } else if (ev.type === "swipeleft") {
    // console.log(ev.center.x - (width / 2));
    // pictureDiv.scrollLeft -= ev.center.x - (width / 2);
    // pictureDiv.scrollTop += ev.center.y - (height / 2);

    // console.log(ev);
    // console.log(ev.target.x);
    // console.log(ev.center);
    // console.log(ev.pointers[0].screenX);
    // console.log(ev.deltaX);
    // console.log((ev.pointers[0].screenX - ev.deltaX));

    var scrollDistance = Math.abs(ev.target.x) + Math.abs(ev.target.width * 0.25 * ev.overallVelocity);
    $("#info").animate({
      scrollLeft: scrollDistance
    }, 500)

  } else if (ev.type === "swiperight") {

    // console.log(ev.target.x);

    var scrollDistance = Math.abs(ev.target.x) - Math.abs(ev.target.width * 0.25 * ev.overallVelocity);
    $("#info").animate({
      scrollLeft: scrollDistance
    }, 500)

  } else if (ev.type === "swipeup") {
    // console.log(ev.target.y);

    var scrollDistance = Math.abs(ev.target.y) + Math.abs(ev.target.height * 0.25 * ev.overallVelocity);
    $("#info").animate({
      scrollTop: scrollDistance
    }, 500)


  } else if (ev.type === "swipedown") {
    // console.log(ev.target.y);

    var scrollDistance = Math.abs(ev.target.y) - Math.abs(ev.target.height * 0.25 * ev.overallVelocity);
    $("#info").animate({
      scrollTop: scrollDistance
    }, 500)

  } else if (ev.type === "panright") {
    pictureDiv.scrollLeft -= 1;
  } else if (ev.type === "panleft") {
    pictureDiv.scrollLeft += 1;
  } else if (ev.type === "panup") {
    pictureDiv.scrollTop += 1;
  } else if (ev.type === "pandown") {
    pictureDiv.scrollTop -= 1;
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

  image.style.width = Math.max(width, Math.min(4320, image.width + (100 * delta))) + "px";

  return false;
}
