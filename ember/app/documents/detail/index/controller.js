import DocumentsDetailController from "ember-caluma-building-permit-demo/documents/detail/controller";
import deleteDocumentMutation from "ember-caluma-building-permit-demo/gql/mutations/delete-document";
import { inject as service } from "@ember/service";
import { task } from "ember-concurrency-decorators";

export default class DocumentsDetailIndexController extends DocumentsDetailController {
  @service router;

  @task *deleteDocument() {
    yield this.apollo.mutate({
      mutation: deleteDocumentMutation,
      variables: { document: this.model },
    });
    this.router.transitionTo("documents.index");
  }
}
