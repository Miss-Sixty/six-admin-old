import Vue from "vue";
import {
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Tooltip,
  Scrollbar
} from "element-ui";

Vue.use(Menu)
  .use(Submenu)
  .use(MenuItemGroup)
  .use(Tooltip)
  .use(Scrollbar)
  .use(MenuItem);
