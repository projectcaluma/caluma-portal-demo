import { visit, currentURL, click } from "@ember/test-helpers";
import { setupMirage } from "ember-cli-mirage/test-support";
import { setupIntl } from "ember-intl/test-support";
import { setupApplicationTest } from "ember-qunit";
import { module, test } from "qunit";

module("Acceptance | cases", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  setupIntl(hooks);

  test("can list cases", async function (assert) {
    assert.expect(1);

    this.server.createList("case", 5, { closedAt: null });

    await visit("/");

    assert.dom("[data-test-table-entry]").exists({ count: 5 });
  });

  test("can create case", async function (assert) {
    assert.expect(2);

    await visit("/");

    assert.dom("[data-test-no-cases]").exists();

    await click("[data-test-no-cases-create]");

    assert.strictEqual(currentURL(), "/new");
  });
});
