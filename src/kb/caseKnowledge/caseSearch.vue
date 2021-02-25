<template>
  <div>
<!--    搜索框+勾选框+按键-->
    <el-row :gutter="20">
      <el-col :span="7" :offset="3">
        <el-input v-model="input" placeholder="请输入关键词"></el-input>
      </el-col>
      <el-col :span="4">
        <el-checkbox v-model="checked" border="true" size="medium">是否扩展检索词汇</el-checkbox>
      </el-col>
      <el-col :span="3">
        <el-button size="medium" type="primary" @click="searchCase">查询</el-button>
      </el-col>
    </el-row>
<!--    检索结果展示-->
    <el-row>
      <div>
        <el-table
          :data="caseList"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="案例 ID:">
                  <span>{{ props.row.caseNumber }}</span>
                </el-form-item>
                <el-form-item label="案例名称:">
                  <span>{{ props.row.caseName }}</span>
                </el-form-item>
                <el-form-item label="案例类型:">
                  <span>{{ props.row.belongtoCase }}</span>
                </el-form-item>
                <el-form-item label="问题描述:">
                  <span>{{ props.row.problemDescription }}</span>
                </el-form-item>
                <el-form-item label="解决方案:">
                  <span>{{ props.row.problemSolution }}</span>
                </el-form-item>
                <el-form-item label="风险提示:">
                  <span>{{ props.row.riskWarning }}</span>
                </el-form-item>
                <el-form-item label="附件:">
<!--                  <span>{{ props.row.attachment }}</span>-->
                  <span>
<!--                    <img :src="props.row.attachment"/>-->
                    <el-image
                      :src="props.row.attachment"
                      :fit="contain"></el-image>
                  </span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="案例编号"
            prop="caseNumber" width="80">
          </el-table-column>
          <el-table-column
            label="案例名称 "
            prop="caseName" width="200">
          </el-table-column>
          <el-table-column
            label="案例描述"
            prop="problemDescription">
          </el-table-column>
        </el-table>
      </div>
    </el-row>
  </div>
</template>

<script>
import axios from "axios"
axios.defaults.timeout = 30000 // 超时时间
// import qs from "qs"

export default {
  name: "caseSearch",
  data () {
    return {
      checked: false,
      input: "",
      localData: "",
      caseList: [{
        id: "",
        caseNumber: "1",
        caseName: "侵限绝缘设计错误",
        belongtoCase: "审图案例",
        problemDescription: "2015年3月份某站审图，发现D1053处绝缘节设计错误。设计图中D1053座标距信号楼766，" +
          "而1057#道岔警冲标座标为740，D1053绝缘节应为侵限绝缘。同时D1053按左侧设计，将侵入限界。显然存在设计错误。",
        problemSolution: "D1053绝缘节按侵限绝缘设计，同时D1053改右侧设置。",
        riskWarning: "审图工作需要对照设计规范，掌握标准。不能停留在表面，要深入计算设计中参数是否正确，要逐项参数进行比对和确认。警冲标座标容易出错，要学会计算。",
        attachment: "./static/案例图片/1_1.jpg"
      }]
    }
  },
  methods: {
    searchCase () {
      let keywords = []
      keywords[0] = this.input
      let info = {}
      info["searchList"] = keywords
      info["isExtend"] = this.checked
      // axios.post("http://localhost:9001/case/searchCase", {searchList: ["信号机"], isExtend: false}).then((response) => {
      //   this.caseList = response.data.caseList
      //   console.log(this.caseList)
      // }).catch((err) => {
      //   console.log(err)
      // })
      var that = this
      axios.post("http://localhost:9001/case/searchCase", info, {
        headers: {
          "Content-Type": "text/plain; charset=UTF-8"
        },
        timeout: 30000
      })
        .then(function (response) {
          that.caseList = response.data.data.caseList
          // console.log(that.caseList)
          alert(response.data.data.caseList)
        })
        .catch(function (error) {
          alert(error)
        })
    }
  }
}
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 200px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
  .el-row {
    margin-bottom: 20px;
  }
</style>
