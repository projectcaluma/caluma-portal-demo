"use strict";

const EmberApp = require("ember-cli/lib/broccoli/ember-app");

module.exports = function (defaults) {
  defaults.fingerprint = {
    enabled: false,
  };
  const app = new EmberApp(defaults, {
    emberApolloClient: {
      keepGraphqlFileExtension: false,
    },
  });

  return app.toTree();
};
