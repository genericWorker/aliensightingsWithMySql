//  *************************************
// Using database api requires running node
// server index.js in the server folder:  
//  server> node index.js
// *******************************

// Submit event

function handleFormSubmit(event) {
    event.preventDefault();
    
    // Create a siteReport object for json
    let siteReport = new Object();
    siteReport.date =  $("#datepicker").val();
    siteReport.creatureType = $("#creatureType :radio:checked").attr('id');
    siteReport.weight = $("#slider").slider("option", "value");
     siteReport.height = $("#slider2").slider("option", "value");
    siteReport.numberEyes =  $("#spinnereyes").spinner("value");
    siteReport.numberArms = $("#spinnerarms").spinner("value");
    siteReport.numberLegs = $("#spinnerlegs").spinner("value");
    siteReport.color = $( "#swatch" ).css("background-color");
    
    // Convert siteReport object to a json object
    const json = JSON.stringify(siteReport);
    //  Copy json text to an h4
    const heading = "<h4 className=\"ui-state-default ui-corner-all ui-helper-clearfix\" style=\"padding:4px; background: #999f29;\">Alien Sighting Report Json Data<h4>"
   
 // console.log(JSON.parse(json)); 

  insertSighting(siteReport);
  //  After insert retrieve the sightings,
  //  including the new one 
  getSightings(); 
}

const getSightings = () => {
  axios.get('http://localhost:3001/api/getSitings')
  .then(response => {
   const sitings = response.data;
   console.log(sitings); 
   const table = CreateTableFromJSON(sitings); 
   
   results.innerHTML= ""; 
   results.appendChild(table); 
   
 })
  .catch(error => console.error(error));
 };

 const insertSighting = (siteReport) => {
  console.log(siteReport); 
  axios.post('http://localhost:3001/api/insert', siteReport 
 ) 
.then(response => {
   const siting = response.data;
   console.log("Inserted siting " , siting);
   alert( JSON.stringify(siting)); 
 })
  .catch(error => console.error(error));
 };



// Initialize Components
$( function() {
    // initialize these
  $("#spinnereyes").spinner({min: 0, max:100});
  $( "#spinnerarms" ).spinner({min: 0, max:117});
  $( "#spinnerarms" ).spinner({min: 0, max:117});
  $( "#spinnerlegs" ).spinner({min: 0, max:21});
});

// Slider weight event
$("#slider-range-max1").slider({
  range: "max",
  min: 1,
  max: 500,
  value: 20,
  slide: function( event, ui ) {
    $("#weight" ).val( "Weight: " + ui.value  + " kg");
  }
});

$("#weight" ).val("Weight: " +  20 + " kg");


$( "#button" ).button();
$( "#button-icon" ).button({
icon: "ui-icon-gear",
showLabel: false
});

$("#radioset" ).buttonset();

$( "#dialog" ).dialog({
autoOpen: false,
width: 600,
height: 400,
buttons: [
    {
        text: "Ok",
        click: function() {
            $( this ).dialog( 'option', 'hide', 'explode' );
            $( this ).dialog( "close" );
        }
    },
    {
        text: "Cancel",
        click: function() {
            $( this ).dialog( 'option', 'hide', 'blind' );
            $( this ).dialog( "close" );
        }
    }
]
});

// Link to open the dialog
$( "#dialog-link" ).on('click', function( event ) {
//	event.preventDefault();
$( "#dialog" ).dialog( "open" );
handleFormSubmit(event);
});

$( "#datepicker" ).datepicker({
inline: true
});

// Set weight value on slide event
$("#slider" ).slider({
  range: "max",
  min: 1,
  max: 500,
  value: 20,
  slide: function( event, ui ) {
    $( "#weight" ).val( "Weight: " + ui.value  + " kg");
  }
}); 


// Set height value on slide event
$("#slider2").slider({
  range: "max",
  min: 1,
  max: 20,
  value: 2,
  slide: function( event, ui ) {
    $( "#height" ).val( "Height: " + ui.value  + " m");
  }
}); 
$("#height" ).val("Height: " +  2 + " m");

$( "input[type='radio']" ).checkboxradio({icon: false});

$("#tooltip").tooltip();


// Hover states on the static widgets
$( "#dialog-link, #icons li" ).on('hover',
function() {
    $( this ).addClass( "ui-state-hover" );
},
function() {
    $( this ).removeClass( "ui-state-hover" );
}
);

$( function() {
  function hexFromRGB(r, g, b) {
    var hex = [
      r.toString( 16 ),
      g.toString( 16 ),
      b.toString( 16 )
    ];
    $.each( hex, function( nr, val ) {
      if ( val.length === 1 ) {
        hex[ nr ] = "0" + val;
      }
    });
    return hex.join( "" ).toUpperCase();
  }
  
  // Change color swatch appearance 
  function refreshSwatch() {
    var red = $( "#red" ).slider( "value" ),
      green = $( "#green" ).slider( "value" ),
      blue = $( "#blue" ).slider( "value" ),
      hex = hexFromRGB( red, green, blue );
    $( "#swatch" ).css( "background-color", "#" + hex );
  }

  // slider for colors
  $( "#red, #green, #blue" ).slider({
    orientation: "horizontal",
    range: "min",
    max: 255,
    value: 127,
    slide: refreshSwatch,
    change: refreshSwatch
  });
  $( "#red" ).slider( "value", 255 );
  $( "#green" ).slider( "value", 140 );
  $( "#blue" ).slider( "value", 60 );
} );