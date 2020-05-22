export default src => {
  return new Promise((resolve, reject) => {
    const existingScript = document.getElementById(src);

    if (existingScript) {
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
