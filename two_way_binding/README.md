# vue的双向绑定

(vue相关文章阅读)[https://www.kancloud.cn/webxiaoma/vue/703363]


#### 一、单项绑定与双向绑定

> 单项绑定: 即我们将Model(也就是数据) 绑定到view (前端一般为网页) ，当我们用JavaScript代码更新Model时，View就会自动更新

> 双向绑定: 数据模型（Module）和视图（View）之间的双向绑定, 也就是用户在视图上的修改会自动同步到数据模型中去，同样的，如果数据模型中的值发生了变化，也会立刻同步到视图中去。


#### 二、Vue 中实现的双向数据绑定的思路


vue 中实现是通过 `数据劫持 + 发布订阅者模式` 来实现双向绑定的。接下来我们先整体大概来了解一下vue中的实现双向绑定的整体思路。然后在上代码。

vue双向绑定的整体思路可以用一下图片来展示：

![vue双向绑定](https://github.com/webxiaoma/vue-demos/img/2.png)


实现`vue` MVVM模式的具体思路如下:

1. 实现Observer 监听器：

`Observer` 监听器主要作用是使用 ` Object.defineProperty() `来实现对属性的劫持并监听，也就是给vue data对象中的每一个属性添加 `getter` 和 `setter`, 在属性触发get时，添加订阅者，在触发set时，通知订阅者



2. 实现 Dep 消息订阅器：

Dep 消息订阅器的作用是存储所有订阅者，同时接受Observer 监听器发出的消息，接受到消息后并对订阅者做一些处理（是添加订阅者还是批量通知订阅者）


3. 实现 Watcher 订阅者

Watcher 订阅者是Watcher订阅者作为Observer和Compile之间通信的桥梁，它主要的做的一些事是 

(1)在自身实例化时往属性订阅器(dep)里面添加自己;
(2)自身必须有一个update()方法;
(3)待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调，并更新视图。 


4. 实现 Compile 解析器：

Compile 解析器的作用主要是解析模板指令，将模板中的变量（如 {{ name }}）替换成数据或一些其他指令（如 v-show v-for v-if 等），然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者。这里也就是解析模板，并对模板中的每一个数据添加一个数据监听器对象(Watcher)。


5. 将以上几种方法整合，暴露出接口，生成可以实例化的入口函数(如 new Vue())


其实上边第一步就是vue所做的数据劫持，第二步和第三步就是实现发布订阅者模式，第四部是解析vue语法模板用的。




#### 二、Vue 中双向数据绑定的具体实现


1. **Observer 监听器的实现**

```JavaScript

function defineReactive(data,key,val){
    observe(val) // 递归遍历对象
    let dep = new Dep() // 创建Dep 实例
    Object.defineProperty(data,key,{
       enumerable:true,
       configurable:true,
       set(newVal){
            if(val === newVal){
                return 
            }
            val = newVal
            dep.notify(); // 通知Dep 发布消息
       },
       get(){
           if(Dep.target){ // 判断观察者Watcher 是否存在
               dep.addSub(Dep.target) // 添加观察者
           }
           return val 
       }
    })
   
}

function observe(data){
  if(!data || typeof data !== "object"){ // 判断传入的data是否为对象
      return
  }
  Object.keys(data).forEach(key=>{ // 遍历data对象中一级属性
    defineReactive(data,key,data[key])
  }) 
}


```


2. **Dep 消息订阅器 实现**

```JavaScript

function Dep(){
    this.subs = []; // 存储Watcher观察者
}

Dep.prototype = {
    addSub(sub){ // 添加观察者
       this.subs.push(sub)
    },
    notify(){ // 通知相关的所有订阅者
       this.subs.forEach(watch=>{
          watch.updata();
       })
    }
}


```

`Dep` 主要是收集订阅者的,并可以监听器的消息，来完成添加订阅者或是通知所有订阅者更新数据。


3. **Watcher 订阅者的实现**

```JavaScript

function Watcher(vm,key,callback){
    this.callback = callback;  // 存储观察者的回调函数
    this.vm = vm;  // 存储入口函数的实例this
    this.key = key; 
    this.value = this.get()  // 储存所观察对象的初始值
    
}

Watcher.prototype = {
    updata(){
        this.run();
    },
    run(){
        let value = this.vm.data[this.key] //获取变化后的属性值
        let oldVal = this.value // 获取旧属性值
        if(value !== oldVal){
            this.callback(value) // 调用回调函数并传入变化后的值更新视图
        }
    },
    get(){  // 该方法可以在初始化时，将Watcher 观察者初始化并添加到订阅其中
        Dep.target = this; 

        // 获取初始值时（这是实际是获取的vue实例中data中的初始值），会触发Observer监听器中的get方法
        let value = this.vm.data[this.key]  
        Dep.target = null;// 这里释放了Wahter 防止Watcher二次添加到订阅器中
        return value;
    }
}

```

关于Watcher 订阅者我们需要注意的是，除了发布的消息并及时更新视图外，他还有一个get方法，该方法的作用就是在初始化时将每一个订阅者添加到订阅器中收集起来。而触发订阅器添加（也就是触发Dep的addSub方法）观察者的方法是需要触发监听其中的get方法。也就是需要获取相应的属性值（对应上边 `let value = this.vm.data[this.key]`  ），这时就会触发get方法，并在订阅者初始化时将自己添加到Dep 订阅器中，添加完成后通过 `Dep.target = null` 将Dep.target释放，下次再执行该属性下的get方法时，不会重复添该属性对应的加观察者。同时Watcher还是Compile编译器和Observer 监听者之间的桥梁，通过Watcher可以把监听后的属性和Compil编译后的模板中的数据绑定起来，并在属性值变化时，更新模板中对应的数据。


4. **Compile 编译器的实现**

```JavaScript

function Compile(el,vm){ 
    this.vm = vm; // 存储vue实例this
    this.el = el  // 储存dom 根节点，vue实际上并非这么简单，还做的一些其他判断，判断是否是dom节点或是字符串
    if(el){
      this.$frag = this.nodeToFragment(el) // 将DOM节点转换为fragment 虚拟节点
      this.compileElement(this.$frag)  // 编译解析模板
    }
    el.appendChild(this.$frag) // 将编译后的虚拟DOM 添加到根节点
    return this.$frag;

}

Compile.prototype = {
    nodeToFragment(node){  //建一个fragment片段，将需要解析的dom节点存入fragment片段里再进行处理(提高性能)
        let fragment = document.createDocumentFragment();
        let child  = node.firstChild
        while(child){ // 循环将DOM节点添加到fragment 虚拟节点中
            fragment.appendChild(child)
            child = node.firstChild
        }

        return fragment;
    },

   // 编译解析模板，这里只解析了{{}}这样的模板，在该方法中还可以解析v-show v-if v-for v-module 等等一些模板
    compileElement(elFrag){ 
        let reg = /\{\{(.*)\}\}/;// 解析{{}} 这里只是简单的解析{{name}},并没有处理包含js简单代码的情况
        [].slice.call(elFrag.childNodes).forEach((node)=>{
            if(node.nodeType === 3){ // 节点类型为文本text类型
                if(reg.test(node.nodeValue)){ 
                    this.compileText(node,reg.exec(node.nodeValue)[1]) 
                }

            }
        })
      
    },
    compileText(node,exp){ // 将数据初始化，并生成订阅器实例（订阅者），并更新视图
        this.updateView(node,this.vm[exp])
        new Watcher(this.vm,exp,(value)=>{ // 当数据变化时将会执行回调函数，并更新视图
            this.updateView(node,value)
        })
        
    },
    updateView(node,value){ // 更新视图
        node.textContent = typeof value == 'undefined' ? '' : value;
    }
}

```

需要说明的是，这里的 `Complie`编译器只是简单的实现解析{{}}的模板，并且只解析了挂载点下的子节点，如果子节点中还含有{{}}，这里不能实现，这里重点说明vue数据的双向绑定原理。

5. **入口文件的实现**

```JavaScript

function SelfVue (obj){ // 入口文件 类似 new Vue()
    this.data = obj.data
    let el = document.querySelector(obj.el)
    this.$el = el
    // 这里我们目的是将data下的数据绑定到SelfVue实例上，通过实例可以直接访问
    Object.keys(obj.data).forEach(key=>{ 
        this.proxyDataKeys(key)
    })
    observe(obj.data) // 给data中的所有属性添加get和set
    new Compile(el,this) //编译初始模块

    return this

}

/* 
将SelfVue实例data属性上的数据绑定到SelfVue实例上 
例如：
let selfVue = new SelfVue({
    el:"#root",
    data:{
        name:'King',
    },
})

我们访问name属性，需要这样访问  selfVue.data.name
将SelfVue实例data属性上的数据绑定到SelfVue实例上后就可以这样访问  selfVue.name

*/
SelfVue.prototype =  { 
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
```

6. **[所有代码实例](https://github.com/webxiaoma/vue-demos/tree/master/two_way_binding)**



#### 推荐文章

1. [剖析vue实现原理](https://github.com/DMQ/mvvm#_2)