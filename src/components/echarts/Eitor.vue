<template>
    <div>
      <el-scrollbar height="600px">
      <el-button type="primary" @click="onSubmit">插入图片</el-button>
      <el-button type="primary" @click="left">左对齐</el-button>
      <el-button type="primary" @click="center">居中对齐</el-button>
      <div style="height: 10px;"></div>
      <div class="editor">
  
        <div contenteditable="true" ref="editor" @input="handleInput" v-html="content"
          style="min-height: 200px;;border: none;outline-style: none; font-size: 20px;"></div>
      </div>
      <input v-show="false" ref="fileRef" type="file" @change="fileChange" multiple="multiple">
      <el-button type="primary" @click="fabu" style="width: 100%;">发布</el-button>
      <div class="image-preview">
        <img v-for="(image, index) in images" :src="image" :key="index" alt="Pasted Image">
      </div>
    </el-scrollbar>
    </div>
  </template>
  
  <script>
  
  export default {
  
    data() {
      return {
        content: '',
        images: [],
      };
    },
    props: {
          editorClass: {
              type: String,
              default: ''
          },
          token: {
              type: String,
              default: 'upload'
          },
      },
    methods: {
      fabu() {
       // console.log(this.$refs.editor.innerHTML);
       this.images.forEach(element => {
        urlToBase64(element).then(res => {
          // 转化后的base64图片地址
          console.log('base64', res)
        })
       });
       
  
      },
      center() {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        //console.log(range.startContainer)
        // let img=range.startContainer.getElementsByTagName('img');
        //  console.log(img.length);
        // range.startContainer.setAttribute("style", "text-align:center;");
        if (range.startContainer.parentElement.tagName === 'DIV') {
          // range.startContainer.style.text-align='center';
          range.startContainer.setAttribute("style", "text-align:center;");
        } else {
  
  
          range.startContainer.parentElement.setAttribute("style", "text-align:center;");
        }
  
        // if(range.startContainer.getElementsByTagName('img').length==0){
        //   range.startContainer.parentElement.setAttribute("style", "text-align:center;");
        // }else{
        //   range.startContainer.setAttribute("style", "text-align:center;");
        // }
  
  
      },
      left() {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        console.log(range.startContainer)
        if (range.startContainer.parentElement.tagName === 'DIV') {
          range.startContainer.setAttribute("style", "text-align:left;");
  
        } else {
          range.startContainer.parentElement.setAttribute("style", "text-align:left;");
        }
  
        // if (range.startContainer.getElementsByTagName('img').length == 0) {
        //   range.startContainer.parentElement.setAttribute("style", "text-align:left;");
        // } else {
        //   range.startContainer.setAttribute("style", "text-align:left;");
        // }
  
  
  
      },
      handleInput(event) {
        // this.content = event.target.innerHTML;
        const editor = this.$refs.editor;
        let p = editor.getElementsByTagName('p');
        if (p.length == 0) {
          const p = document.createElement('p');
  
          p.innerHTML = editor.innerHTML;
          editor.innerHTML = "";
          editor.append(p);
        }
        var inputArray = editor.getElementsByTagName('img');
        for (let i = 0; i < inputArray.length; i++) {
          if (inputArray[i].src.indexOf('base64') != -1) {
            inputArray[i].remove();
          }
        }
        this.images = [];
        for (let i = 0; i < inputArray.length; i++) {
          this.images.push(inputArray[i].src);
        }
      },
      onSubmit() {
        this.$refs.fileRef.dispatchEvent(new MouseEvent('click'))
      },
      fileChange(e) {
        for (let i = 0; i < e.target.files.length; i++) {
          const imageUrl = URL.createObjectURL(e.target.files[i]);
          this.images.push(imageUrl);
          this.insertImageAtCaret(imageUrl)
        }
      },
      pasteImage(event) {
        // 处理粘贴图片
        const items = (event.clipboardData || event.originalEvent.clipboardData).items;
        for (const item of items) {
          if (item.kind === 'file' && item.type.includes('image')) {
            const blob = item.getAsFile();
            const imageUrl = URL.createObjectURL(blob);
            this.insertImageAtCaret(imageUrl)
          }
        }
      },
      insertImageAtCaret(imageUrl) {
        let editor = this.$refs.editor;
        const img = document.createElement('img');
        img.src = imageUrl;
        img.setAttribute("style", "width:80%;");
        const p = document.createElement('p');
        p.append(img);
        // 插入图片并将光标移到图片之后
        editor.focus();
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        range.insertNode(p);
        range.setStartAfter(img);
        //range.setEndContainer(img);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        // 更新编辑器内容
        // this.content = editor.innerHTML;
  
        //  range.insertNode(img);
        //         range.setStartAfter(img);
        //         range.collapse(true);
        //         selection.removeAllRanges();
        //         selection.addRange(range);
  
        var inputArray = editor.getElementsByTagName('img');
        this.images = [];
        for (let i = 0; i < inputArray.length; i++) {
          this.images.push(inputArray[i].src);
        }
  
      },
      getImageBase64(blob) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = () => {
            const base64 = reader.result;
            resolve(base64);
          }
          reader.onerror = error => reject(error);
        });
      },
  
  
    },
    mounted() {
      // 监听粘贴事件
      this.$refs.editor.addEventListener('paste', this.pasteImage);
      // this.content = this.$refs.editor.innerHTML;
  
    },
    watch: {
      "content"(newVal, oldVal) {
  
        console.log("hellow  world");
      }
  
    }
  };
  function urlToBase64(url) {
    return new Promise((resolve, reject) => {
      let image = new Image();
      image.onload = function () {
        let canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth;
        canvas.height = this.naturalHeight;
        // 将图片插入画布并开始绘制
        canvas.getContext('2d').drawImage(image, 0, 0);
        // result
        let result = canvas.toDataURL('image/png')
        resolve(result);
      };
      // CORS 策略，会存在跨域问题https://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror
      image.setAttribute("crossOrigin", 'Anonymous');
      image.src = url;
      // 图片加载失败的错误处理
      image.onerror = () => {
        reject(new Error('urlToBase64 error'));
      };
    })
  }
  </script>
  
  <style scoped>
  /* 可选的样式 */
  .editor {
    border: 1px solid #ccc;
    padding: 10px;
    min-height: 200px;
    /* max-height: 600px; */
    margin-bottom: 10px;
  }
  
  .image-preview img {
    max-width: 100%;
    max-height: 200px;
  }
  </style>
  
  