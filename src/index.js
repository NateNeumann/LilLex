/**
// Developed based on the general setup provided in an MLH workshop.
 *
 * The Intent Schema, Custom Slots and Sample Utterances for that workshop, as well
 * as testing instructions are located at https://github.com/mlh/mlh-localhost-hacking-with-alexa
 **/

'use strict';

const datamuse = require('datamuse');

var handlers = {
  'LaunchRequest': function () { this.emit('Hello'); },
  'GetNewFactIntent': function () { this.emit('GetRhyme'); },
  'GetRhyme': function() {
    // TODO: Fix assignment of finalWord.
    finalWord="cat";
    datamuse.request(`words?rel_rhy=${finalWord}`);
    .then((json) => {
        console.log(json);
        //do it!
    });

    // Create speech output
    const speechOutput = "Here's your rhyme: " + randomFact;
    this.emit(':tellWithCard', speechOutput, "Major League Hacking (MLH) Facts", randomFact);
  }
};

// This is the function that AWS Lambda calls every time Alexa uses your skill.
exports.handler = function(event, context, callback) {
  // Include the AWS Alexa Library.
  const Alexa = require("alexa-sdk");

  // Create an instance of the Alexa library and pass it the requested command.
  var alexa = Alexa.handler(event, context);

  // Give our Alexa instance instructions for handling commands and execute the request.
  alexa.registerHandlers(handlers);
  alexa.execute();
};
