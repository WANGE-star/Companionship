"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      cityName: "杭州",
      searchKeyword: "",
      showSearchResult: false,
      categories: [
        { icon: "/static/index/美食.png", name: "美食" },
        { icon: "/static/index/商务.png", name: "商务" },
        { icon: "/static/index/运动.png", name: "运动" },
        { icon: "/static/index/户外.png", name: "户外" },
        { icon: "/static/index/娱乐.png", name: "娱乐" },
        { icon: "/static/index/潮玩.png", name: "潮玩" }
      ],
      filterOptions: [
        { name: "年龄", list: ["18-25岁", "26-35岁", "36-45岁", "45岁以上"], selectedValue: "" },
        { name: "性别", list: ["男", "女"], selectedValue: "" },
        { name: "时间", list: ["全天可约", "工作日", "周末"], selectedValue: "" },
        { name: "职业状态", list: ["全职", "兼职", "自由职业"], selectedValue: "" },
        { name: "业务范围", list: ["线下陪伴", "线上聊天", "技能服务"], selectedValue: "" }
      ],
      talentList: [
        {
          distance: "18.13km",
          avatar: "https://ts1.tc.mm.bing.net/th/id/R-C.6d8a57256ba630185743ba8557f4ed14?rik=VldXaSQLI8%2bObA&riu=http%3a%2f%2fimage.yjcf360.com%2fu%2fcms%2fwww%2f201904%2f120850581kxr.jpg&ehk=WNEMqv9m%2f6G74rn9TCLdjOYquj4EU%2bdDYDxY6yE9Q8E%3d&risl=&pid=ImgRaw&r=0",
          status: "available",
          statusText: "可接单",
          name: "小六",
          gender: "female",
          // 女性
          age: "22岁",
          height: "168cm",
          weight: "48kg",
          zodiac: "处女座",
          tags: ["火锅", "电影", "旅游"]
        },
        {
          distance: "9.1km",
          avatar: "https://n.sinaimg.cn/sinacn10113/332/w1024h1708/20190806/73d1-iatixpm8624905.jpg",
          status: "accepting",
          statusText: "接单中",
          name: "小呆呆",
          gender: "female",
          // 女性
          age: "20岁",
          height: "175cm",
          weight: "57kg",
          zodiac: "双子座",
          tags: ["西餐", "网球", "高尔夫"]
        },
        {
          distance: "广州",
          avatar: "https://ts1.tc.mm.bing.net/th/id/R-C.edabf53e74b6934b0f0045f3fa36b0ff?rik=vMJpHl7aSzexZw&riu=http%3a%2f%2fn.sinaimg.cn%2fsinakd20210807ac%2f120%2fw1080h1440%2f20210807%2f7999-39282fb9c3136f5790ec599c7743a496.jpg&ehk=5%2b0RTyikmW9U7OyLgxyNGT%2f%2fwIkySmrC9TTXbZViYM0%3d&risl=&pid=ImgRaw&r=0",
          status: "available",
          statusText: "可接单",
          name: "林晓月",
          gender: "female",
          // 女性
          age: "26岁",
          height: "177cm",
          weight: "58kg",
          zodiac: "白羊座",
          tags: ["密室", "清吧", "猫咖"]
        },
        {
          distance: "14.55km",
          avatar: "https://ts3.tc.mm.bing.net/th/id/OIP-C.cp7dLAeUfdt4PU2kwaTxmQHaQC?rs=1&pid=ImgDetMain&o=7&rm=3",
          status: "accepting",
          statusText: "接单中",
          name: "李四",
          gender: "male",
          // 男性
          age: "24岁",
          height: "180cm",
          weight: "70kg",
          zodiac: "天秤座",
          tags: ["滑雪", "二次元", "台球"]
        }
      ]
    };
  },
  computed: {
    filteredTalentList() {
      let result = [...this.talentList];
      if (this.searchKeyword.trim()) {
        const keyword = this.searchKeyword.trim().toLowerCase();
        result = result.filter((item) => {
          const nameMatch = item.name.toLowerCase().includes(keyword);
          const tagMatch = item.tags.some((tag) => tag.toLowerCase().includes(keyword));
          return nameMatch || tagMatch;
        });
      }
      this.filterOptions.forEach((option) => {
        if (option.selectedValue) {
          if (option.name === "年龄") {
            result = result.filter((item) => {
              const age = parseInt(item.age);
              switch (option.selectedValue) {
                case "18-25岁":
                  return age >= 18 && age <= 25;
                case "26-35岁":
                  return age >= 26 && age <= 35;
                case "36-45岁":
                  return age >= 36 && age <= 45;
                case "45岁以上":
                  return age >= 46;
                default:
                  return true;
              }
            });
          }
          if (option.name === "性别") {
            result = result.filter((item) => {
              return option.selectedValue === "男" ? item.gender === "male" : item.gender === "female";
            });
          }
        }
      });
      return result;
    }
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack({ delta: 1 });
    },
    chooseCity() {
      common_vendor.index.showActionSheet({
        itemList: ["杭州", "上海", "北京", "广州", "深圳"],
        success: (res) => {
          this.cityName = ["杭州", "上海", "北京", "广州", "深圳"][res.tapIndex];
        }
      });
    },
    search() {
      if (!this.searchKeyword.trim()) {
        common_vendor.index.showToast({ title: "请输入搜索关键字", icon: "none" });
        return;
      }
      this.showSearchResult = true;
    },
    handleSearchInput() {
      this.showSearchResult = !!this.searchKeyword.trim();
    },
    showFilter() {
      common_vendor.index.showToast({ title: "全部筛选功能开发中", icon: "none" });
    },
    showFilterOptions(index) {
      const option = this.filterOptions[index];
      common_vendor.index.showActionSheet({
        itemList: option.list,
        success: (res) => {
          this.filterOptions[index].selectedValue = option.list[res.tapIndex];
          this.showSearchResult = true;
        }
      });
    },
    clearFilter(index) {
      this.filterOptions[index].selectedValue = "";
      this.showSearchResult = !!this.searchKeyword.trim() || this.filterOptions.some((opt) => opt.selectedValue);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.t($data.cityName),
    c: common_vendor.o((...args) => $options.chooseCity && $options.chooseCity(...args)),
    d: common_vendor.o([($event) => $data.searchKeyword = $event.detail.value, (...args) => $options.handleSearchInput && $options.handleSearchInput(...args)]),
    e: $data.searchKeyword,
    f: common_vendor.o((...args) => $options.search && $options.search(...args)),
    g: $data.showSearchResult
  }, $data.showSearchResult ? {
    h: common_vendor.t($options.filteredTalentList.length)
  } : {}, {
    i: !$data.showSearchResult
  }, !$data.showSearchResult ? {
    j: common_vendor.f($data.categories, (item, index, i0) => {
      return {
        a: item.icon,
        b: common_vendor.t(item.name),
        c: index
      };
    })
  } : {}, {
    k: !$data.showSearchResult
  }, !$data.showSearchResult ? {
    l: common_vendor.o((...args) => $options.showFilter && $options.showFilter(...args))
  } : {}, {
    m: !$data.showSearchResult
  }, !$data.showSearchResult ? {
    n: common_vendor.f($data.filterOptions, (option, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(option.selectedValue || option.name),
        b: option.selectedValue
      }, option.selectedValue ? {
        c: common_vendor.o(($event) => $options.clearFilter(index), index)
      } : {}, {
        d: index,
        e: common_vendor.o(($event) => $options.showFilterOptions(index), index)
      });
    })
  } : {}, {
    o: $data.showSearchResult && $options.filteredTalentList.length === 0
  }, $data.showSearchResult && $options.filteredTalentList.length === 0 ? {} : {}, {
    p: common_vendor.f($options.filteredTalentList, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.distance),
        b: item.avatar,
        c: item.status === "available"
      }, item.status === "available" ? {
        d: common_assets._imports_1
      } : {}, {
        e: item.status === "accepting"
      }, item.status === "accepting" ? {
        f: common_assets._imports_2
      } : {}, {
        g: common_vendor.t(item.statusText),
        h: common_vendor.n(item.status),
        i: common_vendor.t(item.name),
        j: common_vendor.t(item.gender === "female" ? "♀" : "♂"),
        k: common_vendor.n(item.gender),
        l: common_vendor.t(item.age),
        m: common_vendor.t(item.height),
        n: common_vendor.t(item.weight),
        o: common_vendor.t(item.zodiac),
        p: common_vendor.t(item.tags.join(" | ")),
        q: index
      });
    }),
    q: common_assets._imports_0,
    r: common_assets._imports_3,
    s: common_assets._imports_4,
    t: common_assets._imports_5
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
