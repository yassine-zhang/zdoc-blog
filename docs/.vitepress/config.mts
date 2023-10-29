import { defineConfig } from "vitepress";
import fs from "fs";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh",
  title: "ZDoc",
  description:
    "ZDoc译为Zhang Documents，保持良好的心态书写独属于我的笔记",
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
          { text: "Git速查表", link: "/common-tools/cheat-sheet/git" },
          { text: "Docker速查表", link: "/common-tools/cheat-sheet/docker" },
        ]
      },
      {
        text: "大陆通行",
        items: [
          { text: "域名备案", link: "/mainland-pass/domain-name-filing/summary", },
          { text: "SSL证书签发&使用", link: "/mainland-pass/ssl-license/summary" },
        ]
      },
      {
        text: "插件使用",
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
              },
              {
                text: "Docker",
                link: "/common-tools/cheat-sheet/docker"
              },
            ]
          }
        ]
      },
      {
        text: "大陆通行",
        items: [
          { text: "域名备案", link: "/mainland-pass/domain-name-filing/summary" },
          { text: "SSL证书签发&使用", link: "/mainland-pass/ssl-license/summary" },
        ]
      },
      {
        text: "插件使用",
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
            text: "esbuild许可证插件",
            link: "/plugin-using/esbuild-plugin-license/summary"
          },
          {
            text: "控制台渐变/gradient-string",
            link: "/plugin-using/gradient-string/summary"
          },
          {
            text: "Vite gzip压缩插件",
            link: "https://www.npmjs.com/package/vite-plugin-compression2"
          },
          {
            text: "Pinia持久化存储插件",
            link: "https://seb-l.github.io/pinia-plugin-persist/"
          },
        ],
      },
    ],

    // 外部链接显示外部链接图标
    externalLinkIcon: true,

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/coder-zhangsir/VitePress-Blog",
      },
      {
        icon: {
          svg: '<svg t="1698466376020" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13399" width="16" height="16"><path d="M770.62596279 348.50844699H260.67960601c-15.48751024 0-28.53001311 11.81116006-28.5300131 27.67720494v338.0799114c0 15.8645717 13.04102838 27.51076746 28.5300131 27.51076876h509.94635678c15.48898342 0 27.11603167-11.64472257 27.11603167-27.51076876V376.18565193c0-15.86751807-11.62999331-27.67720495-27.11603167-27.67720494z m-475.22723129 124.91491059l143.71349375-27.51665889 10.85966796 53.93748338-142.2685819 27.51371382-12.30457981-53.93453831z m221.54431014 164.34877943c-44.16481331 48.14605314-90.49772969-15.20324129-90.49772969-15.20324129l23.52952763-15.20324127s31.49348047 56.8331985 66.60881493-18.46276309c33.66600436 73.12343898 70.95238826 19.18742749 70.95238955 19.54681461l21.35995009 13.75980263c-0.00294637-0.00441825-39.82271317 63.70720837-91.95295251 15.56262841z m213.21949826-110.41276794l-142.62796903-27.51076874 11.22347335-53.93895658 143.35116155 27.51666021-11.94666587 53.93306511z" p-id="13400"></path><path d="M512-1.34138437c-283.51055612 0-513.34138437 229.83230144-513.34138437 513.33991119 0 283.51055612 229.83230144 513.34285756 513.34138437 513.34285755S1025.34138437 795.50908294 1025.34138437 512c0-283.51055612-229.83082825-513.34138437-513.34138437-513.34138437z m270.33696573 811.55145104c-35.88418663-1.13560393-47.97372421 0-47.97372422 0s-2.64384975 41.1748325-37.7709671 41.92895543c-35.50712518 0.37706145-40.79629787-28.70970538-41.93190179-39.66216713-21.52933395 0-280.28343791 1.13118436-280.28343791 1.13118438s-4.5321034 38.15097493-39.66216714 38.15097492c-35.50712518 0-37.39832521-31.73061788-39.66216712-38.15097492-23.04494441 0-54.01996618-0.75706929-54.01996619-0.75706929s-77.81461524-16.23574171-88.01295279-117.47236282c1.13265756-101.23514793 0-301.44307504 0-301.44307504s-7.17742634-93.29918041 85.74911087-120.12063213c28.70381393-1.13118436 90.65827572-1.5111922 162.42812091-1.5111922l-66.1065574-64.21683054s-10.19833755-12.84366048 7.17742634-27.19704128c17.75724491-14.35190762 18.50694956-8.50303353 24.55319153-4.34799158 6.04476879 4.15356877 98.59277136 95.37154589 98.59277137 95.37154589h-12.46512716c35.505652 0 72.14838109 0.57590254 107.27697165 0.57590254 13.59631152-13.59925659 91.03533719-89.42987931 96.32303669-93.20344155 6.04329559-3.77798049 7.17448127-10.1512047 24.55466472 4.20070161 17.3757639 14.3533795 7.17595316 27.22208023 7.17595315 27.22208025l-64.5953652 62.33888788c88.77002208 0.75706929 157.14042269 1.13707582 157.14042141 1.13707581s87.63294497 19.26991029 89.90120774 119.74504387c-1.13265756 100.48102501 0.37706145 302.57573259 0.37706146 302.57573257s-4.90474661 98.21276353-88.76560382 113.70469333z" p-id="13401"></path></svg>'
        },
        link: "https://space.bilibili.com/483711690?spm_id_from=333.1007.0.0",
      },
    ],

    siteTitle: "ZDoc",

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
