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
        id("form").addEventListener("submit", playGame);

        id("info").addEventListener("submit", backToGame);
        
  }

  /**
   * This function requests
   * @param {event} evnt - event of submitting the submit button
   */
  function playGame(evnt) {
    let step1 = true;
    console.log(evnt);
    evnt.preventDefault();
    let data = new FormData(evnt.target);
    let name = data.get("name");
    let selectElement1 =  document.querySelector('#months');           
    let month = selectElement1.value; 
    let year = data.get("year");
    let age = 2020 - id('year').value;
    
    console.log(month);
    console.log(id('year').value)
    let selectElement2 =  document.querySelector('#location');
    let location = selectElement2.value;
    console.log(location);
    let party = displayRadioValue();
    console.log(party);
    id('form').classList.add('hidden');
    id("info").classList.remove("hidden");
    id("age").textContent = age;
    console.log("namee" +name);

    id("names").textContent = name;
    id('resume-computerScreen').classList.remove("hidden");
  }


  function displayRadioValue() {
    var ele = document.getElementsByName('browser');     
            for(let i = 0; i < ele.length; i++) { 
                if(ele[i].checked) 
                return ele[i].value; 
            }
   }

   function backToGame(){
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