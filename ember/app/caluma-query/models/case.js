import CaseModel from "@projectcaluma/ember-core/caluma-query/models/work-item";

export default class CustomCaseModel extends CaseModel {
  static fragment = `{
    createdAt
    modifiedAt
    createdByUser
    createdByGroup
    closedAt
    closedByUser
    closedByGroup
    status
    meta
    document {
      id
      form {
        name
      }
    }
  }`;
}
