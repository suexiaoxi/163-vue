<template>
  <div>
    <div class="top">
      <img :src="artistsData.picUrl" alt="">
      <div class="top-text">
        <p class="name">{{artistsData.name}}</p>
        <p class="list">歌手榜华语地区 NO.</p>
        <p class="follow">粉丝 {{(artistsData.followed/1000).toFixed(1)+"万"}}</p>
        </div>
      </div>
      <h3 class="intro-title">歌手简介</h3>
      <div class="intro">{{artistsData.briefDesc}}</div>
      <div>
        <h3 class="intro-title">热门单曲</h3>
        <ul class="hotSong-list">
            <li v-for="(item,index) in hotSongs.slice(0,5)" :key="item.id">
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
      
        <div>
          <h2 class="newSong">最新音乐</h2>
          <router-link :to="`/album/${artistsAlbumData.id}`">
            <div class="album">
              <img :src="artistsAlbumData.picUrl" alt="" />
              <div class="ablumImg-bg"></div>
              <div class="album-name">
                <div class="album-realy-name">
                  <span>{{ artistsAlbumData.name }}</span>
                </div>
                <div class="album-artist-name" v-if="artistsAlbumData.artist != null">{{ artistsAlbumData.artist.name }}</div>
                <div class="songsNum">{{artistsAlbumData.size}}首 {{parseDate(artistsAlbumData.publishTime)}}</div>
              </div>
            </div>
          </router-link>
        </div>
        
    </div>
  </div>
</template>

<script>
import { getArtists,getArtistsDesc,getArtistsAlbum } from '@/api/search'
import { parseDate } from '@/utils/date.js'
export default {
  data() {
    return {
      artistsData:[],//歌手数据
      briefDesc:{},//歌手简介
      hotSongs:[],//热门单曲数据
      artistsAlbumData:{
        picUrl:'',
        name:'',
        artist:'',
      },//专辑数据
    };
  },
  created() {
    this.getArtists();
    this.getArtistsDesc();
    this.getArtistsAlbum();
  },
  methods: {
    parseDate,
    getArtists(){//获取歌手详情接口
      var id = this.$route.params.id;
      getArtists({//使用接口
        params:{//传参
          id
        }
      }).then(res=>{
        let {data} = res;
        if(data.code == 200){
          this.artistsData = data.artist;
          this.hotSongs = data.hotSongs;//热门单曲
        }
      })
    },
    getArtistsDesc(){//获取歌手miaoshu接口
      var id = this.$route.params.id;
      getArtistsDesc({//使用接口
        params:{//传参
          id
        }
      }).then(res=>{
        let { data } = res;
        if(data.code == 200){
          this.briefDesc = data.briefDesc;
        }
      })
    },
    getArtistsAlbum() {
      var id = this.$route.params.id
      getArtistsAlbum({
        params: {
          id,
        }
      }).then((res) => {
        let { data } = res;
        if (data.code == 200) {
          this.artistsAlbumData = data.hotAlbums[0];
        }
      })
    },
  },
  watch: {
    
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
.top{
  position:relative;
  .top-text{
    position:absolute;
    bottom:60px;
    left:34px;
    color:#fff;
    .name{
      font-size:42px;/*px*/
      line-height:88px;/*px*/
    }
    .list{
      font-size:26px;/*px*/
      line-height:40px;/*px*/
      
    }
    .follow{
      font-size:26px;/*px*/
      line-height:40px;/*px*/
    }
  }
}
.intro-title{
  font-size:30px;/*px*/
  line-height:30px;/*px*/
  padding:45px 0 40px 30px;
}
.intro{
    font-size:26px;/*px*/
    line-height:40px;/*px*/
    color:#666;
    padding:0 50px 80px 30px;
}
.hotSong-list{ 
  li{
    padding-left:32px;
    a{
      display: flex;
      justify-content: space-between;//两端对齐
      padding-bottom:20px;
    }
  } 
  .text{
    display:flex;
    justify-content: space-between; 
  }
  .sequence{
    display:flex;
    align-items:center;//上下居中
    padding-right:28px;
    font-size:30px;/*px*/
    color:#999;
  }
  .name{
    font-size:34px;/*px*/
    line-height:44px;/*px*/
    color:#333;
  }
  .singer{
    font-size:22px;/*px*/
    line-height:40px;/*px*/
    color:#999;
  }
  .fa-play-circle-o{
    display:flex;
    align-items:center;
    font-size:50px;/*px*/
    padding-right:40px;
    color:#999;
  }
}
.newSong{
  font-size:30px;/*px*/
  padding:15px 0 30px 30px;
  border-top:20px solid #fcfcfd;
}
//最新音乐
.album{
  position:relative;
  display:flex;
  height:200px;
  background: #fff;
  box-sizing:border-box;
  padding-left:30px;
  img{
    width:160px;
    height:160px;
    border-radius:10px;
    z-index:22;
  }
  .ablumImg-bg{
    position:absolute;
    height:160px;
    width:160px;
    top:0;
    left:60px;
    background:url('~@/assets/img/disc.png') no-repeat 0 center / 100% 100%;
  }
  .album-name{
    font-size:30px;/*px*/
    padding:20px 0 0 50px;
    color:#333;
  }
  .album-artist-name,.songsNum{
    font-size:24px;/*px*/
    color:#888;
  }
}
</style>

