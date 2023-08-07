import Route from "@ember/routing/route";

export default class CasesNewRoute extends Route {
  setupController(controller) {
    controller.fetchForms.perform();
  }
}
