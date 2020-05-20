import Vue from "vue";
import {
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Tooltip,
  Scrollbar,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Image,
  Message,
  Form,
  FormItem,
  Input,
  Button,
  Alert,
  Row,
  Col,
  Card,
  Badge,
  Dialog,
  Table,
  TableColumn,
  Tag
} from "element-ui";

Vue.use(Menu)
  .use(Tag)
  .use(Badge)
  .use(Dialog)
  .use(Table)
  .use(TableColumn)
  .use(Card)
  .use(Row)
  .use(Col)
  .use(Alert)
  .use(Submenu)
  .use(Form)
  .use(FormItem)
  .use(Input)
  .use(Button)
  .use(Image)
  .use(MenuItemGroup)
  .use(Tooltip)
  .use(Scrollbar)
  .use(Dropdown)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(MenuItem);

Vue.prototype.$message = Message;
