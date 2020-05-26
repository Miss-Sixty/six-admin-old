// import Mock from "mockjs";

// const List = [];

export default [
  {
    url: "/article/list",
    type: "get",
    response: config => {
      console.log(config);

      return {
        code: 200,
        data: {
          title: 1
        }
      };
    }
  }
];
