<template>
  <div class="error">
    <p>{{ $route.query.message }}</p>
    <Button @click="$router.back()" color="red"> Go back to cabinet </Button>
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/scss/config/mixins";
.error {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    margin-bottom: 40px;
  }

  p {
    @include body-2;
    margin-bottom: 16px;
  }

  .ant-btn {
    padding: 14px 60px;
  }
}
</style>
