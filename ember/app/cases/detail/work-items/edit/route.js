import Route from "@ember/routing/route";

export default class CasesDetailWorkItemsEditRoute extends Route {
  model({ work_item_id }) {
    return work_item_id;
  }

  setupController(controller, post) {
    super.setupController(controller, post);
    controller.getWorkItem.perform();
  }
}
