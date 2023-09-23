const { User, Car, Appointment } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getCars: async () => {
      return await Car.find({});
    },
    me: async (_, __, context) => {

      if (context.user) {

        return await User.findOne({ _id: context.user._id }).populate({

          path: "appointments",options: { sort: {'startDate': -1}},

          populate: {

            path: "car",       

          },

        });

      }

      throw new AuthenticationError("You must be logged in");

    },

  },
  Mutation: {
    addUser: async (
      _,
      { firstName, lastName, email, password, phonenumber }
    ) => {
      const user = await User.create({
        firstName,
        lastName,
        email,
        phonenumber,
        password,
      });
      const token = signToken(user);
      return { token, user };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addAppointment: async (_, {model, year, startDate, endDate, workRequest}, context) => {

      if (context.user) {

        const car = await Car.findOne({model, year}) // update this to get id by searching mongo for id matching year and model

        console.log(car._id);

        const appt = await Appointment.create({startDate, endDate, workRequest, car: car._id});

        console.log(appt);

        const user = await User.findOneAndUpdate(

          { _id: context.user._id },

          { $addToSet: { appointments: appt._id } },

          { new: true }

        );

        return user.populate({

          path: "appointments",

          populate: {

            path: "car",

          },

        });

      }

      throw new AuthenticationError("You must be logged in");

    },
  },
};

module.exports = resolvers;
