<!-- 4.3、店铺列表 -->
<template>
  <c-page>
    <div
      slot="content"
      class="page43">
      <top-buttons :actions="[]"/>
      <div class="content">
        <div class="shopList">
          <div class="input-search">
            <c-input
              v-model="value"
              placeholder="请输入门店关键字">
              <i
                slot="append"
                class="cubeic-search"/>
            </c-input>
          </div>
          <div class="scroll-list-wrap">
            <c-scroll
              ref="scroll"
              :data="items"
              :options="options"
              @pulling-down="onPullingDown"
              @pulling-up="onPullingUp">
              <ul class="foods-wrapper">
                <c-radio-group>
                  <c-radio
                    v-for="(shop, index) in shopList"
                    :option="{
                      label: shop.shop_name,
                      value: shop.shop_code + ':' + shop.shop_name
                    }"
                    :key="index"
                    v-model="selected">
                    <li
                      class="food-item border-1px">
                      <div class="icon">
                        <img
                          src="~assets/img/bg/shop_bg.jpg"
                          width="80"
                          height="39">
                      </div>
                      <div class="shop-content">
                        <h2 class="name">{{ shop.shop_name }}</h2>
                        <p class="description">{{ shop.address }}</p>
                        <div
                          v-if="shop.distance"
                          class="extra">
                          <span>距您 {{ shop.distance / 1000 }} 公里</span>
                        </div>
                      </div>
                    </li>
                  </c-radio>
                </c-radio-group>
              </ul>
              <template
                v-if="customPullDown"
                slot="pulldown"
                slot-scope="props">
                <div
                  v-if="props.pullDownRefresh"
                  :style="props.pullDownStyle"
                  class="c-pulldown-wrapper">
                  <div
                    v-show="props.beforePullDown"
                    :style="{paddingTop: props.bubbleY + 'px'}"
                    class="before-trigger">
                    <span :class="{rotate: props.bubbleY > pullDownRefreshThreshold - 40}">↓</span>
                  </div>
                  <div
                    v-show="!props.beforePullDown"
                    class="after-trigger">
                    <div
                      v-show="props.isPullingDown"
                      class="loading">
                      <!--<c-loading/>-->
                    </div>
                    <div
                      v-show="!props.isPullingDown"
                      class="text"><span class="refresh-text">Refresh success</span></div>
                  </div>
                </div>
              </template>
            </c-scroll>
          </div>
        </div>
      </div>
      <img
        v-if="selected !== null && selected !== ''"
        src="~assets/img/btn/btn_qrxz.png"
        class="btn"
        @click="toPage41">
    </div>
  </c-page>
