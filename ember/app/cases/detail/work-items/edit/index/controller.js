import Controller from "@ember/controller";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import completeWorkItem from "caluma-portal-demo/gql/mutations/complete-work-item";
import saveWorkItem from "caluma-portal-demo/gql/mutations/save-work-item";
import { queryManager } from "ember-apollo-client";
import calumaQuery from "ember-caluma/caluma-query";
import { allWorkItems } from "ember-caluma/caluma-query/queries";
import { dropTask } from "ember-concurrency-decorators";
import moment from "moment";

export default class CasesDetailWorkItemsEditController extends Controller {
  @queryManager apollo;

  @service store;
  @service notifications;
  @service intl;
  @service moment;

  @tracked workItem;

  @calumaQuery({ query: allWorkItems, options: "options" })
  workItemsQuery;

  get options() {
    return {
      pageSize: 1,
    };
  }

  @dropTask()
  *fetchWorkItems() {
    try {
      yield this.workItemsQuery.fetch({ filter: [{ id: this.model }] });

      this.workItem = this.workItemsQuery.value[0];
    } catch (error) {
      this.notifications.error(this.intl.t("workItems.fetchError"));
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

      this.notifications.success(this.intl.t("workItems.finishSuccess"));

      this.transitionToRoute("cases.detail.work-items.index");
    } catch (error) {
      this.notifications.error(this.intl.t("workItems.saveError"));
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

      this.notifications.success(this.intl.t("workItems.saveSuccess"));

      this.transitionToRoute("cases.detail.work-items.index");
    } catch (error) {
      this.notifications.error(this.intl.t("workItems.saveError"));
    }
  }

  @action
  setDeadline(value) {
    this.workItem.deadline = moment(value);
  }
}
