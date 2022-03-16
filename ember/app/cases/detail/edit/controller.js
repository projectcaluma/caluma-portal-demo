import Controller from "@ember/controller";

export default class CasesDetailEditController extends Controller {
  get case() {
    return this.model.value[0];
  }
}
