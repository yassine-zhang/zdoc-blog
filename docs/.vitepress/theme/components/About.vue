<template>
  <a-typography id="typography">
    <a-typography-title :level="2">介绍</a-typography-title>
    <a-typography-paragraph>
      <blockquote>
        此<a-typography-text code>VitePress</a-typography-text
        >框架搭建者是一名职业中专三年级学生，初中早期学习两年游戏，目前方向全栈。请在任何时候相信我的技术能力。
      </blockquote>
      <a-typography-text mark
        >正在积累实用更具价值的笔记，拒绝无良转载他人文章。</a-typography-text
      >
    </a-typography-paragraph>

    <a-typography-title :level="3">技术栈</a-typography-title>
    <a-card
      style="width: 100%"
      :tab-list="tabListNoTitle"
      :active-tab-key="noTitleKey"
      @tabChange="(key) => onTabChange(key, 'noTitleKey')"
    >
      <p v-if="noTitleKey === 'web'" class="flex flex-wrap">
        <CardItem
          v-for="item in cardItemMsg[0]"
          :key="item.title"
          :title="item.title"
          :content="item.content"
          :img="item.img"
          :extend_img_class="item.extend_img_class"
          :img_size="item.img_size"
          :link="item.link"
          :title_class="item.title_class"
        />
      </p>
      <p v-else-if="noTitleKey === 'common'" class="flex flex-wrap">
        <CardItem
          v-for="item in cardItemMsg[1]"
          :key="item.title"
          :title="item.title"
          :content="item.content"
          :img="item.img"
          :extend_img_class="item.extend_img_class"
          :img_size="item.img_size"
          :link="item.link"
          :title_class="item.title_class"
        />
      </p>
      <p v-else-if="noTitleKey === 'back'" class="flex flex-wrap">
        <CardItem
          v-for="item in cardItemMsg[2]"
          :key="item.title"
          :title="item.title"
          :content="item.content"
          :img="item.img"
          :extend_img_class="item.extend_img_class"
          :img_size="item.img_size"
          :link="item.link"
          :title_class="item.title_class"
        />
      </p>
    </a-card>

    <a-divider orientation="left">IT-Study-Timeline</a-divider>
    <a-space size="middle" class="ml-4">
      <a-badge color="blue" text="全栈路线" />
      <a-badge color="green" text="物联网路线" />
      <a-badge color="red" text="游戏路线" />
    </a-space>
    <br />
    <br />
    <a-timeline mode="alternate">
      <a-timeline-item
        >已开发上市《新大陆技能大赛技术分享》官网，包含前后端技术服务，进一步熟悉整个开发流程。
        <a-typography-text strong
          >2023-11-28</a-typography-text
        ></a-timeline-item
      >
      <a-timeline-item
        >学习前后端流行相关技术架构，插件，库（<a-typography-text code
          >TailwindCSS、DaisyUI、AntDesignVue、Lodash、Docker、Nginx</a-typography-text
        >、etc），对于前后端整个体系有更清晰的概念
        <a-typography-text strong
          >2023-11-20</a-typography-text
        ></a-timeline-item
      >
      <a-timeline-item color="green"
        >统计：学习我分享大赛笔记获奖人员不下一百位。不论中高职，省级国级范围，一二三等奖。官方网站：<a-typography-link
          ><a href="https://www.yuque.com/newlandiot" target="__blank"
            >https://www.yuque.com/newlandiot</a
          ></a-typography-link
        >
        <br />
        <a-typography-text strong
          >2023-11-20</a-typography-text
        ></a-timeline-item
      >
      <a-timeline-item
        >陆续学习<a-typography-text code>Vue3</a-typography-text
        >、<a-typography-text code>Pinia</a-typography-text>、<a-typography-text
          code
          >Vue-Router</a-typography-text
        >、<a-typography-text code>Vite</a-typography-text>、<a-typography-text
          code
          >BootStrap5</a-typography-text
        >、<a-typography-text code>ElementPlus</a-typography-text>
        <a-typography-text strong
          >2023-06-04</a-typography-text
        ></a-timeline-item
      >
      <a-timeline-item
        >学习<a-typography-text code>NodeJS</a-typography-text
        >、<a-typography-text code>Jquery</a-typography-text
        >、<a-typography-text code>Ajax</a-typography-text>、<a-typography-text
          code
          >Axios</a-typography-text
        >
        <a-typography-text strong
          >2023-03-15</a-typography-text
        ></a-timeline-item
      >
      <a-timeline-item
        >复习完<a-typography-text code>HTML5</a-typography-text
        >、<a-typography-text code>CSS3</a-typography-text>、<a-typography-text
          code
          >ES6</a-typography-text
        >
        <a-typography-text strong
          >2023-02-01</a-typography-text
        ></a-timeline-item
      >
      <a-timeline-item
        >拥抱大前端，跟随黑马学习基础课
        <a-typography-text strong
          >2023-01-14</a-typography-text
        ></a-timeline-item
      >
      <a-timeline-item color="red"
        >深思熟虑，放弃游戏开发。一个不玩游戏的人何来开发游戏空谈
        <a-typography-text strong
          >2023-01-11</a-typography-text
        ></a-timeline-item
      >
      <a-timeline-item color="green"
        >已准备好完整系列大赛笔记，向全网付费分享
        <a-typography-text strong
          >2022-12-21</a-typography-text
        ></a-timeline-item
      >
      <a-timeline-item color="green"
        >参加全省物联网技能大赛，获得三等奖
        <a-typography-text strong
          >2022-12-15</a-typography-text
        ></a-timeline-item
      >
      <a-timeline-item color="green"
        >有幸跟随学校外出参加物联网技术培训一周
        <a-typography-text strong
          >2022-05-12</a-typography-text
        ></a-timeline-item
      >
      <a-timeline-item color="green"
        >全力备赛物联网技能大赛，全天练习
        <a-typography-text strong
          >2022-03-27</a-typography-text
        ></a-timeline-item
      >
      <a-timeline-item color="red"
        >帮助开发毕业设计 -> Unity APP，获利1000
        <a-typography-text strong
          >2022-03-19</a-typography-text
        ></a-timeline-item
      >
      <a-timeline-item color="green"
        >参加全省工业互联网大赛，获得三等奖
        <a-typography-text strong
          >2021-11-06</a-typography-text
        ></a-timeline-item
      >
      <a-timeline-item color="red"
        >积极投入b站大环境，上传许多开发效果演示视频及教程
        <a-typography-text strong
          >2021-07-01</a-typography-text
        ></a-timeline-item
      >
      <a-timeline-item color="red"
        >目前自学Unity已经开发了多个小游戏DEMO，也买了好多纸质书籍学习
        <a-typography-text strong
          >2021-02-28</a-typography-text
        ></a-timeline-item
      >
      <a-timeline-item color="red"
        >使用Unity开发2D游戏，但为此我还在担心初中毕业后是在家一个人做游戏还是继续考大专找个志同道合的朋友一起开发游戏。（注：这里说的是初中毕业
        <br /><a-typography-text strong
          >2021-01-01</a-typography-text
        ></a-timeline-item
      >
      <a-timeline-item color="red"
        >放了有史以来最长的寒假（模糊记得有大约6,7个月），我也算是真正入门CC游戏开发并在今天发布了一款微信小游戏
        <a-typography-text strong
          >2020-10-05</a-typography-text
        ></a-timeline-item
      >
      <a-timeline-item color="red"
        >发现更热爱游戏，上网查询相关资料。认识了Cocos Creator
        <a-typography-text strong
          >2020-04-14</a-typography-text
        ></a-timeline-item
      >
      <a-timeline-item>
        在两个月时间里努力学习HTML、CSS、JavaScript，最终因实力不济没有灵感也无法独自编写出好看的特效而放弃前端。(那段时间真的很失落也很迷茫
        <br /><a-typography-text strong>2020-04-07</a-typography-text>
      </a-timeline-item>
      <a-timeline-item>
        沉迷前端页面特效，尝试学习。
        <a-typography-text strong>2020-02-10</a-typography-text>
      </a-timeline-item>
      <a-timeline-item>
        因为疫情网课让我认识了你，正式向世界说`<a-typography-text mark
          >Hello, World</a-typography-text
        >` <a-typography-text strong>2020-01-17</a-typography-text>
      </a-timeline-item>
    </a-timeline>

    <a-divider orientation="right" style="margin-bottom: 8px">联系我</a-divider>
    <a-typography-paragraph
      class="flex flex-col md:flex-row justify-between text-right px-4"
    >
      <div class="text-xs">时间线有一定误差，一切以实际为准</div>
      <div class="font-bold">QQ: 57878778 ｜ WX: 16599999215</div>
    </a-typography-paragraph>
  </a-typography>
</template>
<style scoped>
#typography {
  margin-top: 10px;
  padding: 0 24px;
  background-color: #fff;
}
</style>
<script setup>
import { ref } from "vue";
import CardItem from "./CardItem.vue";

