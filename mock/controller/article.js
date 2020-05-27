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
      introduction: "@cparagraph(1, 2)",
      timestamp: +Mock.Random.date("T"),
      "status|1": ["draft", "published", "deleted"]
    })
  );
}

export default [
  {
    url: "/article/list",
    type: "post",
    response: config => {
      const {
        title,
        author,
        timestamp,
        status,
        page = 1,
        limit = 20
      } = config.body;

      let mockList = List.filter(item => {
        if (status && item.status !== status) return false;
        if (title && item.title.indexOf(title) < 0) return false;
        if (author && item.author.indexOf(author) < 0) return false;

        if (timestamp) {
          return (
            timestamp[0] < item.timestamp && timestamp[1] >= item.timestamp
          );
        }

        return true;
      });

      const pageList = mockList.filter(
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
