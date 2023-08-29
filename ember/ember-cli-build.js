"use strict";

//eslint-disable-next-line node/no-missing-require, node/no-unpublished-require
const EmberApp = require("ember-cli/lib/broccoli/ember-app");

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    emberApolloClient: {
      keepGraphqlFileExtension: false
    }
  });

  return app.toTree();
};
