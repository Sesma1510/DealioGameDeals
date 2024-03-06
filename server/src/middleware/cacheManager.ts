import * as NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

export { cache }
