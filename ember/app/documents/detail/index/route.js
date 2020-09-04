import Route from "@ember/routing/route";

export default class DocumentsDetailRoute extends Route {
  model() {
    return this.modelFor("documents.detail");
  }
}
