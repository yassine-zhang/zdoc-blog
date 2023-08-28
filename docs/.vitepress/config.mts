import { defineConfig } from 'vitepress'
import fs from 'fs';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh',
  title: '技术博客',
  titleTemplate: 'Zhang',
  description: "一个静态技术笔记网站，专注于您需要的技术 - A static technology note site that focuses on the technology you need",
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }]
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { 
        text: '安全指南',
        items: [
          { text: 'JavaScript', link: '/js/trusted-event' },
        ]
      },
      {
        text: '关于',
        link: '/about'
      }
    ],

    sidebar: [
      {
        text: 'JavaScript',
        items: [
          { text: 'Trusted Event', link: '/js/trusted-event' },
          { text: 'XSS 非法注入', link: '/js/xss' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/coder-zhangsir/VitePress-Blog' }
    ],

    siteTitle: 'Technical notes',

    logo: '/logo.svg',

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present ZhangSir <57878778@qq.com>'
    },

    editLink: {
      pattern: 'https://github.com/coder-zhangsir/VitePress-Blog/tree/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    lastUpdated: {
      text: '上次更新'
    },

    search: {
      provider: 'local'
    },

    aside: true,
  },

  markdown: {
    theme: {
      dark: 'github-dark',
      light: 'github-light'
    },
  },
  
  // ...其他配置
  async buildEnd(siteConfig) {
    // 配置网站基础路径
    const baseURL = 'https://reports.org.cn';
    let siteMapStr = '';
    for (const page of siteConfig.pages) {
      siteMapStr += `${baseURL}/${page.replace(/md$/, 'html')}\n`;
    }
    // 生成文件
    try {
      fs.writeFileSync(`${siteConfig.outDir}/sitemap.txt`, siteMapStr);
    } catch (err) {
      console.log('create sitemap.txt failed!', err);
    }
  },
})
