import Controller from "@ember/controller";
import { action, set } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { useCalumaQuery } from "@projectcaluma/ember-core/caluma-query";
import { allWorkItems } from "@projectcaluma/ember-core/caluma-query/queries";

export default class WorkItemsController extends Controller {
  queryParams = ["order", "status"];

  // Filters
  @tracked order = "urgent";
  @tracked status = "open";

  workItemsQuery = useCalumaQuery(this, allWorkItems, () => ({
    options: { pageSize: 20 },
    filter: this.queryFilters,
    order: this.queryOrder,
  }));

  get queryFilters() {
    const filter = [];

    if (this.status === "closed") {
      filter.push({ status: "COMPLETED" });
    } else {
      filter.push({ status: "READY" });
    }

    return filter;
  }

  get queryOrder() {
    return this.order === "urgent"
      ? [{ attribute: "DEADLINE", direction: "ASC" }]
      : [{ attribute: "CREATED_AT", direction: "DESC" }];
  }

  get tableConfig() {
    return {
      columns: [
        {
          heading: { label: "workItems.task" },
          type: "task-name",
        },
        {
          heading: { label: "workItems.document" },
          modelKey: "case.document.form.name",
          linkTo: "cases.detail.index",
          linkToModelField: "case.id",
        },
        ...(this.status === "open"
          ? [
              {
                heading: { label: "workItems.deadline" },
                modelKey: "deadline",
                type: "date",
              },
            ]
          : [
              {
                heading: { label: "workItems.closedAt" },
                modelKey: "closedAt",
                type: "date",
              },
            ]),
        {
          heading: { label: "workItems.actions.title" },
          type: "work-item-actions",
        },
      ],
    };
  }

  @action
  updateFilter(type, value) {
    set(this, type, value);
  }
}
