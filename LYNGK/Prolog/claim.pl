/*
claim.pl: predicates related to the color claiming operation
*/

colorAvailable(Color):-
    toClaim(ToClaim), %load the colors left for claiming
    nth0(_, ToClaim, Color).%if the chosen color is inside ToClaim

%fails if the user cannot claim
validClaim:-
    getColors(ChosenColors), %get the current player player's colors
    length(ChosenColors, Len), %get the length of this player's colors
    Len < 2. %if the length is less than 2, then read color else go to other option for claimColor

%changes the game state by claiming a color
claim(Color):-
    getColors(ChosenColors), %get the current player player's colors
    append([ChosenColors, [Color]], Result),
    saveGetColors(Result),
    saveHasClaimed(true),%set the flag hasClaimed to true
    toClaim(ToClaim),
    nth0(_, ToClaim, Color, NewToClaim),%if the chosen color is inside ToClaim never fails because of colorAvailable
    saveToClaim(NewToClaim). %updated available colors

claimColor(_Color):- hasClaimed(true), setOutputMessage('You can only claim one color per turn'), !, fail.
claimColor(Color):- \+ colorAvailable(Color), setOutputMessage('This color is no longer available'), !, fail.
claimColor(_Color):- \+ validClaim, setOutputMessage('You can only claim two colors'), !, fail.
claimColor(Color):- claim(Color), setOutputMessage('success').

%from the initial colors, which can be claimed
claimableColors([black, red, ivory, green, blue]).