import Controller from "@ember/controller";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { queryManager } from "ember-apollo-client";

export default class CasesDetailWorkItemsEditFormController extends Controller {
  @queryManager apollo;

  @service notification;
  @service router;

  get workItem() {
    return this.model.value[0];
  }

  @action
  actionButtonOnSuccess() {
    this.notification.success("workItem.finishSuccess");

    this.router.transitionTo("cases.detail.work-items");
  }
}
