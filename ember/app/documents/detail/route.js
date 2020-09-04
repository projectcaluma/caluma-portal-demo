import Route from "@ember/routing/route";

export default class DocumentsDetailRoute extends Route {
  model(params) {
    return params.id;
  }
}
