import Controller from "@ember/controller";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import completeWorkItem from "caluma-portal-demo/gql/mutations/complete-work-item";
import { queryManager } from "ember-apollo-client";
import { dropTask } from "ember-concurrency-decorators";

export default class CasesDetailWorkItemsEditFormController extends Controller {
  @queryManager apollo;

  @service notification;
  @service router;

  get workItem() {
    return this.model.value[0];
  }

  @dropTask()
  *completeWorkItem() {
    yield this.apollo.mutate({
      mutation: completeWorkItem,
      variables: { id: this.workItem.id },
    });

    this.actionButtonOnSuccess();
  }

  @action
  actionButtonOnSuccess() {
    this.notification.success("workItem.finishSuccess");

    this.router.transitionTo("cases.detail.work-items");
  }
}
