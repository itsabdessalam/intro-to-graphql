const mongoose = require("mongoose");

module.exports = mongoose.model("User", {
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  address: {
    street: String,
    number: Number,
    city: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    }
  },
  phones: [
    {
      label: String,
      value: {
        type: String,
        required: true
      }
    }
  ]
});
