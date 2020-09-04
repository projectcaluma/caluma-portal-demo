import Controller from "@ember/controller";
import ENV from "ember-caluma-building-permit-demo/config/environment";

export default class ApplicationController extends Controller {
  config = ENV.APP;
}
