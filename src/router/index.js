import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import first from '@/components/first'
import Jmp from '@/components/Jmp'
import addFace from '@/components/addFace'
import login from '@/components/login'
import faceLogin from '@/components/faceLogin'
import menu from '@/components/menu'
import standby from '@/components/standby'
import about from '@/components/about'
import camera from '@/components/camera'
import myReagent from '@/components/myReagent'
import reagentDetail from '@/components/reagentDetail'
import reagentPut from '@/components/reagentPut'
import reagentReturn from '@/components/reagentReturn'
import reagentSearch from '@/components/reagentSearch'
import reagentTemplate from '@/components/reagentTemplate'
import reagentUse from '@/components/reagentUse'
import registerCabinet from '@/components/registerCabinet'
import reportTemplate from '@/components/reportTemplate'
import stockDBManagement from '@/components/stockDBManagement'
import stockDetailNew from '@/components/stockDetailNew'
import stockEnvironment from '@/components/stockEnvironment'
import stockManagement from '@/components/stockManagement'
import stockOutline from '@/components/stockOutline'
import stockRecordNew from '@/components/stockRecordNew'
import sysMaintenance from '@/components/sysMaintenance'
import template from '@/components/template'
import userBind from '@/components/userBind'
import userInfoDetail from '@/components/userInfoDetail'
import remoteManage from '@/components/remoteManage'
import userManagement from '@/components/userManagement'
import warningConfig from '@/components/warningConfig'
import warningManagement from '@/components/warningManagement'
import userinfo from '@/components/userinfo'
import userPwdUpdate from '@/components/userPwdUpdate'
import addUser from '@/components/addUser'

import searchDevices from '@/components/searchDevices'
import experimentList from '@/components/experimentList'

import stockOutlineChart from '@/components/ReportChart/stockOutlineChart'
import keybox from '@/components/keybox'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/first',
      name: 'first',
      component: first
    },
    {
      path: '/',
      name: 'Jmp',
      component: Jmp
    },
    {
      path: '/standby',
      name: 'standby',
      component: standby
    },
    {
      path: '/addFace',
      name: 'addFace',
      component: addFace
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/faceLogin',
      name: 'faceLogin',
      component: faceLogin
    },
    {
      path: '/menu',
      name: 'menu',
      component: menu
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/userinfo',
      name: 'userinfo',
      component: userinfo
    },
    {
      path: '/camera',
      name: 'camera',
      component: camera
    },
    {
      path: '/myReagent',
      name: 'myReagent',
      component: myReagent
    },
    {
      path: '/reagentDetail',
      name: 'reagentDetail',
      component: reagentDetail
    },
    {
      path: '/reagentPut',
      name: 'reagentPut',
      component: reagentPut
    },
    {
      path: '/reagentReturn',
      name: 'reagentReturn',
      component: reagentReturn
    },
    {
      path: '/reagentSearch',
      name: 'reagentSearch',
      component: reagentSearch
    },
    {
      path: '/reagentTemplate',
      name: 'reagentTemplate',
      component: reagentTemplate
    },
    {
      path: '/reagentUse',
      name: 'reagentUse',
      component: reagentUse
    },
    {
      path: '/registerCabinet',
      name: 'registerCabinet',
      component: registerCabinet
    },
    {
      path: '/reportTemplate',
      name: 'reportTemplate',
      component: reportTemplate
    },
    {
      path: '/stockDBManagement',
      name: 'stockDBManagement',
      component: stockDBManagement
    },
    {
      path: '/stockDetailNew',
      name: 'stockDetailNew',
      component: stockDetailNew
    },
    {
      path: '/stockEnvironment',
      name: 'stockEnvironment',
      component: stockEnvironment
    },
    {
      path: '/stockManagement',
      name: 'stockManagement',
      component: stockManagement
    },
    {
      path: '/stockOutline',
      name: 'stockOutline',
      component: stockOutline
    },
    {
      path: '/stockRecordNew',
      name: 'stockRecordNew',
      component: stockRecordNew
    },
    {
      path: '/sysMaintenance',
      name: 'sysMaintenance',
      component: sysMaintenance
    },
    {
      path: '/template',
      name: 'template',
      component: template
    },
    {
      path: '/userBind',
      name: 'userBind',
      component: userBind
    },
    {
      path: '/userInfoDetail',
      name: 'userInfoDetail',
      component: userInfoDetail
    },
    {
      path: '/userManagement',
      name: 'userManagement',
      component: userManagement
    },
    {
      path: '/remoteManage',
      name: 'remoteManage',
      component: remoteManage
    },
    {
      path: '/warningConfig',
      name: 'warningConfig',
      component: warningConfig
    },
    {
      path: '/warningManagement',
      name: 'warningManagement',
      component: warningManagement
    },
    {
      path: '/stockOutlineChart',
      name: 'stockOutlineChart',
      component: stockOutlineChart
    },
    {
      path: '/userPwdUpdate',
      name: 'userPwdUpdate',
      component: userPwdUpdate
    },
    {
      path: '/addUser',
      name: 'addUser',
      component: addUser
    },
    {
      path: '/searchDevices',
      name: 'searchDevices',
      component: searchDevices
    },
    {
      path: '/experimentList',
      name: 'experimentList',
      component: experimentList
    },
    {
      path: '/keybox',
      name: 'keybox',
      component: keybox
    },
  ]
})
