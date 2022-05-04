import Controller, { inject as controller } from "@ember/controller";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";

export default class CasesDetailWorkItemsEditFormController extends Controller {
  @service notification;
  @service router;

  @controller("cases.detail.work-items.edit") parent;

  @action
  actionButtonOnSuccess() {
    this.notification.success("workItem.finishSuccess");

    this.router.transitionTo("cases.detail.work-items");
  }
}
