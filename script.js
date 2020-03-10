$(document).ready(function () {

  new ClipboardJS('.copyUrlBtn');

  let faveSave = [];

  let $window = $(window)

//Checks what size the window is to see if sidenav class should be applied
$window.resize(function resize() {
  if ($window.width() < 991) {
      return $("#button-display").addClass('sidenav');
  }

  $("#button-display").removeClass('sidenav sidenav-close');
}).trigger('resize');
//////////
  let localData = JSON.parse(localStorage.getItem('items'))
  console.log(localData)

  function callAjax(query = "cats") {
    let randomNum = Math.floor(Math.random() * 110);
    let url =
      "https://api.giphy.com/v1/gifs/search?q=" +
      query + "&offset=" + randomNum +
      "&api_key=NfM4emDcpHFys72tLukVaGJDK0s9wszS";
    $.ajax(
      url, // request url
      {
        success: function (data, status, xhr) {
          if (data.data.length < 1) {
            $("#gif-container").html("<h2 class=' null-result text-center'>Nothing to see here</h2>")
          }
          for (let i = 0; i < data.data.length; i++) {
            console.log(data.data[i])
            let stillImg = data.data[i].images.original_still.url
            let animateImg = data.data[i].images.original.url
            let gifUrl = data.data[i].embed_url

            $("#gif-container").append(
              "<div class='gif text-center'>" +
              "<img data-animation=still data-stillURL=" +
              data.data[i].images.original_still.url +
              " data-animateURL=" +
              data.data[i].images.original.url +
              ' src= "' +
              data.data[i].images.original_still.url +
              '"/>' +
              "<button class='add2Fav custom-block-btn btn heartBtn btn-primary' data-animate=" + animateImg + " data-still=" + stillImg + ">" + "<i  class='fa fa-heart' aria-hidden='true'></i></button>" +
              "<button class='copyUrlBtn custom-block-btn btn heartBtn btn-danger' data-clipboard-text=" + gifUrl + ">" + "<i class='far fa-clipboard'></i></button>" +
              "</div>"
            );
          }
        }
      }
    );
  }

  $("#form").submit(function (event) {
    event.preventDefault();
    let newSearch = $("input").val();
    $("#gif-container").empty();
    callAjax(newSearch);
    createButton(newSearch)
    $("#input").val("");
  });
  //add conditional logic to see if text exists
  function createButton(text) {
    if (text.length > 6) {
      text = text.slice(0, 6) + '..';
    }
    $('#button-display').append('<button type="button" class="historyBtn col-lg-3 btn btn-light" data-text=' + text + '">' + text + '</button>')
  }
  //Gets the value from the input and calls ajax method with new term
  $("#buttonDisplay").on("click", '.btn-light', function () {
    let search = $(this).text()
    $("#gif-container").empty()
    $("#input").val("");
    callAjax(search)
  })

  //This button will clear the history. 
  $("#warning").on("click", function () {
    $("#gif-container").empty()
    callAjax()
    $('button').not(':first').remove();

  })

  //If user clicks on clipboard button

  $("#gif-container").on("click", ".copyUrlBtn", function () {
    const url = $(this).data("clipboard-text");
    url.select();
    const l = document.execCommand("copy");
  
  });


  //If user click Add2Fav buttons push into faveSave array
  $("#gif-container").on("click", ".add2Fav", function () {
    $(this).addClass("pinkHeart");
    const still = $(this).data('still')
    const animate = $(this).data('animate')



    storeItems({ 'animate': animate, 'still': still })
  });

  //Store Items in local storage
  function storeItems(obj) {
    if (localData === null && obj !== undefined) {
      faveSave.push(obj)
      localData = faveSave
      localStorage.setItem("items", JSON.stringify(localData))
    } else if (localData === null && obj === undefined) {
      localData = [];
    } else {
      localData.push(obj)
      localStorage.setItem("items", JSON.stringify(localData))
    }
  }


  //function will fire when faves need to be displayed
  $("#showFav").on("click", function () {
    $("#gif-container").empty()
    for (let j = 0; j < localData.length; j++) {
      $("#gif-container").append(
        "<div class='gif text-center'>" +
        "<img class='col-lg' data-animation=still data-stillURL=" +
        localData[j].still +
        " data-animateURL=" +
        localData[j].animate +
        ' src= "' +
        localData[j].still +
        '"/>' +
        "<button class='delete btn btn-primary' data-still=" + localData[j].still + ">Delete</button>" +
        "</div>"
      );
    }
  });

  //Function that will remove favorites from the DOM

  $("#gif-container").on("click", ".delete", function () {
    for (let k = 0; k < localData.length; k++) {
      if (localData[k].still === $(this).data('still')) {
        localData.splice(k, 1)
      }
    }

    localStorage.setItem("items", JSON.stringify(localData))
    //Simulates a click to rerender the page and only show the faves
    $("#showFav").trigger("click")

  })



  //ON mouse hover the GIF will change url from still to animate
  $("#gif-container").on(
    {
      mouseenter: function () {
        let animateURL = $(this).attr("data-animateURL");
        if ($(this).attr("data-animation") === "still") {
            $(this).attr("data-animation", "animate");
            $(this).attr("src", animateURL);
        }
      },
      mouseleave: function () {
        let stillURL = $(this).attr("data-stillURL");
        if ($(this).attr("data-animation") === "animate") {
          $(this).attr("data-animation", "still");
          $(this).attr("src", stillURL);
        }
      }
    },
    "img"
  );

    $(".history-burger").on("click", function () {
      $(".sidenav").removeClass("sidenav-close")
      $("#button-display").addClass( " sidenav sidenav-width ")
      $("#button-display").prepend( " <p class='close-button'>&times;</p> ")  
    })

    $("#button-display").on("click", ".close-button", function () {
      $(".sidenav").removeClass("sidenav-width")  
      $(".sidenav").addClass("sidenav-close")
    })


  //For history button on mobile

  callAjax();
});