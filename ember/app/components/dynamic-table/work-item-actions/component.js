import { inject as service } from "@ember/service";
import Component from "@glimmer/component";
import { dropTask } from "ember-concurrency";
import { performHelper } from "ember-concurrency/helpers/perform";

export default class WorkItemActions extends Component {
  @service router;
  @service intl;

  get actions() {
    return [this.editAction].filter(Boolean);
  }

  get editAction() {
    return {
      action: performHelper([this.edit], {}),
      title: this.intl.t("workItems.actions.edit"),
    };
  }

  @dropTask
  *edit(event) {
    event.preventDefault();

    return yield this.router.transitionTo(
      "cases.detail.work-items.edit",
      this.args.value.case.id,
      this.args.value.id
    );
  }
}
