import {
  WOW
} from 'wowjs';

export let wow = ({
  boxClass = 'wow',
  offset = 0,
  mobile = true,
  live = true,
  callback = (args) => {},
  scrollContainer = null
}) => {
  let w =new WOW({
    boxClass: boxClass,
    animateClass: 'animated',
    offset: offset,
    mobile: mobile,
    live: live,
    callback: callback,
    scrollContainer: scrollContainer
  })
  w.init();
}
