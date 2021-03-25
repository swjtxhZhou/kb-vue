<template>
  <div>
    <div class="button">
      <el-row :gutter="10">
        <el-col :span="2">
          <el-button type="primary" @click.prevent="addRow()" plain>增加行</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" @click.prevent="delData()" plain>删除行</el-button>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        border="true"
        @selection-change='selectRow'
        style="width: 100%">
        <!--    <el-table-column label="序号" prop="id"></el-table-column>-->
        <!--    <el-table-column label="车站名称" prop="stationName"></el-table-column>-->
        <!--    <el-table-column label="行别" prop="lineType"></el-table-column>-->
        <!--    <el-table-column label="信号机名称" prop="signalName"></el-table-column>-->
        <!--    <el-table-column label="信号机里程" prop="signalMileage"></el-table-column>-->
        <!--    <el-table-column label="信号机类型" prop="signalType"></el-table-column>-->
        <!--    <el-table-column label="道岔类型" prop="turnoutType"></el-table-column>-->
        <!--    <el-table-column label="道岔里程" prop="turnoutMileage"></el-table-column>-->
        <!--    <el-table-column label="警冲标里程" prop="warningMileage"></el-table-column>-->
        <!--    <el-table-column label="位于区间分界" prop="locateBoundary"></el-table-column>-->
        <!--&lt;!&ndash;    <el-table-column label="信号机置法" prop="signalOrientate"></el-table-column>&ndash;&gt;-->
        <!--    <el-table-column label="绝缘节里程" prop="insulationMileage"></el-table-column>-->
        <!--    <el-table-column align="right">-->
        <!--      <template slot-scope="scope">-->
        <!--        <el-button-->
        <!--          size="mini"-->
        <!--          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
        <!--        <el-button-->
        <!--          size="mini"-->
        <!--          type="danger"-->
        <!--          @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
        <!--      </template>-->
        <!--    </el-table-column>-->
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
          <router-link to="/designKnowledge/analysisResult"
                       type="primary">查看分析结果</router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

export default {
  name: "dataAnalysis",
  data() {
    return {
      tableData: [{
        id: '1',
        stationName: '书院站',
        lineType: '上行',
        signalName: 'S',
        signalMileage: 'K243+688',
        signalType: '进站信号机',
        turnoutType: '对向道岔',
        turnoutMileage: 'K243+492',
        warningMieage: '',
        locateBoundary: '',
        signalOrientate: '单置',
        insulationMileage: 'K243+688'
      }, {
        id: '2',
        stationName: '书院站',
        lineType: '下行',
        signalName: 'X',
        signalMileage: 'K241+979',
        signalType: '进站信号机',
        turnoutType: '顺向道岔',
        turnoutMileage: '',
        warningMileage: 'K242+144',
        locateBoundary: '',
        signalOrientate: '单置',
        insulationMileage: 'K241+979'
      }, {
        id: '3',
        stationName: '书院站',
        lineType: '上行',
        signalName: 'SⅡ',
        signalMileage: 'K242+389',
        signalType: '出站信号机',
        turnoutType: '顺向道岔',
        turnoutMileage: '',
        warningMileage: 'K252+384',
        locateBoundary: '',
        signalOrientate: '单置',
        insulationMileage: 'K242+389'
      }, {
        id: '4',
        stationName: '书院站',
        lineType: '上行',
        signalName: 'SⅠ ',
        signalMileage: 'K242+352',
        signalType: '出站信号机',
        turnoutType: '顺向道岔',
        turnoutMileage: '',
        warningMileage: 'K252+347',
        locateBoundary: '',
        signalOrientate: '单置',
        insulationMileage: 'K242+352'
      }, {
        id: '5',
        stationName: '书院站',
        lineType: '下行',
        signalName: 'XⅠ ',
        signalMileage: 'K243+232',
        signalType: '出站信号机',
        turnoutType: '顺向道岔',
        turnoutMileage: '',
        warningMileage: 'K253+237',
        locateBoundary: '',
        signalOrientate: '单置',
        insulationMileage: 'K243+232'
      }, {
        id: '6',
        stationName: '书院站',
        lineType: '下行',
        signalName: 'XⅡ',
        signalMileage: 'K243+269',
        signalType: '出站信号机',
        turnoutType: '顺向道岔',
        turnoutMileage: '',
        warningMileage: 'K253+274',
        locateBoundary: '',
        signalOrientate: '单置',
        insulationMileage: 'K243+269'
      }, {
        id: '7',
        stationName: '书院站',
        lineType: '上行',
        signalName: '2518',
        signalMileage: 'K251+875',
        signalType: '通过信号机',
        turnoutType: '',
        turnoutMileage: '',
        warningMileage: '',
        locateBoundary: '是',
        signalOrientate: '单置',
        insulationMileage: 'K251+875'
      }, {
        id: '8',
        stationName: '书院站',
        lineType: '上行',
        signalName: '2450',
        signalMileage: 'K244+922',
        signalType: '通过信号机',
        turnoutType: '',
        turnoutMileage: '',
        warningMileage: '',
        locateBoundary: '是',
        signalOrientate: '单置',
        insulationMileage: 'K244+922'
      }, {
        id: '9',
        stationName: '书院站',
        lineType: '下行',
        signalName: '2377',
        signalMileage: 'K237+735',
        signalType: '通过信号机',
        turnoutType: '',
        turnoutMileage: '',
        warningMileage: '',
        locateBoundary: '是',
        signalOrientate: '单置',
        insulationMileage: 'K237+735'
      }, {
        id: '10',
        stationName: '书院站',
        lineType: '下行',
        signalName: '2499',
        signalMileage: 'K249+987',
        signalType: '通过信号机',
        turnoutType: '',
        turnoutMileage: '',
        warningMileage: '',
        locateBoundary: '是',
        signalOrientate: '单置',
        insulationMileage: 'K249+987'
      }],
      search: '',
      selectlistRow: []
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    // 获取表格选中时的数据
    selectRow (val) {
      this.selectlistRow = val
    },
    // 增加行
    addRow () {
      var list = {
        id: '',
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
      alert("推理完成，请查看分析报告")
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
  margin-top: 10px;
}
.download {
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
