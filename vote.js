/* dubhacks
*/
"use strict";


/**
 * This is the self calling anonymous function that holds everything else.
 */
(function() {

  window.addEventListener("load", init);

  /**
   * This function initialized the functions for making requests when buttons are
   * clicked or submitted.
   */
  function init() {
    id("vote-form").addEventListener("submit", vote);
    id("envelope").addEventListener("dragstart", dragEnvelope);
    id("envelope").addEventListener("dragend", dragEnd);
    id("mail-box").addEventListener("dragover", dragOver);
    id("mail-box").addEventListener("drop", drop);
  }

  function vote(evnt) {
    evnt.preventDefault();
    id("choose-candidate").classList.add("hidden");
    id("ballot").classList.remove("hidden");
  }

  function dragEnvelope(evnt) {
    console.log(evnt);
    evnt.target.classList.add("drag");
  }

  function dragEnd(evnt) {
    evnt.target.classList.remove("drag");
  }

  function dragOver(evnt) {
    evnt.preventDefault();
  }

  function drop(evnt) {
    console.log(evnt.target);
    evnt.target.src = "images/ballot_in_box.png";
    id("contain-envelope").innerHTML = "";
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