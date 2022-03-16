import Route from "@ember/routing/route";
import { useCalumaQuery } from "@projectcaluma/ember-core/caluma-query";
import { allCases } from "@projectcaluma/ember-core/caluma-query/queries";
export default class CasesDetailRoute extends Route {
  model({ case_id }) {
    const caseQuery = useCalumaQuery(this, allCases, () => ({
      options: { pageSize: 1 },
      filter: [{ id: case_id }],
    }));

    return caseQuery;
  }
}
