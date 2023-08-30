import { action } from "@ember/object";
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import ENV from "caluma-portal-demo/config/environment";
import getCasesQuery from "caluma-portal-demo/gql/queries/get-cases";
import { queryManager } from "ember-apollo-client";
import { restartableTask } from "ember-concurrency";

export default class CasesTableComponent extends Component {
  @queryManager apollo;

  @tracked cases = [];
  @tracked types = [];

  get pageInfo() {
    return this.fetchCases.lastSuccessful?.value.pageInfo;
  }

  orderOptions = ENV.APP.casesTable.orderOptions;
  dynamicTableConfig = ENV.APP.dynamicTable;

  get noCases() {
    return (
      this.fetchCases.lastSuccessful &&
      !this.fetchCases.isRunning &&
      !this.cases.length
    );
  }

  @action
  setup() {
    this.cases = [];
    this.fetchCases.perform();
  }

  @restartableTask
  *fetchCases(cursor = null) {
    const order = (this.args.order || ENV.APP.casesTable.defaultOrder).split(
      "_",
    );
    const direction = order.pop().toUpperCase();
    const attribute = order.join("_").toUpperCase();
    try {
      const raw = yield this.apollo.query(
        {
          query: getCasesQuery,
          variables: {
            cursor,
            order: [{ attribute, direction }],
          },

          fetchPolicy: "network-only",
        },
        "allCases",
      );
      const cases = raw.edges.map(({ node }) => node);

      this.cases = [...this.cases, ...cases];

      return {
        cases,
        pageInfo: { ...raw.pageInfo, totalCount: raw.totalCount },
      };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }
}
