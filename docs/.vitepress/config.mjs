
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "codenote",
  description: "code note for vue",
  base:'/codenotesforme/',
  build: {
    outDir: 'docs/.vitepress/dist'
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'vue', link: '/vue/vue_ecological_tool' },
      { text: 'css', link: '/css/css_website' },
      { text: 'git', link: '/git/github_use' },
      { text: 'tools', link: '/tools/vscode_shrotcuts' },
      {
        text: 'extend', link: '/extend/vite_use_guide'
      },
      {
        text: 'applications', link: '/applications/modular_packge'
      }
    ],

    sidebar: [
      {
        text: 'vue',
        items: [
          { text: 'vue生态库使用指南', link: '/vue/vue_ecological_tool' },
          { text: '前端工程化', link: '/vue/engineering' },
          { text: '通用型前端手册', link: '/vue/general_purpose_manual' },
          { text: '前端场景题', link: '/vue/scenario_questions' },
          { text: 'vue3需求库', link: '/vue/vue3_requirement_repo' },
          { text: '前端接口模拟工具', link: '/vue/interface_simulation_tool' },
        ]
      },
      {
        text: 'css',
        items: [
          { text: 'css网站推荐', link: '/css/css_website' }
        ]
      },
      {
        text: 'git',
        items: [
          { text: 'git使用指南', link: '/git/github_use' }
        ]
      },
      {
        text: 'tools',
        items: [
          { text: 'vscode快捷键', link: '/tools/vscode_shrotcuts' }
        ]
      },
      {
        text: 'extend',
        items: [
          { text: 'axios使用指南', link: '/extend/axios_use' },
          { text: 'electron使用指南', link: '/extend/electron_use' },
          { text: 'vite使用指南', link: '/extend/vite_use_guide' },
          { text: 'mongodb使用指南', link: '/extend/MongoDB_use' },
          { text: 'express使用指南', link: '/extend/express_use' },
        ]
      },
      {
        text: 'applications',
        items: [
          { text: '通用组件封装', link: '/applications/modular_packge' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    search: {
      provider: "local",
    },
  }
})
