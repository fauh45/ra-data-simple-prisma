import { DeleteRequest, Response } from "./Http";
import isStringNumber from "./lib/isStringNumber";

export type DeleteOptions = {
  softDeleteField?: string;
};

export const deleteHandler = async <
  T extends { update: Function; delete: Function }
>(
  req: DeleteRequest,
  res: Response,
  table: T,
  options?: DeleteOptions
) => {
  const deleted = options?.softDeleteField
    ? await table.update({
        where: {
          id: isStringNumber(req.body.params.id)
            ? +req.body.params.id
            : req.body.params.id,
        },
        data: {
          [options?.softDeleteField]: new Date(),
        },
      })
    : await table.delete({
        where: {
          id: isStringNumber(req.body.params.id)
            ? +req.body.params.id
            : req.body.params.id,
        },
      });

  return res.json({ data: deleted });
};
