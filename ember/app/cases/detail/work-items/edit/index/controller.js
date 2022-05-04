import Controller, { inject as controller } from "@ember/controller";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import saveWorkItem from "caluma-portal-demo/gql/mutations/save-work-item";
import { queryManager } from "ember-apollo-client";
import { dropTask } from "ember-concurrency-decorators";
import moment from "moment";

export default class CasesDetailWorkItemsEditController extends Controller {
  @queryManager apollo;

  @service notification;
  @service intl;
  @service router;

  @controller("cases.detail.work-items.edit") parent;

  @tracked description = this.parent.workItem?.description;

  @action
  finishWorkItem() {
    this.notification.success(this.intl.t("workItems.finishSuccess"));

    this.router.transitionTo("cases.detail.work-items.index");
  }

  @dropTask
  *saveManualWorkItem(event) {
    event.preventDefault();
    try {
      yield this.apollo.mutate({
        mutation: saveWorkItem,
        variables: {
          input: {
            workItem: this.parent.workItem.id,
            description: this.parent.workItem.description,
            deadline: this.parent.workItem.deadline,
          },
        },
      });

      this.notification.success(this.intl.t("workItems.saveSuccess"));
    } catch (error) {
      console.error(error);
      this.notification.danger(this.intl.t("workItems.saveError"));
    }
  }

  @action
  setDeadline(value) {
    this.parent.workItem.deadline = moment(value);
  }

  @action
  cancel() {
    this.router.transitionTo("cases.detail.work-items.index");
  }
}
