import Mock from "mockjs";

const List = [];
const count = 100;

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: "@increment",
      title: "@ctitle",
      author: "@cname",
      pageViews: "@natural(999, 20000)",
      datetime: "@datetime",
      introduction: "@cparagraph(1, 2)"
    })
  );
}

export default [
  {
    url: "/article/list",
    type: "get",
    response: config => {
      const { page = 1, limit = 20 } = config.query;

      const pageList = List.filter(
        (item, index) => index < limit * page && index >= limit * (page - 1)
      );

      return {
        code: 200,
        data: {
          total: List.length,
          items: pageList
        }
      };
    }
  }
];
