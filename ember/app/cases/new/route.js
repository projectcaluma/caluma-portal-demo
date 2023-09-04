import Route from "@ember/routing/route";

export default class CasesNewRoute extends Route {
  setupController(controller) {
    controller.fetchForms.perform();
  }

  resetController(controller) {
    controller.selectedForm = "";
    controller.fetchForms.cancelAll({ reset: true });
    controller.createCase.cancelAll({ reset: true });
  }
}
