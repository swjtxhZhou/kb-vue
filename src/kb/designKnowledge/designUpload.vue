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
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
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
      fileList: [{
        name: "",
        url: ""
      }],
      name: "",
      url: "",
      index: ""
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
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
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
