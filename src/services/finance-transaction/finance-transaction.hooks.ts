import * as authentication from "@feathersjs/authentication";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;
const includeRelations = (context: any) => {
  context.params.sequelize = {
    include: [
      {
        model: context.app.services["types"].Model,
        as: "TransactionType",
      },
    ],
    raw: false,
  };
  return context;
};
export default {
  before: {
    all: [authenticate("jwt")],
    find: [includeRelations],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
