import apiKit from "./apiKit";
import { assignUserId } from "./userApi";

const apiEndpoint = "/todooz";

function getUrl(uri) {
  return `${apiEndpoint}/${uri}`;
}

export function getTodoItems(owner_id) {
  return apiKit.get(getUrl(`user/${owner_id}`));
}

export function getTodoItem(item_id) {
  return apiKit.get(getUrl(`/${item_id}`));
}

export async function saveTodoItem(data) {
  const item = assignUserId(data);
  console.info("item...", item);
  if (item.item_id) {
    const body = { ...item };
    delete body.item_id;

    return apiKit.put(getUrl(item.item_id), body);
  }
  return apiKit.post(apiEndpoint, item);
}

export function deleteTodoItem(item_id) {
  console.info("item_id...", item_id);
  return apiKit.delete(getUrl(item_id));
}
