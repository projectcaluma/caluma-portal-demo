import Controller from "@ember/controller";
import getCaseQuery from "caluma-portal-demo/gql/queries/get-case";
import { queryManager } from "ember-apollo-client";
import { dropTask, lastValue } from "ember-concurrency";

export default class CasesDetailController extends Controller {
  @queryManager apollo;

  @lastValue("getCase") case;
  @dropTask
  *getCase() {
    return (yield this.apollo.query(
      {
        query: getCaseQuery,
        variables: { filter: [{ id: this.model }] },
      },
      "allCases.edges"
    )).map(({ node }) => node)[0];
  }
}
