import { visit } from "@ember/test-helpers";
import { setupMirage } from "ember-cli-mirage/test-support";
import { setupIntl } from "ember-intl/test-support";
import { setupApplicationTest } from "ember-qunit";
import { module, test } from "qunit";

module("Acceptance | work items", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  setupIntl(hooks);

  test("can list work items", async function (assert) {
    assert.expect(1);

    this.server.createList("work-item", 5, {
      case: this.server.create("case"),
      status: "READY",
    });

    await visit("/work-items");

    assert.dom("[data-test-table-entry]").exists({ count: 5 });
  });
});
