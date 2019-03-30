<template lang="pug">
    <div>
      nav.navbar.navbar-dark.fixed-top.bg-ok.flex-md-nowrap.p-0.shadow
        router-link.navbar-brand.text-center.py-2.d-none.d-md-block.ml-auto.mr-auto(to="/admin")
          .fas.fa-cube.mr-3
            span.ml-2.d-none.d-md-inline Dashboard
        ul.navbar-nav.ml-auto.mr-auto.d-md-none.d-block.py-2
          li.nav-item.text-nowrap.d-flex
            .d-flex.d-md-none
              router-link.nav-link.mr-2(to="/admin/products" active-class="active") 產品列表
              router-link.nav-link.mr-2(to="/admin/order" active-class="active") 訂單列表
              router-link.nav-link.mr-2(to="/admin/coupon" active-class="active") 優惠卷
              router-link.nav-link.mr-2(to="/home") 回首頁
              a.nav-link(href='#' @click.prevent="logout") 登出
    </div>
</template>

<script>
export default {
  methods: {
    logout() {
      const vm = this;
      const api = `${process.env.VUE_APP_PATH}/logout`;
      this.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.$router.push('/login');
        }
      });
    },
  },
};
</script>
