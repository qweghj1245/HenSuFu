<template lang="pug">
    div
        loading(:active.sync='isLoading')
            img(src="./../assets/images/Magnify-1s-200px.svg")
        HomeNavbar
        section.py-5(v-if="paydone == 'check'")
            .container
                .form-row.text-center.mt-5
                    .col-12.col-sm
                        .alert.alert-secondary.alert-rounded.d-none.d-md-block(role='alert') 1. 輸入訂單資料
                    .col-12.col-sm
                        .alert.alert-ok.alert-rounded(role='alert') 2. 訂單確認
                    .col-12.col-sm
                        .alert.text-muted.alert-rounded.d-none.d-md-block(role='alert') 3. 付款完成
        section.py-5(v-if="paydone == 'success'")
            .container
                .form-row.text-center.mt-5
                    .col-12.col-sm
                        .alert.alert-secondary.alert-rounded.d-none.d-md-block(role='alert') 1. 輸入訂單資料
                    .col-12.col-sm
                        .alert.alert-secondary.alert-rounded.d-none.d-md-block(role='alert') 2. 訂單確認
                    .col-12.col-sm
                        .alert.alert-ok.alert-rounded(role='alert') 3. 付款完成
        section
            .container
                h2.text-center.text-ok(v-if="paydone == 'check'") 購物列表
                h2.text-center.py-5.text-no(v-if="paydone == 'success'") 付款成功！
                .row.d-flex.justify-content-center
                    .col-md-9
                        .table-responsive
                            table.table.mt-4.table-hover
                                thead
                                    tr
                                        th.text-center.d-none.d-md-table-cell(width="220") 商品圖
                                        th.text-center 商品名稱
                                        th 特價
                                        th.text-center 數量
                                        th 小計
                                tbody
                                    tr(v-for="(item, index) in order.products" :key="index")
                                        td.d-md-table-cell.d-none
                                            .ml-14.d-none.d-md-block.mr-13
                                                img.img-fluid(:src="item.product.imageUrl")
                                        td.text-center {{item.product.title}}
                                        td.text-right.h6 {{ item.product.price | currency }}
                                        td.text-center {{item.qty}} / {{ item.product.unit }}
                                        td.text-right.h6 {{ item.total | currency }}
                        .table-responsive
                            table.table.mt-4.table-hover
                                tfoot
                                    tr
                                        td.text-right(colspan="5") 運費
                                        td.text-right(width="220") $ 60
                                    tr
                                        th.text-right(colspan="5") 總額
                                        th
                                          .h5.text-no.text-right {{ order.total + 60 | currency }}
                                          .text-right.text-muted (若有小數點系統會自動捨去)
                    .col-md-8.bg-light.p-6.mb-12.d-flex.flex-column(v-if="paydone == 'success'")
                        p.text-justify.text-ok.mt-6.h6 感謝您的支持與愛戴，您的一次次消費都會使我們更加進步，若是商品售後有非人為的原廠問題，敬請寄回退還，我們一定會給您最優質的服務，期待您的再次光臨。
                        .text-right
                          button.btn.btn-outline-ok(@click="toShop") 再去逛逛？ ^__<
        section.py-6(v-if="paydone == 'check'")
            .container
                h2.text-center.mb-6.text-ok 訂購人資料
                .row.d-flex.justify-content-center.flex-column.align-items-center
                    .col-md-6
                        .table-responsive
                            table.table
                                tbody
                                    tr
                                        td 收件人 Email
                                        td {{ order.user.email }}
                                    tr
                                        td 收件人姓名
                                        td {{ order.user.name }}
                                    tr
                                        td 收件人地址
                                        td {{ order.user.address }}
                                    tr
                                        td 收件人電話
                                        td {{ order.user.tel }}
                    .col-md-6.d-flex.justify-content-end
                        button.btn.btn-no(@click="payOrder") 確認付款
        Footer
</template>

<script>
export default {
  data() {
    return {
      orderId: '',
      order: { user: '' },
      paydone: '',
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOMER}/order/${vm.orderId}`;
      vm.$store.dispatch('updateLoading', true);
      this.$http.get(api).then((response) => {
        vm.order = response.data.order;
        vm.$store.dispatch('updateLoading', false);
      });
    },
    payOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOMER}/pay/${vm.orderId}`;
      vm.$store.dispatch('updateLoading', true);
      this.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.getOrder();
          vm.$store.dispatch('updateLoading', false);
          vm.paydone = 'success';
        }
      });
    },
    toShop() {
      this.$router.push('/shop');
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
    this.paydone = 'check';
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    cartList() {
      return this.$store.state.cartList;
    },
  },
};
</script>
