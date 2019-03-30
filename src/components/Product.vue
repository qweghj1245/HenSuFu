<template lang="pug">
    div
        loading(:active.sync='isLoading')
            img(src="./../assets/images/Magnify-1s-200px.svg")
        HomeNavbar
        Alert
        section.py-5
            .container
                nav(aria-label='breadcrumb')
                    ol.breadcrumb.bg-white
                        li.breadcrumb-item
                            a.text-ok(href='#' @click="toHome") 首頁
                        li.breadcrumb-item
                            a.text-ok(href='#' @click="toShop") {{ product.category }}
                        li.breadcrumb-item.active(aria-current='page') {{ product.title }}
                .row
                    .col-md-7
                        .product__image.bg-fix(:style="{backgroundImage:`url(${product.imageUrl})`}")
                    .col-md-5
                        h2.text-ok {{ product.title }}
                        br
                        .bg-light.d-flex.justify-content-between.p-3.mt-4
                            del.product__price.text-muted.font-italic 原價： {{ product.origin_price | currency }}
                            .product__price-origin.text-danger 特價 {{ product.price | currency }}
                        .product-info.mt-4
                            blockquote.blockquote
                              .h4.text-ok 商品特色
                              span.mb-0.product__des {{ product.description }}
                              footer.text-right.blockquote-footer
                                cite(title='Source Title') {{ product.contnet }}
                        .form-group.mt-6
                            label.text-ok(for='exampleFormControlSelect1') 數量
                            select#exampleFormControlSelect1.form-control(v-model="product.num")
                                option(v-for="num in 10" :key="num" :value="num") {{num}} {{ product.unit }}
                        slot(v-if="product.category == '潮流新品'")
                            .mt-6.mb-2.text-ok 尺寸選擇
                            .btn-group.btn-group-toggle(data-toggle='buttons')
                                label.btn.btn-outline-deeper.btn-sm.active
                                    input#option1(type='radio', name='options', autocomplete='off', checked='')
                                    |  S
                                label.btn.btn-outline-deeper.btn-sm
                                    input#option2(type='radio', name='options', autocomplete='off')
                                    |  M
                                label.btn.btn-outline-deeper.btn-sm
                                    input#option3(type='radio', name='options', autocomplete='off')
                                    |  L
                                label.btn.btn-outline-deeper.btn-sm
                                    input#option3(type='radio', name='options', autocomplete='off')
                                    |  XL
                        .pay-card.mb-4.text-right.h4
                            .fab.fa-cc-mastercard.mr-2.text-danger
                            .fab.fa-cc-visa.mr-2.text-primary
                            .fab.fa-cc-paypal.mr-2.text-info
                            .fab.fa-cc-apple-pay.mr-2.text-secondary
                            .fab.fa-cc-amazon-pay.mr-2.text-warning
                        button.btn.btn-ok.btn-block(@click="addCart(product.id, product.num)") 加入購物車
        section.py-5.mt-6
            .container
                h2.mb-2.text-ok 你可能會喜歡
                swiper(:options='swiperOption')
                    swiper-slide(v-for='item in products', :key='item.id' v-show="item.category == product.category")
                        .card(@click="toProduct(item.id)" style="cursor:pointer;")
                            .swiper__tag.pr-2
                                span.bg-no.text-white.p-2 特價
                            .card-img-top.bg-fix.w-40.listCard.ml-auto.mr-auto.mt-4(:style="{backgroundImage:`url(${item.imageUrl})`}")
                            .card-body
                                .card-title.text-center.text-ok {{ item.title }}
                                p.card-text.text-center {{ item.price | currency }}
        Footer
</template>

<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  data() {
    return {
      productId: '',
      product: {},
      products: [],
      isActive: false,
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 5,
        slidesPerGroup: 5,
        loop: false,
        speed: 600,
        autoplay: {
          delay: 4000,
        },
        breakpoints: {
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          416: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          376: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
        },
      },
    };
  },
  methods: {
    toHome() {
      this.$router.push('/');
    },
    toShop() {
      this.$router.push('/shop');
    },
    getProduct() {
      this.productId = this.$route.params.id;
      const vm = this;
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOMER}/product/${vm.productId}`;
      vm.$store.dispatch('updateLoading', true);
      this.$http.get(api).then((response) => {
        vm.product = response.data.product;
        vm.product.num = 1;
        vm.$store.dispatch('updateLoading', false);
      });
    },
    getProducts() {
      const vm = this;
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOMER}/products/all`;
      this.$http.get(api).then((response) => {
        vm.products = response.data.products;
      });
    },
    toProduct(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOMER}/product/${id}`;
      vm.$store.dispatch('updateLoading', true);
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.$store.dispatch('updateLoading', false);
          this.$router.push(`/uniqueinfo/${id}`);
        }
      });
    },
    addCart(id, qty = 1) {
      this.$store.dispatch('addCart', { id, qty });
      this.$bus.$emit('message:push', '加入購物車成功', 'success');
      this.$store.dispatch('updateLoading', true);
      setTimeout(() => {
        this.$store.dispatch('updateLoading', false);
      }, 500);
    },
    goCart() {
      this.$router.push('/cart');
    },
  },
  watch: {
    /* eslint-disable */
    '$route': 'getProduct',
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    status() {
      return this.$store.state.status;
    },
  },
  created() {
    this.productId = this.$route.params.id;
    this.getProduct();
    this.getProducts();
  },
  components: {
    swiper,
    swiperSlide,
  },
};
</script>
