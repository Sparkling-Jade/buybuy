<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix" >
                            <div class="pic-box" v-if="images.normal_size.length!=0">
                                <!-- <img src="" alt=""> -->
                                <!-- 放大镜组件 -->
                                <ProductZoomer :base-images="images" :base-zoomer-options="zoomerOptions" />
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_titile}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                 <el-input-number v-model="buyCount" @change="numChange" :min="1" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="addCart" class="add">加入购物车</button>
                                                
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a @click="selectIndex=0" href="javascript:;" :class="{selected:selectIndex==0}">商品介绍</a>
                                    </li>
                                    <li>
                                        <a @click="selectIndex=1" href="javascript:;" :class="{selected:selectIndex==1}">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            </Affix>
                            <!-- 内容介绍详情 -->
                            <div class="tab-content entry" v-show="selectIndex==0" v-html="goodsinfo.content">

                            </div>
                            <div class="tab-content" v-show="selectIndex==1">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea v-model.trim="Message" @keyup.enter="btn" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input @click="btn" id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | beautifulTimeData}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                       
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <!-- 使用iview插件 -->
                                       <Page @on-change="pageChange" @on-page-size-change="sizeChange" :total="totalcount" :current="pageIndex" show-elevator show-sizer />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/details/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                            <!-- </a> -->
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/details/'+item.id">
                                                {{item.title}}
                                            </router-link>
                                            <!-- <a href="#/site/goodsinfo/90" class=""></a> -->
                                            <span>{{item.add_time | beautifulTime}}</span>
                                            
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "details",
  data: function() {
    return {
      goodsinfo: {},
      hotgoodslist: [],
      imglist: [],
      buyCount: 1,
      id: "",
      selectIndex: 0,
      //页码
      pageIndex: 1,
      //页容量
      pageSize: 10,
      //总条数
      totalcount: 0,
      //评论内容
      comments: [],

      Message: "",

      images: {
        normal_size: [
          {
            id: 1,
            url:
              "https://gss0.bdstatic.com/5bVWsj_p_tVS5dKfpU_Y_D3/res/r/image/2018-10-12/30ad8d9b4a477fc80af0b98766410fe9.jpg"
          },
          {
            id: 2,
            url:
              "https://gss0.bdstatic.com/5bVWsj_p_tVS5dKfpU_Y_D3/res/r/image/2018-10-12/30ad8d9b4a477fc80af0b98766410fe9.jpg"
          }
        ],
      },
      //zoomer的选项设置
       zoomerOptions: {
           //放大倍数
         zoomFactor: 4,
         //用什么样式的放大镜
         pane: "container",
         //多久出来
         hoverDelay: 300,
         //类前缀
         namespace: "container-zoomer",
         //点击移动
         move_by_click: true,
         //滚动的图片张数
         scroll_items: 4,
         //选中的缩略图的边框颜色
         choosed_thumb_border_color: "#ff3d00"
       }
    };
  },
  methods: {
    numChange() {
      // console.log('变化了');
    },
    getGoodInfo() {
         this.images.normal_size=[]
         this.$axios.get("/site/goods/getgoodsinfo/" + this.id).then(response => {
        // console.log(response);
        this.goodsinfo = response.data.message.goodsinfo;
        this.hotgoodslist = response.data.message.hotgoodslist;
        this.imglist = response.data.message.imglist;
        //处理图片数据
        let temImges=[];
          this.imglist.forEach(v=>{
              
              temImges.push({
                  id:v.id,
                  url:v.original_path
              })
          })
          //处理数据完毕 赋值
          this.images.normal_size=temImges;
      });
    },
    getComments() { 
      this.$axios
        .get(
          `site/comment/getbypage/goods/${this.id}?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(res => {
          //  console.log(res);
          this.pageIndex = res.data.pageIndex;
          this.pageSize = res.data.pageSize;
          this.totalcount = res.data.totalcount;
          this.comments = res.data.message;
        });
    },
    pageChange(pageNum) {
      //   console.log(pageNum);
      this.pageIndex = pageNum;

      this.getComments();
    },
    sizeChange(pageSize) {
      // console.log(pageSize);
      this.pageSize = pageSize;
      this.pageIndex = 1;
      this.getComments();
    },
    btn() {
      if (this.Message == "") {
        this.$Message.warning("请输入一点内容,^_^");
        return;
      } else {
        this.$axios
          .post("site/validate/comment/post/goods/" + this.id, {
            commenttxt: this.Message
          })
          .then(res => {
            // console.log(res);
            this.pageIndex = 1;

            this.getComments();

            this.Message = "";

            this.$Message.success("评论成功");
          });
      }
    },
    addCart(){
        this.$store.commit("addCart",{
            id:this.id,
            buyCount:this.buyCount
        })
    }
  },
  created() {
    this.id = this.$route.params.id;

    this.getGoodInfo();

    this.getComments();
  },
  watch: {
    $route(to) {
      this.id = to.params.id;

      this.getGoodInfo();

      this.getComments();

      this.buyCount = 1;
    }
  }
};
</script>

<style>
.tab-content img {
  display: block;
}

.pic-box{
    width: 395px;
}

</style>
