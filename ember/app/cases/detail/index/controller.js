import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import cancelCaseMutation from "caluma-portal-demo/gql/mutations/cancel-case";
import { queryManager } from "ember-apollo-client";
import { task } from "ember-concurrency";

export default class CasesDetailIndexController extends Controller {
  @service router;
  @queryManager apollo;

  @task *closeCase() {
    yield this.apollo.mutate({
      mutation: cancelCaseMutation,
      variables: { case: this.model.id },
    });
    this.router.transitionTo("cases.index");
  }
}
