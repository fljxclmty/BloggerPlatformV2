import { ResultStatus } from "./result-code";
import { APIErrorResult } from "../input-validation-result-mw";
import { Result } from "./result-type";

export const resultMapper = (serviceResult: Result<any>): APIErrorResult => {
  if (serviceResult.status !== ResultStatus.Success) {
    return {
      errorsMessages: serviceResult.extensions.map((e: any) => ({
        message: e.message,
        field: e.field,
      })),
    };
  }
  return serviceResult.data;
};
