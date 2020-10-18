/* dubhacks
*/
"use strict";


/**
 * This is the self calling anonymous function that holds everything else.
 */
(function() {

  const WIDTH = 720;
  const HEIGHT = 480;

  class Player {
    constructor(x, y, ctx) {
      this.x = x;
      this.y = y;
      this.ctx = ctx;

      this.width = 20;
      this.height = 20;

      this.rightPressed = false;
      this.leftPressed = false;
      this.upPressed = false;
      this.downPressed = false;
    }

    draw() {
      if (this.rightPressed) {
        this.x += 1;
      } else if (this.leftPressed) {
        this.x -= 1;
      } else if (this.upPressed) {
        this.y -= 1;
      } else if (this.downPressed) {
        this.y += 1;
      }
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, 10, 0, Math.PI*2);
      this.ctx.fillStyle = "#0095DD";
      this.ctx.fill();
      this.ctx.closePath();
    }

    move(dir) {
      if (dir == "Right" || dir == "ArrowRight") {
        this.rightPressed = true;
      } else if (dir == "Left" || dir == "ArrowLeft") {
        this.leftPressed = true;
      } else if (dir == "Up" || dir == "ArrowUp") {
        this.upPressed = true;
      } else if (dir == "Down" || dir == "ArrowDown") {
        this.downPressed = true;
      }
    }

    stop() {
      this.leftPressed = false;
      this.rightPressed = false;
      this.upPressed = false;
      this.downPressed = false;
    }

    closeToPlace(place) {
      return (Math.abs(this.x - place.x) < place.width + 5 && Math.abs(this.y - place.y) < place.width + 5);
    }
  }

  class Place {
    constructor(x, y, id, ctx) {
      this.x = x;
      this.y = y;
      this.id = id;
      this.ctx = ctx;

      this.width = 20;
      this.height = 20;
      this.hightlight = false;
      this.done = false;
    }

    draw() {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, 10, 0, Math.PI*2);
      this.ctx.fillStyle = "#DD00DD";
      this.ctx.fill();
      if (this.highlight === true) {
        this.ctx.arc(this.x, this.y, 12, 0, Math.PI*2);
        this.ctx.strokeStyle = "#DD00DD";
        this.ctx.stroke();
      }
      this.ctx.closePath();
    }

    cursorWithin(cursorPos) {
      return (cursorPos.x - this.x <= this.width || cursorPos.y - this.y <= this.height);
    }
  }
  
  class Countdown {
    constructor(time, ctx) {
      this.time = time;
      this.ctx = ctx;

      setInterval(() => {
        this.time -= 1;
      }, 1000);
    }

    draw() {
      this.ctx.font = "15px Arial";
      let minutes = Math.floor(this.time / 60);
      let seconds = this.time % 60;
      let message = "Time Left: ";
      this.ctx.fillStyle = "black";
      this.ctx.textAlign = "left";
      if (seconds < 10) {
        this.ctx.fillText(message + minutes + ":0" + seconds, 5, 20);
      } else {
        this.ctx.fillText(message + minutes + ":" + seconds, 5, 20);
      }
    }
  }

  window.addEventListener("load", init);

  let places = [];

  /**
   * This function initialized the functions for making requests when buttons are
   * clicked or submitted.
   */
  function init() {
    let canvas = id('gameboard');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      let isPaused = false;
      // drawing code here
      const player = new Player(50, 50, ctx);
      const computer = new Place(500, 100, "computerScreen", ctx);
      const countdown = new Countdown(190, ctx);
      places[0] = computer;
      setInterval(() => {
        if (!isPaused) {
          if (countdown.time == 0) {
            // game over
          } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            places.forEach((place) => {
              if (player.closeToPlace(place) && !place.done) {
                place.highlight = true;
              } else {
                place.highlight = false;
              }
            })
            player.draw();
            computer.draw();
          }
        }
        countdown.draw();
      }, 10);
      document.addEventListener("keydown", (e) => {
        player.move(e.code);
      });
      document.addEventListener("keyup", (e) => {
        player.stop();
      });
      canvas.addEventListener("click", (e) => {
        let cursorPos = getCursorPosition(canvas, e);
        places.forEach((place) => {
          if (player.closeToPlace(place) && !place.done) {
            if (place.cursorWithin(cursorPos)) {
              id("gameboard").classList.add("hidden");
              id(place.id).classList.remove("hidden");
              isPaused = true;
            }
          }
        })
      });
      places.forEach((place) => {
        let button = id(place.id).getElementsByTagName("button")[0];
        button.addEventListener("click", () => {
          place.done = true;
          id("gameboard").classList.remove("hidden");
          id(place.id).classList.add("hidden");
          isPaused = false;
        });
      })
    } else {
      // canvas-unsupported code here
      canvas.classList.add("hidden");
    }
  }

  function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return {x: x, y: y};
  }

  /**
   * This function requests
   * @param {event} evnt - event of submitting the submit button
   */
  function playGame(evnt) {
    //id("login").classList.add("hidden");
    //id("game").classList.remove("hidden");

  }


  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id (null if none).
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} selector - CSS query selector
   * @returns {object[]} array of DOM objects matching the query (empty if none).
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  /**
   * Returns the new element of given type
   * @param {string} elType - an elements type
   * @returns {element} new element of the given type.
   */
  function gen(elType) {
    return document.createElement(elType);
  }
})();