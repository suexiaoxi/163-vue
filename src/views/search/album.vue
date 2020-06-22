<template>
  <div>
    <div class="album-top">
      <div class="top-bg" :style="{backgroundImage:'url(http://music.163.com/api/img/blur/'+albumData.picId_str+')'}">
        <div class="img-title">
          <img :src="albumData.blurPicUrl" alt="">
          <div class="ablumImg-bg"></div>
          <span>专辑</span>
        </div>
        <div class="text">
          <div class="album-name">{{albumData.name}}</div>
          <div class="album-singer"><span>歌手：</span>{{albumData.artist.name}}</div>
          <div class="album-time">发行时间：{{pubDate(albumData.publishTime)}}</div>
        </div>
      </div>
      <!--简介！-->
      <div class="ablum-intro" @click="showMore()">
        <div class="intro-text">
          <p v-for="(item, index) in description" :key="index">{{getIntro(index,item)}}</p>
        </div>
        <i class="fa fa-angle-down" v-if="isShowMore"></i>
        <i class="fa fa-angle-up" v-else ></i>
     </div>
  
    <div>
      <h3 class="title">歌曲列表</h3>
      <ul class="song-list">
          <li v-for="(item,index) in songsData" :key="item.id">
            <router-link :to="'/song/' + item.id">
              <div class="text">
                <div class="sequence">{{ index + 1 }}</div>
                <div class="songSinger">
                  <div class="name">{{ item.name }}
                    <i class="originSing"> {{ item.alia.name  != null ?  '('+item.alia.name + ')' : '' }}</i>
                  </div>
                  <div class="singer">{{ item.ar[0].name != null ? item.ar[0].name : '' }} - {{ item.al.name }}</div>               
                </div>
              </div>
              <i class="fa fa-play-circle-o"></i>            
            </router-link>
          </li>
        </ul>
    </div>

    <div class="comment">
        <h4 class="title">精彩评论</h4>
        <ul class="comment-list">
          <li v-for="item in hotCommentData" :key="item.id">
            <div class="information">
              <div class="pic-text">
                <div class="photo"><img :src="item.user.avatarUrl" alt=""></div>
                <div class="text">
                  <div class="name">{{ item.user.nickname }}</div>
                  <div class="time">{{ parseDate(item.time) }}</div>
                </div>
              </div>
              <div class="likedCount">
                <i class="count">{{item.likedCount}}</i>
                <i class="fa fa-thumbs-o-up"></i>
              </div>
            </div>
            <div class="comment-content">{{item.content}}</div>
          </li>
        </ul>
      </div>
  </div>
</div>
</template>

<script>
import { getAlbum,getAlbumComment } from '@/api/search'
import { pubDate,parseDate } from '@/utils/date.js'

export default {
  data(){
    return {
      albumData:{
        name:'',
        artist:'',
        publishTime:'',
      },
      description:{},//专辑简介
      isShowMore:true,//是否显示更多
      arrowStatus:true, //简介上的箭头上下状态

      songsData:[],//专辑歌曲数据
      hotcommentData:[],//精彩评论

    };//返回的是对象，结束
  },
  created(){
  	this.getAlbum();
    this.getAlbumComment();
  },
  methods:{
    pubDate,
    parseDate,
  	getAlbum(){
      var id = this.$route.params.id;
      getAlbum({
        params:{
          id
        },
      }).then(res=>{
        let { data } = res;
        if(data.code == 200){
          this.albumData = data.album;
          this.description = data.album.description;
          this.songsData = data.songs;
          if(this.description){
            var descriptionArr = this.description.split(/\n/)
          }
          this.description=descriptionArr;
        }

      })
    },
    getIntro(index,item){
      if(index==0){
        return `简介:${item}`;
      }
      else return item;
    },
    showMore() {
      if(this.isShowMore==true){
        document.querySelector(".intro-text").style.height="auto";
        this.isShowMore=!this.isShowMore;
      }
      else{
         document.querySelector(".intro-text").style.height="1.52rem";
         this.isShowMore=!this.isShowMore;
      }
    },
    getAlbumComment(){
      var id = this.$route.params.id
      getAlbumComment({
        params:{
          id,
          limit:20,
        }
      }).then((res)=>{
        let { data } = res;
        if(data.code == 200){
          this.hotCommentData = data.hotComments;
          
        }
      })
    },
  },
 
}
</script>

