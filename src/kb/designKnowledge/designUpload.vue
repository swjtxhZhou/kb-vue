<template>
  <div>
    <el-row class="caseCss">
      <!--        案例名称应该是一个输入-->
      <el-col :span="3" offset="3">
        <p >设计规范编号：</p>
      </el-col>
      <el-col :span="12">
        <el-input placeholder="请输入内容" v-model="designInfo.knowledgeNumber" autosize="true" type="textarea">
        </el-input>
      </el-col>
    </el-row>
    <div style="margin: 10px 0;"></div>
    <el-row class="caseCss">
      <!--        案例名称应该是一个输入-->
      <el-col :span="3" offset="3">
        <p >设计规范文档来源：</p>
      </el-col>
      <el-col :span="12">
        <el-input placeholder="请输入内容" v-model="designInfo.belongto" autosize="true" type="textarea">
        </el-input>
      </el-col>
    </el-row>
    <div style="margin: 10px 0;"></div>
    <el-row class="caseCss">
      <!--        案例名称应该是一个输入-->
      <el-col :span="3" offset="3">
        <p >设计规范来源大类：</p>
      </el-col>
      <el-col :span="12">
        <el-input placeholder="请输入内容" v-model="designInfo.belongtoKnowledge1" autosize="true" type="textarea">
        </el-input>
      </el-col>
    </el-row>
    <div style="margin: 10px 0;"></div>
    <el-row class="caseCss">
      <el-col :span="3" offset="3">
        <p>设计规范来源分小类：</p>
      </el-col>
      <el-col :span="12">
        <el-input placeholder="请输入内容" v-model="designInfo.belongtoKnowledge2" autosize="true" type="textarea">
        </el-input>
      </el-col>
    </el-row>
    <div style="margin: 10px 0;"></div>
    <el-row class="caseCss">
      <el-col :span="3" offset="3">
        <p>设计规范内容：</p>
      </el-col>
      <el-col :span="12">
        <el-input placeholder="请输入内容" v-model="designInfo.content" autosize="true" type="textarea">
        </el-input>
      </el-col>
    </el-row>
    <div style="margin: 10px 0;"></div>
    <el-row class="caseCss">
      <el-col :span="3" offset="3">
        <p>关键词：</p>
      </el-col>
      <el-col :span="12">
        <el-input placeholder="请输入内容" v-model="designInfo.keywords" autosize="true" type="textarea">
        </el-input>
      </el-col>
    </el-row>
    <div style="margin: 10px 0;"></div>
    <el-row class="caseCss">
      <!--        上传附件-->
      <el-col :span="3" offset="3">
        <p>附件</p>
      </el-col>
      <el-col :span="6">
        <el-upload
          class="upload-demo"
          :action="uploadUrl()"
          :on-change="handleChange"
          :file-list="fileList"
          name="file"
          :auto-upload="true"
          :data="upData"
          :on-error="uploadFalse"
          :on-success="uploadSuccess"
          :before-upload="beforeUpload"
          :limit="1">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <!--          <div v-for="(item,index) in fileList" :name="item.name" :url="item.url" :index="index">-->
        <!--            {{name}}{{url}}-->
        <!--          </div>-->
      </el-col>
    </el-row>
    <div style="margin: 30px 0;"></div>
    <el-row :gutter="20">
      <el-col :span="3" :offset="20">
        <el-button size="medium" type="primary" @click="updateDesign">上传设计规范</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "designUpload",
  data () {
    return {
      designInfo: {
        knowledgeNumber: "",
        belongto: "",
        belongtoKnowledge1: "",
        belongtoKnowledge2: "",
        content: "",
        attachment: "",
        keywords: ""
      },
      staticDesignInfo: {
        designId: "2.1.1",
        designBelongto1: "术语和符号",
        designBelongto2: "术语",
        content: "直向进路  route through turnout by straight track 无道岔或虽有道岔但均开通直向位置的列车进路或闭塞分区。",
        attachment: "./static/images/管理员头像.jpg"
      },
      fileList: [],
      files: []
    }
  },
  computed: {
    // 这里定义上传文件时携带的参数，即表单数据
    upData: function () {
      const info = { "designNumber": this.designInfo.knowledgeNumber }
      return info
    }
  },
  methods: {
    updateDesign () {
      let info = {}
      info["knowledge"] = this.designInfo
      axios.post("http://localhost:9001/design/addKnowledge", info, {
        headers: {
          "Content-Type": "text/plain; charset=UTF-8"
        },
        timeout: 30000
      }).then(function (response) {
        if (response.data.code === 200) {
          alert("设计规范上传成功")
        } else {
          alert("设计规范上传异常，请检查填写信息完整")
        }
      })
    },
    uploadSuccess (response, file, fileList) {
      if (response.data.code === 200) {
        alert(response.data.message)
      } else {
        alert(response.data.message)
      }
    },
    uploadFalse (response, file, fileList) {
      alert("案例信息上传失败，请重试")
    },
    beforeUpload (file) {
      // 上传前对文件的大小和类型的判断
      //   this.form.fileName = file.name
      const extension1 = file.name.split(".")[1] === "jpg"
      const extension2 = file.name.split(".")[1] === "gif"
      const extension3 = file.name.split(".")[1] === "png"
      const extension4 = file.name.split(".")[1] === "jpeg"
      if (!extension1 && !extension2 && !extension3 && !extension4) {
        this.$message({
          message: "上传文件只能是 jpg、jpeg、gif、png 格式!",
          type: "error"
        })
      }
      return extension1 || extension2 || extension3 || extension4
    },
    handleChange (file, fileList) {
      this.fileList = fileList.slice(-3)
    },
    getFile (item) {
      // console.log(item.file)
      this.files.push(item.file)
    },
    uploadUrl () {
      return "http://localhost:9001/design/designPicUpload"
    }
  }
}
</script>

<style scoped>
  .caseIdCss {
    /*height: 100px;*/
    margin-top: 20px;
    margin-left: 20px;
    margin-bottom: 10px;
    color: #2f6564;
    /*font-weight:bold;*/
    font-size: 15px;
  }
  .caseCss {
    color: #2f6564;
    /*font-weight:bold;*/
    font-size: 15px;
    margin-left: 20px;
    margin-top: 20px;
  }
</style>
