import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import Component from "@glimmer/component";

export default class NotificationsComponent extends Component {
  @service notifications;

  get type() {
    const type = this.args.notification?.type ?? "default";

    if (type === "error") {
      return "danger";
    }

    return type;
  }

  @action
  remove(notification, event) {
    event.preventDefault();

    this.notifications.remove(notification.id);
  }
}
