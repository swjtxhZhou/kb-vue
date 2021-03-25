<template>
    <div>
      <el-row class="caseCss">
        <!--        案例名称应该是一个输入-->
        <el-col :span="3" offset="3">
          <p >案例编号：</p>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="请输入内容" v-model="caseInfo.caseNumber" autosize="true" type="textarea">
          </el-input>
        </el-col>
      </el-row>
      <div style="margin: 10px 0;"></div>
      <el-row class="caseCss">
        <!--        案例名称应该是一个输入-->
        <el-col :span="3" offset="3">
          <p >案例名称：</p>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="请输入内容" v-model="caseInfo.caseName" autosize="true" type="textarea">
          </el-input>
        </el-col>
      </el-row>
      <div style="margin: 10px 0;"></div>
      <el-row class="caseCss">
        <el-col :span="3" offset="3">
          <p>案例大类：</p>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="请输入内容" v-model="caseInfo.belongtoCase" autosize="true" type="textarea">
          </el-input>
        </el-col>
      </el-row>
      <div style="margin: 10px 0;"></div>
      <el-row class="caseCss">
        <el-col :span="3" offset="3">
          <p>问题描述：</p>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="请输入内容" v-model="caseInfo.problemDescription" autosize="true" type="textarea">
          </el-input>
        </el-col>
      </el-row>
      <div style="margin: 10px 0;"></div>
      <el-row class="caseCss">
        <el-col :span="3" offset="3">
          <p>解决方案：</p>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="请输入内容" v-model="caseInfo.problemSolution" autosize="true" type="textarea">
          </el-input>
        </el-col>
      </el-row>
      <div style="margin: 10px 0;"></div>
      <el-row class="caseCss">
        <el-col :span="3" offset="3">
          <p>风险提示：</p>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="请输入内容" v-model="caseInfo.riskWarning" autosize="true" type="textarea">
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
            <el-button size="small" type="primary" >点击上传</el-button>
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
          <el-button size="medium" type="primary" @click="updateCase">上传案例</el-button>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import axios from "axios"
export default {
  name: "caseUpload",
  data () {
    return {
      caseInfo: {
        caseNumber: "",
        caseName: "",
        belongtoCase: "",
        problemDescription: "",
        problemSolution: "",
        riskWarning: "",
        attachment: ""
      },
      staticCaseInfo: {
        caseNumber: "1",
        caseName: "侵限绝缘设计错误",
        belongtoCase: "审图案例",
        problemDescription: "2015年3月份某站审图，发现D1053处绝缘节设计错误。设计图中D1053座标距信号楼766，" +
          "而1057#道岔警冲标座标为740，D1053绝缘节应为侵限绝缘。同时D1053按左侧设计，将侵入限界。显然存在设计错误。",
        problemSolution: "D1053绝缘节按侵限绝缘设计，同时D1053改右侧设置。",
        riskWarning: "审图工作需要对照设计规范，掌握标准。不能停留在表面，要深入计算设计中参数是否正确，要逐项参数进行比对和确认。警冲标座标容易出错，要学会计算。",
        attachment: "../static/案例图片/1_1.jpg"
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
    updateCase () {
      // let that = this
      let info = {}
      info["case"] = this.caseInfo
      axios.post("http://localhost:9001/case/addCase", info, {
        headers: {
          "Content-Type": "text/plain; charset=UTF-8"
        },
        timeout: 30000
      }).then(function (response) {
        if (response.data.code === 200) {
          alert("案例上传成功")
          // this.caseInfo = ""
        } else {
          alert(response.data.message + "请修改格式继续上传")
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
