import Controller from "@ember/controller";
import getCaseQuery from "caluma-portal-demo/gql/queries/get-case";
import { queryManager } from "ember-apollo-client";
import { task, lastValue } from "ember-concurrency";

export default class CasesDetailController extends Controller {
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
      "allCases.edges",
    );
    return caseNode.map(({ node }) => node)[0];
  }
}
