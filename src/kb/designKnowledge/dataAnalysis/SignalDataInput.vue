<template>
  <div>
    <el-row gutter="20">
      <el-col>
        <el-steps :active="active" finish-status="success">
          <el-step title="请选择审核类型"></el-step>
          <el-step title="填写数据"></el-step>
          <el-step title="查看审核结果"></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-row :gutter="5">
      <el-divider></el-divider>
    </el-row>
    <div class="button">
      <el-row>
        <el-col :span="1.8" >
          <el-button  type="primary" @click.prevent="addRow()" >增加行</el-button>
        </el-col>
        <el-col :span="1.8" >
          <el-button  type="danger" @click.prevent="delData()" >删除行</el-button>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        border="true"
        @selection-change='selectRow'
        style="width: 100%">
        <el-table-column type="selection" width="45" align="center"></el-table-column>
        <el-table-column label="序号"  type="index" width="50" align="center"></el-table-column>
        <el-table-column  label="车站名称" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.stationName"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="行别" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.lineType"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="信号机名称" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.signalName"></el-input>
          </template>
        </el-table-column>
        <el-table-column  label="信号机里程" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.signalMileage"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="信号机类型" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.signalType"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="道岔类型" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.turnoutType"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="道岔里程" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.turnoutMileage"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="警冲标里程" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.warningMileage"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="位于区间分界" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.locateBoundary"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="绝缘节里程" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.insulationMileage"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="button">
      <el-row :gutter="10">
        <el-col :span="3">
          <el-button type="primary" @click.prevent="reason()" >开始推理</el-button>
        </el-col>
        <el-col :span="3" class="download">
<!--          <router-link to="/designKnowledge/analysisResult"-->
<!--                       type="primary">查看分析结果</router-link>-->
          <el-link type="primary" @click="toResult()">查看分析结果</el-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import axios from "axios"

