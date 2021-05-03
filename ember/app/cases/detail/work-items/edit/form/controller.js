import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import completeWorkItem from "caluma-portal-demo/gql/mutations/complete-work-item";
import { queryManager } from "ember-apollo-client";
import calumaQuery from "ember-caluma/caluma-query";
import { allWorkItems } from "ember-caluma/caluma-query/queries";
import {
  dropTask,
  restartableTask,
  lastValue,
} from "ember-concurrency-decorators";

export default class CasesDetailWorkItemsEditFormController extends Controller {
  @queryManager apollo;

  @service store;
  @service notifications;
  @service intl;
  @service moment;

  @lastValue("fetchWorkItems") workItem;

  @calumaQuery({ query: allWorkItems })
  workItemsQuery;

  @restartableTask()
  *fetchWorkItems(model) {
    if (typeof model === "object") {
      return model;
    }
    try {
      yield this.workItemsQuery.fetch({ filter: [{ id: model }] });

      return this.workItemsQuery.value[0];
    } catch (error) {
      console.error(error);
      this.notifications.error(this.intl.t("workItems.fetchError"));
    }
  }

  @dropTask()
  *completeWorkItem() {
    yield this.apollo.mutate({
      mutation: completeWorkItem,
      variables: { id: this.workItem.id },
    });
    this.transitionToRoute("cases.detail.work-items");
  }
}
