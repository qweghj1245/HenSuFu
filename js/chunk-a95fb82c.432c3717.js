(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a95fb82c"],{b3b1:function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("loading",{attrs:{active:t.isLoading},on:{"update:active":function(s){t.isLoading=s}}},[a("img",{attrs:{src:e("d85b")}})]),a("HomeNavbar"),a("Alert"),t.length>0?a("section",{staticClass:"mt-6"},[a("div",{staticClass:"container"},[a("h2",{staticClass:"text-center text-ok"},[t._v("購物車清單")]),a("div",{staticClass:"table-responsive"},[a("table",{staticClass:"table mt-4 table-hover"},[t._m(0),a("tbody",t._l(t.cartList,function(s,e){return a("tr",{key:e},[a("td",{staticClass:"d-md-table-cell align-items-md-center d-none"},[a("div",{staticClass:"d-flex align-items-center"},[a("div",[a("div",{staticClass:"far fa-trash-alt d-none d-md-block",staticStyle:{cursor:"pointer"},on:{click:function(e){return t.deleteCart(s.id)}}})]),a("div",{staticClass:"ml-14 d-none d-md-block"},[a("img",{staticClass:"img-fluid",attrs:{src:s.product.imageUrl}})])])]),a("td",{staticClass:"text-center"},[t._v(t._s(s.product.title))]),a("td",{staticClass:"text-right d-none d-lg-table-cell"},[a("del",{staticClass:"text-muted"},[t._v(t._s(t._f("currency")(s.product.origin_price)))])]),a("td",{staticClass:"text-right h6"},[t._v(t._s(t._f("currency")(s.product.price)))]),a("td",{staticClass:"text-center"},[t._v(t._s(s.qty)+" / "+t._s(s.product.unit))]),a("td",{staticClass:"text-right h6"},[t._v(t._s(t._f("currency")(s.total)))])])}),0)])]),a("div",{staticClass:"table-responsive"},[a("table",{staticClass:"table mt-4 table-hover"},[a("tfoot",[t._m(1),a("tr",[a("th",{staticClass:"text-right",attrs:{colspan:"5"}},[t._v("總額")]),a("th",[a("div",{staticClass:"h4 text-no text-right"},[t._v(t._s(t._f("currency")(t.totalPrice+60)))]),a("div",{staticClass:"text-right text-muted"},[t._v("(若有小數點系統會自動捨去)")])])])])])]),a("div",{staticClass:"row d-flex justify-content-end"},[a("div",{staticClass:"col-md-3"},[a("div",{staticClass:"input-group mb-3"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.coupon_code,expression:"coupon_code"}],staticClass:"form-control border-no",attrs:{type:"text",placeholder:"輸入優惠碼"},domProps:{value:t.coupon_code},on:{input:function(s){s.target.composing||(t.coupon_code=s.target.value)}}}),a("div",{staticClass:"input-group-append"},[a("span",{staticClass:"input-group-text bg-no text-white border-0",staticStyle:{cursor:"pointer"},attrs:{id:"basic-addon2"},on:{click:t.useCoupon}},[t._v("套用優惠")])])])])]),a("hr"),a("div",{staticClass:"form-inline d-flex justify-content-end py-6"},[a("button",{staticClass:"btn btn-secondary mr-2 border-0",attrs:{type:"button"},on:{click:t.goback}},[t._v("返回上一頁")]),a("button",{staticClass:"btn btn-ok border-0",attrs:{type:"button"},on:{click:t.goOrder}},[t._v("前往結帳")])])])]):a("section",{staticClass:"py-10 d-flex align-items center justify-content-center"},[a("div",{staticClass:"container"},[a("h1",{staticClass:"text-center py-6 bg-ok text-white",staticStyle:{cursor:"pointer","box-shadow":"0px 0px 7px -1px rgba(0,0,0,0.75)"},on:{click:t.goback}},[t._v("購物車沒商品哦，點擊此處回上頁"),a("img",{staticClass:"img-fluid px-4",attrs:{src:e("dd35"),width:"90"}})])])])],1)},i=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("thead",[e("tr",[e("th",{staticClass:"text-center d-none d-md-table-cell",attrs:{width:"200"}},[t._v("商品圖")]),e("th",{staticClass:"text-center"},[t._v("商品名稱")]),e("th",{staticClass:"d-none d-lg-table-cell"},[t._v("單價")]),e("th",[t._v("特價")]),e("th",{staticClass:"text-center"},[t._v("數量")]),e("th",[t._v("小計")])])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("tr",[e("td",{staticClass:"text-right",attrs:{colspan:"5"}},[t._v("運費")]),e("td",{staticClass:"text-right",attrs:{width:"220"}},[t._v("$ 60")])])}],c={data:function(){return{coupon_code:""}},methods:{getCart:function(){this.$store.dispatch("getCart")},deleteCart:function(t){this.$store.dispatch("deleteCart",t)},goproducts:function(){this.$router.push("/productlist")},gopay:function(){this.$router.push("/customer_checkout")},useCoupon:function(){var t=this,s=this,e="".concat("https://vue-course-api.hexschool.io","/api/").concat("chick","/coupon"),a={code:s.coupon_code};this.$http.post(e,{data:a}).then(function(s){s.data.success,t.$bus.$emit("message:push",s.data.message,"no"),t.getCart()})},goback:function(){this.$router.go(-1)},goOrder:function(){this.$router.push("/customer_order")}},created:function(){this.$store.dispatch("getCart")},computed:{isLoading:function(){return this.$store.state.isLoading},check:function(){return this.$store.state.check},show:function(){return this.$store.state.show},cartList:function(){return this.$store.state.cartList},totalPrice:function(){return this.$store.state.totalPrice},length:function(){return this.$store.state.length}}},o=c,n=e("2877"),r=Object(n["a"])(o,a,i,!1,null,null,null);s["default"]=r.exports},d85b:function(t,s,e){t.exports=e.p+"img/Magnify-1s-200px.39bc2b22.svg"}}]);
//# sourceMappingURL=chunk-a95fb82c.432c3717.js.map