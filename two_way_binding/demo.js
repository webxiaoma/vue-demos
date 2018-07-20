
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
    defineReactive(dat,key,data[key])
  })
}




/*
创建消息订阅器 Dep

*/ 

function Dep(){
    this.subs = [];
}

Dep.prototype = {
    addSub(sub){
       this.subs.push(sub)
    },
    notify(){
       this.subs.forEach(sub=>{
           sub.updata();
       })
    }
}



/*
创建订阅者 Watcher

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
        let value = this.vm.data[this.key]
        let oldVal = this.value
        if(value !== oldVal){
            
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
Compile 的实现 以下几个功能

1.解析模板指令，并替换模板数据，初始化视图

2.将模板指令对应的节点绑定对应的更新函数，初始化相应的订阅器


*/ 

function   nodeToFragment(el){  // 建一个fragment片段，将需要解析的dom节点存入fragment片段里再进行处理(提高性能)
    let fragment = document.createDocumentFragment();
    let child  = el.firstElementChild

    while(child){
        fragment.appendChild(child)
        child = el.firstChild
    }

    return fragment;

}

let root = document.getElementById("root")


function compileElement(el){
    let childNodes = el.childNodes
    Array.prototype.slice.call(childNodes).forEach(node=>{
         let reg = /\{\{(.*)\}\}/;
         var text = node.textContent
         console.log(node.childNodes)
 
         if(node.nodeType ===1 && reg.test(text)){

         }

         if(node.childNodes && node.childNodes.length){
            compileElement(node)
         }
    })
}


compileElement(nodeToFragment(root))



/**
 * 
 * 
 * 接下来我们要讲Observe 数据监听器和 Watcher 订阅者关联起来
 */


