import Route from "@ember/routing/route";

export default class CasesDetailRoute extends Route {
  model({ case_id }) {
    return case_id;
  }

  setupController(controller, post) {
    super.setupController(controller, post);
    controller.getCase.perform();
  }
}
