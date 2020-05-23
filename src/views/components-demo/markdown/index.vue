<template>
  <div class="app-container">
    <aside>
      Markdown基于
      <a href="https://github.com/nhn/tui.editor" target="_blank">
        tui.editor
      </a>
    </aside>

    <div class="editor-container">
      <el-tag class="tag-title">
        markdown 编辑器：
      </el-tag>
      <markdown-editor v-model="content" />
    </div>

    <div class="editor-container">
      <el-tag class="tag-title">
        markdown 查看器：
      </el-tag>
      <markdown-viewer :data="content" class="viewer" />
    </div>
  </div>
</template>

<script>
import { MarkdownEditor, MarkdownViewer } from "@/components/Markdown";
export default {
  components: { MarkdownEditor, MarkdownViewer },
  data() {
    return {
      content: `# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
*斜体*
<u>下划线</u>
~~删除线~~
* * * *
>引用文本展示
* [x] 第一只青蛙
* [ ] 第二只青蛙
* [ ] 第三只青蛙
[插入链接](https://github.com/Miss-Sixty/six-admin)`
    };
  }
};
</script>
<style lang="scss" scoped>
.editor-container {
  margin-bottom: 30px;

  .viewer {
    padding: 0 15px;
    border: 1px solid #ccc;
  }
}
.tag-title {
  margin-bottom: 5px;
}
</style>
