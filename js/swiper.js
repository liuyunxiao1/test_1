class Swiper {
    constructor(obj) {
        Object.assign(this, obj);
        //渲染数据图片
        this.render1();
         //渲染数据圆点
         this.render2();
        //自动轮播
        this.autoplay();
        //鼠标事件
        this.bindswiper();
        //封装切换函数
        this.show();
    }
    //渲染数据
    render1() {
        //渲染图片
        this.imglist.innerHTML = this.imgdate.map((item,index) => {
            return `<li><img src="${item}" alt=""></li>`
        }).join('')
        this.imglist.children[this.swiperindex].classList.add('imggl')
    }
    render2(){
        //渲染圆点
        this.yuanlist.innerHTML = this.yuandata.map((item) => {
            return `<li></li>`
        }).join('')
        //默认添加高亮
        this.yuanlist.children[this.swiperindex].classList.add('swiperactive')
    }
    //自动轮播
    autoplay() {
        //定时器
     this.timer = setInterval(() => {
            this.swiperindex++;
            this.show();
        }, 3000)
    }
    //封装切换函数
    show() {
       if(this.swiperindex>4){
        this.swiperindex=0;
       }
       if(this.swiperindex<0){
        this.swiperindex=4;
       }
       //获取高亮  删除  添加
       let imggl=document.querySelector('.imggl');
       imggl&&imggl.classList.remove('imggl');
       this.imglist.children[this.swiperindex].classList.add('imggl');
       //调用渲染
       this.render2();
    }

    //鼠标事件
    bindswiper(){
        //1.移入 swiper 轮播图停止
        this.swiper.onmouseover=()=>{
            clearInterval(this.timer);
            this.prev.style.display = 'block';
            this.next.style.display = 'block';
        }
        //2.移出 swiper 轮播图继续
        this.swiper.onmouseout=()=>{
            this.autoplay();
            this.prev.style.display = 'none';
            this.next.style.display = 'none';
        }
        //3.左右按钮切换
        this.next.onclick=()=>{
            this.swiperindex++;
            this.show();
        }
        this.prev.onclick=()=>{
            this.swiperindex--;
            this.show();
        }
        //4.圆点点击
        this.yuanlist.onclick=(e)=>{
            let tar = e.target;
            //判断
            if(tar.tagName == 'LI'){
                this.swiperindex = [...this.yuanlist.children].indexOf(tar);
                this.show();
            }
        }
    }
}
new Swiper({
    imgdate: [...imgdate],
    yuandata: [...yuandata],
    swiperindex: 0,
    imglist: document.querySelector('.imglist'),
    yuanlist: document.querySelector('.yuanlist'),
    swiper: document.querySelector('.swiper'),
    prev: document.querySelector('.prev'),
    next: document.querySelector('.next'),
})