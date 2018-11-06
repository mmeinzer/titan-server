const Query = {
  users(parent, args, context, info) {
    const users = context.db.query.users({}, info);
    return users;
  },

  bestUser() {
    return {
      id: "sdfasfadfsdafasdf",
      email: "matt@gmail.com"
    };
  }
};

module.exports = Query;
