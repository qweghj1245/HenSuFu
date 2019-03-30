import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    strict: true,
    isLoading: false,
    check: false,
    show: false,
    // products: [],
    // filterProduct: [],
    cartList: [],
    totalPrice: '',
    length: '',
    status: {
      loadingItem: '',
    },
  },
  mutations: {
    LOADING(state, payload) {
      this.state.isLoading = payload;
    },
    // PRODUCTS(state, payload) {
    //   this.state.products = payload;
    // },
    // FILTERPRODUCT(state, payload) {
    //   this.state.filterProduct = payload;
    // },
    CARTLIST(state, payload) {
      this.state.cartList = payload;
    },
    TOTALPRICE(state, payload) {
      this.state.totalPrice = payload;
    },
    CHECK(state, payload) {
      this.state.check = payload;
    },
    SHOW(state, payload) {
      this.state.show = payload;
    },
    LENGTH(state, payload) {
      this.state.length = payload;
    },
    LOADINGITEM(state, payload) {
      this.state.status.loadingItem = payload;
    },
  },
  actions: {
    updateLoading(context, payload) {
      context.commit('LOADING', payload);
    },
    // getProducts(context) {
    //   const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOMER}/products/all`;
    //   context.commit('LOADING', true);
    //   axios.get(api).then((response) => {
    //     if (response.data.success) {
    //       context.commit('PRODUCTS', response.data.products);
    //       context.commit('FILTERPRODUCT', response.data.products);
    //     }
    //     context.commit('LOADING', false);
    //   });
    // },
    getCart(context) {
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOMER}/cart`;
      context.commit('LOADING', true);
      axios.get(api).then((response) => {
        context.commit('CARTLIST', response.data.data.carts);
        context.commit('TOTALPRICE', response.data.data.final_total);
        context.commit('LOADING', false);
        if (response.data.data.carts.length === 0) {
          context.commit('CHECK', true);
        } else {
          context.commit('SHOW', true);
        }
      });
    },
    addCart(context, { id, qty = 1 }) {
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOMER}/cart`;
      context.commit('LOADINGITEM', id);
      const cart = {
        product_id: id,
        qty,
      };
      axios.post(api, { data: cart }).then(() => {
        context.commit('LOADINGITEM', '');
        context.dispatch('getCartLen');
      });
    },
    deleteCart(context, id) {
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOMER}/cart/${id}`;
      axios.delete(api).then(() => {
        context.dispatch('getCart');
        context.dispatch('getCartLen');
        context.commit('SHOW', false);
      });
    },
    getCartLen(context) {
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOMER}/cart`;
      axios.get(api).then((response) => {
        context.commit('LENGTH', response.data.data.carts.length);
      });
    },
    toProduct(id) {
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOMER}/product/${id}`;
      axios.get(api).then((response) => {
        if (response.data.success) {
          this.$router.push(`/product/${id}`);
        }
      });
    },
  },
  getters: {
    // products(state) {
    //   return state.products;
    // },
    // filterProduct(state) {
    //   return state.filterProduct;
    // }
  },
});
