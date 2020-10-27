import Component from "@glimmer/component";
import ENV from "caluma-portal-demo/config/environment";

export default class CaseStateLabelComponent extends Component {
  icons = ENV.APP.caseStateIcons;

  get iconLeft() {
    return !(this.args.iconPosition === "right");
  }
}
