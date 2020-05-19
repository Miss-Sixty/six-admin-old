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
  Alert
} from "element-ui";

Vue.use(Menu)
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
