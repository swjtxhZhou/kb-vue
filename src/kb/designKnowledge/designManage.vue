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
      searchInfo: {
        designId: "3.3.1",
        designBelongto1: "地面固定信号 ",
        designBelongto2: "显示要求",
        content: "信号机以及表示器的显示距离应符合下列规定： 1 正常情况 1) 高柱进站信号机、高柱通过信号机、高柱接近信号机、遮断信号机的显示距离不得小于 1 000 m；\n" +
          " 2) 高柱进路信号机、高柱出站信号机的显示距离不得小于 800 m； 3) 预告信号机、矮型接近信号机的显示距离不得小于 400 m； 4) 矮型进站信号机、矮型进路信号机、矮型出站信号机、矮型通过信号机、调车信号机、复示信 号机，容许信号、引导信号的显示距离不得小于 200 m； 5) 各种表示器的显示距离不得小于 200 m。 2 受地形、地物等因素影响时，进站信号机、通过信号机、接近信号机、预告信号机、遮断信号机\n" +
          " - 8 \n" +
          "的显示距离不得小于 200 m。 ",
        attachment: ""
      },
      designInfo: {
        designId: "",
        designBelongto1: "",
        designBelongto2: "",
        content: "",
        attachment: ""
      },
      inputDesignId: ""
    }
  },
  methods: {
    searchDesignId () {
      this.searchInfo = this.designInfo
      alert("查询成功")
    },
    updateDesign () {
      alert("知识更新成功")
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
