import Controller from "@ember/controller";
import { action, set } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import calumaQuery from "@projectcaluma/ember-core/caluma-query";
import { allWorkItems } from "@projectcaluma/ember-core/caluma-query/queries";
import { queryManager } from "ember-apollo-client";
import { restartableTask } from "ember-concurrency-decorators";

export default class WorkItemsIndexController extends Controller {
  queryParams = ["order", "responsible", "type", "status", "role"];

  @queryManager apollo;

  @calumaQuery({ query: allWorkItems, options: "options" })
  workItemsQuery;

  // Filters
  @tracked order = "urgent";
  @tracked responsible = "all";
  @tracked type = "all";
  @tracked status = "open";
  @tracked role = "active";

  get options() {
    return {
      pageSize: 20,
    };
  }

  get columns() {
    return [
      "task",
      "instance",
      "description",
      ...(this.status === "open"
        ? ["deadline", "responsible"]
        : ["closedAt", "closedBy"]),
    ];
  }

  get tableConfig() {
    return {
      columns: [
        {
          heading: { label: "work-items.task" },
          type: "task-name",
        },
        {
          heading: { label: "work-items.case" },
          modelKey: "case.document.form.name",
          linkTo: "cases.detail.index",
          linkToModelField: "case.id",
        },
        ...(this.status === "open"
          ? [
              {
                heading: { label: "work-items.deadline" },
                modelKey: "deadline",
              },
              {
                heading: { label: "work-items.responsible" },
                modelKey: "responsible",
              },
            ]
          : [
              {
                heading: { label: "work-items.closedAt" },
                modelKey: "closedAt",
                type: "date",
              },
              {
                heading: { label: "work-items.closedBy" },
                modelKey: "closedByUser.fullName",
              },
            ]),
        {
          heading: { label: "work-items.action" },
          type: "work-item-actions",
        },
      ],
    };
  }

  @restartableTask
  *fetchWorkItems() {
    const filter = [{ hasDeadline: true }];

    if (this.responsible === "own") {
      // TODO user
      filter.push({ assignedUsers: [] });
    } else {
      filter.push({ assignedUsers: [] });
    }

    if (this.type === "unread") {
      filter.push({ metaValue: [{ key: "not-viewed", value: true }] });
    }

    if (this.status === "closed") {
      filter.push({ status: "COMPLETED" });
    } else {
      filter.push({ status: "READY" });
    }

    if (this.role === "control") {
      // TODO group
      filter.push({ controllingGroups: [] });
    } else {
      filter.push({ addressedGroups: [] });
    }

    const order =
      this.order === "urgent"
        ? [{ attribute: "DEADLINE", direction: "ASC" }]
        : [{ attribute: "CREATED_AT", direction: "DESC" }];

    yield this.workItemsQuery.fetch({ filter, order });
  }

  @action
  updateFilter(type, value) {
    set(this, type, value);
    this.fetchWorkItems.perform();
  }
}
