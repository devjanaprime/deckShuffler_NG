console.log( 'deckShufflerNG.js sourced' );
var myApp = angular.module( 'myApp', [] );
myApp.controller( 'DeckShufflerController', [ '$scope', function( $scope ){
  // this array will hold our deck of cards
  $scope.deck = [];
  // the possible suits
  $scope.suits = [ 'Clubs', 'Diamonds', 'Hearts', 'Spades' ];
  // the possible faces
  $scope.faces = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King' ];

  $scope.cutDeck = function(){
    console.log( 'in cutDeck' );
    // cutIndex needs to be between 0 and deck.length
    // we are using Math.random returns a float between 0.0 and 1.0
    // multiply that by deck length and we'll get a float between 0 and deck.length
    var cutIndex = Math.random() * $scope.deck.length;
    // now we want an integer to use as an index
    // Math.floor will round down to the nearest integer
    var cutIndex =  Math.floor( cutIndex );
    console.log( cutIndex );
    // cards above and including cutIndex in deck are the "top" of the cut
    var topCut = [];
    for( var i=cutIndex; i<$scope.deck.length; i++ ){
      topCut.push( $scope.deck[ i ] );
    }// end top cut loop
    // cards below cutIndex are the 'bottom"
    var bottomCut = [];
    for( var i=0; i<cutIndex; i++ ){
      bottomCut.push( $scope.deck[ i ] );
    }// end top cut loop
    // put top cut in the bottom of the deck
    $scope.deck = topCut;
    // push in bottomCut to the top
    $scope.deck.push.apply( $scope.deck, bottomCut );
  } // end funk

  $scope.setupDeck = function(){
    // use suits and faces to create the deck
    for( var i=0; i < $scope.suits.length; i++){
      for( var j=0; j < $scope.faces.length; j++ ){
        // create a new card with the current face/suit combination
        var newCard={
          suit: $scope.suits[ i ],
          face: $scope.faces [ j ]
        };
        //push the new card into the deck
        $scope.deck.push( newCard );
      } // end faces loop
    } // end suits loop
    console.log( $scope.deck );
  } // end funk

  $scope.shuffleDeck = function(){
    console.log( 'in shuffleDeck' );
    $scope.deck = shuffle( $scope.deck );
  } // end funk
  //run the setupDeck Function
  $scope.setupDeck();
}]); // end controller

// shuffle array function from http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
