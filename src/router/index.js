import cn from "../i18n/lang/cn"
import Vue from "vue"
import Router from "vue-router"
// import CommerViews from "@/views/commerViews"
import Login from "@/views/login/index"
import Layout from "@/views/layout/layout"
import HomeMain from "@/views/index/mainIndex"

// 不是必须加载的组件使用懒加载
// const Icon = () => import("@/views/icon/index")
// const Transfer = () => import("@/views/transfer/transfer")
// const Upload = () => import("@/views/upload/upload")
const NotFound = () => import("@/views/page404")
// const AddArticle = () => import("@/views/article/addArticle")
// const AddArticleEditor = () => import("@/views/article/addArticleEditor")
const NavClassify = () => import("@/views/syssetting/navClassify")
const caseManage = () => import("@/kb/caseKnowledge/caseManageNewPage")
const caseSearch = () => import("@/kb/caseKnowledge/caseSearch")
const caseUpload = () => import("@/kb/caseKnowledge/caseUploadNewPage")
const designManage = () => import("@/kb/designKnowledge/designManageNewPage")
const designSearch = () => import("@/kb/designKnowledge/designSearch")
const designUpload = () => import("@/kb/designKnowledge/designUploadNewPage")
const signalDataInput = () => import("@/kb/designKnowledge/dataAnalysis/SignalDataInput")
const userManage = () => import("@/kb/BaseTable")
const signalAnalysisResult = () => import("@/kb/designKnowledge/dataAnalysis/SignalAnalysisResult")
const dataAnalysisSelect = () => import("@/kb/designKnowledge/selectDataType")

/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}
Vue.use(Router)
let routeName = cn.routeName
let defaultRouter = [
  { path: "/",
    redirect: "/index",
    hidden: true,
    children: []
  },
  {
    path: "/login",
    component: Login,
    name: "",
    // hidden: true,
    children: []
  },
  {
    path: "/index",
    iconCls: "el-icon-s-home", // 图标样式class
    name: routeName.home,
    component: Layout,
    alone: true,
    children: [
      {
        path: "/index",
        iconCls: "el-icon-s-home", // 图标样式class
        name: "主页",
        component: HomeMain,
        children: []
      }
    ]
  },
  {
    path: "/404",
    component: NotFound,
    name: "404",
    hidden: true,
    children: []
  }
]

// 侧边栏显示配置以及路由
let addRouter = [
  {
    path: "/",
    iconCls: "el-icon-tickets", // 图标样式class
    name: routeName.caseKnowledge, // 案例库
    component: Layout,
    children: [
      {
        path: "/caseKnowledge/search",
        name: routeName.caseSearch,
        iconCls: "el-icon-search",
        component: caseSearch,
        children: []
      },
      {
        path: "/caseKnowledge/upload",
        name: routeName.caseUpload,
        iconCls: "el-icon-upload",
        component: caseUpload,
        children: []
      },
      {
        path: "/caseKnowledge/manage",
        name: routeName.caseManage,
        iconCls: "el-icon-set-up",
        component: caseManage,
        children: []
      }
    ]
  },
  {
    path: "/",
    iconCls: "el-icon-reading",
    name: routeName.designKnowledge,
    component: Layout,
    children: [
      {
        // 设计知识检索
        path: "/designKnowledge/search",
        iconCls: "el-icon-search",
        name: routeName.designSearch,
        component: designSearch,
        children: []
      },
      {
        // 设计知识上传
        path: "/designKnowlege/upload",
        iconCls: "el-icon-upload",
        name: routeName.designUpload,
        component: designUpload,
        children: []
      },
      {
        // 设计知识管理
        path: "/designKnowledge/management",
        iconCls: "el-icon-set-up",
        name: routeName.designManage,
        component: designManage,
        children: []
      },
      {
        // 设计知识辅助审核选择页面
        path: "/designKowledge/dataAnalysisSelect",
        iconCls: "el-icon-user-solid",
        name: routeName.designDataAnalysis,
        component: dataAnalysisSelect,
        children: []
      },
      {
        // 信号机审核数据填写
        path: "/designKowledge/SignalDataInput",
        iconCls: "el-icon-user-solid",
        name: routeName.signalDataInput,
        hidden: true,
        component: signalDataInput,
        children: []
      },
      {
        // 信号机审核结果分析报告
        path: "/designKnowledge/SignalAnalysisResult",
        iconCls: "el-icon-user-solid",
        name: routeName.SignalAnalysisResult,
        component: signalAnalysisResult,
        hidden: true,
        children: []
      }
    ]
  },
  {
    path: "/",
    iconCls: "el-icon-s-custom", // 图标样式class
    name: routeName.permissions, // 权限管理
    component: Layout,
    children: [
      {
        path: "/userManage",
        iconCls: "el-icon-user-solid",
        name: routeName.userManage,
        component: userManage,
        children: []
      }
    ]
  },
  {
    path: "/",
    iconCls: "el-icon-setting", // 图标样式class
    name: routeName.systemSettings, // 系统设置
    component: Layout,
    meta: {role: ["superAdmin"]},
    children: [
      {
        path: "/navClassifies",
        iconCls: "el-icon-menu", // 图标样式class
        name: routeName.navMenu,
        component: NavClassify,
        children: []
      }
    ]
  }
]
export default new Router({
  routes: defaultRouter
})
export {defaultRouter, addRouter}
