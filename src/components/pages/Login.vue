<template lang="pug">
  <div>
    HomeNavbar
    Alert
    loading(:active.sync='isLoading')
      img(src="./../../assets/images/Magnify-1s-200px.svg")
    .signin__outer
      form.form-signin(@submit.prevent='signin')
          h1.h3.mb-3.font-weight-normal.text-deeper.text-center 請先登入
          label(for='inputEmail') 帳號
          input#inputEmail.form-control.mb-3.border-deeper-100(type='email', placeholder='Your Email', required, v-model='user.username')
          label(for='inputPassword') 密碼
          input#inputPassword.form-control.mb-6.border-deeper-100(type='password', placeholder='Password', required, v-model='user.password')
          button.btn.btn-lg.btn-deeper.btn-block(type='submit') 登入
    Footer.fixed-bottom
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signin() {
      const vm = this;
      const api = `${process.env.VUE_APP_PATH}/admin/signin`;
      this.$http.post(api, vm.user).then((response) => {
        if (response.data.success) {
          vm.$router.push('/admin/products');
          this.$bus.$emit('message:push', '登入成功', 'deeper');
        } else {
          this.$bus.$emit('message:push', response.data.message, 'no');
        }
      });
    },
  },
  created() {
    this.$store.dispatch('updateLoading', true);
    setTimeout(() => {
      this.$store.dispatch('updateLoading', false);
    }, 500);
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
};
</script>

<style scoped>
body {
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #fff;
}
.signin__outer {
  width: 500px;
}
.form-signin {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 450px;
  padding: 75px;
  margin: auto;
  background-color: #eee;
  box-shadow: 0px 3px 4px -1px rgba(0,0,0,0.75);
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
