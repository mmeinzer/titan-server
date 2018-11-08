const normalizeEmail = require("normalize-email");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Mutation = {
  async signup(parent, args, context, info) {
    args.email = normalizeEmail(args.email);
    const SALT_LENGTH = 10;
    const password = await bcrypt.hash(args.password, SALT_LENGTH);
    const newUser = await context.db.mutation.createUser(
      {
        data: {
          ...args,
          password
        }
      },
      info
    );
    const token = jwt.sign({ userId: newUser.id }, process.env.APP_SECRET);
    context.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });

    return newUser;
  }
};

module.exports = Mutation;
