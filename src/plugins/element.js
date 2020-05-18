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
  Message
} from "element-ui";

Vue.use(Menu)
  .use(Submenu)
  .use(Image)
  .use(MenuItemGroup)
  .use(Tooltip)
  .use(Scrollbar)
  .use(Dropdown)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(MenuItem);

Vue.prototype.$message = Message;
