<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6" :offset="3">
        <el-input v-model="inputDesignId" placeholder="请输入设计知识编号"></el-input>
      </el-col>
      <el-col :span="3">
        <el-button size="medium" type="primary" @click="searchDesignId">查询设计知识</el-button>
      </el-col>
      <el-col :span="3">
        <el-button size="medium" type="success" @click="updateDesign">更新设计知识</el-button>
      </el-col>
    </el-row>
    <el-row class="caseIdCss">
      <el-col :span="6" :offset="3">
        <p>设计知识编号：</p>
      </el-col>
      <el-col :span="3">
        <p>{{designInfo.designId}}</p>
      </el-col>
    </el-row>
    <div style="margin: 10px 0;"></div>
    <el-row class="caseCss">
      <el-col :span="3" offset="3">
        <p >设计知识来源1：</p>
      </el-col>
      <el-col :span="12">
        <el-input placeholder="请输入内容" v-model="designInfo.designBelongto1" autosize="true" type="textarea">
        </el-input>
      </el-col>
    </el-row>
    <div style="margin: 10px 0;"></div>
    <el-row class="caseCss">
      <el-col :span="3" offset="3">
        <p>设计知识来源2：</p>
      </el-col>
      <el-col :span="12">
        <el-input placeholder="请输入内容" v-model="designInfo.designBelongto2" autosize="true" type="textarea">
        </el-input>
      </el-col>
    </el-row>
    <div style="margin: 10px 0;"></div>
    <el-row class="caseCss">
      <el-col :span="3" offset="3">
        <p>内容：</p>
      </el-col>
      <el-col :span="12">
        <el-input placeholder="请输入内容" v-model="designInfo.content" autosize="true" type="textarea">
        </el-input>
      </el-col>
    </el-row>
    <div style="margin: 10px 0;"></div>
    <el-row >
      <el-col :span="3" offset="3"><p class="caseCss">附件：</p>
      </el-col>
      <el-image>
        :src="designInfo.attachment"
        :fit="contain">
      </el-image>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "designManage",
  data () {
    return {
      designInfo: {
        designId: "2.1.1",
        designBelongto1: "术语和符号",
        designBelongto2: "术语",
        content: "直向进路  route through turnout by straight track 无道岔或虽有道岔但均开通直向位置的列车进路或闭塞分区。",
        attachment: ""
      },
      inputDesignId: ""
    }
  },
  methods: {
    searchDesignId () {
      consle.log("查询设计知识")
    },
    updateDesign () {
      console.log("更新设计知识")
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
