import { resolve } from "path";
import { isExternal } from "@/utils/validate";
export default {
  name: "SidebarItem",
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  render() {
    const { item, basePath } = this;
    if (item.hidden) return;
    let onlyOneChild = null;

    let iconStyle = {
      verticalAlign: "middle",
      width: "24px",
      marginRight: "8px"
    };

    let textStyle = {
      verticalAlign: "middle"
    };

    //导航图标+文字
    function itemText(data) {
      if (!data.meta) return;

      const { icon, title } = data.meta;
      let itemText = [];

      if (icon) {
        itemText.push(
          <svg-icon icon-class={data.meta.icon} style={iconStyle} />
        );
      }
      if (title) {
        itemText.push(
          <span slot="title" style={textStyle}>
            {data.meta.title}
          </span>
        );
      }

      return itemText;
    }

    //一级导航
    function menuItem(data) {
      return (
        <el-menu-item index={resolvePath(data.path)}>
          {data.meta && itemText(data)}
        </el-menu-item>
      );
    }

    //多级导航
    function submenu(data) {
      return (
        <el-submenu index={data.path}>
          <template slot="title">{data.meta && itemText(data)}</template>
          {data.children.map(child => {
            return (
              <sidebar-item
                key={resolvePath(child.path)}
                item={child}
                basePath={resolvePath(child.path)}
              />
            );
          })}
        </el-submenu>
      );
    }

    function hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          // 临时集（如果只有一个显示子级，将使用该集）
          onlyOneChild = item;
          return true;
        }
      });

      // 当只有一个子路由器时，默认情况下会显示该子路由器
      if (showingChildren.length === 1) {
        return true;
      }

      // 如果没有子路由器要显示，显示父
      if (showingChildren.length === 0) {
        onlyOneChild = {
          ...parent,
          path: "",
          noShowingChildren: true
        };
        return true;
      }
      return false;
    }

    function resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(basePath)) {
        return basePath;
      }
      return resolve(basePath, routePath);
    }

    return !item.hidden && hasOneShowingChild(item.children, item)
      ? menuItem(onlyOneChild)
      : submenu(item);
  }
};
