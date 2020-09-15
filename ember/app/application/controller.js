import Controller from "@ember/controller";
import ENV from "caluma-portal-demo/config/environment";

export default class ApplicationController extends Controller {
  config = ENV.APP;
}
