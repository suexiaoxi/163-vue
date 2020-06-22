<template>
  <div>
    <app-nav :activeIndex="1"></app-nav>
    <div>
      <div class="hot-top">
        <div class="hot-icon">
          <img src="@/assets/img/hot-icon.png">
        </div>
        <div class="update">更新日期：{{ hotDate(updateTime) }}</div>
      </div>
      <ul class="newSong-list">
        <li v-for="(item,index) in hotData.slice(0,19)" :key="item.id">
          <router-link :to="'/song/' + item.id">
            <div class="text">
              <div class="sequence" :class="{ active: index < 3 }">{{ getIndex(index + 1) }}</div>
              <div class="name-singer">
                <div class="name">{{ item.name }}
                  <i class="originSing" style="color:#888"> {{ item.alia[0]  != null ?  '('+item.alia[0] + ')' : '' }}</i>
                </div>
                <div class="singer">{{ item.ar[0].name != null ? item.ar[0].name : '' }} - {{ item.al.name }}</div>                
              </div>

            </div>
            <i class="fa fa-play-circle-o"></i>              
          </router-link>
        </li>
      </ul>
      <div class="complete"><span>查看完整榜单></span></div>
    </div>
  </div>
</template>

<script>
import appNav from '@/components/app-nav'
import { getHot } from '@/api/hot'
import { hotDate } from '@/utils/date.js';


export default {
  created() {
    this.getHot();
  },
  data() {
    return {
      hotData: [], //热歌榜数据
      updateTime:0,
    }
  },
  methods: {
    hotDate,
    getHot() {
      getHot({
        params: {
          idx:1,
        }
      }).then((res) => {
        let { data } = res;
        if (data.code == 200) {//成功
          console.log(data)
          this.hotData = data.playlist.tracks;
          this.updateTime = data.playlist.updateTime;
        }
      })
    },
    getIndex(x){
      return x < 10 ? '0' + x : x;
    }

  },
  components: {
    appNav,
  }
}
</script>

<style lang="scss" scoped>
.hot-top{
	position:absolute;
	width:750px;
	height:292px;
	padding-left:40px;
	background: url('~@/assets/img/hot-bg.jpg') no-repeat 0 0 / 100% 100%; 
	.hot-icon{
		position:relative;
		width:332px;
		height:194px;
		top:51px;
		left:0;
	}
	.update{
		margin-top:25px;
		font-size:24px;/*px*/
		color:#ecdcd8;
	} 
}
.newSong-list{
  padding-top:292px;
}
.text{
  display: flex;
  justify-content: space-between; 
  .sequence{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    font-size: 26px;/*px*/
    color: #888888;
  }
  .active{
    color: #df3436;
  }
}
.complete{
	display:flex;
	height:110px;
	justify-content:center;
	align-items:center;
	font-size:28px;/*px*/
	color:#999;
}
</style>






