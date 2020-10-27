import Controller from "@ember/controller";
import getCaseQuery from "caluma-portal-demo/gql/queries/get-case";
import { queryManager } from "ember-apollo-client";
import { task, lastValue } from "ember-concurrency-decorators";
import QueryParams from "ember-parachute";

export default class CasesDetailController extends Controller.extend(
  new QueryParams().Mixin
) {
  @queryManager apollo;

  setup() {
    this.fetchCase.perform();
  }
  reset() {
    this.fetchCase.cancelAll();
  }

  @lastValue("fetchCase") caseNode;
  @task *fetchCase() {
    if (typeof this.model === "object" && this.model) {
      return this.model;
    }

    const caseNode = yield this.apollo.query(
      {
        query: getCaseQuery,
        variables: { caseId: this.model },
      },
      "allCases.edges"
    );
    return caseNode.map(({ node }) => node)[0];
  }
}
