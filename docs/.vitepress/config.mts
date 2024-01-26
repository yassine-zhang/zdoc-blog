import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPHomeHero\.vue$/,
          replacement: fileURLToPath(
            new URL("./theme/components/VPHomeHero.vue", import.meta.url),
          ),
        },
      ],
    },
  },
  lang: "zh",
  title: "开发日志",
  titleTemplate: "ZDoc",
  description: "ZDoc译为Zhang Documents，保持良好的心态书写独属于我的笔记",

  // If, however, you cannot configure your server with such support (e.g. GitHub pages),
  cleanUrls: true,
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    [
      "script",
      {
        async: "",
        src: "https://www.googletagmanager.com/gtag/js?id=GTM-KCD3XVXT",
      },
    ],
    [
      "script",
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'TAG_ID');`,
    ],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: "错误日志",
        items: [
          { text: "curl安装Bun", link: "/error-log/curl-install-bun/summary" },
        ]
      },
      {
        text: "前端杂文",
        items: [
          {
            text: "延迟等待下一绘制帧",
            link: "/front-end-essay/next-draw-frame/summary",
          },
          {
            text: "不同设备最佳匹配img.src",
            link: "https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/picture",
          },
          {
            text: "获取元素真实样式",
            link: "/front-end-essay/real-time-style/summary",
          },
        ],
      },
      // {
      //   text: '后端杂文',
      //   link: '#'
      // },
      // {
      //   text: "安全指南",
      //   items: [
      //     { text: "JavaScript", link: "/safety-guidelines/js/trusted-event" },
      //     { text: "Linux", link: "/safety-guidelines/linux/summary" },
      //   ],
      // },
      // {
      //   text: "项目规范",
      //   items: [
      //     { text: "fs-extra", link: "/specification/fs-extra/summary" },
      //     { text: "create-vue", link: "/specification/create-vue/summary" },
      //     {
      //       text: "[language]",
      //       link: "/specification/language/alternate-if-syntax/summary",
      //     },
      //   ],
      // },
      {
        text: "通用工具",
        items: [
          {
            text: "Tools",
            items: [{ text: "docker", link: "/docker/inspect" }],
          },
          {
            text: "Sheet",
            items: [
              { text: "Git速查表", link: "/common-tools/cheat-sheet/git" },
              {
                text: "Docker速查表",
                link: "/common-tools/cheat-sheet/docker",
              },
              {
                text: "Centos速查表",
                link: "/common-tools/cheat-sheet/centos",
              },
            ],
          },
        ],
      },
      {
        text: "大陆通行",
        items: [
          {
            text: "域名备案",
            link: "/mainland-pass/domain-name-filing/summary",
          },
          {
            text: "SSL证书签发&使用",
            link: "/mainland-pass/ssl-license/summary",
          },
          {
            text: "二级域名解析&使用",
            link: "/mainland-pass/level2-domain-resolve/summary",
          },
          {
            text: "Nginx项目前后端配置案例",
            link: "/mainland-pass/website-nginx-configuration/summary",
          },
        ],
      },
      {
        text: "模块使用",
        items: [
          {
            text: "防止提交lj/lint-staged",
            link: "/plugin-using/lint-staged/summary",
          },
          {
            text: "代码格式化/Prettier",
            link: "/plugin-using/prettier/summary",
          },
          {
            text: "stdin&out着色/kolorist",
            link: "/plugin-using/kolorist/summary",
          },
          {
            text: "前端Shell利器/zx",
            link: "/plugin-using/zx/summary",
          },
          {
            text: "解析参数选项/minimist",
            link: "/plugin-using/minimist/summary",
          },
          {
            text: "交互式提示/prompts",
            link: "/plugin-using/prompts/summary",
          },
          {
            text: "更快的前端构建工具/esbuild",
            link: "/plugin-using/esbuild/summary",
          },
          {
            text: "esbuild许可证插件",
            link: "/plugin-using/esbuild-plugin-license/summary",
          },
          {
            text: "控制台渐变/gradient-string",
            link: "/plugin-using/gradient-string/summary",
          },
          {
            text: "Vite gzip压缩插件",
            link: "/plugin-using/vite-plugin-compression2/summary",
          },
          {
            text: "Pinia持久化存储插件",
            link: "https://seb-l.github.io/pinia-plugin-persist/",
          },
          {
            text: "fs-extra NodeJS扩展方法",
            link: "/plugin-using/fs-extra/summary",
          },
          {
            text: "promise-retry重试函数",
            link: "/plugin-using/promise-retry/summary",
          },
          {
            text: "Moment.js",
            link: "https://moment.nodejs.cn/",
          },
          {
            text: "CryptoJS实现标准安全加密",
            link: "https://cryptojs.gitbook.io/docs/",
          },
          {
            text: "npm-run-all2多脚本运行",
            link: "https://github.com/bcomnes/npm-run-all2/tree/master",
          },
        ],
      },
      {
        text: "关于",
        link: "/about",
      },
    ],

    sidebar: [
      {
        text: "安全指南",
        items: [
          {
            text: "JavaScript",
            items: [
              {
                text: "Trusted Event",
                link: "/safety-guidelines/js/trusted-event",
              },
              { text: "XSS 非法注入", link: "/safety-guidelines/js/xss" },
              {
                text: "CORS详解",
                link: "/safety-guidelines/js/cors-desc",
              },
              {
                text: "SQL注入",
                link: "/safety-guidelines/js/sql-injection",
              },
            ],
          },
          {
            text: "Linux",
            items: [
              { text: "firewalld", link: "/safety-guidelines/linux/summary" },
            ],
          },
        ],
      },
      {
        text: "项目规范",
        items: [
          {
            text: "fs-extra",
            link: "/specification/fs-extra/summary",
          },
          {
            text: "create-vue",
            link: "/specification/create-vue/summary",
          },
          {
            text: "language",
            items: [
              {
                text: "替换if语法",
                link: "/specification/language/alternate-if-syntax/summary",
              },
            ],
          },
        ],
      },
      {
        text: "通用工具",
        items: [
          {
            text: "Tools",
            items: [
              {
                text: "docker",
                items: [
                  { text: "运行环境信息", link: "/docker/inspect" },
                  {
                    text: "入门到实践",
                    items: [
                      {
                        text: "1.构建Docker镜像",
                        link: "/docker/buildx-image",
                      },
                      { text: "2.推送镜像到Hub", link: "/docker/push-hub" },
                      { text: "3.多容器组合使用", link: "/docker/compose" },
                      { text: "4.私有库搭建&使用", link: "/docker/registry" },
                    ],
                  },
                  { text: "错误汇总", link: "/docker/error-summary" },
                  { text: "Docker中文文档", link: "/docker/ref-links" },
                ],
              },
            ],
          },
          {
            text: "Sheet",
            items: [
              {
                text: "Git",
                link: "/common-tools/cheat-sheet/git",
              },
              {
                text: "Docker",
                link: "/common-tools/cheat-sheet/docker",
              },
              {
                text: "Centos",
                link: "/common-tools/cheat-sheet/centos",
              },
            ],
          },
        ],
      },
      {
        text: "大陆通行",
        items: [
          {
            text: "域名备案",
            link: "/mainland-pass/domain-name-filing/summary",
          },
          {
            text: "SSL证书签发&使用",
            link: "/mainland-pass/ssl-license/summary",
          },
          {
            text: "二级域名解析&使用",
            link: "/mainland-pass/level2-domain-resolve/summary",
          },
          {
            text: "Nginx项目前后端配置案例",
            link: "/mainland-pass/website-nginx-configuration/summary",
          },
        ],
      },
      {
        text: "模块使用",
        items: [
          {
            text: "防止提交lj/lint-staged",
            link: "/plugin-using/lint-staged/summary",
          },
          {
            text: "代码格式化/Prettier",
            link: "/plugin-using/prettier/summary",
          },
          {
            text: "stdin&out着色/kolorist",
            link: "/plugin-using/kolorist/summary",
          },
          {
            text: "前端Shell利器/zx",
            link: "/plugin-using/zx/summary",
          },
          {
            text: "解析参数选项/minimist",
            link: "/plugin-using/minimist/summary",
          },
          {
            text: "交互式提示/prompts",
            link: "/plugin-using/prompts/summary",
          },
          {
            text: "更快的前端构建工具/esbuild",
            link: "/plugin-using/esbuild/summary",
          },
          {
            text: "esbuild许可证插件",
            link: "/plugin-using/esbuild-plugin-license/summary",
          },
          {
            text: "控制台渐变/gradient-string",
            link: "/plugin-using/gradient-string/summary",
          },
          {
            text: "Vite gzip压缩插件",
            link: "/plugin-using/vite-plugin-compression2/summary",
          },
          {
            text: "Pinia持久化存储插件",
            link: "https://seb-l.github.io/pinia-plugin-persist/",
          },
          {
            text: "fs-extra NodeJS扩展方法",
            link: "/plugin-using/fs-extra/summary",
          },
          {
            text: "promise-retry重试函数",
            link: "/plugin-using/promise-retry/summary",
          },
          {
            text: "Moment.js",
            link: "https://moment.nodejs.cn/",
          },
          {
            text: "CryptoJS实现标准安全加密",
            link: "https://cryptojs.gitbook.io/docs/",
          },
          {
            text: "npm-run-all2多脚本运行",
            link: "https://github.com/bcomnes/npm-run-all2/tree/master",
          },
        ],
      },
    ],

    // 外部链接显示外部链接图标
    externalLinkIcon: true,

    socialLinks: [
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="15.5" viewBox="0 0 496 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>',
        },
        link: "https://github.com/coder-zhangsir/VitePress-Blog",
        ariaLabel: "Jump to the github repository",
      },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M488.6 104.1C505.3 122.2 513 143.8 511.9 169.8V372.2C511.5 398.6 502.7 420.3 485.4 437.3C468.2 454.3 446.3 463.2 419.9 464H92C65.6 463.2 43.8 454.2 26.7 436.8C9.7 419.4 .8 396.5 0 368.2V169.8C.8 143.8 9.7 122.2 26.7 104.1C43.8 87.8 65.6 78.8 92 78H121.4L96.1 52.2C90.3 46.5 87.4 39.2 87.4 30.4C87.4 21.6 90.3 14.3 96.1 8.6C101.8 2.9 109.1 0 117.9 0C126.7 0 134 2.9 139.8 8.6L213.1 78H301.1L375.6 8.6C381.7 2.9 389.2 0 398 0C406.8 0 414.1 2.9 419.9 8.6C425.6 14.3 428.5 21.6 428.5 30.4C428.5 39.2 425.6 46.5 419.9 52.2L394.6 78L423.9 78C450.3 78.8 471.9 87.8 488.6 104.1H488.6zM449.8 173.8C449.4 164.2 446.1 156.4 439.1 150.3C433.9 144.2 425.1 140.9 416.4 140.5H96.1C86.5 140.9 78.6 144.2 72.5 150.3C66.3 156.4 63.1 164.2 62.7 173.8V368.2C62.7 377.4 66 385.2 72.5 391.7C79 398.2 86.9 401.5 96.1 401.5H416.4C425.6 401.5 433.4 398.2 439.7 391.7C446 385.2 449.4 377.4 449.8 368.2L449.8 173.8zM185.5 216.5C191.8 222.8 195.2 230.6 195.6 239.7V273C195.2 282.2 191.9 289.9 185.8 296.2C179.6 302.5 171.8 305.7 162.2 305.7C152.6 305.7 144.7 302.5 138.6 296.2C132.5 289.9 129.2 282.2 128.8 273V239.7C129.2 230.6 132.6 222.8 138.9 216.5C145.2 210.2 152.1 206.9 162.2 206.5C171.4 206.9 179.2 210.2 185.5 216.5H185.5zM377 216.5C383.3 222.8 386.7 230.6 387.1 239.7V273C386.7 282.2 383.4 289.9 377.3 296.2C371.2 302.5 363.3 305.7 353.7 305.7C344.1 305.7 336.3 302.5 330.1 296.2C323.1 289.9 320.7 282.2 320.4 273V239.7C320.7 230.6 324.1 222.8 330.4 216.5C336.7 210.2 344.5 206.9 353.7 206.5C362.9 206.9 370.7 210.2 377 216.5H377z"/></svg>',
        },
        link: "https://space.bilibili.com/483711690?spm_id_from=333.1007.0.0",
        ariaLabel: "Jump to bilibili Developer Personal Center",
      },
    ],

    siteTitle: "ZDoc",

    logo: "/favicon.ico",

    footer: {
      message:
        "全栈工程师-张工<57878778@qq.com> 的经验积累，记录最新学到的有趣的知识 | 2024",
      // message: "Released under the MIT License.",
      // copyright: "Copyright © 2018-present ZhangSir <57878778@qq.com>",
    },

    editLink: {
      pattern:
        "https://github.com/coder-zhangsir/VitePress-Blog/tree/main/docs/:path",
      text: "Edit this page on GitHub",
    },

    search: {
      provider: "local",
    },

    aside: false,

    outline: {
      level: [2, 4],
    },
  },

  lastUpdated: true,

  // SEO sitemap.xml相关配置
  sitemap: {
    hostname: "https://reports.org.cn",
  },
});
