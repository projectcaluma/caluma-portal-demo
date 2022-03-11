import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import calumaQuery from "@projectcaluma/ember-core/caluma-query";
import { allWorkItems } from "@projectcaluma/ember-core/caluma-query/queries";
import completeWorkItem from "caluma-portal-demo/gql/mutations/complete-work-item";
import { queryManager } from "ember-apollo-client";
import {
  dropTask,
  restartableTask,
  lastValue,
} from "ember-concurrency-decorators";

export default class CasesDetailWorkItemsEditFormController extends Controller {
  @queryManager apollo;

  @service store;
  @service notification;
  @service intl;
  @service router;

  @calumaQuery({ query: allWorkItems })
  workItemsQuery;

  @lastValue("fetchWorkItems") workItem;
  @restartableTask()
  *fetchWorkItems(id) {
    if (typeof id === "object") {
      return id;
    }
    try {
      yield this.workItemsQuery.fetch({ filter: [{ id }] });

      return this.workItemsQuery.value[0];
    } catch (error) {
      console.error(error);
      this.notification.danger(this.intl.t("workItems.fetchError"));
    }
  }

  @dropTask()
  *completeWorkItem() {
    yield this.apollo.mutate({
      mutation: completeWorkItem,
      variables: { id: this.workItem.id },
    });
    this.router.transitionTo("cases.detail.work-items");
  }
}
