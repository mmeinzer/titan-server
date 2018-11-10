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
    //sign in
    const token = jwt.sign({ userId: newUser.id }, process.env.APP_SECRET);
    context.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });

    newUser.password = null;
    return newUser;
  },
  async signin(parent, args, context, info) {
    args.email = normalizeEmail(args.email);
    const where = { email: args.email };
    const user = await context.db.query.user({ where });
    if (!user) throw new Error("No user with that email exists");
    const match = await bcrypt.compare(args.password, user.password);
    if (!match) throw new Error("Incorrect password. Please try again.");
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    context.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    user.password = null;
    return user;
  }
};

module.exports = Mutation;
