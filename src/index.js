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
  'MakeRhymeIntent': function () { this.emit('MakeRhyme'); },
  'MakeRhyme': function() {
    // TODO: Fix assignment of finalWord.
    var rhyme = "No rhyme found."
    let finalWord="cat";
    datamuse.request(`words?rel_rhy=${finalWord}`)
    .then((json) => {
        rhyme = json[0]["word"];
    });

    // Create speech output
    const speechOutput = "Here's your rhyme: " + rhyme;
    this.emit(':tellWithCard', speechOutput, "Rhyme", rhyme);
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
