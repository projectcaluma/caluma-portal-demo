import Controller from "@ember/controller";

export default class CasesDetailController extends Controller {
  get case() {
    return this.model.value[0];
  }
}
