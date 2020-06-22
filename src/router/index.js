import Vue from 'vue'
import Router from 'vue-router'
import recommendationIndex from '@/views/recommendation/'
import playlistIndex from '@/views/recommendation/playlist'
import songIndex from '@/views/song/'
import searchIndex from '@/views/search/'
import hotIndex from '@/views/hot/'
import artistsIndex from '@/views/search/artists'
import albumIndex from '@/views/search/album'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'recommendation Index',
      component: recommendationIndex
    },
    {
      path: '/playlist/:id',
      name: 'playlist index',
      component: playlistIndex
    },
    {
      path: '/song/:id',
      name: 'play song',
      component: songIndex
    },
    {
      path: '/search',
      name: 'search index',
      component: searchIndex
    },
    {
      path: '/hot',
      name: 'hot index',
      component: hotIndex
    },
    {
      path: '/artists/:id',
      name: 'artists index',
      component: artistsIndex
    },
    {
      path: '/album/:id',
      name: 'album index',
      component: albumIndex
    }
  ]
})
