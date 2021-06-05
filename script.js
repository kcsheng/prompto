// Assignment Code
var generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Write password to the #password input
function writePassword() {
  var generatePassword = function () {
    return "Hi there";
  };

  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}
