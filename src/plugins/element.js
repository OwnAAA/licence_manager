import Vue from 'vue';
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Breadcrumb,
  Breadcrumbtem,
  Card,
  Row,
  Col,
  Table,
  TableColum,
  Tooltip,
  Pagination,
  MessageBox,
  Dialog,
} from './element-ui';
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Message);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(Breadcrumb);
Vue.use(Breadcrumbtem);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Table);
Vue.use(TableColum);
Vue.use(Tooltip);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.prototype.$message = Message;
Vue.prototype.$comfirm = MessageBox.$comfirm;
Vue.prototype.$alert = MessageBox.$alert;
