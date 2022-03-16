import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import completeWorkItem from "caluma-portal-demo/gql/mutations/complete-work-item";
import { queryManager } from "ember-apollo-client";
import { dropTask } from "ember-concurrency-decorators";

export default class CasesDetailWorkItemsEditFormController extends Controller {
  @queryManager apollo;

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
    this.router.transitionTo("cases.detail.work-items");
  }
}
