import Route from "@ember/routing/route";

export default class CasesDetailWorkItemsRoute extends Route {
  model() {
    return this.modelFor("cases.detail");
  }
}
