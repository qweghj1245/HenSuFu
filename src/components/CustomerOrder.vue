<template lang="pug">
    div
        loading(:active.sync='isLoading')
            img(src="./../assets/images/Magnify-1s-200px.svg")
        HomeNavbar
        section.py-5
            .container
                .form-row.text-center.mt-5
                    .col-12.col-sm
                        .alert.alert-ok.alert-rounded(role='alert') 1. 輸入訂單資料
                    .col-12.col-sm
                        .alert.text-muted.alert-rounded.d-none.d-md-block(role='alert') 2. 訂單確認
                    .col-12.col-sm
                        .alert.text-muted.alert-rounded.d-none.d-md-block(role='alert') 3. 付款完成
        section.py-5
            .container
                h2.text-center.text-ok 收件人資訊
                form(@submit.prevent="sentorder")
                    .form-row.d-flex.justify-content-center
                        .col-md-6.col-12
                            .form-group.mt-4
                                label.text-ok(for='cusemail') Email*
                                input#cusemail.form-control(type='email', placeholder='Email' name="email" v-model="form.user.email" v-validate="'required|email'" :class="{'is-invalid':errors.has('email')}")
                                span.text-danger(v-if="errors.has('email')") {{ errors.first('email') }}
                            .form-group
                                label.text-ok(for='cusname') 收件人姓名*
                                input#cusname.form-control(type='text', placeholder='請輸入姓名' name="names" v-model="form.user.name" v-validate="'required'" :class="{'is-invalid':errors.has('name')}")
                                span.text-danger(v-if="errors.has('name')") 姓名必須輸入
                            .form-group
                                label.text-ok(for='cusaddress') 收件人地址*
                                input#cusaddress.form-control(type='text', placeholder='請輸入地址' name="address" v-model="form.user.address" v-validate="'required'" :class="{'is-invalid':errors.has('name')}")
                                span.text-danger(v-if="errors.has('address')") 地址必須輸入
                            .form-group
                                label.text-ok(for='custel') 收件人電話*
                                input#custel.form-control(type='tel', placeholder='請輸入電話' name="tel" v-model="form.user.tel" v-validate="'required'" :class="{'is-invalid':errors.has('tel')}")
                                span.text-danger(v-if="errors.has('tel')") 電話必須輸入
                            .form-group
                                label.text-ok(for='exampleFormControlTextarea1') 備註 ＆ 額外需求
                                textarea#exampleFormControlTextarea1.form-control(type="textarea" rows='3' placeholder="如果您有特別要求，請在此填寫" v-model="form.message")
                            .d-flex.justify-content-end.mt-6
                                button.btn.btn-ok(type='submit') 下一步
</template>

<script>

export default {
  data() {
    return {
      cartList: [],
      totalPrice: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    sentorder() {
      const vm = this;
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOMER}/order`;
      const order = vm.form;
      this.$store.dispatch('updateLoading', true);
      this.$validator.validate().then((result) => {
        if (result) {
          this.$http.post(api, { data: order }).then((response) => {
            if (response.data.success) {
              vm.$router.push(`/customer_checkout/${response.data.orderId}`);
              this.$store.dispatch('getCartLen');
              this.$store.dispatch('updateLoading', false);
            }
          });
        }
      });
    },
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  created() {
    this.$store.dispatch('updateLoading', true);
    setTimeout(() => {
      this.$store.dispatch('updateLoading', false);
    }, 500);
  },
};
</script>
