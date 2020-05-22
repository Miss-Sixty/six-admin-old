/**
 * 该方法只针对tinymce的动态添加，
 * 因为loadedTinymce()中的 tinymce 跟 @/component/Tinymce.vue 中挂载的名字相同。
 * 此代码修改于 https://github.com/PanJiaChen/vue-element-admin/blob/master/src/components/Tinymce/dynamicLoadScript.js
 */

function loadedTinymce() {
  return window.tinymce;
}

export default src => {
  return new Promise((resolve, reject) => {
    const existingScript = document.getElementById(src);

    if (existingScript && loadedTinymce()) {
      return resolve();
    }

    const script = document.createElement("script");
    script.src = src;
    script.id = src;
    document.body.appendChild(script);
    const onEnd = "onload" in script ? stdOnEnd : ieOnEnd;
    onEnd(script);

    function stdOnEnd(script) {
      script.onload = function() {
        // this.onload = null here is necessary
        // because even IE9 works not like others
        this.onerror = this.onload = null;
        resolve();
      };

      script.onerror = function() {
        this.onerror = this.onload = null;
        reject(new Error("加载失败：" + src));
      };
    }

    function ieOnEnd(script) {
      script.onreadystatechange = function() {
        if (this.readyState !== "complete" && this.readyState !== "loaded")
          return;
        this.onreadystatechange = null;
        resolve();
      };
    }
  });
};
