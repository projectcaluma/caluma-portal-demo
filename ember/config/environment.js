"use strict";

module.exports = function (environment) {
  const ENV = {
    modulePrefix: "caluma-portal-demo",
    environment,
    rootURL: "/",
    locationType: "auto",
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application document
      // when it is created
      navBarLogo: "/assets/nav-bar-logo.png",
      navBarText: "Caluma Building Permit Demo",

      caseStateIcons: {
        RUNNING: "clock",
        CANCELED: "ban",
        COMPLETED: "check",
      },

      casesTable: {
        defaultOrder: "CREATED_AT_DESC",
        orderOptions: [
          {
            value: "CREATED_AT_DESC",
            label: "cases.createdAt",
            direction: "cases.desc",
          },
          {
            value: "CREATED_AT_ASC",
            label: "cases.createdAt",
            direction: "cases.asc",
          },
          {
            value: "MODIFIED_AT_DESC",
            label: "cases.modifiedAt",
            direction: "cases.desc",
          },
          {
            value: "MODIFIED_AT_ASC",
            label: "cases.modifiedAt",
            direction: "cases.asc",
          },
        ],
      },

      dynamicTable: {
        classList: [], // class list for table element
        columns: [
          {
            classList: [], // class list for td element
            heading: {
              label: "cases.type",
              classList: [], // class list for th element
            },
            modelKey: "document.form.name",
            linkTo: "cases.detail.index",
          },
          {
            heading: { label: "cases.status" },
            modelKey: "raw.status",
            type: "case-status",
          },
          {
            heading: { label: "cases.createdAt" },
            modelKey: "createdAt",
            type: "date",
          },
          {
            heading: { label: "cases.modifiedAt" },
            modelKey: "modifiedAt",
            type: "date",
          },
          {
            heading: { label: "cases.description" },
            modelKey: "document.form.description",
            truncate: true,
          },
        ],
      },
    },

    apollo: {
      apiURL: "/graphql",
    },
  };

  if (environment === "development") {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === "test") {
    // Testem prefers this...
    ENV.locationType = "none";

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = "#ember-testing";
    ENV.APP.autoboot = false;
  }

  if (environment === "production") {
    // here you can enable a production-specific feature
  }

  return ENV;
};
