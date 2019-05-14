const User = require("../models/user");
const resolvers = {
  Query: {
    allUser: () => {
      return new Promise((resolve, reject) => {
        User.find({}).exec((err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        });
      });
    },
    user: (root, { id }) => {
      return new Promise((resolve, reject) => {
        User.findOne({ _id: id }).exec((err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        });
      });
    }
  },

  Mutation: {
    addUser: (root, args) => {
      const user = new User(args);
      return new Promise((resolve, reject) => {
        user.save((err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        });
      });
    },
    updateUser: (root, args) => {
      const { id } = args;
      const data = args;

      return new Promise((resolve, reject) => {
        User.findOneAndUpdate({ _id: id }, { $set: data }, { new: true }).exec(
          (err, res) => {
            if (err) {
              reject(err);
            }
            resolve(res);
          }
        );
      });
    },
    deleteUser: (root, { id }) => {
      return new Promise((resolve, reject) => {
        User.findOneAndRemove({ _id: id }).exec((err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        });
      });
    }
  }
};

module.exports = resolvers;
