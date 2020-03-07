import {
  WOW
} from 'wowjs';
/**
 * 导入Wow.js，对其初始化配置进行简单的封装，使其更加便于使用。
 */
export let wow = () => new WOW({
  offset: 0,
  mobile: true,
  live: false,
  callback: () =>{},
  scrollContainer: null
});