</template>
<script>
  import CPage from '../components/c-page.vue'
  import {isBrowser} from '~/environment_es'
  import TopButtons from '../components/top-buttons'
  import PageContent from '../components/page-content'
  import tip1 from '~/assets/img/text/text_gxnjd.png'
  import tip2 from '~/assets/img/text/text_gxncz.png'
  import goodsData from '~/example/data/goods-list.json'

  let _foods = []

  goodsData.goods.forEach(item => {
    _foods = _foods.concat(item.foods)
  })
  export default {
    name: 'Index',
    fetch ({store, params}) {
      return store.dispatch('loadShopList', params)
    },
    head () {
      return {
        title: '选择门店'
      }
    },
    components: {
      CPage,
      TopButtons,
      PageContent
    },
    data () {
      return {
        selected: '',
        value: '',
        items: _foods,
        pullDownRefresh: false,
        pullDownRefreshThreshold: 60,
        pullDownRefreshStop: 40,
        pullDownRefreshTxt: 'Refresh success',
        pullUpLoad: false,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: 'Load more',
        pullUpLoadNoMoreTxt: 'No more data',
        customPullDown: false,
        total: '12,345',
        count: '2',
        tip1,
        tip2,
        limit: 2,
      }
    },
    computed: {
      userLocation () {
        return this.$store.state.user.location.data
      },
      shopList () {
        return this.$store.state.shop.list.data
      },
      formData () {
        return this.$store.state.user.reserveForm.data
      },
      options () {
        return {
          pullDownRefresh: this.pullDownRefreshObj,
          pullUpLoad: this.pullUpLoadObj,
          scrollbar: true
        }
      },
      pullDownRefreshObj: function () {
        return this.pullDownRefresh ? {
          threshold: parseInt(this.pullDownRefreshThreshold, 10),
          // Do not need to set stop value, but you can if you want
          // stop: parseInt(this.pullDownRefreshStop),
          txt: this.pullDownRefreshTxt
        } : false
      },
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold, 10),
          txt: {
            more: this.pullUpLoadMoreTxt,
            noMore: this.pullUpLoadNoMoreTxt
          }
        } : false
      },
    },
    watch: {
      value (newVal) {
        this.$store.dispatch('loadShopList', {
          shopName: newVal
        })
      },
      selected (newVal) {
        // if (newVal) {
        this.$store.commit('user/SET_RESERVER_FORM', {
          shop: newVal.split(':')[0],
          shop_name: newVal.split(':')[1]
        })
        // }
      }
      // shopList (newVal) {
      //   this.shops = newVal
      // }
    },
    async mounted () {
    },
    methods: {
      toPage41 () {
        this.$router.go(-1)
      },
      onPullingDown () {
        // 模拟更新数据
        setTimeout(() => {
          if (Math.random() > 0.5) {
            // 如果有新数据
            this.items.unshift(_foods[1])
          } else {
            // 如果没有新数据
            this.$refs.scroll.forceUpdate()
          }
        }, 1000)
      },
      onPullingUp () {
        // 更新数据
        setTimeout(() => {
          if (Math.random() > 0.5) {
            // 如果有新数据
            const newPage = _foods.slice(0, 5)
            this.items = this.items.concat(newPage)
          } else {
            // 如果没有新数据
            this.$refs.scroll.forceUpdate()
          }
        }, 1000)
      },
      updatePullDownRefresh (val) {
        this.pullDownRefresh = val
      },
      updatePullDownRefreshThreshold (val) {
        this.pullDownRefreshThreshold = val
      },
      // updatePullDownRefreshStop(val) {
      //   this.pullDownRefreshStop = val
      // },
      updatePullDownRefreshTxt (val) {
        this.pullDownRefreshTxt = val
      },
      updatePullUpLoad (val) {
        this.pullUpLoad = val
      },
      updatePullUpLoadThreshold (val) {
        this.pullUpLoadThreshold = val
      },
      updatePullUpLoadMoreTxt (val) {
        this.pullUpLoadMoreTxt = val
      },
      updatePullUpLoadNoMoreTxt (val) {
        this.pullUpLoadNoMoreTxt = val
      },
      updateCustomPullDown (val) {
        this.customPullDown = val
      },
      rebuildScroll () {
        // Vue.nextTick(() => {
        //   this.$refs.scroll.destroy()
        //   this.$refs.scroll.initScroll()
        // })
      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .c-input
    background: #ffebd9
    border-radius: 10px

  .c-input-field
    border-radius: 10px

  .page43
    color: $color-dark
    display: flex
    align-items: center
    flex-direction: column
    min-height: 100vh
    position: fixed
    left: 0
    width: 100%
    height: 100%
    justify-content: center
    overflow: hidden

    .shopList
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      width: 445px
      height: 750px
      background-image: url("~assets/img/page43/list_bg.png")
      background-size: 445px 750px

    .input-search
      height: 50px
      width: 90%
      margin-top: 20px

    .btn
      margin-top: 20px
      width: 248px
      height: 40x

    .content
      display: flex
      flex-direction: column
      align-items: center

      .gift
        display: flex
        justify-content: center
        align-items: center
        text-align: center
        width: 383px
        height: 382px
        background: #E5D9A1

        img
          width: 383px
          height: 382px

      .text-jzc
        margin: 20px 0 30px 0
        width: 416px
        height: 25px

      .exchange-form
        width: 419px
        height: 165px
        background-image: url("~assets/img/page41/form_mdbg.png")
        background-size: 419px 165px
        display: flex
        justify-content: flex-end

        &__content
          position: relative
          top: 40px
          display: flex
          flex-direction: column
          justify-content: space-between
          height: 90px
          width: 200px

        span
          font-weight: 500
          font-size: 24px
          position: relative
          text-align: right
          right: 30px

    .footer
      display: flex
      position: absolute
      bottom: 0
      width: 100%;
      height: 167px;
      background-image: url("~assets/img/common/footer_bsbg.png")
      background-size: 640px 167px
      justify-content: center


  .scroll-wrapper
    .c-pulldown-wrapper
      .before-trigger
        font-size: 30px
        line-height: 30px
        align-self: flex-end

        span
          display: inline-block
          transition: all 0.3s
          color: #666

          &.rotate
            transform: rotate(180deg)

      .after-trigger
        .refresh-text
          color: grey

  .scroll-list-wrap
    height: 760px
    /*border-radius: 5px*/
    padding: 10px
    transform: rotate(0deg) // fix 子元素超出边框圆角部分不隐藏的问题
    overflow: hidden


  .foods-wrapper
    .food-item
      display: flex
      padding: 18px

      &:last-child
        border-none()
        margin-bottom: 0

      .icon
        flex: 0 0 57px
        margin-right: 10px

      .shop-content
        flex: 1

        .name
          margin: 4px 0 16px 0
          /*height: 14px*/
          line-height: 18px
          font-size: 15px
          color: rgb(7, 17, 27)

        .description, .extra
          font-size: 14px
          color: rgb(147, 153, 159)

        .description
          margin-bottom: 8px
          line-height: 20px

</style>
