import Controller from "@ember/controller";
import { decodeId } from "ember-caluma/helpers/decode-id";
import { task, lastValue } from "ember-concurrency-decorators";
import { inject as service } from "@ember/service";
import { queryManager } from "ember-apollo-client";
import QueryParams from "ember-parachute";
import getRootFormsQuery from "ember-caluma-building-permit-demo/gql/queries/get-root-forms";
import createDocumentMutation from "ember-caluma-building-permit-demo/gql/mutations/create-document";
import { tracked } from "@glimmer/tracking";

const queryParams = new QueryParams({
  selectedForm: {
    defaultValue: "",
    replace: true,
  },
});


export default class DocumentNewController extends Controller.extend(
  queryParams.Mixin
) {
  @queryManager apollo;
  @service router;
  @tracked selectedForm;

  setup() {
    this.fetchForms.perform();
  }

  reset() {
    this.resetQueryParams();
    this.selectedForm = null;

    this.fetchForms.cancelAll({ reset: true });
    this.createDocument.cancelAll({ reset: true });
  }

  @lastValue("fetchForms") forms;
  @task *fetchForms() {
    return (yield this.apollo.query(
      { query: getRootFormsQuery },
      "allForms.edges"
    )).map(({ node }) => node);
  }

  @task *createDocument() {
    const newDocument = yield this.apollo.mutate({
      mutation: createDocumentMutation,
      variables: { form: this.selectedForm },
    });
    this.router.transitionTo(
      "documents.detail.index",
      decodeId(newDocument.saveDocument.document.id)
    );
  }
}
