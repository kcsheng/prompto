// Assignment Code
var generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Write password to the #password input
function writePassword() {
  var generatePassword = function () {
    // Declare variable utilities
    var specialChars = " !\"#$%&'()*+,-./:;<=>?@[]^_`{|}~";
    var numberChars = "1234567890";
    var uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    var shufflePassword = function (password) {
      var result = "";
      for (let i = password.length - 1; i >= 0; i--) {
        var chosenChar = password.charAt(Math.floor(Math.random() * i));
        password = password.replace(chosenChar, "");
        result += chosenChar;
      }
      return result;
    };
    var generate8charPassword = function () {
      var password = "";
      // Numbers of special character, numeric, uppercase, lowercase
      var patternCollection = [
        [1, 1, 4, 2],
        [1, 1, 2, 4],
        [1, 1, 3, 3],
        [1, 2, 3, 2],
        [1, 2, 2, 3],
        [1, 2, 4, 1],
        [1, 2, 1, 4],
        [2, 2, 2, 2],
        [2, 3, 2, 1],
        [2, 3, 1, 2],
      ];
      // Choose a pattern
      var totalPatternNum = patternCollection.length;
      var targetPatternIndex = Math.floor(Math.random() * totalPatternNum);
      var targetPattern = patternCollection[targetPatternIndex];
      var specialCharNum = targetPattern[0];
      var numericCharNum = targetPattern[1];
      var uppercaseCharNum = targetPattern[2];
      var lowercaseCharNum = targetPattern[3];
      var password = "";
      for (let i = 0; i < specialCharNum; i++) {
        password += specialChars.charAt(
          Math.floor(Math.random() * specialChars.length)
        );
      }
      for (let i = 0; i < numericCharNum; i++) {
        password += numberChars.charAt(
          Math.floor(Math.random() * numberChars.length)
        );
      }
      for (let i = 0; i < uppercaseCharNum; i++) {
        password += uppercaseChars.charAt(
          Math.floor(Math.random() * uppercaseChars.length)
        );
      }
      for (let i = 0; i < lowercaseCharNum; i++) {
        password += lowercaseChars.charAt(
          Math.floor(Math.random() * lowercaseChars.length)
        );
      }
      return shufflePassword(password);
    };

    // Program starts here.

    var tweakPassword = window.confirm(
      "Would you like to manually tweak your password?"
    );

    if (tweakPassword) {
      let exit = false;
      while (!exit) {
        var tweakOption = window.prompt(
          "Would you like to change password length(L), character distribution(C) or both(LC)? Please key in 'L', 'C' or 'LC'."
        );
        if (tweakOption === null) {
          window.alert(
            "You've chosen not to proceed. An 8 character password is ready for you."
          );
          return shufflePassword(password);
        } else if (
          tweakOption == "L" ||
          tweakOption == "C" ||
          tweakOption == "LC"
        ) {
          return "Yes you are at the right place";
          exit = true;
        } else {
          window.alert("Invalid input!");
        }
      }
      // Default to generate 8 character password
    } else {
      return generate8charPassword();
    }
  };

  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}
