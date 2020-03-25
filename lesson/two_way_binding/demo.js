
// 使用 defineproperty() 劫持监听所有属性
// 实现Observer 数据监听器
function defineReactive(data,key,val){
    observe(val)
    let dep = new Dep()
    Object.defineProperty(data,key,{
       enumerable:true,
       configurable:true,
       set(newVal){
            if(val === newVal){
                return 
            }
            val = newVal
            dep.notify(); 
       },
       get(){
           if(Dep.target){
               dep.addSub(Dep.target)
           }
           return val 
       }
    })
   
}

function observe(data){
  if(!data || typeof data !== "object"){
      return
  }
  Object.keys(data).forEach(key=>{
    defineReactive(data,key,data[key])
  }) 
}




/*
创建消息订阅器 Dep

*/ 

function Dep(){
    this.subs = []; // 存储Watcher
}

Dep.prototype = {
    addSub(sub){
       this.subs.push(sub)
    },
    notify(){
       this.subs.forEach(watch=>{
          watch.updata();
       })
    }
}



/*
创建订阅者 Watcher
Watcher订阅者作为Observer和Compile之间通信的桥梁，主要做的事情是: 
1、在自身实例化时往属性订阅器(dep)里面添加自己 
2、自身必须有一个update()方法 
3、待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调，则功成身退。 

*/ 

function Watcher(vm,key,callback){
    this.callback = callback;
    this.vm = vm;
    this.key = key;
    this.value = this.get()
    
}

Watcher.prototype = {
    updata(){
        this.run();
    },
    run(){
        let value = this.vm.data[this.key] //获取变化后的属性值
        let oldVal = this.value // 获取旧属性值
        if(value !== oldVal){
            this.callback(value)
        }
    },
    get(){
        Dep.target = this;
        let value = this.vm.data[this.key]
        Dep.target = null;
        return value;
    }
}




/*
Compile(模板编译) 的实现 以下几个功能

1.解析模板指令，并替换模板数据，初始化视图

2.将模板指令对应的节点绑定对应的更新函数，初始化相应的订阅器


*/ 

function Compile(el,vm){ 
    this.vm = vm;
    this.el = el
    if(el){
      this.$frag = this.nodeToFragment(el) // 将DOM节点转换为fragment 虚拟节点
      this.compileElement(this.$frag)  // 编译解析模板
    }
    el.appendChild(this.$frag)
    return this.$frag;

}

Compile.prototype = {
    nodeToFragment(node){  //建一个fragment片段，将需要解析的dom节点存入fragment片段里再进行处理(提高性能)
        let fragment = document.createDocumentFragment();
        let child  = node.firstChild
        while(child){
            fragment.appendChild(child)
            child = node.firstChild
        }

        return fragment;
    },
    compileElement(elFrag){ // 编译解析模板
        let reg = /\{\{(.*)\}\}/;
        [].slice.call(elFrag.childNodes).forEach((node)=>{
            if(node.nodeType === 3){ // 节点类型为文本text类型
                if(reg.test(node.nodeValue)){
                    this.compileText(node,reg.exec(node.nodeValue)[1])
                }

            }
        })
      
    },
    compileText(node,exp){ // 将数据初始化，并生成订阅器（订阅者）
        this.updateView(node,this.vm[exp])
        new Watcher(this.vm,exp,(value)=>{
            this.updateView(node,value)
        })
        
    },
    updateView(node,value){ // 更新视图
        node.textContent = typeof value == 'undefined' ? '' : value;
    }
}




// 暴露接口，以及配置，初始化所有功能 （入口方法）

function SelfVue (obj){
    this.data = obj.data
    let el = document.querySelector(obj.el)
    this.$el = el
    Object.keys(obj.data).forEach(key=>{
        this.proxyDataKeys(key)
    })
    observe(obj.data)
    new Compile(el,this)

    return this

}


SelfVue.prototype =  { // 将SelfVue实例data属性上的数据绑定到SelfVue实例上
     proxyDataKeys(key){
        let self = this;
        Object.defineProperty(this,key,{
            enumerable:true,
            configurable:true,
            get(){
              return self.data[key]
            },
            set(newVal){
              self.data[key] = newVal
            }

        })
     }
}


