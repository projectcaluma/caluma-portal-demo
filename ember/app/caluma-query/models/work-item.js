import WorkItemModel from "@projectcaluma/ember-core/caluma-query/models/work-item";

export default class CustomWorkItemModel extends WorkItemModel {
  get isReady() {
    return this.raw.status === "READY";
  }

  get isCompleted() {
    return this.raw.status === "COMPLETED";
  }

  get case() {
    return this.raw.case.parentWorkItem?.case || this.raw.case;
  }

  static fragment = `{
    createdAt
    createdByUser
    createdByGroup
    closedAt
    closedByUser
    closedByGroup
    status
    meta
    addressedGroups
    controllingGroups
    assignedUsers
    name
    deadline
    description
    document {
      id
      form {
        slug
      }
    }
    case {
      id
      meta
      document {
        id
        form {
          slug
          name
        }
      }
    }
    task {
      slug
      name
      description
      meta
      __typename
    }
  }`;
}
