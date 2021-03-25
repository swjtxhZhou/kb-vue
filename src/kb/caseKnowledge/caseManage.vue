<template>
<!--    输入案例编号查询到案例后，对案例进行更行操作-->
<!--    包含的组件有，输入组件+查询组件+展示组件（可编辑）+更行按钮-->
    <div>
      <el-row :gutter="20">
        <el-col :span="6" :offset="3">
          <el-input v-model="caseId" placeholder="请输入案例编号"></el-input>
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
          <p>案例编号：</p>
        </el-col>
        <el-col :span="3">
          <p>{{caseInfo.caseId}}</p>
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
          <el-input placeholder="请输入内容" v-model="caseInfo.caseBelongto" autosize="true" type="textarea">
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
          <el-image
            :src="caseInfo.attachment1"
            :fit="contain"></el-image>
          <el-image
            :src="caseInfo.attachment2"
            :fit="contain"></el-image>
        </el-col>
      </el-row>
    </div>
</template>

<script>
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
        caseId: "",
        caseName: "",
        caseBelongto: "",
        problemDescription: "",
        problemSolution: "",
        riskWarning: "",
        attachment1: "",
        attachment2: ""
      }
    }
  },
  methods: {
    searchCaseId () {
      this.caseInfo = this.searchInfo
      alert("查询成功")
    },
    updateCase () {
      alert("更新成功")
    },
    deleteCase () {
      alert("删除成功")
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
/*.caseAttachment {*/
/*  */
/*}*/
</style>
