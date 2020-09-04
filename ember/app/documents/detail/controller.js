import Controller from "@ember/controller";
import { task, lastValue } from "ember-concurrency-decorators";
import getDocumentQuery from "ember-caluma-building-permit-demo/gql/queries/get-document";
import QueryParams from "ember-parachute";
import { queryManager } from "ember-apollo-client";

export default class DocumentsDetailController extends Controller.extend(
  new QueryParams().Mixin
) {
  @queryManager apollo;

  setup() {
    this.fetchDocument.perform();
  }
  reset() {
    this.fetchDocument.cancelAll();
  }

  @lastValue("fetchDocument") document;
  @task *fetchDocument() {
    const document = yield this.apollo.query(
      {
        query: getDocumentQuery,
        variables: { id: this.model },
      },
      "allDocuments.edges"
    );
    return document.map(({ node }) => node).firstObject;
  }
}
