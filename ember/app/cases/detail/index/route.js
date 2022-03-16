import Route from "@ember/routing/route";

export default class CasesDetailRoute extends Route {
  model() {
    return this.modelFor("cases.detail");
  }
}
