import { getLogger } from "utils/logger";

const { error } = getLogger("utils:Ping Url");

export const ping = (url, callback) => {
  fetch(url)
    .then(res => callback(res))
    .catch(e => error(e));
};
