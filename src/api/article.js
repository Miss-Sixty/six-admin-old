import request from "@/utils/request";

export function fetchList(data) {
  return request({
    url: "/article/list",
    method: "post",
    data
  });
}
