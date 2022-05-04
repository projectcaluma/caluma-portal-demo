import CustomCaseModel from "caluma-portal-demo/caluma-query/models/case";
import CustomWorkItemModel from "caluma-portal-demo/caluma-query/models/work-item";

export function initialize(application) {
  application.register("caluma-query-model:work-item", CustomWorkItemModel);
  application.register("caluma-query-model:case", CustomCaseModel);
}

export default {
  initialize,
};
