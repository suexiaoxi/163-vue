import require from '@/utils/require';

//推荐歌单接口
export function getPersonalized(oParams){
  return require.get('/personalized', {
    params: oParams.params
  });
};
export function getPlaylistDetail(oParams){
  return require.get('/playlist/detail', {
    params: oParams.params
  });
};
//歌单评论
export function getPlaylistComment(oParams){
  return require.get('/comment/playlist', {
    params: oParams.params
  });
};
//推荐新音乐接口
export function getPersonalizedNewsong(oParams){
  return require.get('/personalized/newsong', {
    params: oParams.params
  });
};