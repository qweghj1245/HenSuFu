<template lang="pug">
    <div>
        nav.col-md-2.d-none.d-md-block.bg-light.sidebar
            .sidebar-sticky
                ul.nav.flex-column.text-center.py-6
                    li.nav-item
                        router-link.nav-link(to="/admin/products" active-class="active")
                            .fas.fa-box-open
                                span.pl-1  產品列表
                    li.nav-item
                        router-link.nav-link(to="/admin/order" active-class="active")
                            .far.fa-file-alt.font-weight-bold
                                span.pl-3.font-weight-bold 訂單列表
                    li.nav-item
                        router-link.nav-link(to="/admin/coupon" active-class="active")
                            .far.fa-flag.font-weight-bold
                                span.pl-2.font-weight-bold 優惠列表
                    li.nav-item
                        router-link.nav-link(to="/home")
                            .fas.fa-user-shield
                                span.pl-4 回首頁
                    li.nav-item
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
