import CasesDetailRoute from "caluma-portal-demo/cases/detail/index/route";

export default class CasesDetailEditRoute extends CasesDetailRoute {
  model() {
    return this.modelFor("cases.detail");
  }
}
