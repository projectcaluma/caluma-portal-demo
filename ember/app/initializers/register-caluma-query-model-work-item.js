import CustomWorkItemModel from "caluma-portal-demo/caluma-query/models/work-item";

export function initialize(application) {
  application.register("caluma-query-model:work-item", CustomWorkItemModel);
}

export default {
  initialize,
};
