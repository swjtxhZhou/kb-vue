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
    <el-divider></el-divider>
<!--    检索结果展示-->
    <el-row>
      <div>
        <el-table
          :data="caseList"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="案例 ID:" class="dark">
                  <span>{{props.row.id}}</span>
                </el-form-item>
                <el-form-item label="案例编号:" class="dark">
                  <span>{{ props.row.caseNumber }}</span>
                </el-form-item>
                <el-form-item label="案例名称:" class="dark">
                  <span>{{ props.row.caseName }}</span>
                </el-form-item>
                <el-form-item label="案例类型:" class="dark">
                  <span>{{ props.row.belongtoCase }}</span>
                </el-form-item>
                <el-form-item label="问题描述:" class="dark">
                  <span>{{ props.row.problemDescription }}</span>
                </el-form-item>
                <el-form-item label="解决方案:" class="dark">
                  <span>{{ props.row.problemSolution }}</span>
                </el-form-item>
                <el-form-item label="风险提示:" class="dark">
                  <span>{{ props.row.riskWarning }}</span>
                </el-form-item>
                <el-form-item label="附件:">
<!--                  <span>{{ props.row.attachment }}</span>-->
                  <span>
<!--                    <img :src="props.row.attachment"/>-->
                    <el-image
                      :src=props.row.attachment
                      :fit="cover"></el-image>
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
        caseNumber: "",
        caseName: "",
        belongtoCase: "",
        problemDescription: "",
        problemSolution: "",
        riskWarning: "",
        attachment: ""
      }],
      caseInfo: {
        id: "1",
        caseNumber: "1",
        caseName: "1",
        belongtoCase: "1",
        problemDescription: "1",
        problemSolution: "1",
        riskWarning: "1",
        attachment: "../static/案例图片/1_1.jpg"
      }
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
  .dark {
    color: #021014;
    /*font-size: 10px;*/
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 200px;
    color: #555e6c;
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
