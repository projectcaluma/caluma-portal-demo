import Route from "@ember/routing/route";
import { useCalumaQuery } from "@projectcaluma/ember-core/caluma-query";
import { allWorkItems } from "@projectcaluma/ember-core/caluma-query/queries";

export default class CasesDetailWorkItemsEditRoute extends Route {
  model({ work_item_id }) {
    const workItemsQuery = useCalumaQuery(this, allWorkItems, () => ({
      options: { pageSize: 1 },
      filter: [{ id: work_item_id }],
    }));

    return workItemsQuery;
  }
}
