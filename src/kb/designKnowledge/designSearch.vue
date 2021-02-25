<template>
    <div>
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
            <el-button size="medium" type="primary" @click="searchDesign">查询</el-button>
          </el-col>
        </el-row>
        <!--    检索结果展示-->
        <el-row>
          <div>
            <el-table class="tableResult"
              :data="designList"
              style="width: 70%"
              >
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="设计知识 ID:">
                      <span>{{ props.row.knowledgeNumber }}</span>
                    </el-form-item>
                    <el-form-item label="设计知识来源1:">
                      <span>{{ props.row.belongtoKnowledge1 }}</span>
                    </el-form-item>
                    <el-form-item label="设计知识来源2:">
                      <span>{{ props.row.belongtoKnowledge2 }}</span>
                    </el-form-item>
                    <el-form-item label="内容:">
                      <span>{{ props.row.content }}</span>
                    </el-form-item>
                    <el-form-item label="附件:">
                      <span>
                    <el-image
                      :src="props.row.attachment"
                      :fit="contain"></el-image>
                  </span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
                label="设计知识编号"
                prop="knowledgeNumber" width="200">
              </el-table-column>
              <el-table-column
                label="设计知识来源1 "
                prop="belongtoKnowledge1" width="200">
              </el-table-column>
              <el-table-column
                label="设计知识来源2"
                prop="belongtoKnowledge2" width="200">
              </el-table-column>
            </el-table>
          </div>
        </el-row>
      </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
  name: "designSearch",
  data () {
    return {
      checked: false,
      input: "信号",
      localData: "",
      designList: [{
        id: "",
        knowledgeNumber: "2.1.1",
        belongtoKnowledge1: "术语和符号",
        belongtoKnowledge2: "术语",
        content: "直向进路  route through turnout by straight track 无道岔或虽有道岔但均开通直向位置的列车进路或闭塞分区。",
        attachment: "./static/images/管理员头像.jpg"
      }]
    }
  },
  methods: {
    searchDesign () {
      let keywords = []
      keywords[0] = this.input
      let info = {}
      info["searchList"] = keywords
      info["isExtend"] = this.checked
      var that = this
      axios.post("http://localhost:9001/design/searchKnowledge", info, {
        headers: {
          "Content-Type": "text/plain; charset=UTF-8"
        },
        timeout: 50000
      })
        .then(function (response) {
          that.designList = response.data.data.designList
          // console.log(that.caseList)
          alert(response.data.data.designList)
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
  .tableResult {
    margin-left: 100px;
  }
</style>
