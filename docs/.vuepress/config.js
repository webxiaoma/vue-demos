module.exports = {
    title:'马新想个人网站',
    head: [
        ["link", { rel: "icon", href: `https://webxiaoma.com/img/manong.jpg` }],
    ], //被注入页面 HTML <head> 额外的标签
    base:'/vue-demos/docs/blogs/', // 部署站点的基础路径
    dest: "./blogs", //输出目录
    serviceWorker: true, //缓存那些已访问过的页面的内容
    themeConfig: {  // 导航
        logo:'https://webxiaoma.com/img/manong.jpg',
        searchMaxSuggestions: 15, // 搜索设置数量
        nav: [  // 导航栏 使用了element 导航
            { text: '首页', link: '/' },
            { text: 'Vue', items:[
                {text:"Vue基础",link:'/vue/index.html'},
                {text:"Vue进阶",link:'/vue/vue-reactive.html'},
            ]},
            { text: 'Vue组件与插件',  link:"/tools/"},
        ],
        sidebar: {  // 侧边栏
            "/vue/":[
               "",
               {
                title: 'Vue基础',
                collapsable: true, // 是否可折叠
                children: [
                  "vue-cli-3",
                  "vue-problem",
                  "vue-plugins"
                ] 
               },{
                title: 'Vue进阶',
                collapsable: true, // 是否可折叠
                children: [
                   "vue-reactive",
                ] 
               }
            ],
            "/vuex/":[
                "",
            ]
           
        },
        sidebarDepth:2,// 侧边栏最大层级 最大只能为2
       // displayAllHeaders:true,  // 侧边栏所有链接全展开
       lastUpdated: '最近更新时间', // 最后更新时间
       serviceWorker: {
            updatePopup: { //刷新内容的弹窗
                message: "这篇文章已经更新", 
                buttonText: "立即刷新" 
            }
        },
        
        // 假定是 GitHub. 同时也可以是一个 完整的 GitLab URL
        repo: 'webxiaoma/vue-demo',
        // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
        // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
        repoLabel: 'GitHub',
        // 以下为可选的编辑链接选项

        // 假如你的文档仓库和项目本身不在一个仓库：
        docsRepo: 'webxiaoma/vue-demo/docs/blogs',
        // 假如文档不是放在仓库的根目录下：
        docsDir: '/docs/blogs',
        // 假如文档放在一个特定的分支下：
        docsBranch: 'master',
        // 默认是 false, 设置为 true 来启用
        editLinks: true,
        // 默认为 "Edit this page"
        editLinkText: '文章有问题，欢迎提出！'
       
    },
};





