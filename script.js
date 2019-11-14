$(document).ready(function() {

  let faveSave = [];

  let localData = JSON.parse(localStorage.getItem('items'))
  
  function callAjax(query = "cats") {
    let randomNum = Math.floor(Math.random() * 110); 
    let url =
        "https://api.giphy.com/v1/gifs/search?q=" +
        query +"&offset="+randomNum+
        "&api_key=NfM4emDcpHFys72tLukVaGJDK0s9wszS";
    $.ajax(
      url, // request url
      {
        success: function(data, status, xhr) {
          if(data.data.length < 1) {
            $("#theDiv").html("<h2 class=' null-result text-center'>Nothing to see here</h2>")
          }
          for (var i = 0; i < data.data.length; i++) {

            let stillImg =  data.data[i].images.original_still.url
            let animateImg = data.data[i].images.original.url

            $("#theDiv").append(
              "<div class='gif text-center'>"+
              "<img class='col-lg'+ data-animation=still data-stillURL=" +
              data.data[i].images.original_still.url +
              " data-animateURL=" +
              data.data[i].images.original.url +
              ' src= "' +
              data.data[i].images.original_still.url +
              '"/>'+
              "<button class='add2Fav btn btn-primary' data-animate="+animateImg+" data-still="+stillImg+">Add to Fav</button>"+
            "</div>"
            );
          }
        }
      }
    );
  }

  $("#form").submit(function(event) {
    event.preventDefault();
    let newSearch = $("input").val();
    $("#theDiv").empty();
    callAjax(newSearch);
    createButton(newSearch)
    $("#input").val("");
  });
  //add conditional logic to see if text exists
  function createButton(text) {
    if(text.length > 6 ){
      text = text.slice(0,6) + '..';
    }
   $('#buttonDisplay').append('<button type="button" class="col-lg-3 btn btn-light" data-text=' + text + '">'+text+'</button>') 
  }
  
  $("#buttonDisplay").on( "click",'.btn-light', function() {
    let search = $(this).text()
    $("#theDiv").empty()
    $("#input").val("");
    callAjax(search)
  })
  
  //This button will clear the history. 
 $("#warning").on( "click", function() {
    $("#theDiv").empty()
    callAjax()
   $('button').not(':first').remove();
   
 })   
 
 //If user click Add2Fav buttons push into faveSave array
 $("#theDiv").on( "click",".add2Fav", function() {
   let still = $(this).data('still')
   let animate = $(this).data('animate')


   faveSave.push({'animate':animate, 'still':still})
   let y = localStorage.setItem('items', JSON.stringify(faveSave))
 });

 //function will fire when faves need to be displayed
 $("#showFav").on( "click", function() {
  $("#theDiv").empty()
  
if( faveSave.length > 0 && localData.length === 0){
  localData = faveSave;
  localData.push(faveSave)
  localStorage.setItem('items', JSON.stringify(faveSave))

}


  for(let j = 0; j<localData.length; j++){

    $("#theDiv").append(
      "<div class='gif text-center'>"+
      "<img class='col-lg' data-animation=still data-stillURL=" +
      localData[j].still +
      " data-animateURL=" +
      localData[j].animate +
      ' src= "' +
      localData[j].still +
      '"/>'+
    "</div>"
    ); 
  }

 });


 $("#theDiv").on(
  {
    mouseenter: function() {
      let animateURL = $(this).attr("data-animateURL");
      if($(this).attr("data-animation") === "still") {
        $(this).attr("data-animation", "animate");
        $(this).attr("src", animateURL);
      }
    },
    mouseleave: function() {
      let stillURL = $(this).attr("data-stillURL");
      if ($(this).attr("data-animation") === "animate") {
        $(this).attr("data-animation", "still");
        $(this).attr("src", stillURL);
      }
    }
  },
  "img"
);
  callAjax();
});