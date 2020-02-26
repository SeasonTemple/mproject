export let getWeather = function() {
  console.log('调用getWeather方法获取天气');
  (function(a,h,g,f,e,d,c,b){b=function(){d=h.createElement(g);c=h.getElementsByTagName(g)[0];d.src=e;d.charset="utf-8";d.async=1;c.parentNode.insertBefore(d,c)};a["SeniverseWeatherWidgetObject"]=f;a[f]||(a[f]=function(){(a[f].q=a[f].q||[]).push(arguments)});a[f].l=+new Date();if(a.attachEvent){a.attachEvent("onload",b)}else{a.addEventListener("load",b,false)}}(window,document,"script","SeniverseWeatherWidget","//cdn.sencdn.com/widget2/static/js/bundle.js?t="+parseInt((new Date().getTime() / 100000000).toString(),10)));
  window.SeniverseWeatherWidget('show', {
    flavor: "slim",
    location: "WM6N2PM3WY2K",
    geolocation: true,
    language: "auto",
    unit: "c",
    theme: "dark",
    token: "dd74f6a3-1b93-4a5b-93a6-ef6767178ccb",
    hover: "enabled",
    container: "tpWeatherWidget"
  })
  console.log('调用完毕！');
}

export let appendCss = () => {
  var t = document.getElementById('tpWeatherWidget');
  t.style.cssText = 'background:transparent;height:79px;line-height:79px;position:absolute;text-align:center;left:90px;';
}