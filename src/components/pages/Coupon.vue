<template>
    <div>
         <loading :active.sync="isLoading">
            <img src="./../../assets/images/Magnify-1s-200px.svg" alt="">
         </loading>
        <section>
            <div class="table-responsive mt-md-4">
                <div class="text-right">
                    <button class="btn btn-outline-ok" @click="openModal(true)">建立新優惠卷</button>
                </div>
                <table class="table mt-4">
                    <thead>
                        <tr>
                            <th width="100">名稱</th>
                            <th width="100">折扣</th>
                            <th>到期日</th>
                            <th class="d-md-block d-none">是否啟用</th>
                            <th width="130">編輯</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in coupons" :key="item.id">
                            <td>{{item.title}}</td>
                            <td>{{item.percent}}</td>
                            <td>{{item.due_date | getdate}}</td>
                            <td class="d-md-block d-none">
                                <span class="text-success" v-if="item.is_enabled === 1">已啟用</span>
                                <span class="text-danger" v-else>未啟用</span>
                            </td>
                            <td>
                                <button class="btn btn-outline-ok btn-sm mr-1" @click="openModal(false, item)">編輯</button>
                                <button class="btn btn-outline-no btn-sm" @click="deleteCoupon(item.id)">刪除</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
        <page :pagination="pagination" @getPages="getCoupon"></page>
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document" style="margin-top: 100px">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel" v-if="isNew">建立優惠卷</h5>
                        <h5 class="modal-title" id="exampleModalLabel" v-else>修改優惠卷</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label mt-2">標題</label>
                            <input type="text" class="form-control" id="recipient-name" v-model="tempCoupon.title">
                            <label for="recipient-name" class="col-form-label mt-2">優惠碼</label>
                            <input type="text" class="form-control" id="recipient-name" v-model="tempCoupon.code">
                            <label for="recipient-name" class="col-form-label mt-2">今天日期</label>
                            <input type="text" class="form-control" id="recipient-name" v-model="tempCoupon.due_date">
                            <label for="recipient-name" class="col-form-label mt-2">折扣百分比</label>
                            <input type="text" class="form-control" id="recipient-name" v-model="tempCoupon.percent">
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox"
                                id="is_enabled" :true-value='1' :false-value='0'
                                v-model="tempCoupon.is_enabled">
                                <label class="form-check-label" for="is_enabled">是否啟用</label>
                            </div>
                        </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-ok" @click="addCoupon">更新優惠卷</button>
                    </div>
                </div>
            </div>
        </div>
      <Footer class="fixed-bottom"></Footer>
    </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      tempCoupon: {},
      coupons: [],
      isNew: false,
      pagination: {},
    };
  },
  methods: {
    getCoupon(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOMER}/admin/coupons?page=${page}`;
      vm.$store.dispatch('updateLoading', true);
      this.$http.get(api).then((response) => {
        vm.coupons = response.data.coupons;
        vm.pagination = response.data.pagination;
        vm.$store.dispatch('updateLoading', false);
      });
    },
    addCoupon() {
      const vm = this;
      let httpMethod = 'post';
      let api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOMER}/admin/coupon`;
      vm.tempCoupon.due_date = Math.floor(Date.now() / 1000) + 1000000;
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOMER}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = 'put';
      }
      this.$http[httpMethod](api, { data: vm.tempCoupon }).then((response) => {
        if (response.data.success) {
          $('#exampleModal').modal('hide');
          vm.getCoupon();
        }
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempCoupon = {};
        this.isNew = true;
      } else {
        this.tempCoupon = Object.assign({}, item);
        this.isNew = false;
      }
      $('#exampleModal').modal('show');
    },
    deleteCoupon(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_PATH}/api/${process.env.VUE_APP_CUSTOMER}/admin/coupon/${id}`;
      this.$http.delete(api).then(() => {
        vm.getCoupon();
      });
    },
  },
  created() {
    this.getCoupon();
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
};
</script>
