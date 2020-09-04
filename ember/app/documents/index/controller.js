import Controller from "@ember/controller";
import { computed, action } from "@ember/object";
import { reads } from "@ember/object/computed";
import { queryManager } from "ember-apollo-client";

import {
  restartableTask,
  dropTask,
  lastValue,
} from "ember-concurrency-decorators";
import QueryParams from "ember-parachute";
import { tracked } from "@glimmer/tracking";
import getDocumentsQuery from "ember-caluma-building-permit-demo/gql/queries/get-documents";
import getRootFormsQuery from "ember-caluma-building-permit-demo/gql/queries/get-root-forms";

const queryParams = new QueryParams({
  types: {
    defaultValue: [],
    replace: true,
    serialize(value) {
      return value.toString();
    },
    deserialize(value) {
      if (!value) {
        return [];
      }
      return value.split(",");
    },
  },
  order: {
    defaultValue: "CREATED_AT_DESC",
    replace: true,
  },
});

export default class DocumentsIndexController extends Controller.extend(
  queryParams.Mixin
) {
  @queryManager apollo;

  @tracked documents = [];
  @tracked types = [];
  @tracked order = "CREATED_AT_DESC";

  get orderOptions() {
    return [
      {
        value: "CREATED_AT_DESC",
        label: "documents.created",
        direction: "documents.desc",
      },
      {
        value: "CREATED_AT_ASC",
        label: "documents.created",
        direction: "documents.asc",
      },
    ];
  }

  setup() {
    this.documents = [];
    this.getRootForms.perform();
    this.fetchDocuments.perform();
  }

  reset() {
    this.resetQueryParams();
    this.documents = [];

    this.getRootForms.cancelAll({ reset: true });
    this.fetchDocuments.cancelAll({ reset: true });
  }

  @lastValue("getRootForms") rootForms;

  @computed("rootForms.@each.slug", "types.[]")
  get selectedTypes() {
    return (this.rootForms || []).filter((form) =>
      this.types.includes(form.slug)
    );
  }

  set selectedTypes(value) {
    this.types = value.map((form) => form.slug);
  }

  @dropTask
  *getRootForms() {
    return (yield this.apollo.query(
      { query: getRootFormsQuery },
      "allForms.edges"
    )).map(({ node }) => node);
  }

  @reads("fetchDocuments.lastSuccessful.value.pageInfo") pageInfo;

  @restartableTask
  *fetchDocuments(cursor = null) {
    try {
      const forms = yield this.getRootForms.last;

      const raw = yield this.apollo.query(
        {
          query: getDocumentsQuery,
          variables: {
            cursor,
            orderBy: this.order,
            forms: this.types.length
              ? this.types
              : forms.map(({ slug }) => slug),
          },
          fetchPolicy: "network-only",
        },
        "allDocuments"
      );
      const documents = raw.edges.map(({ node }) => node);

      this.set("documents", [...this.documents, ...documents]);

      return {
        documents,
        pageInfo: { ...raw.pageInfo, totalCount: raw.totalCount },
      };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }

  @dropTask
  *applyFilters(event) {
    event.preventDefault();

    this.documents = [];
    yield this.fetchDocuments.perform();
  }

  @dropTask
  *resetFilters(event) {
    event.preventDefault();

    yield this.resetQueryParams();

    this.documents = [];
    yield this.fetchDocuments.perform();
  }

  @action
  updateOrder(event) {
    this.order = event.target.value;
    this.setup();
  }
}
