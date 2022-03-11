import Controller from "@ember/controller";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import calumaQuery from "@projectcaluma/ember-core/caluma-query";
import { allWorkItems } from "@projectcaluma/ember-core/caluma-query/queries";
import completeWorkItem from "caluma-portal-demo/gql/mutations/complete-work-item";
import saveWorkItem from "caluma-portal-demo/gql/mutations/save-work-item";
import { queryManager } from "ember-apollo-client";
import { lastValue } from "ember-concurrency";
import { dropTask } from "ember-concurrency-decorators";
import moment from "moment";

export default class CasesDetailWorkItemsEditController extends Controller {
  @queryManager apollo;

  @service store;
  @service notification;
  @service intl;
  @service router;

  @calumaQuery({ query: allWorkItems, options: "options" })
  workItemsQuery;

  get options() {
    return {
      pageSize: 1,
    };
  }

  @lastValue("fetchWorkItem") workItem;
  @dropTask()
  *fetchWorkItem(id) {
    try {
      yield this.workItemsQuery.fetch({ filter: [{ id }] });

      return this.workItemsQuery.value[0];
    } catch (error) {
      this.notification.danger(this.intl.t("workItems.fetchError"));
    }
  }

  @dropTask
  *finishWorkItem(event) {
    event.preventDefault();

    try {
      yield this.apollo.mutate({
        mutation: saveWorkItem,
        variables: {
          input: {
            workItem: this.workItem.id,
            meta: JSON.stringify(this.workItem.meta),
          },
        },
      });

      yield this.apollo.mutate({
        mutation: completeWorkItem,
        variables: { id: this.workItem.id },
      });

      this.notification.success(this.intl.t("workItems.finishSuccess"));

      this.router.transitionTo("cases.detail.work-items.index");
    } catch (error) {
      this.notification.danger(this.intl.t("workItems.saveError"));
    }
  }

  @dropTask
  *saveManualWorkItem(event) {
    event.preventDefault();

    try {
      yield this.apollo.mutate({
        mutation: saveWorkItem,
        variables: {
          input: {
            workItem: this.workItem.id,
            description: this.workItem.description,
            deadline: this.workItem.deadline,
            meta: JSON.stringify(this.workItem?.meta),
          },
        },
      });

      this.notification.success(this.intl.t("workItems.saveSuccess"));

      this.router.transitionTo("cases.detail.work-items.index");
    } catch (error) {
      this.notification.danger(this.intl.t("workItems.saveError"));
    }
  }

  @action
  setDeadline(value) {
    this.workItem.deadline = moment(value);
  }

  @action
  cancel() {
    this.router.transitionTo("cases.detail.work-items.index");
  }
}
