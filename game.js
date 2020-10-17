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
  }

  class Place {
    constructor(x, y, ctx) {
      this.x = x;
      this.y = y;
      this.ctx = ctx;
    }

    draw() {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, 10, 0, Math.PI*2);
      this.ctx.fillStyle = "#0095DD";
      this.ctx.fill();
      this.ctx.closePath();
    }
  }

  window.addEventListener("load", init);

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
      // drawing code here
      const player = new Player(50, 50, ctx);
      const computer = new Place(100, 100, ctx);
      setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.draw();
        computer.draw();
      }, 10);
      document.addEventListener("keydown", (e) => {
        player.move(e.code);
      });
      document.addEventListener("keyup", (e) => {
        player.stop();
      });
    } else {
      // canvas-unsupported code here
      canvas.classList.add("hidden");
    }
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