# AI Charge Assistant

我要创建一个面向充电运营客户试用的网页Chatbot，项目名称为“AI充电运营助手试用版”。

本项目只包含两个功能：

恶劣天气充电安全卫士。

角色化运营简报与车辆报障助手。

请先制定实施计划，不要编写代码，不要启用数据库、登录、Cloud、外部API或内置AI。

第一版只使用前端、模拟数据和本地状态，目标是用最少开发量做出可以让客户点击和试用的交互原型。

产品形式：

桌面端网页。

页面模拟现有充电运营平台。

右下角有“AI充电运营助手”入口。

点击后从右侧展开Chatbot。

支持老板、车管人员、安全负责人三种演示角色。

角色通过顶部下拉框手动切换。

页面显著显示“当前为演示数据，不代表真实运营结果”。

功能一：恶劣天气充电安全卫士。

需要演示：

雷暴、暴雨和台风预警。

绿、黄、橙、红四级风险。

受影响站点。

正在充电车辆和设备数量。

气象预警来源和更新时间。

触发风险的规则。

查看风险依据。

查看正在充电的车辆。

通知现场负责人。

发起停桩审批。

查看事件时间线。

生成安全事件报告。

所有操作都只做前端模拟，不调用真实设备。

Chatbot不能显示“已经停止设备”，只能显示“演示审批已创建”或“模拟执行结果”。

功能二：角色化运营简报与车辆报障助手。

老板角色需要演示：

昨日经营简报。

充电收入。

已统计成本。

毛利和毛利率。

收益变化原因。

非谷平期待优化充电。

预计可节省费用。

查看待优化车辆。

车管人员需要演示：

今日新增车辆报障。

影响出车的故障。

司机最新反馈。

超时未处理报障。

重复故障。

单辆车报障详情。

更新处理状态。

经营数据、天气信息、车辆和故障全部使用模拟数据。

Chatbot需要支持：

角色对应的欢迎语。

角色对应的快捷问题。

固定问题的本地规则匹配。

连续对话的视觉效果。

卡片、表格、状态标签和操作按钮。

清空对话。

模拟输入中的加载状态。

未识别问题时给出可提问范围。

对话记录保存在浏览器本地，刷新后不丢失。

设计风格：

专业、克制、可信。

适合企业充电运营平台。

以深蓝、白色和中性灰为主。

风险等级使用绿、黄、橙、红。

不使用夸张渐变、复杂动画和大面积图片。

优先保证电脑端体验，同时保持基本响应式。

所有页面和文案使用中文。

请输出：

页面结构。

组件清单。

模拟数据结构。

三种角色的快捷问题。

主要对话流程。

状态管理方式。

一次性实施步骤。

验收清单。

请保持方案精简，避免不必要页面和组件。不要向我提出开放式问题；遇到细节缺失时采用合理默认值并清楚列出假设。

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f35f42f5-3dcf-4376-9134-0cd1bc501864).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
