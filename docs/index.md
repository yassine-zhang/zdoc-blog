---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "ZDoc"
  text: "赋予程序以生命"
  tagline: ZDoc译为Zhang Documents，保持良好的心态书写独属于我的笔记💪
  image:
    src: strive.svg
    alt: logo
  actions:
    - theme: brand
      text: + Follow Me(Bilibili)
      link: https://space.bilibili.com/483711690?spm_id_from=333.1007.0.0
    - theme: alt
      text: About Me
      link: /about

features:
  - title: 安全指南
    icon:
      src: ./safe.svg
    details: 记录日常开发工作中遇到的一些安全问题并解决。
    link: /safety-guidelines/js/trusted-event
  - title: 项目规范
    icon:
      src: normalize.svg
    link: /specification/fs-extra/summary
    details: 学习不同框架开发者前辈们的编程项目规范，并提取核心点
  - title: 速查表
    icon:
      src: zoom-table.svg
    link: /common-tools/cheat-sheet/git
    details: Git、Docker、Centos等命令语句速查表
  - title: 大陆通行
    icon:
      src: mainland.svg
    link: /mainland-pass/domain-name-filing/summary
    details: 想在中国内陆互联网畅通无阻就必须明白这几件事...
  - title: 插件使用
    icon:
      src: plugin-use.svg
    link: /plugin-using/lint-staged/summary
    details: Github各种有用插件的使用简记
---