<style lang="scss" scoped>
.album-top{
  .top-bg{
    display:flex;
    padding:60px 20px 60px 30px;
    height:268px;
    overflow:hidden;
    .img-title{
      position:relative;
      display:flex;
      height:100%;
      width:268px;
      margin-right:50px;

      .ablumImg-bg{
        position:absolute;
        height:268px;
        width:268px;
        top:0;
        left:56px;
        background:url('~@/assets/img/disc.png') no-repeat 0 center / 100% 100%;
      }
      img{
        z-index:99;
      }
      span{
        position:absolute;
        top:15px;
        left:0;
        font-size:20px;/*px*/
        line-height:36px;/*px*/
        text-align:center;
        color:#fff;
        background-color:rgba(217,48,48,.8);
        border-bottom-right-radius:20px;
        border-top-right-radius:20px;
        padding:0 10px;
        z-index:999;
      }
    }
  }
  .text{
    padding:25px 0 0 25px;
    .album-name{
      font-size:36px;/*px*/
      color:#fff;
      padding-bottom:25px;
    }
    .album-singer{
      font-size:28px;/*px*/
      line-height:40px;/*px*/
      color:#fff;
      span{
        color:#858c97;
      }
    }
    .album-time{
      font-size:26px;/*px*/
      line-height:40px;/*px*/
      color:#858c97;
    }
  }
}
.ablum-intro{
  position: relative;
  height: 100%;
  padding:20px 20px 0 30px;
  font-size: 28px;/*px*/
  line-height:40px;/*px*/
  color:#666;
  margin-bottom: 42px;
  .intro-text{
    height: 150px;
    overflow:hidden; 
  }
  .fa-angle-down,.fa-angle-up{
    position: absolute;
    bottom:-42px; 
    right:22px;
    font-size: 46px;/*px*/
    color:#666;
  }
}
.title{
  line-height:48px;
  font-size:26px;
  color:#666;
  padding-left:26px;
  background:#eeeff0;
}
.song-list{
  li{
    a{
      display: flex;
      justify-content: space-between;//两端对齐
      padding-bottom:20px;
    }
  }
  .text{
    display:flex;
    .sequence{
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:28px;/*px*/
      color:#888;
      
    }
    .songSinger{
      padding-left:30px;
      .name{
        font-size:34px;/*px*/
        line-height:40px;/*px*/
      }
      .singer{
        font-size:26px;/*px*/
        line-height:40px;/*px*/
        color:#888;
      }
    }
  }
  .fa-play-circle-o{
    display:flex;
    align-items:center;
    font-size:50px;/*px*/
    padding-right:40px;
    color:#999;
  }
}
.comment-list{
  display:flex;
  flex-flow: wrap;
  padding:20px 30px 0 30px;
  li{
    width:100%;
    padding-bottom:30px;
    .information{
      display:flex;
      justify-content: space-between;
      align-items:center;
    }
    .pic-text{
      display:flex;
      justify-content: space-between;
      padding-top:0;
      .photo img{
        width:66px;
        height:66px;
        border-radius:50%;
      }
      .text{
        display:inline;
        margin-left:20px;
        padding-top:0px;
      }
      .name{
        font-size:30px;/*px*/
        line-height:40px;/*px*/
        color:#666;
      }
      .time{
        font-size:20px;/*px*/
        line-height:30px;/*px*/
        color:#999;
      }
    }
    .likedCount{
      display:flex;
      align-items:center;
      .count{
        font-size:20px;/*px*/
        margin-right:8px;
        font-style:normal;
        color:#999;
      }
      .fa-thumbs-o-up{
        font-size:26px;/*px*/
        color:#999;
      }
    }
    .comment-content{
        font-size:26px;/*px*/
        line-height:36px;/*px*/
        margin:20px 0 0 60px;
        padding-bottom:30px;
        border-bottom:#dfdfdf 1px solid;
    }
  }
}
</style>