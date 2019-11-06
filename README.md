# Gif_API

This project involves using GIPHY API to retrive awesome GIFS.

##Technologies Used:

1. JQuery
2. CSS
3. HTML5

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

