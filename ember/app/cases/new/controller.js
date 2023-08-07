import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { decodeId } from "@projectcaluma/ember-core/helpers/decode-id";
import createCaseMutation from "caluma-portal-demo/gql/mutations/create-case";
import getRootFormsQuery from "caluma-portal-demo/gql/queries/get-root-forms";
import getWorkflowQuery from "caluma-portal-demo/gql/queries/get-workflow";
import { queryManager } from "ember-apollo-client";
import { task, lastValue } from "ember-concurrency";

export default class CaseNewController extends Controller {
  queryParams = ["selectedForm"];
  @queryManager apollo;
  @service router;
  @tracked selectedForm = "";

  reset() {
    this.selectedForm = "";

    this.fetchForms.cancelAll({ reset: true });
    this.createCase.cancelAll({ reset: true });
  }

  @lastValue("fetchForms") forms;
  @task
  *fetchForms() {
    return (yield this.apollo.query(
      { query: getRootFormsQuery, fetchPolicy: "network-only" },
      "allForms.edges"
    )).map(({ node }) => node);
  }

  @task
  *createCase() {
    const workflow = (yield this.apollo.query(
      { query: getWorkflowQuery },
      "allWorkflows.edges"
    )).map(({ node }) => node)[0];

    const newCase = yield this.apollo.mutate({
      mutation: createCaseMutation,
      variables: { form: this.selectedForm, workflow: workflow.id },
    });
    this.router.transitionTo(
      "cases.detail.index",
      decodeId(newCase.saveCase.case.id)
    );
  }
}
