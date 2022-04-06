import Controller from "@ember/controller";
import { useCalumaQuery } from "@projectcaluma/ember-core/caluma-query";
import { allWorkItems } from "@projectcaluma/ember-core/caluma-query/queries";

export default class CasesDetailWorkItemsController extends Controller {
  readyWorkItemsQuery = useCalumaQuery(this, allWorkItems, () => ({
    options: this.options,
    filter: this.queryFilter("READY"),
    order: this.readyOrder,
  }));

  completedWorkItemsQuery = useCalumaQuery(this, allWorkItems, () => ({
    options: this.options,
    filter: this.queryFilter("COMPLETED"),
    order: this.completedOrder,
  }));

  get options() {
    return {
      pageSize: 20,
    };
  }

  queryFilter(status) {
    return [{ case: this.model }, { status }];
  }

  get readyOrder() {
    return [{ attribute: "DEADLINE", direction: "ASC" }];
  }

  get completedOrder() {
    return [{ attribute: "CLOSED_AT", direction: "DESC" }];
  }

  get readyTableConfig() {
    return {
      columns: [
        {
          heading: { label: "workItems.task" },
          type: "task-name",
        },
        {
          heading: { label: "workItems.deadline" },
          modelKey: "deadline",
          type: "date",
        },
        {
          heading: { label: "workItems.actions.title" },
          type: "work-item-actions",
        },
      ],
    };
  }
  get completedTableConfig() {
    return {
      columns: [
        {
          heading: { label: "workItems.task" },
          type: "task-name",
        },
        {
          heading: { label: "workItems.closedAt" },
          modelKey: "closedAt",
          type: "date",
        },
        {
          heading: { label: "workItems.actions.title" },
          type: "work-item-actions",
        },
      ],
    };
  }
}
