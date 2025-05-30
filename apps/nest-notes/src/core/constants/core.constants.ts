import { ORMenum } from '../../db/orm.type';

export const currentOrm: ORMenum = process.env.NODE_ENV_DB as ORMenum;

if (!currentOrm || !Object.values(ORMenum).includes(currentOrm)) {
  throw new Error(
    `Invalid or missing NODE_ENV_DB: "${process.env.NODE_ENV_DB}"`,
  );
}
