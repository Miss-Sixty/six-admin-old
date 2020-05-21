import CountTo from "vue-count-to";
// import { count } from "@/api/dashboard";
export default {
  components: {
    CountTo
  },
  data() {
    return {
      //用户总览
      userInfo: [
        {
          name: "今日新增",
          numName: "userToday"
        },
        {
          name: "昨日新增",
          numName: "userYesterday"
        },
        {
          name: "本月新增",
          numName: "userMonth"
        },
        {
          name: "会员总数",
          numName: "userTotal"
        }
      ],
      //会员总览
      memberInfo: [
        {
          name: "铂金卡会员",
          numName: "memberPlatinum"
        },
        {
          name: "金卡会员",
          numName: "memberGold"
        },
        {
          name: "银卡会员",
          numName: "memberSilver"
        }
      ],

      infoData: {
        userToday: 240, //今日新增
        userYesterday: 234, //昨日新增
        userMonth: 3563, //本月新增
        userTotal: 2456, //会员总数
        memberPlatinum: 2345, //铂金卡会员
        memberGold: 4566, //金卡会员
        memberSilver: 5688 //银卡会员
      }
    };
  },
  // methods: {
  //   // 用户和会员数量
  //   getCount() {
  //     count().then(res => {
  //       this.infoData = res.data.data;
  //     });
  //   }
  // },
  // mounted() {
  //   this.getCount(); // 用户和会员数量
  // },
  render() {
    const { infoData, userInfo, memberInfo } = this;

    function infoView(infoList) {
      let colStyle = {
        fontWeight: "bold",
        color: " #666",
        textAlign: "center"
      };

      let numStyle = {
        fontSize: "20px"
      };

      return (
        <el-row type="flex" justify="space-around">
          {infoList.map((item, index) => (
            <el-col span={6} key={index} style={colStyle}>
              <count-to
                end-val={infoData[item.numName]}
                duration={2000}
                style={numStyle}
              />
              <p>{item.name}</p>
            </el-col>
          ))}
        </el-row>
      );
    }

    function content(title, dataInfo) {
      return (
        <el-col span={11}>
          <el-card header={title}>{infoView(dataInfo)}</el-card>
        </el-col>
      );
    }

    return (
      <el-row type="flex" justify="space-around">
        {content("用户总览", userInfo)}
        {content("会员总览", memberInfo)}
      </el-row>
    );
  }
};
