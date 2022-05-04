import Controller from "@ember/controller";
import getWorkItemQuery from "caluma-portal-demo/gql/queries/get-work-item";
import { queryManager } from "ember-apollo-client";
import { dropTask, lastValue } from "ember-concurrency";

export default class CasesDetailWorkItemsEditController extends Controller {
  @queryManager apollo;

  @lastValue("getWorkItem") workItem;
  @dropTask
  *getWorkItem() {
    return (yield this.apollo.query(
      {
        query: getWorkItemQuery,
        variables: { filter: [{ id: this.model }] },
      },
      "allWorkItems.edges"
    )).map(({ node }) => node)[0];
  }
}
