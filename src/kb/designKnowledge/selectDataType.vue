<template>
  <div>
    <el-raw gutter="20">
      <el-col>
        <el-steps :active="active" finish-status="success">
          <el-step title="请选择审核类型"></el-step>
          <el-step title="填写数据"></el-step>
          <el-step title="查看审核结果"></el-step>
        </el-steps>
      </el-col>
    </el-raw>
    <el-raw gutter="20">
      <el-col>
        <el-cascader-panel :options="options" v-model="selectOption" :clearable="true" :show-all-levels="false"></el-cascader-panel>
      </el-col>
    </el-raw>
    <el-raw gutter="20">
      <el-col>
        <el-button class="btn" type="info" @click="nextStep">下一步</el-button>
      </el-col>
    </el-raw>
  </div>
</template>

<script>
export default {
  name: "selectDataType",
  data () {
    return {
      active: 0,
      selectOption: {},
      options: [{
        value: "0",
        label: "联锁工程数据",
        children: [{
          value: "0",
          label: "审核信号机、道岔、轨道绝缘、警冲标布置"
        }, {
          value: "1",
          label: "审核应答器组名称、里程、用途、设备类型",
          children: [{
            value: "0",
            label: "调车信号机应答器组"
          }, {
            value: "1",
            label: "车站应答器组"
          }, {
            value: "2",
            label: "进站应答器组"
          }]
        }, {
          value: "2",
          label: "审核应答器组布置"
        }]
      },
      {
        value: "1",
        label: "列控工程数据",
        disable: true
      }]
    }
  },
  methods: {
    nextStep () {
      alert(this.selectOption)
      if (this.selectOption=="0,0") {
        this.$router.push({
          path: "/designKowledge/SignalDataInput"
        })
      } else if (this.selectOption == "0,2") {
        alert("审核应答器组布置功能完善中")
      } else if (this.selectOption == "0,1,0") {
        alert("调车信号机应答器组功能完善中")
      } else if (this.selectOption == "0,1,1") {
        alert("车站应答器组功能完善中")
      } else if (this.selectOption == "0,1,2") {
        alert("进站应答器组功能完善中")
      }
    }
  }
}
</script>

<style scoped>
.btn {
  margin-top: 30px;
}
</style>