export default {
  name: "dataAnalysis",
  data () {
    return {
      active: 1,
      tableData: [
        {
          id: "1",
          stationName: "书院站",
          lineType: "上行",
          signalName: "S",
          signalMileage: "K243+688",
          signalType: "进站信号机",
          turnoutType: "对向道岔",
          turnoutMileage: "K243+492",
          warningMieage: "",
          locateBoundary: "",
          signalLocate: "单置",
          insulationMileage: "K243+688"
        }, {
          id: "2",
          stationName: "书院站",
          lineType: "下行",
          signalName: "X",
          signalMileage: "K241+979",
          signalType: "进站信号机",
          turnoutType: "顺向道岔",
          turnoutMileage: "",
          warningMileage: "K242+144",
          locateBoundary: "",
          signalLocate: "单置",
          insulationMileage: "K241+979"
        }, {
          id: "3",
          stationName: "书院站",
          lineType: "上行",
          signalName: "SⅡ",
          signalMileage: "K242+389",
          signalType: "出站信号机",
          turnoutType: "顺向道岔",
          turnoutMileage: "",
          warningMileage: "K242+384",
          locateBoundary: "",
          signalLocate: "单置",
          insulationMileage: "K242+389"
        }, {
          id: "4",
          stationName: "书院站",
          lineType: "上行",
          signalName: "SⅠ",
          signalMileage: "K242+352",
          signalType: "出站信号机",
          turnoutType: "顺向道岔",
          turnoutMileage: "",
          warningMileage: "K242+347",
          locateBoundary: "",
          signalLocate: "单置",
          insulationMileage: "K242+352"
        }, {
          id: "5",
          stationName: "书院站",
          lineType: "下行",
          signalName: "XⅠ",
          signalMileage: "K243+232",
          signalType: "出站信号机",
          turnoutType: "顺向道岔",
          turnoutMileage: "",
          warningMileage: "K243+237",
          locateBoundary: "",
          signalLocate: "单置",
          insulationMileage: "K243+232"
        }, {
          id: "6",
          stationName: "书院站",
          lineType: "下行",
          signalName: "XⅡ",
          signalMileage: "K243+269",
          signalType: "出站信号机",
          turnoutType: "顺向道岔",
          turnoutMileage: "",
          warningMileage: "K243+274",
          locateBoundary: "",
          signalLocate: "单置",
          insulationMileage: "K243+269"
        }, {
          id: "7",
          stationName: "书院站",
          lineType: "上行",
          signalName: "2518",
          signalMileage: "K251+875",
          signalType: "通过信号机",
          turnoutType: "",
          turnoutMileage: "",
          warningMileage: "",
          locateBoundary: "是",
          signalLocate: "单置",
          insulationMileage: "K251+875"
        }, {
          id: "8",
          stationName: "书院站",
          lineType: "上行",
          signalName: "2450",
          signalMileage: "K244+922",
          signalType: "通过信号机",
          turnoutType: "",
          turnoutMileage: "",
          warningMileage: "",
          locateBoundary: "是",
          signalLocate: "单置",
          insulationMileage: "K244+922"
        }, {
          id: "9",
          stationName: "书院站",
          lineType: "下行",
          signalName: "2377",
          signalMileage: "K237+735",
          signalType: "通过信号机",
          turnoutType: "",
          turnoutMileage: "",
          warningMileage: "",
          locateBoundary: "是",
          signalLocate: "单置",
          insulationMileage: "K237+735"
        }, {
          id: "10",
          stationName: "书院站",
          lineType: "下行",
          signalName: "2499",
          signalMileage: "K249+987",
          signalType: "通过信号机",
          turnoutType: "",
          turnoutMileage: "",
          warningMileage: "",
          locateBoundary: "是",
          signalLocate: "单置",
          insulationMileage: "K249+987"
        }],
      search: "",
      selectlistRow: [],
      resultData: [
        {
          id: "",
          stationName: "",
          lineType: "",
          signalName: "",
          signalMileage: "",
          signalType: "",
          turnoutType: "",
          turnoutMileage: "",
          warningMileage: "",
          locateBoundary: "",
          signalLocate: "",
          insulationMileage: "",
          inferName: "",
          inferSignalMileage: "",
          inferWarningMileage: "",
          inferInsulationMileage: "",
          inferBoundary: ""
        }
      ]
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    // 获取表格选中时的数据
    selectRow (val) {
      this.selectlistRow = val
    },
    // 增加行
    addRow () {
      var list = {
        id: "",
        stationName: this.stationName,
        lineType: this.lineType,
        signalName: this.signalName,
        signalMileage: this.signalMileage,
        signalType: this.signalType,
        turnoutType: this.turnoutType,
        turnoutMileage: this.turnoutMileage,
        warningMileage: this.warningMileage,
        locateBoundary: this.locateBoundary,
        insulationMileage: this.insulationMileage
      }
      this.tableData.unshift(list)
    },
    // 删除方法
    // 删除选中行
    delData () {
      for (let i = 0; i < this.selectlistRow.length; i++) {
        let val = this.selectlistRow
        // 获取选中行的索引的方法
        // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
        // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
        val.forEach((val, index) => {
          this.tableData.forEach((v, i) => {
            if (val.id === v.id) {
              // i 为选中的索引
              this.tableData.splice(i, 1)
            }
          })
        })
      }
      // 删除完数据之后清除勾选框
      this.$refs.tableData.clearSelection()
    },
    // 推理按钮
    reason () {
      let that = this
      let info = {}
      info["signalPointList"] = this.tableData
      axios.post("http://localhost:9001/design//dataAnalysis", info, {
        headers: {
          "Content-Type": "text/plain; charset=UTF-8"
        },
        timeout: 30000
      }).then(function (response) {
        if (response.data.code === 200) {
          that.resultData = response.data.data.designList
          alert("推理完成，请查看分析报告")
          alert(that.resultData)
        } else {
          alert(response.data.message)
        }
      })
    },
    toResult () {
      let that = this
      // let result = that.resultData
      this.$router.push({
        path: "/designKnowledge/SignalAnalysisResult",
        query: {
          result: that.resultData
        }
      })
    }
  }
}
</script>

<style scoped>
.indexlayout-main-conent {
  margin: 24px;
  position: relative;
}
.button {
  margin-bottom: 10px;
  margin-top: 30px;
}
.download {
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
