<template lang="pug">
    div
        loading(:active.sync='isLoading')
            img(src="./../assets/images/Magnify-1s-200px.svg")
        HomeNavbar
        section
            .container
                .table-responsive.mt-4
                    table.table.border.border-ok.table-bordercolor.table-hover
                        thead
                            tr.table-ok
                                th 購買時間
                                th Email
                                th.d-md-table-cell.d-none 購買款項
                                th 應付金額
                                th.text-center 是否付款
                                th.d-md-table-cell.d-none 付款日期
                        tbody
                            tr(v-for="item in orders" :key="item.id")
                                td {{item.create_at | getdate}}
                                td {{item.user.email}}
                                td.d-md-table-cell.d-none
                                    ul.pl-0(v-for="item2 in item.products" :key="item2.id"  style="list-style:none")
                                        li {{item2.product.title}}  數量：{{item2.qty}}{{item2.product.unit}}
                                td.text-right.font-weight-bold {{item.total|currency}}
                                td.text-center
                                    span.text-success(v-if="item.is_paid") 已付款
                                    span.text-danger(v-else) 未付款
                                td.d-md-table-cell.d-none(v-if="item.is_paid") {{item.paid_date | getdate}}
                                td.d-md-table-cell.d-none(v-else)
        page(:pagination='pagination', @getPages='getOrders')
        Footer
</template>

<script>
export default {
  data() {
    return {
      orders: [],
      pagination: {},
    };
  },
  methods: {
    getOrders(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOMER}/orders?page=${page}`;
      vm.$store.dispatch('updateLoading', true);
      this.$http.get(api).then((response) => {
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
        vm.$store.dispatch('updateLoading', false);
      });
    },
  },
  created() {
    this.getOrders();
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
};
</script>
