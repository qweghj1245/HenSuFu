<template lang="pug">
    div
        loading(:active.sync='isLoading')
            img(src="./../assets/images/Magnify-1s-200px.svg")
        HomeNavbar
        Alert
        section.mt-6(v-if="length > 0")
            .container
                h2.text-center.text-ok 購物車清單
                .table-responsive
                    table.table.mt-4.table-hover
                        thead
                            tr
                                th.text-center.d-none.d-md-table-cell(width="200") 商品圖
                                th.text-center 商品名稱
                                th.d-none.d-lg-table-cell 單價
                                th 特價
                                th.text-center 數量
                                th 小計
                        tbody
                            tr(v-for="(item, index) in cartList" :key="index")
                                td.d-md-table-cell.align-items-md-center.d-none
                                    .far.fa-trash-alt.d-none.d-md-block(@click="deleteCart(item.id)" style="cursor:pointer;")
                                    .ml-14.d-none.d-md-block
                                        img.img-fluid(:src="item.product.imageUrl")
                                td.text-center {{item.product.title}}
                                td.text-right.d-none.d-lg-table-cell
                                    del.text-muted {{ item.product.origin_price | currency }}
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
                                  .h4.text-no.text-right {{ totalPrice + 60 | currency }}
                                  .text-right.text-muted (若有小數點系統會自動捨去)
                .row.d-flex.justify-content-end
                    .col-md-3
                        .input-group.mb-3
                            input.form-control.border-no(type='text', placeholder="輸入優惠碼" v-model="coupon_code")
                            .input-group-append
                                span#basic-addon2.input-group-text.bg-no.text-white.border-0(@click="useCoupon" style="cursor:pointer;") 套用優惠
                hr
                .form-inline.d-flex.justify-content-end.py-6
                    button.btn.btn-secondary.mr-2.border-0(type='button' @click="goback") 返回上一頁
                    button.btn.btn-ok.border-0(type='button' @click="goOrder") 前往結帳
        section.py-10.d-flex.align-items.center.justify-content-center(v-else)
          .container
            h1.text-center.py-6.bg-ok.text-white(@click="goback" style="cursor:pointer;box-shadow: 0px 0px 7px -1px rgba(0,0,0,0.75);") 購物車沒商品哦，點擊此處回上頁
              img.img-fluid.px-4(src="./../assets/images/cart.svg" width="90")
</template>

<script>
export default {
  data() {
    return {
      coupon_code: '',
    };
  },
  methods: {
    getCart() {
      this.$store.dispatch('getCart');
    },
    deleteCart(id) {
      this.$store.dispatch('deleteCart', id);
    },
    goproducts() {
      this.$router.push('/productlist');
    },
    gopay() {
      this.$router.push('/customer_checkout');
    },
    useCoupon() {
      const vm = this;
      const api = `${process.env.VUE_APP_PATH}/api/${
        process.env.VUE_APP_CUSTOMER
      }/coupon`;
      const coupon = {
        code: vm.coupon_code,
      };
      this.$http.post(api, { data: coupon }).then((res) => {
        if (res.data.success === false) {
          this.$bus.$emit('message:push', res.data.message, 'no');
        } else {
          this.$bus.$emit('message:push', res.data.message, 'no');
        }
        this.getCart();
      });
    },
    goback() {
      this.$router.go(-1);
    },
    goOrder() {
      this.$router.push('/customer_order');
    },
  },
  created() {
    this.$store.dispatch('getCart');
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    check() {
      return this.$store.state.check;
    },
    show() {
      return this.$store.state.show;
    },
    cartList() {
      return this.$store.state.cartList;
    },
    totalPrice() {
      return this.$store.state.totalPrice;
    },
    length() {
      return this.$store.state.length;
    },
  },
};
</script>
