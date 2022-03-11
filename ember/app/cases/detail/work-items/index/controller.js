import Controller from "@ember/controller";
import calumaQuery from "@projectcaluma/ember-core/caluma-query";
import { allWorkItems } from "@projectcaluma/ember-core/caluma-query/queries";
import { restartableTask } from "ember-concurrency-decorators";

export default class CasesDetailWorkItemsController extends Controller {
  @calumaQuery({
    query: allWorkItems,
    options: "options",
  })
  readyWorkItemsQuery;

  @calumaQuery({
    query: allWorkItems,
    options: "options",
  })
  completedWorkItemsQuery;

  get options() {
    return {
      pageSize: 20,
    };
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

  @restartableTask
  *fetchWorkItems() {
    const filter = [{ case: this.model.id }];

    yield this.readyWorkItemsQuery.fetch({
      filter: [...filter, { status: "READY" }],
      order: [{ attribute: "DEADLINE", direction: "ASC" }],
    });

    yield this.completedWorkItemsQuery.fetch({
      filter: [...filter, { status: "COMPLETED" }],
      order: [{ attribute: "CLOSED_AT", direction: "DESC" }],
    });
  }
}
