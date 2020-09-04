import { inject as service } from "@ember/service";
import Route from "@ember/routing/route";

export default class ApplicationRoute extends Route {
  @service intl;

  beforeModel(...args) {
    super.beforeModel(...args);
    this.intl.setLocale(["en"]);
  }
}
