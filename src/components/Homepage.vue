<template lang="pug">
    div
        loading(:active.sync='isLoading')
            img(src="./../assets/images/Magnify-1s-200px.svg")
        HomeNavbar
        section
            .jumbotron.jumbotron-fluid.jumbo-bg.d-flex.align-items-center(style="background-image:url('https://images.unsplash.com/photo-1494043625957-ff6c03ea4206?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1900&q=80');background-position:center right;background-attachment:fixed")
                .container.text-center
                    .bg-lighter.p-6
                        h1.header__title.display-4 歡迎來到HenSuFu
                        p.lead 這是一個有很多優惠的購物網站，你可以在這裡找到想要的商品，應有盡有！
                        button.btn.btn-ok(href='#', role='button' @click="goto") 前往購物
        article.mt-7
            .form-row
                .col-md-3
                    .card.border-0.h-40.text-center.bg-light
                        .card-body.d-flex.align-items.center.justify-content-center.flex-column
                            h5.card-title 公開產銷履歷
                            p.card-text 我們的商品都來自台灣，這個美麗小島國的產出絕對優質，100%純天然製造
                    router-link.card.border-0.mt-2.mb-1.article__card(style="min-height: 450px;cursor:pointer" :to="{ path:'/shop', query: { to: '潮流新品'} }")
                        .article__card-image(style="background-image:url('https://images.unsplash.com/photo-1469329989238-48310798c014?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2106&q=80');")
                        .article__card-bg
                            .article__card-text.text-center.text-deeper.d-none.d-lg-flex
                                .card-title 衣著販賣
                                .card-text 您的貼身護衛
                        .article__show__card-text.text-center.text-deeper.d-lg-none
                            .show__card-title.text-white 衣著販賣
                            .show__card-text.text-white 您的貼身護衛
                .col-md-9
                    .form-row
                        .col-md-5.mb-md-2.mb-2.mt-9.mt-md-0
                            .card.border-0.article__card(style="min-height: 400px;")
                                .article__card-image(style="background-image:url('https://images.unsplash.com/photo-1500021804447-2ca2eaaaabeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80');")
                                .article__card-bg
                                    .article__card-text.text-center.text-deeper.d-none.d-lg-flex
                                        .card-title 優惠碼藏身處
                                        .card-text 我才不會說是 chick 呢
                                .article__show__card-text.text-center.text-deeper.d-lg-none
                                    .show__card-title.text-white 優惠碼藏身處
                                    .show__card-text.text-white 我才不會說是 chick 呢
                        .col-md-7.mb-md-2.mb-0
                            router-link.card.border-0.h-100.article__card(style="min-height: 400px;cursor:pointer" :to="{ path:'/shop', query: { to: '家居系列'} }")
                                .article__card-image(style="background-image:url('https://images.unsplash.com/photo-1422207134147-65fb81f59e38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1858&q=80');")
                                .article__card-bg
                                    .article__card-text.text-center.text-deeper.d-none.d-lg-flex
                                        .card-title 溫暖家居
                                        .card-text 可以躺可以睡
                                .article__show__card-text.text-center.text-deeper.d-lg-none
                                    .show__card-title.text-white 溫暖家居
                                    .show__card-text.text-white 可以躺可以睡
                    .form-row
                        .col-md-7.mt-2.mt-md-0
                            .card.border-0.h-100.text-center.bg-light
                                .card-body.d-flex.align-items.center.justify-content-center.flex-column
                                    h5.card-title 最優秀的服務
                                    p.card-text 提供24小時專人服務，一通電話宅配到你家
                        .col-md-5.mt-2.mt-md-0
                            router-link.card.border-0.article__card(style="min-height: 350px;cursor:pointer" :to="{ path:'/shop', query: { to: '生活飲食'} }")
                                .article__card-image(style="background-image:url('https://images.unsplash.com/photo-1532499016263-f2c3e89de9cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80');")
                                .article__card-bg
                                    .article__card-text.text-center.text-deeper.d-none.d-lg-flex
                                        .card-title 點心時間
                                        .card-text 成為零食王國子民吧
                                .article__show__card-text.text-center.text-deeper.d-lg-none
                                    .show__card-title.text-white 點心時間
                                    .show__card-text.text-white 成為零食王國子民吧
        section.py-4.bg-light.mt-2
            .container
                h2.text-center.mb-4 聽聽其他人怎麼說
                .row.justify-content-center
                    .col-xl-4.px-xl-12.col-lg-4.px-lg-13.col-md-4.mx-md-0.mx-14
                        .bg-cover.rounded-circle(style="background-image:url('https://images.unsplash.com/photo-1530268729831-4b0b9e170218?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80');min-height:250px")
                        .card.border-0.bg-light
                            .card-body.py-6.text-center
                                h5.card-title 來自國外的朋友
                                p.card-text 我很喜歡他們的設計，自然舒服又不會感到拘束，希望他們可以賣芒果冰
                    .col-xl-4.px-xl-12.col-lg-4.px-lg-13.col-md-4.mx-md-0.mx-14
                        .card.border-0.bg-light
                            .card-img-top.bg-cover.rounded-circle(style="background-image:url('https://images.unsplash.com/photo-1437913135140-944c1ee62782?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80');min-height:250px")
                            .card-body.py-6.text-center
                                h5.card-title 來自國外的朋友
                                p.card-text 我很喜歡他們的設計，自然舒服又不會感到拘束，希望他們可以賣芒果冰
                    .col-xl-4.px-xl-12.col-lg-4.px-lg-13.col-md-4.mx-8.mx-md-0.mx-14
                        .card.border-0.bg-light
                            .card-img-top.bg-cover.rounded-circle(style="background-image:url('https://images.unsplash.com/photo-1486413869840-a99ac0a4c031?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=971&q=80');min-height:250px")
                            .card-body.py-6.text-center
                                h5.card-title 來自國外的朋友
                                p.card-text 我很喜歡他們的設計，自然舒服又不會感到拘束，希望他們可以賣芒果冰
        section.py-5
            .container
                h2.text-center.mb-4 在哪裡可以找到我們
                .row
                    .col-12
                        iframe.w-100(src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20267.80731186155!2d120.21051806372357!3d22.98905889964289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e768cf38caa09%3A0xc3e9a28e4fd2ac46!2z5Y-w5Y2X6LuK56uZ!5e0!3m2!1szh-TW!2stw!4v1553698077574"  height="450" frameborder="0" style="border:0;" allowfullscreen)
        section.py-4
            .container
                hr
        Footer
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goto() {
      this.$router.push('/shop');
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
