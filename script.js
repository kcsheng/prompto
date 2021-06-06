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

    // Returns a shuffled string (password in this case)
    var shufflePassword = function (password) {
      var result = "";
      for (let i = password.length - 1; i >= 0; i--) {
        var chosenChar = password.charAt(Math.floor(Math.random() * i));
        password = password.replace(chosenChar, "");
        result += chosenChar;
      }
      return result;
    };

    // Returns a random password by specifyng numbers of chars
    var formulatePassword = function (
      specialCharNum,
      numericCharNum,
      uppercaseCharNum,
      lowercaseCharNum
    ) {
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

    // Generate 8 character password through pre-determined patterns
    var generate8charPassword = function () {
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
      var totalPatternNum = patternCollection.length;
      var targetPatternIndex = Math.floor(Math.random() * totalPatternNum);
      var targetPattern = patternCollection[targetPatternIndex];
      var specialCharNum = targetPattern[0];
      var numericCharNum = targetPattern[1];
      var uppercaseCharNum = targetPattern[2];
      var lowercaseCharNum = targetPattern[3];
      return formulatePassword(
        specialCharNum,
        numericCharNum,
        uppercaseCharNum,
        lowercaseCharNum
      );
    };

    // Generate password through pre-determined pattern proportional to length range
    var generatePasswordByLength = function (length) {
      var password = "";
      var pattern;
      switch (true) {
        case length <= 16:
          // specify numbers of special, number and uppercase char
          pattern = [1, 1, 2];
          break;
        case length <= 32:
          pattern = [2, 2, 4];
          break;
        case length <= 48:
          pattern = [3, 3, 6];
          break;
        case length <= 64:
          pattern = [4, 4, 8];
          break;
        case length <= 80:
          pattern = [5, 5, 10];
          break;
        case length <= 96:
          pattern = [6, 6, 12];
          break;
        case length <= 112:
          pattern = [7, 7, 14];
          break;
        case length <= 128:
          pattern = [8, 8, 16];
          break;
      }
      var specialCharNum = pattern[0];
      var numericCharNum = pattern[1];
      var uppercaseCharNum = pattern[2];
      var lowercaseCharNum =
        length - (specialCharNum + numericCharNum + uppercaseCharNum);
      return formulatePassword(
        specialCharNum,
        numericCharNum,
        uppercaseCharNum,
        lowercaseCharNum
      );
    };

    // Program starts here.

    var adjustPassword = window.confirm(
      "Would you like to manually adjust your password?"
    );

    if (adjustPassword) {
      let exitadjustPassword = false;
      while (!exitadjustPassword) {
        var adjustOption = window.prompt(
          "Would you like to change password length(L) or length together with characters (LC)? Please key in 'L' or 'LC'."
        );
        if (adjustOption === null) {
          window.alert("You've cancelled the operation. Please try again.");
          return "";
        } else if (adjustOption == "L" || adjustOption == "LC") {
          let exitLengthOption = false;
          // Loop to catch invalid input
          while (!exitLengthOption) {
            var desiredLength = window.prompt(
              "How long would you like your password to be? Your passwaord must be longer than 8 (inclusive) and shorter than 128 (inclusive) characters. Please key in the length in number."
            );
            // Convert number in string to integer
            var desiredLengthInt = parseInt(desiredLength);
            if (desiredLength === null) {
              window.alert("You've cancelled the operation. Please try again.");
              return "";
            } else if (
              desiredLengthInt <= 128 &&
              desiredLengthInt >= 8 &&
              !isNaN(desiredLength) // Filter out NaN such as " 12 nj" as input
            ) {
              if (adjustOption == "LC") {
                let exitadjustSpecial = false;
                while (!exitadjustSpecial) {
                  var desiredSpecial = window.prompt(
                    `Specify how many special characters you desire in your password. Remember your password length was set to ${desiredLengthInt} earlier.`
                  );
                  var desiredSpecialInt = parseInt(desiredSpecial);
                  if (desiredSpecial === null) {
                    window.alert(
                      "You've cancelled the operation. Please try again."
                    );
                    return "";
                  } else if (
                    // The biggest number should still leave 3 to accommondate the rest.
                    desiredSpecialInt >= 1 &&
                    desiredSpecialInt < desiredLengthInt - 3 &&
                    !isNaN(desiredSpecial)
                  ) {
                    let exitadjustNumeric = false;
                    while (!exitadjustNumeric) {
                      var desiredNumeric = window.prompt(
                        `Specify how many numeric characters you desire. Remember your password length was set to ${desiredLengthInt} earlier and you have set ${desiredSpecialInt} special characters.`
                      );
                      var desiredNumericInt = parseInt(desiredNumeric);
                      if (desiredNumeric === null) {
                        window.alert(
                          "You've cancelled the operation. Please try again."
                        );
                        return "";
                      } else if (
                        // The biggest number should still leave 2 to accommondate the rest.
                        desiredNumericInt >= 1 &&
                        desiredNumericInt <
                          desiredLengthInt - desiredSpecialInt - 2 &&
                        !isNaN(desiredNumeric)
                      ) {
                        let exitadjustUppercase = false;
                        while (!exitadjustUppercase) {
                          var desiredUppercase = window.prompt(
                            `Specify how many uppercase characters you desire. Remember your password length was set to ${desiredLengthInt} earlier. You have also set ${desiredSpecialInt} special characters and ${desiredNumericInt} numeric characters.`
                          );
                          var desiredUppercaseInt = parseInt(desiredUppercase);
                          if (desiredUppercase === null) {
                            window.alert(
                              "You've cancelled the operation. Please try again."
                            );
                          } else if (
                            // The biggest number should still leave 1 for the lowercase.
                            desiredUppercaseInt >= 1 &&
                            desiredUppercaseInt <
                              desiredLengthInt -
                                desiredSpecialInt -
                                desiredNumericInt -
                                1 &&
                            !isNaN(desiredUppercase)
                          ) {
                            window.alert(
                              "Your password is ready. Click OK to collect."
                            );
                            var specialCharNum = desiredSpecialInt;
                            var numericCharNum = desiredNumericInt;
                            var uppercaseCharNum = desiredUppercaseInt;
                            var lowercaseCharNum =
                              desiredLengthInt -
                              (specialCharNum +
                                numericCharNum +
                                uppercaseCharNum);
                            return formulatePassword(
                              specialCharNum,
                              numericCharNum,
                              uppercaseCharNum,
                              lowercaseCharNum
                            );
                          } else {
                            window.alert("Invalid input!");
                          }
                        }
                      } else {
                        window.alert("Invalid input!");
                      }
                    }
                  } else {
                    window.alert("Invalid input!");
                  }
                }
              }
              window.alert("You password is ready. Click OK to collect it.");
              return generatePasswordByLength(desiredLength);
            } else {
              window.alert("Invalid input!");
            }
          }
        } else {
          window.alert("Invalid input!");
        }
      }
      // Default to generate 8 character password
    } else {
      window.alert("Click OK to collect your password.");
      return generate8charPassword();
    }
  };

  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}
