import { module, test } from "qunit";
import { setupTest } from "caluma-portal-demo/tests/helpers";

module("Unit | Service | host-router", function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test("it exists", function (assert) {
    let service = this.owner.lookup("service:host-router");
    assert.ok(service);
  });
});
