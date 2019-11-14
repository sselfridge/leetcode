// https://leetcode.com/problems/longest-common-prefix/
// Write a function to find the longest common prefix string amongst an array of strings.

// If there is no common prefix, return an empty string "".

// Example 1:

// Input: ["flower","flow","flight"]
// Output: "fl"
// Example 2:

// Input: ["dog","racecar","car"]
// Output: ""
// Explanation: There is no common prefix among the input strings.
// Note:

// All given inputs are in lowercase letters a-z.


/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  if(strs.length === 0) return ""
  let prefix = "";
  let currPos = 0;
  let done = false;
  while (!done) {
    checkLetter = strs[0][currPos];
    if(checkLetter === undefined) break;
    for (let i = 0; i < strs.length; i++) {
      const word = strs[i];
      const currLetter = word[currPos];
      if (currLetter !== checkLetter) {
        done = true;
        break;
      }
    }
    if(done) break; //exit while loop if we finished in the for
    prefix += checkLetter
    currPos++;
  }


return prefix;
};


let input = ["f","flower","flow","flight","fll"]

out = longestCommonPrefix(input)

console.log(out);