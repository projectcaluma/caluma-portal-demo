import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { useCalumaQuery } from "@projectcaluma/ember-core/caluma-query";
import { allCases } from "@projectcaluma/ember-core/caluma-query/queries";
import ENV from "caluma-portal-demo/config/environment";

export default class CasesTableComponent extends Component {
  orderOptions = ENV.APP.casesTable.orderOptions;
  dynamicTableConfig = ENV.APP.dynamicTable;

  caseQuery = useCalumaQuery(this, allCases, () => ({
    options: { pageSize: 20 },
    filter: [{ orderBy: this.order }],
  }));

  @tracked order = this.args.order || ENV.APP.casesTable.defaultOrder;

  get noCases() {
    return !this.caseQuery.isLoading && !this.caseQuery.value.length;
  }
}
