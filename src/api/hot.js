import require from '@/utils/require';

//热歌榜接口
export function getHot(oParams){
  return require.get('/top/list', {
    params: oParams.params
  });
};