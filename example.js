var _ = require('lodash');

var letters = [
    {letter: 'a'},
    {letter: 'b'},
    {letter: 'c'},
]

var reducedLetters = _.reduce(letters, function (prev, next, num) {
    if (num == 0) {
        return prev + next.letter;
    }
    return prev+ ', '+ next.letter;
}, 'The letters are: ');

console.log(reducedLetters);