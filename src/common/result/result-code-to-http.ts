import { ResultStatus } from "./result-code";
import { HttpStatus } from "../statuses";

export const resultCodeToHttpException = (resultCode: ResultStatus): number => {
  switch (resultCode) {
    case ResultStatus.BadRequest:
      return HttpStatus.BadRequest;
    case ResultStatus.Forbidden:
      return HttpStatus.Forbidden;

    default:
      return HttpStatus.InternalServerError;
  }
};
