<template lang="pug">
    div
        loading(:active.sync='isLoading')
          img(src="./../assets/images/Magnify-1s-200px.svg")
        HomeNavbar
        section
            .container
                .head__image.bg-cover(style="background-image:url('https://images.unsplash.com/photo-1500189001820-d65835a662d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3251&q=80')")
        section
            .row.mt-6
                .col-md-3.d-flex.justify-content-center
                    nav.nav.flex-column.text-center.w-75
                      .sticky-top.fix-sticky-offset
                        a.nav-link.side__bg-color.border(href='#' @click.prevent="filterProducts('')" :class=" { 'bg-active': isActive == '' } ") 全部商品
                        a.nav-link.side__bg-color.border(href='#' @click.prevent="filterProducts('潮流新品')" :class=" { 'bg-active': isActive == '潮流新品' } ") 潮流新品
                        a.nav-link.side__bg-color.border(href='#' @click.prevent="filterProducts('家居系列')" :class=" { 'bg-active': isActive == '家居系列' } ") 家居系列
                        a.nav-link.side__bg-color.border(href='#' @click.prevent="filterProducts('生活飲食')" :class=" { 'bg-active': isActive == '生活飲食' } ") 生活飲食
                .col-md-9.mt-4.mt-md-0
                  nav.ml-4(aria-label='breadcrumb')
                    .d-flex.justify-content-md-between.justify-content-center
                      ol.breadcrumb.bg-white.d-none.d-md-flex
                        li.breadcrumb-item
                            a.text-ok(href='#' @click="toHome") 首頁
                        li.breadcrumb-item.active(v-if="isActive == ''") 全部商品
                        li.breadcrumb-item.active(v-else) {{isActive}}
                      form.form-inline.my-2.my-lg-0.mr-2.d-flex.flex-row
                        input.form-control.mr-sm-1.border-ok.w-63.mr-2(type='search' placeholder="找商品..." v-model="searchText" @input.prevent="search")
                        button.btn.btn-outline-ok.my-2.my-sm-0(type='submit') Search
                    .row.mt-4
                      .col-12.d-flex.flex-wrap.justify-content-center.justify-content-md-start
                        .card.border-0.mx-lg-4.mx-md-0.mx-4.mb-4.card__body(style="width:265px" v-for="(item, index) in filterProduct" :key="index")
                          .card-img-top.shoplist__image.bg-cover(:style=" { backgroundImage: `url(${item.imageUrl})`} " @click="toProduct(item.id)")
                            .wrap-ribbon(v-if="index % 5 == 0")
                              .ribbon 熱銷商品
                          .card-body.text-center.card__body
                              span.badge.badge-pill.badge-ok.card__tag.bg-ok.text-white.p-1(v-if="index % 3 == 0 && index != 0") 精選
                              .h5 {{ item.title }}
                              del.card-text.text-muted.text NT {{ item.origin_price | currency }}
                              .h5.card-text NT {{ item.price | currency }}
        Footer
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      filterProduct: [],
      products: [],
      isActive: '',
      searchText: '',
      searchArray: [],
    };
  },
  methods: {
    ...mapActions(['getCartLen']),
    toHome() {
      this.$router.push('/');
    },
    getProducts() {
      /* eslint-disable */
      const vm = this;
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOMER}/products/all`;
      vm.$store.dispatch('updateLoading', true);
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.products = response.data.products;
          if (vm.isActive) {
            vm.filterProduct = response.data.products.filter(item => item.category === this.$route.query.to);
          } else {
            vm.filterProduct = response.data.products;
            vm.isActive = '';
          }
        }
        vm.$store.dispatch('updateLoading', false);
      });
    },
    toProduct(id) {
      const api = `${process.env.VUE_APP_PATH}/api/${
        process.env.VUE_APP_CUSTOMER
      }/product/${id}`;
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          this.$router.push(`/uniqueinfo/${id}`);
        }
      });
    },
    addCart(id, qty = 1) {
      this.$store.dispatch('addCart', { id, qty });
    },
    goCart() {
      this.$router.push('/cart');
    },
    filterProducts(type) {
      const vm = this;
      let store = [];
      if (type === '') {
        vm.filterProduct = vm.products;
        vm.isActive = '';
        vm.$store.dispatch('updateLoading', true);
        setTimeout(() => {
          vm.$store.dispatch('updateLoading', false);
        }, 500);
      } else {
        store = vm.products.filter(item => item.category === type);
        vm.filterProduct = store;
        vm.isActive = type;
        vm.$store.dispatch('updateLoading', true);
        setTimeout(() => {
          vm.$store.dispatch('updateLoading', false);
        }, 500);
      }
    },
    search() {
      const vm = this;
      if (vm.searchText) {
        vm.filterProduct = vm.filterProduct.filter(item => item.title.match(vm.searchText));
      } else {
        if (vm.isActive) {
          vm.filterProduct = vm.products.filter(item => item.category === vm.isActive);
        }
        else {
          vm.filterProduct = vm.products;
        }
      }
    },
  },
  created() {
    // this.$store.dispatch('getProducts');
    this.getProducts();
    this.$store.dispatch('getCartLen');
    if (this.$route.query.to !== '') {
      this.isActive = this.$route.query.to;
    }
  },
  computed: {
    // ...mapGetters(['products']),
    isLoading() {
      return this.$store.state.isLoading;
    },
    length() {
      return this.$store.state.length;
    },
    status() {
      return this.$store.state.status;
    },
    // filterProduct() {
    //   return this.$store.state.filterProduct;
    // },
  },
};
</script>
