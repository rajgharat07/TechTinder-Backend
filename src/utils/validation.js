const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid!!");
  }

  if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("firstName should be 4-50 characters");
  }

  if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!!");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Please Enter a strong Password!!");
  }
};

const validateEditProfileData = (req) => {

    const allowedEditFields = ["firstName", "lastName", "emailId", "photoUrl", "gender", "age", "about", "skills"];

    const isEditAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field));

    return isEditAllowed;
}

module.exports = {
  validateSignUpData,
  validateEditProfileData,
};
