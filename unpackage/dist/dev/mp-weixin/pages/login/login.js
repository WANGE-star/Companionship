"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  methods: {
    // 返回上一页（若没有上一页则退出）
    goBack() {
      common_vendor.index.navigateBack({
        delta: 1,
        fail: () => {
          common_vendor.index.exitMiniProgram();
        }
      });
    },
    // 跳转至首页
    goToHome() {
      common_vendor.index.navigateTo({
        url: "/pages/index/index"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.o((...args) => $options.goToHome && $options.goToHome(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
