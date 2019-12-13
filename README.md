# Gif_API

This project involves using GIPHY API to retrive awesome GIFS.

##Technologies Used:

1. JQuery
2. CSS
3. HTML5
4. Local Storage 

## Quick snapshot of the project

![giphyloop](assets/images/giphyloop.gif)

I really liked this part of my code as it was something I have never used on another project
Basically on mouse hover the img will change from still to original, thus displaying the animated GIPHY.


```javascript
  $("#theDiv").on(
    {
      mouseenter: function() {
        let animateURL = $(this).attr("data-animateURL");
        if ($(this).attr("data-animation") === "still") {
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

```

I also managed to use the Local storage of the browser to save and Delete the GIF's
The below code shows how I managed to delete the GIF and save the new array after
into Local Storage

```Javascript
  //Function that will remove favorites from the DOM

  $("#theDiv").on("click", ".delete", function () {
    for (var k = 0; k < localData.length; k++) {
      if (localData[k].still === $(this).data('still')) {
        localData.splice(k, 1);
      }
    }

    localStorage.setItem("items", JSON.stringify(localData))
    //Simulates a click to rerender the page and only show the faves
    $("#showFav").trigger("click");

  })

```

Here is a link to my LinkedIn
https://www.linkedin.com/in/cesar-gomez-zootechnic/

