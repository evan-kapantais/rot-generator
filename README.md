## The ROT Algorithm

The ROT13 is a very simple letter substitution cipher that replaces each letter in a text string with the 13th letter after it in the alphabet. The ROT13 is a version of the Caesar cipher that was developed in ancient Rome. The original cipher did not have a fixed amount of displacement.

The ROT13 is its own inverse. This means that the original sequence
of letter is generated is the algorithm is applied twice to a given
string (given that the English alphabet is 26 letter long). Just
because of its simplicity, use of the ROT13, or any variations of
it, is heavily discouraged when it comes to password encryption.
Although is provides some measure of security - albeit very minimal,
especially when it comes to more sophisticated means of password
cracking - it is mostly reserved for information that need to be
inconspicuous at first, such as spoilers or puzzle solutions.

## My Implementation

Although the ROT13 is the most widely used cipher, I have included
here all 13 rotations (ROT1 - ROT13), as well as the option to
rotate a sequence backwards as well. Number digits are rotated in
the same fashion from 0 through 9 (and backwards), while special
characters and symbols remain unaffected.

## A Word of Caution

I suggest that you apply the ROT algorithm with caution and don't
rely on it when it comes to sensitive data. Passwords using the ROT
algorithm can become only marginally stronger, as they provide some
defence only against guesswork and adversaries that are not aware of
the existence and application of the cipher.
