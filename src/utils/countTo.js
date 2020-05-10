import CountToComponent from 'vue-count-to';

const countTo={
    install:function(Vue){
        Vue.component('CountTo',CountToComponent)
    }  //'Loading'这就是后面可以使用的组件的名字，install是默认的一个方法
};

export default countTo;