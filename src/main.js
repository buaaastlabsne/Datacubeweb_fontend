// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import '@/utils/iconfont.js'

import {
  Container,
  Header,
  Aside,
  Main,
  Icon,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Card,
  Button,
  Table,
  TableColumn,
  Loading,
  MessageBox,
  Message,
  Select,
  Option,
  Transfer,
  CheckboxGroup,
  Checkbox,
  CheckboxButton,
  Tree
} from 'element-ui'

Vue.config.productionTip = false
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Icon)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Card)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Loading.directive);
Vue.use(MessageBox)
Vue.use(Message)
Vue.use(Select)
Vue.use(Option)
Vue.use(Transfer)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Tree)

Vue.prototype.$loading = Loading.service;
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})