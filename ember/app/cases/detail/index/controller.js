import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import cancelCaseMutation from "caluma-portal-demo/gql/mutations/cancel-case";
import { queryManager } from "ember-apollo-client";
import { dropTask } from "ember-concurrency";

export default class CasesDetailIndexController extends Controller {
  @service router;
  @queryManager apollo;

  get case() {
    return this.model.value[0];
  }

  @dropTask
  *closeCase() {
    yield this.apollo.mutate({
      mutation: cancelCaseMutation,
      variables: { case: this.case.id },
    });
    this.router.transitionTo("cases.index");
  }
}
