<template>
<!--    输入案例编号查询到案例后，对案例进行更行操作-->
<!--    包含的组件有，输入组件+查询组件+展示组件（可编辑）+更行按钮-->
    <div>
      <el-row :gutter="20">
        <el-col :span="6" :offset="3">
          <el-input v-model="inputCaseId" placeholder="请输入案例 ID"></el-input>
        </el-col>
        <el-col :span="3">
          <el-button size="medium" type="primary" @click="searchCaseId">查询案例</el-button>
        </el-col>
        <el-col :span="3">
          <el-button size="medium" type="success" @click="updateCase">更新案例</el-button>
        </el-col>
        <el-col :span="3">
          <el-button size="medium" type="warning" @click="deleteCase">删除案例</el-button>
        </el-col>
      </el-row>
      <el-row class="caseIdCss">
        <el-col :span="6" :offset="3">
          <p>案例 ID：</p>
        </el-col>
        <el-col :span="3">
          <p>{{caseInfo.id}}</p>
        </el-col>
      </el-row>
      <div style="margin: 10px 0;"></div>
      <el-row class="caseCss">
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
      <el-row  class="caseCss">
        <el-col :span="3" offset="3">
          <div>
            <p>附件：</p>
          </div>
        </el-col>
        <el-col>
          <div >
            <el-image class="attachmentLocate"
              :src=caseInfo.attachment
              :fit="scale-down"></el-image>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import axios from "axios"

export default {
  name: "caseManage",
  data () {
    return {
      searchInfo: {
        caseId: "1",
        caseName: "侵限绝缘设计错误",
        caseBelongto: "审图案例",
        problemDescription: "2015年3月份某站审图，发现D1053处绝缘节设计错误。设计图中D1053座标距信号楼766，而1057#道岔警冲标座标为740，D1053绝缘节应为侵限绝缘。同时D1053按左侧设计，将侵入限界。显然存在设计错误。",
        problemSolution: "D1053绝缘节按侵限绝缘设计，同时D1053改右侧设置。",
        riskWarning: "审图工作需要对照设计规范，掌握标准。不能停留在表面，要深入计算设计中参数是否正确，要逐项参数进行比对和确认。警冲标座标容易出错，要学会计算。",
        attachment1: "../static/案例图片/1_1.jpg",
        attachment2: ""
      },
      caseInfo: {
        id: "",
        caseNumber: "",
        caseName: "",
        belongtoCase: "",
        problemDescription: "",
        problemSolution: "",
        riskWarning: "",
        attachment: ""
      },
      inputCaseId: ""
    }
  },
  methods: {
    searchCaseId () {
      var that = this
      var info = {}
      info["id"] = this.inputCaseId
      axios.post("http://localhost:9001/case/searchCaseByID", info, {
        headers: {
          "Content-Type": "text/plain; charset=UTF-8"
        },
        timeout: 30000
      }).then(function (response) {
        if (response.data.code === 200) {
          alert("案例查询成功")
          that.caseInfo = response.data.data.caseInfo
        } else {
          alert(response.data.message)
        }
      })
    },
    updateCase () {
      let that = this
      let info = {}
      info["case"] = this.caseInfo
      axios.post("http://localhost:9001/case/updateCase", info, {
        headers: {
          "Content-Type": "text/plain; charset=UTF-8"
        },
        timeout: 30000
      }).then(function (response) {
        if (response.data.code === 200) {
          alert("案例更新成功")
          that.inputCaseId = ""
          that.caseInfo = ""
        } else {
          alert("案例更新异常，请检查填写信息完整")
          that.inputCaseId = ""
          that.caseInfo = ""
        }
      })
    },
    deleteCase () {
      let that = this
      let info = {}
      info["case"] = this.caseInfo
      axios.post("http://localhost:9001/case/deleteCase", info, {
        headers: {
          "Content-Type": "text/plain; charset=UTF-8"
        },
        timeout: 30000
      }).then(function (response) {
        if (response.data.code === 200) {
          alert("案例删除成功")
          that.inputCaseId = ""
          that.caseInfo = ""
        } else {
          alert("案例删除异常，知识库未包含该知识")
          that.inputCaseId = ""
          that.caseInfo = ""
        }
      })
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
.attachmentLocate{
  margin-left: 50px;
}
/*.caseAttachment {*/
/*  */
/*}*/
</style>
