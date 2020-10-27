import Application from "@ember/application";
import Resolver from "ember-resolver";
import loadInitializers from "ember-load-initializers";
import config from "./config/environment";

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;

  constructor(...args) {
    super(...args);

    this.engines = {
      emberEmeis: {
        dependencies: {
          services: [
            { store: "emeis-store" },
            "intl",
            "notification",
            "router",
          ],
        },
      },
      emberAlexandria: {
        dependencies: {
          services: [
            { store: "alexandria-store" },
            "intl",
            "notification",
            "router",
            { config: "alexandria-config" },
          ],
        },
      },
    };
  }
}

loadInitializers(App, config.modulePrefix);
