<template lang="pug">
    div.sticky-top
        nav.navbar.navbar-expand-md.navbar-light.bg-light
            .container
                router-link.navbar-brand(to='/')
                    span.nav__title.text-ok HenSuFu購物
                .ml-auto.mr-4.cart.d-block.d-md-none(@click="goCart")
                    img(src="./../assets/images/cart.svg" width="40")
                    span.cartlen {{ length }}
                button.navbar-toggler(type='button', data-toggle='collapse', data-target='#navbarNav', aria-controls='navbarNav', aria-expanded='false', aria-label='Toggle navigation')
                    span.navbar-toggler-icon
                #navbarNav.collapse.navbar-collapse
                    ul.navbar-nav.ml-auto.text-fz.font-weight-light
                        li.nav-item.mx-2
                            router-link.nav-link(to="/home" active-class="active") 首頁
                        li.nav-item.mx-2
                            router-link.nav-link(to="/shop" active-class="active") 購物
                        li.nav-item.mx-2
                            router-link.nav-link(to="/ordercus" active-class="active") 觀看訂單
                        li.nav-item.mx-2
                            a.nav-link(href='#') 關於作者
                        li.nav-item.mx-2
                            router-link.nav-link(to="/login" active-class="active") 登入
                .mr-4.cart.d-none.d-md-block(@click="goCart")
                    img(src="./../assets/images/cart.svg" width="40")
                    span.cartlen {{ length }}
</template>

<script>
export default {
  methods: {
    getCartLen() {
      this.$store.dispatch('getCartLen');
    },
    goCart() {
      this.$router.push('/cart');
    },
  },
  computed: {
    length() {
      return this.$store.state.length;
    },
  },
  created() {
    this.$store.dispatch('getCartLen');
    // console.log(this.$route.path);
  },
};
</script>

<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css?family=Indie+Flower')
.cart
  position: relative
  cursor: pointer
  & .cartlen
    position: absolute
    right: -10%
    top: -30%
    font-family: 'Indie Flower', cursive
    font-size: 24px
nav .nav-link.active
  color: #3b97d3 !important
</style>
