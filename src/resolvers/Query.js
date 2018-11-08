const Query = {
  allUsers(parent, args, { db }, info) {
    const allUsers = db.query.users({}, info);
    return allUsers;
  }
};

module.exports = Query;
