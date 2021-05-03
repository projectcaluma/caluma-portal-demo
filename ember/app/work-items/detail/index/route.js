import Route from "@ember/routing/route";

export default class WorkItemsDetailIndexRoute extends Route {
  model({ work_item_id: id }) {
    return id;
  }
}
