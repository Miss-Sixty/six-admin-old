<template>
  <div class="error-404">
    <img src="@/assets/imgs/401.svg" alt="401" width="500px" />
    <p>很抱歉，您没有权限访问该页面！</p>
    <a href="" class="error-404__button">回首页</a>
  </div>
</template>
<style lang="scss" scoped>
.error-404 {
  margin: 100px auto;
  text-align: center;
  p {
    font-size: 26px;
    color: #666;
  }
  &__button {
    display: inline-block;
    width: 110px;
    height: 36px;
    background-color: #1482f0;
    border-radius: 100px;
    text-align: center;
    color: #ffffff;

    font-size: 14px;
    line-height: 36px;
    cursor: pointer;
    animation-name: slideUp;
    animation-duration: 0.5s;
    animation-delay: 0.3s;
    animation-fill-mode: forwards;
  }
}
</style>
