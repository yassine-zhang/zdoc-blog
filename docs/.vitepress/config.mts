import { defineConfig } from "vitepress";
import fs from "fs";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh",
  title: "技术博客",
  titleTemplate: "Zhang",
  description:
    "一个静态技术笔记网站，专注于您需要的技术 - A static technology note site that focuses on the technology you need",
  cleanUrls: true,
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      // { text: 'Home', link: '/' },
      {
        text: "安全指南",
        items: [{ text: "JavaScript", link: "/js/trusted-event" }],
      },
      {
        text: "后端",
        items: [{ text: "docker", link: "/docker/inspect" }],
      },
      {
        text: "项目规范",
        items: [
          { text: "fs-extra", link: "/specification/fs-extra/summary" },
          { text: "create-vue", link: "/specification/create-vue/summary" },
          { text: "[language]", link: "/specification/language/alternate-if-syntax/summary" },
        ],
      },
      {
        text: "通用工具",
        items: [
          { text: "Git速查表", link: "/common-tools/cheat-sheet/git" }
        ]
      },
      {
        text: "Repo 使用",
        link: "/plugin-using/lint-staged/summary",
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
              { text: "Trusted Event", link: "/js/trusted-event" },
              { text: "XSS 非法注入", link: "/js/xss" },
            ],
          }
        ]
      },
      {
        text: "后端",
        items: [
          {
            text: "docker",
            items: [
              { text: "运行环境信息", link: "/docker/inspect" },
              {
                text: "入门到实践",
                items: [
                  { text: "1.构建Docker镜像", link: "/docker/buildx-image" },
                  { text: "2.推送镜像到Hub", link: "/docker/push-hub" },
                  { text: "3.多容器组合使用", link: "/docker/compose" },
                ],
              },
              { text: "错误汇总", link: "/docker/error-summary" },
              { text: "Docker中文文档", link: "/docker/ref-links" },
            ],
          }
        ]
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
              { text: "替换if语法", link: "/specification/language/alternate-if-syntax/summary" }
            ]
          },
        ],
      },
      {
        text: "通用工具",
        items: [
          {
            text: "速查表",
            items: [
              {
                text: "Git",
                link: "/common-tools/cheat-sheet/git"
              }
            ]
          }
        ]
      },
      {
        text: "Repo 使用",
        items: [
          {
            text: "防止提交屎/lint-staged",
            link: "/plugin-using/lint-staged/summary",
          },
          {
            text: "代码格式化/Prettier",
            link: "/plugin-using/prettier/summary",
          },
          {
            text: "stdin&out着色/kolorist",
            link: "/plugin-using/kolorist/summary"
          },
          {
            text: "前端Shell利器/zx",
            link: "/plugin-using/zx/summary"
          },
          {
            text: "解析参数选项/minimist",
            link: "/plugin-using/minimist/summary"
          },
          {
            text: "交互式提示/prompts",
            link: "/plugin-using/prompts/summary"
          },
          {
            text: "更快的前端构建工具/esbuild",
            link: "/plugin-using/esbuild/summary"
          },
          {
            text: "esbuild插件-许可证/license",
            link: "/plugin-using/esbuild-plugin-license/summary"
          },
          {
            text: "控制台渐变/gradient-string",
            link: "/plugin-using/gradient-string/summary"
          },
        ],
      },
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/coder-zhangsir/VitePress-Blog",
      },
    ],

    siteTitle: "Technical notes",

    logo: "/favicon.ico",

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2018-present ZhangSir <57878778@qq.com>",
    },

    editLink: {
      pattern:
        "https://github.com/coder-zhangsir/VitePress-Blog/tree/main/docs/:path",
      text: "Edit this page on GitHub",
    },

    lastUpdated: {
      text: "上次更新",
    },

    search: {
      provider: "local",
    },

    aside: false,
  },

  markdown: {
    theme: {
      dark: "github-dark",
      light: "github-light",
    },
  },

  // ...其他配置
  async buildEnd(siteConfig) {
    // 配置网站基础路径
    const baseURL = "https://reports.org.cn";
    let siteMapStr = "";
    for (const page of siteConfig.pages) {
      siteMapStr += `${baseURL}/${page.replace(/md$/, "html")}\n`;
    }
    // 生成文件
    try {
      fs.writeFileSync(`${siteConfig.outDir}/sitemap.txt`, siteMapStr);
    } catch (err) {
      console.log("create sitemap.txt failed!", err);
    }
  },
});
