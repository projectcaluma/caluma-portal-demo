import Route from "@ember/routing/route";
import getCaseQuery from "caluma-portal-demo/gql/queries/get-case";
import { queryManager } from "ember-apollo-client";

export default class CasesDetailWorkItemsRoute extends Route {
  @queryManager apollo;

  async model() {
    const model = this.modelFor("cases.detail");
    if (typeof model === "object" && model) {
      return model;
    }

    const caseRecord = await this.apollo.query(
      {
        query: getCaseQuery,
        variables: { caseId: model },
      },
      "allCases.edges"
    );
    return caseRecord.map(({ node }) => node)[0];
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.fetchWorkItems.perform();
  }
}
