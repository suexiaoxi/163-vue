<template>
 <div>
 	<div class="list-top">
      <div  class="content" >
        <div class="top-bg"  :style="{ backgroundImage:  'url(http://music.163.com/api/img/blur/'+playlistData.coverImgId_str+')'}"></div>
        <div class="img-title">
          <img :src="playlistData.coverImgUrl" alt="">
          <span><i class="fa fa-headphones"></i>{{(this.playlistData.playCount/1000).toFixed(1)+"万"}}</span><!-- 耳机图标和播放数量 -->
          <span class="title">歌单</span>
        </div>

        <div class="intro-text">            
          <i class="playname">{{ playlistData.name }}</i>
          <div class="creator">
            <!----><img :src="playlistData.creator.avatarUrl" alt="">
            <i>{{ playlistData.creator.nickname}}</i>
          </div>
        </div>
      </div> 

      <div class="description">
        <ul class="tag">标签：
          <li v-for="(item,index) in playlistData.tags" :key="index">{{ item }}</li>
        </ul>
        <div class="intro" >
          <span class="intro">简介：{{playlistData.description}}</span>
        </div>
      </div>

      <div>
        <h3 class="listTitle">歌曲列表</h3> 
        <ul class="newSong-list">
          <li v-for="(item,index) in songsData" :key="item.id">
            <router-link :to="'/song/' + item.id">
              <div class="text">
                <div class="sequence">{{ index + 1 }}</div>
                <div class="songSinger">
                  <div class="name">{{ item.name }}
                    <i class="originSing"> {{ item.alia.name  != null ?  '('+item.alia.name + ')' : '' }}</i>
                  </div>
                  <div class="singer">{{ item.ar[0].name != null ? item.ar[0].name : '未知歌手' }} - {{ item.al.name }}</div>                
                </div>
              </div>
              <i class="fa fa-play-circle-o"></i>            
            </router-link>
          </li>
        </ul>
      </div>

      <div class="comment">
        <h4 class="listTitle">精彩评论</h4>
        <ul class="comment-list">
          <li v-for="item in hotCommentData" key="item.id">
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
import { getPlaylistDetail,getPlaylistComment } from '@/api/recommendation'; 
import { parseDate } from '@/utils/date.js';
export default {
	created(){
		this.getPlaylistDetail();
    this.getPlaylistComment();
	},

	data(){
		return {
			playlistData:{
        creator:'',
        name:'',
      },
      tags:[],//标签
      description:{},//简介
      //isShowMore:true,//是否显示更多
      //arrowStatus:true,//简介的箭头上下

      songsData:[],//歌曲列表数据

      hotCommentData:[],//精彩评论
      
		}
	},
	methods:{
    parseDate,
    //歌单内容
		getPlaylistDetail(){
			var id = this.$route.params.id
			getPlaylistDetail({//使用此接口
				params:{//传参
					id,
				}
			}).then((res)=>{
				let{ data } = res;
				if(data.code == 200){//表示成功
					this.playlistData = data.playlist;//得到数据
          this.tags = data.playlist.tags;//得到标签数据
          this.playlistData = data.playlist;
          this.songsData = data.playlist.tracks;
          this.description = data.playlist.description;//得到简介的数据
          if(description){
            this.descriptionArr = description.split(/\n/);//字符串转数组  换行
          }
          this.description = descriptionArr;
					console.log(data.playlist,111);
				}
			})
		},
    //简介

    //评论
    getPlaylistComment(){
      var id = this.$route.params.id
      getPlaylistComment({
        params:{
          id,
          limit:20,
        }
      }).then((res)=>{
        let { data } = res;
        if(data.code == 200){
          this.hotCommentData = data.hotComments;
          
          //this.getPlaylistComment = data.comments;
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
//头部
.list-top{
  .content{
    display: flex;
    position: relative;
    height:252px;
    padding:60px 20px 60px 30px;
    overflow:hidden;
  }
  .top-bg{
    position:absolute;
    left:0;
    top:0;
    height:100%;
    width:100%;
    filter:blur(70px);
    z-index:1;
    background-size:cover;
  }
  .img-title{
    display:flex;
    position:relative;
    height:100%;
    width:292px;
    z-index:999;
    margin-right:40px;
    span{
      position:absolute;
      right:1px;
      top:0;
      color:#fff;
      font-size: 22px;/*px*/
    }
    .fa-headphones{
      margin-right:6px;
    }
    .title{
      position:absolute;
      top:10px;
      left:0;
      padding:0 8px;
      width:70px;
      font-size:22px;/*px*/
      text-align: center;
      line-height: 34px;
      background-color: rgba(217,48,48,.8);
      border-top-right-radius: 18px;
      border-bottom-right-radius: 18px;
      z-index:3;
    }
  }
  .intro-text{
    z-index:5;
    color:#fff;
    .playname{
      color:#fefefe;
      font-size:36px;/*px*/
    }
    .creator{
      display:flex;
      height:60px;
      margin-top:40px;
      
      //overflow:hidden; 
      //white-space:nowrap; 
      //text-overflow:ellipsis; 
      img{
        width:60px;
        height:60px;
        border-radius:50%;
      }
      i{
        margin:10px 0 0 10px;
        font-size:28px;/*px*/
        color:#fff;
      }
    }
  } 
}

//标签和简介
.description{
  padding:20px 0 0px 30px;
  .tag{
    display:flex;
    flex-flow: wrap;
    font-size:26px;/*px*/
    line-height:36px;/*px*/
    margin-bottom:20px;
    li{
      display:flex;
      padding:0 20px;
      border:1px solid #d3d3da;/*no*/
      border-radius:32px;
      color:#333;
      margin-right:16px;
    }
  }
  .intro{
    display:flex;
    height:100%;
    overflow:hidden;
    margin-right:20px;
    font-size:26px;/*px*/
  }
}

//歌曲列表
.listTitle{
  line-height:46px;
  font-size:26px;
  color:#666;
  padding-left:26px;
  background:#eeeff0;
}
.newSong-list{
  li{
    padding-left:0;
  }
}
.text{
  display: flex;
  justify-content: space-between; 
  .sequence{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    font-size: 34px;/*px*/
    color: #888888;
  }
  .name{
    font-size:34px;/*px*/
    line-height:60px;/*px*/
  }
  .singer{
    font-size:24px;/*px*/
    line-height:40px;/*px*/
  }
}
//评论
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
        font-size:15px;/*px*/
        line-height:26px;/*px*/
        margin:30px 0 0 60px;
        padding-bottom:30px;
        border-bottom:#dfdfdf 1px solid;
    }
  }
}
	
</style>