const tabListNoTitle = [
  {
    key: "web",
    tab: "前端",
  },
  {
    key: "common",
    tab: "通用",
  },
  {
    key: "back",
    tab: "后端",
  },
];
const key = ref("web");
const noTitleKey = ref("web");
const onTabChange = (value, type) => {
  console.log(value, type);
  if (type === "key") {
    key.value = value;
  } else if (type === "noTitleKey") {
    noTitleKey.value = value;
  }
};

// ---------------------------------------------------------------
import base64img from "./../base64image/center.s.js";

const cardItemMsg = [
  [
    {
      title: "HTML5",
      content: "用来描述网页的一种超文本标记语言，网页骨架",
      img: base64img.html,
      extend_img_class: "sm:top-[14px] sm:left-[20px]",
      link: "https://www.baidu.com",
      img_size: 42,
    },
    {
      title: "CSS3",
      content: "用来为网页骨架渲染样式",
      img: base64img.css,
      img_size: 31,
      extend_img_class: "sm:top-[14px] sm:left-[22px]",
    },
    {
      title: "Less",
      content:
        "Less （Leaner Style Sheets 的缩写） 是一门向后兼容的 CSS 扩展语言。",
      img: base64img.less,
      extend_img_class: "sm:top-[26px] sm:left-[20px]",
    },
    {
      title: "JS&ES6",
      content: "做前端交互逻辑操作，网络请求，能做的事很多",
      img: base64img.js,
      img_size: 34,
      extend_img_class: "sm:top-[18px] sm:left-[22px]",
    },
    {
      title: "TypeScript",
      content: "JS 的语法糖，添加了类型限制",
      img: base64img.ts,
      img_size: 34,
      extend_img_class: "sm:top-[18px] sm:left-[22px]",
    },
    {
      title: "BootStrap5",
      content:
        "Bootstrap 是一个功能强大、功能丰富的前端工具包。在几分钟内构建从原型到生产的任何内容。",
      img: base64img.bootstrap,
      img_size: 40,
      extend_img_class: "sm:left-[20px] sm:top-[19px]",
    },
    {
      title: "Element-Plus",
      content: "基于 Vue 3，面向设计师和开发者的组件库",
      img: base64img.elementplus,
      img_size: 38,
      extend_img_class: "sm:left-[20px] sm:top-[16px]",
    },
    {
      title: "daisyUI",
      content: "国外最流行的组件库为 Tailwind CSS 而生",
      img: base64img.daisyui,
      img_size: 40,
      extend_img_class: "sm:left-[24px] sm:top-[16px]",
    },
    {
      title: "Tailwind CSS",
      content:
        "只需 HTML 即可快速构建现代网站, 一个效用至上的 CSS 框架，包含 flex, pt-4, text-center 和 rotate-90 等类，可以直接在你的标记中构建任何设计。",
      img: base64img.tailwind,
      extend_img_class: "sm:left-[16px] sm:top-[11px]",
    },
    {
      title: "Vue3",
      content:
        "易学易用，性能出色，适用场景丰富的 Web 前端框架。Vue3使用组合式API，更适用工程式Web开发。",
      img: base64img.vue,
      img_size: 36,
      extend_img_class: "sm:left-[24px] sm:top-[20px]",
    },
    {
      title: "Vite",
      content: "Vite 下一代的前端工具链，为开发提供极速响应。",
      img: base64img.vite,
      img_size: 35,
      extend_img_class: "sm:left-[24px] sm:top-[17px]",
    },
    {
      title: "Vue-Router",
      content:
        "Vue.js 的官方路由，为 Vue.js 提供富有表现力、可配置的、方便的路由。",
      img: base64img.vue,
      img_size: 36,
      extend_img_class: "sm:left-[24px] sm:top-[20px]",
    },
    {
      title: "Pinia",
      content:
        "Pinia符合直觉的 Vue.js 状态管理库。类型安全、可扩展性以及模块化设计。甚至让你忘记正在使用的是一个状态库。",
      img: base64img.pinia,
      img_size: 28,
      extend_img_class: "sm:left-[30px] sm:top-[15px]",
    },
    {
      title: "Ant Design Vue",
      content:
        "ant-design-vue 为 Web 应用提供了丰富的基础 UI 组件，我们还将持续探索企业级应用的最佳 UI 实践。",
      img: base64img.antdesignvue,
      img_size: 36,
      extend_img_class: "sm:left-[20px] sm:top-[20px]",
    },
  ],
  [
    {
      title: "Git",
      content: "分布式版本控制工具",
      img: base64img.git,
      img_size: 34,
      extend_img_class: "sm:left-[30px] sm:top-[20px]",
    },
    {
      title: "NPM",
      title_class: "sm:text-white",
      content:
        "npm（全称 Node Package Manager，即“node包管理器”）是Node.js默认的、用JavaScript编写的软件包管理系统。",
      img: base64img.npm,
      img_size: 68,
      extend_img_class: "sm:left-[62px] sm:top-[24px] md:left-[50px]",
    },
    {
      title: "Docker",
      content: "Docker 是一个应用打包、分发、部署的工具",
      img: base64img.docker,
      extend_img_class: "sm:left-[20px] sm:top-[12px]",
    },
    {
      title: "Axios",
      title_class: "sm:text-white",
      content:
        "Axios 是一个基于 promise 网络请求库，作用于 node.js 和浏览器中。",
      img: base64img.axios,
      img_size: 85,
      extend_img_class: "sm:left-[50px] sm:top-[29px] md:left-[40px]",
    },
    {
      title: "lodash",
      content: "Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库。",
      img: base64img.lodash,
    },
    {
      title: "CryptoJS",
      content:
        "CryptoJS是使用最佳实践和模式在JavaScript中实现的标准和安全加密算法的不断增长的集合。它们速度很快，并且具有一致而简单的界面。",
      img: base64img.cryptojs,
      img_size: 35,
      extend_img_class: "sm:left-[28px] sm:top-[19px]",
    },
    {
      title: "Moment.js",
      content: "在 JavaScript 中解析、校验、操作、显示日期和时间。",
      img: base64img.momentjs,
      img_size: 34,
      extend_img_class: "sm:left-[28px] sm:top-[19px]",
    },
  ],
  [
    {
      title: "NodeJS",
      content: "Node.js®是一个开源、跨平台的 JavaScript 运行时环境。",
      img: base64img.nodejs,
      img_size: 39,
      extend_img_class: "sm:left-[20px] sm:top-[17px]",
    },
    {
      title: "Express",
      content: "基于 Node.js 平台，快速、开放、极简的 Web 开发框架",
      title_class: "pr-4 text-center",
    },
    {
      title: "Ngnix",
      content:
        "Nginx（发音同“engine X”）是异步框架的网页服务器，也可以用作反向代理、负载平衡器和 HTTP 缓存。",
      img: base64img.nginx,
      img_size: 39,
      extend_img_class: "sm:left-[28px] sm:top-[17px]",
    },
  ],
];
</script>
