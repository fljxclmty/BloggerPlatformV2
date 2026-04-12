import { ResultStatus } from "./result-code";
import { HttpStatus } from "../statuses";

export const resultCodeToHttpException = (resultCode: ResultStatus): number => {
  switch (resultCode) {
    case ResultStatus.Success:
      return HttpStatus.NoContent; // 204
    case ResultStatus.BadRequest:
      return HttpStatus.BadRequest; // 400
    case ResultStatus.Forbidden:
      return HttpStatus.Forbidden; // 403
    case ResultStatus.Unauthorized:
      return HttpStatus.Unauthorized; // 401
    case ResultStatus.NotFound: //
      return HttpStatus.NotFound; // 404

    default:
      return HttpStatus.InternalServerError; // 500
  }
};
