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

document.getElementById("info").innerHTML = "<img src='" + photoUrl + "' id='image' alt='site-image' width='100%' onclick='zoom(this)'>";



function zoom (x) {
  var previousWidth = document.getElementById("save-old-width").innerHTML;

  console.log(previousWidth);
  var width = x.width;
  document.getElementById("save-old-width").innerHTML = width;
  console.log(previousWidth);
  console.log(width);


  var widthRatio = ( width / previousWidth );
  console.log(widthRatio);


  if ( previousWidth === "" ) {
    x.style.width = "200%";
  } else if ( widthRatio === 2 ) {
    x.style.width = "300%";
  } else if ( widthRatio === 1.5 ) {
    console.log("eh");
    x.style.width = "200%";
  } else if ( widthRatio === (2/3) ) {
    x.style.width = "100%";
  } else if (widthRatio === 0.5 ) {
    x.style.width = "200%";
  }

}
