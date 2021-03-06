/* dubhacks
*/
"use strict";


/**
 * This is the self calling anonymous function that holds everything else.
 */
(function() {

  const WIDTH = 720;
  const HEIGHT = 480;
  const SPEED = 2;

  class Player {
    constructor(x, y, image, ctx) {
      this.x = x;
      this.y = y;
      this.ctx = ctx;

      this.width = 45;
      this.height = 60;

      this.rightPressed = false;
      this.leftPressed = false;
      this.upPressed = false;
      this.downPressed = false;

      this.image = new Image();
      this.image.src = image;
    }

    draw() {
      if (this.rightPressed) {
        this.x += SPEED;
      } else if (this.leftPressed) {
        this.x -= SPEED;
      } else if (this.upPressed) {
        this.y -= SPEED;
      } else if (this.downPressed) {
        this.y += SPEED;
      }

      this.ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
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
      let l1 = {x: this.x, y: this.y};
      let r1 = {x: this.x + this.width, y: this.y + this.height};
      let l2 = {x: place.x - 5, y: place.y - 5};
      let r2 = {x: place.x + place.width + 5, y: place.y + place.height + 5};
      if (l1.x >= r2.x || l2.x >= r1.x) {
        return false;
      }
      if (l1.y >= r2.y || l2.y >= r1.y) {
        return false;
      }
      return true;
    }
  }

  class Place {
    constructor(x, y, width, height, id, image, ctx) {
      this.x = x;
      this.y = y;
      this.id = id;
      this.ctx = ctx;

      this.width = width;
      this.height = height;
      this.hightlight = false;
      this.done = false;

      this.image = new Image();
      this.image.src = image;
    }

    draw() {
      if (this.highlight === true) {
        this.ctx.globalAlpha = 0.3;
        this.ctx.fillStyle = "#FFC71F";
        this.ctx.fillRect(this.x - 2, this.y - 2, this.width + 4, this.height + 4);
        this.ctx.globalAlpha = 1;
      }
      this.ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }

    cursorWithin(cursorPos) {
      return (cursorPos.x - this.x <= this.width || cursorPos.y - this.y <= this.height);
    }
  }

  class Countdown {
    constructor(time, ctx) {
      this.time = time;
      this.ctx = ctx;

      this.timer = setInterval(() => {
        this.time -= 1;
      }, 1000);
    }

    draw() {
      this.ctx.font = "15px Courier New";
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
    canvas.width = WIDTH * 2;
    canvas.height = HEIGHT * 2;
    canvas.style.width = "720px";
    canvas.style.height = "480px";

    if (canvas.getContext) {
      canvas.getContext('2d').scale(2,2);
      var ctx = canvas.getContext('2d');

      let isPaused = false;
      // drawing code here
      const player = new Player(50, 50, 'images/player.png', ctx);
      const computer = new Place(80, 275, 75, 50, "computerScreen", 'images/computer.png', ctx);
      const ballot = new Place(640, 230, 80, 120, "ballotBox", 'images/ballot_box.png', ctx);
      const research = new Place(250, 0, 75, 128, "researchTask", 'images/books.png', ctx);
      const countdown = new Countdown(180, ctx);
      places = [computer, ballot, research];
      let draw = setInterval(() => {
        if (!isPaused) {
          if (countdown.time == 0) {
            window.location.href = "./game_over.html";
            // game over
          } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            places.forEach((place) => {
              if (player.closeToPlace(place) && !place.done) {
                place.highlight = true;
              } else {
                place.highlight = false;
              }
            });
            places.forEach((place) => {
              place.draw();
            });
            player.draw();
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
              id("instructions").classList.add("hidden");
              id(place.id).classList.remove("hidden");
              isPaused = true;
            }
          }
        })
      });
      places.forEach((place) => {
        let button = id("resume-" + place.id);
          button.addEventListener("click", (e) => {
            if (place.id == "researchTask") {
              e.preventDefault();
            }
            console.log("no submit");
            if (place.id !== "ballotBox") {
              place.done = true;
              id("gameboard").classList.remove("hidden");
              id(place.id).classList.add("hidden");
              id("instructions").classList.remove("hidden");
              if (place.id == "researchTask") {
                id("instructions").textContent = "Step 3: send in your ballot!";
              }
              isPaused = false;
            }
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