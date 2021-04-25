<template>
  <div>
    <el-form ref="form" label-position="left" :model="designInfo" label-width="100px">
      <el-form-item >
        <el-raw :gutter="20">
          <el-col :span="6">
            <el-input clearable="true" v-model="inputDesignId" placeholder="请输入设计规范 ID"></el-input>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-button size="medium" type="primary" @click="searchDesignId">查询案例</el-button>
          </el-col>
        </el-raw>
      </el-form-item>
      <el-divider content-position="left"></el-divider>
      <el-form-item label="设计规范编号">
        <el-raw :gutter="20">
          <el-col :span="6">
            <el-input v-model="designInfo.knowledgenumber" placeholder="请输入编号"></el-input>
          </el-col>
        </el-raw>
      </el-form-item>
      <el-form-item label="设计规范大类">
        <el-raw :gutter="20">
          <el-col :span="6">
            <el-input v-model="designInfo.belongtoknowledge1" placeholder="请输入大类"></el-input>
          </el-col>
        </el-raw>
      </el-form-item>
      <el-form-item label="设计规范小类">
        <el-raw :gutter="20">
          <el-col :span="6">
            <el-input v-model="designInfo.belongtoknowledge2" placeholder="请输入小类"></el-input>
          </el-col>
        </el-raw>
      </el-form-item>
      <el-form-item label="设计规范内容">
        <el-raw :gutter="20">
          <el-col :span="16">
            <el-input placeholder="请输入内容" v-model="designInfo.content" :rows="4" type="textarea"></el-input>
          </el-col>
        </el-raw>
      </el-form-item>
      <el-form-item label="附件">
        <el-image
          :src=designInfo.attachment
          :fit="scale-down"></el-image>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" type="success" @click="updateDesign">更新案例</el-button>
        <el-button size="medium" type="warning" @click="deleteDesign">删除案例</el-button>
        <el-button @click="clearForm">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios"
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
        id: "",
        knowledgenumber: "",
        belongtoknowledge1: "",
        belongtoknowledge2: "",
        content: "",
        attachment: "",
        keywords: ""
      },
      inputDesignId: ""
    }
  },
  methods: {
    searchDesignId () {
      var that = this
      let info = {}
      info["id"] = this.inputDesignId
      axios.post("http://localhost:9001/design/searchKnowledgeByID", info, {
        headers: {
          "Content-Type": "text/plain; charset=UTF-8"
        },
        timeout: 30000
      }).then(function (response) {
        if (response.data.code === 200) {
          alert("设计规范查询成功")
          that.designInfo = response.data.data.designInfo
        } else {
          alert(response.data.message)
        }
      })
      // this.searchInfo = this.designInfo
    },
    updateDesign () {
      var that = this
      let info = {}
      info["knowledge"] = this.designInfo
      axios.post("http://localhost:9001/design/updateKnowledge", info, {
        headers: {
          "Content-Type": "text/plain; charset=UTF-8"
        },
        timeout: 30000
      }).then(function (response) {
        if (response.data.code === 200) {
          alert("设计规范更新成功")
          that.inputDesignId = ""
          that.designInfo = ""
        } else {
          alert("设计规范更新异常，请检查填写信息完整")
          that.inputDesignId = ""
          that.designInfo = ""
        }
      })
    },
    deleteDesign () {
      let info = {}
      info["knowledge"] = this.designInfo
      axios.post("http://localhost:9001/design/deleteKnowledge", info, {
        headers: {
          "Content-Type": "text/plain; charset=UTF-8"
        },
        timeout: 30000
      }).then(function (response) {
        if (response.data.code === 200) {
          alert("设计规范删除成功")
          that.inputDesignId = ""
          that.designInfo = ""
        } else {
          alert("设计规范删除异常，知识库未包含该知识")
          that.inputDesignId = ""
          that.designInfo = ""
        }
      })
    },
    clearForm () {
      this.designInfo = {}
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
