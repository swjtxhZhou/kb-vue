<template>
  <div>
    <el-form label-position="left" :model="designInfo" label-width="140px">
      <el-form-item label="设计规范编号">
        <el-raw :gutter="20">
          <el-col :span="10">
            <el-input  v-model="designInfo.knowledgeNumber" placeholder="请输入新增设计规范编号"></el-input>
          </el-col>
        </el-raw>
      </el-form-item>
      <el-form-item label="来源文档">
        <el-raw :gutter="20">
          <el-col :span="10">
            <el-select v-model="designInfo.belongto" placeholder="选择文档来源">
              <el-option label="TB10007-2017《信号设计规范》" value="TB10007-2017《信号设计规范》"></el-option>
            </el-select>
          </el-col>
        </el-raw>
      </el-form-item>
      <el-form-item label="设计规范大类">
        <el-raw :gutter="20">
          <el-col :span="10">
            <el-select v-model="designInfo.belongtoKnowledge1" placeholder="选择来源大类">
              <el-option label="总则" value="总则"></el-option>
              <el-option label="术语与符号" value="术语与符号"></el-option>
              <el-option label="地面固定信号" value="地面固定信号"></el-option>
              <el-option label="轨道占用检查装置" value="轨道占用检查装置"></el-option>
              <el-option label="道岔转辙装置" value="道岔转辙装置"></el-option>
              <el-option label="联锁" value="联锁"></el-option>
              <el-option label="闭塞" value="闭塞"></el-option>
              <el-option label="列车运行控制" value="列车运行控制"></el-option>
              <el-option label="电码化" value="电码化"></el-option>
              <el-option label="列车调度指挥及调度集中" value="列车调度指挥及调度集中"></el-option>
              <el-option label="信号集中监测" value="信号集中监测"></el-option>
              <el-option label="驼峰信号及编组站自动化" value="驼峰信号及编组站自动化"></el-option>
              <el-option label="道口信号" value="道口信号"></el-option>
              <el-option label="无线调车机车信号和监控" value="无线调车机车信号和监控"></el-option>
              <el-option label="道岔融雪装置" value="倒车融雪装置"></el-option>
              <el-option label="电源设备" value="电源设备"></el-option>
              <el-option label="光电缆线路" value="光电缆线路"></el-option>
              <el-option label="运行环境" value="运行环境"></el-option>
              <el-option label="接口设计" value="接口设计"></el-option>
            </el-select>
          </el-col>
        </el-raw>
      </el-form-item>
      <el-form-item label="设计规范小类">
        <el-raw :gutter="20">
          <el-col :span="10">
            <el-input  v-model="designInfo.belongtoKnowledge2" placeholder="请输入内容"></el-input>
          </el-col>
        </el-raw>
      </el-form-item>
      <el-form-item label="设计规范内容">
        <el-raw :gutter="20">
          <el-col :span="16">
            <el-input  v-model="designInfo.content" type="textarea" placeholder="请输入内容" rows="4"></el-input>
          </el-col>
        </el-raw>
      </el-form-item>
      <el-form-item label="关键词">
        <el-raw :gutter="20">
          <el-col :span="10">
            <el-input  v-model="designInfo.keywords" placeholder="请输入关键词"></el-input>
          </el-col>
        </el-raw>
      </el-form-item>
      <el-form-item label="附件">
        <el-upload
          class="upload-demo"
          :action="uploadUrl()"
          :on-change="handleChange"
          :file-list="fileList"
          name="file"
          :auto-upload="true"
          :data="upData"
          :on-error="uploadFalse"
          :on-success="uploadSuccess"
          :before-upload="beforeUpload"
          :limit="1">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" type="primary" @click="updateDesign">上传设计规范</el-button>
        <el-button @click="clearForm">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "designUpload",
  data () {
    return {
      designInfo: {
        knowledgeNumber: "",
        belongto: "",
        belongtoKnowledge1: "",
        belongtoKnowledge2: "",
        content: "",
        attachment: "",
        keywords: ""
      },
      staticDesignInfo: {
        designId: "2.1.1",
        designBelongto1: "术语和符号",
        designBelongto2: "术语",
        content: "直向进路  route through turnout by straight track 无道岔或虽有道岔但均开通直向位置的列车进路或闭塞分区。",
        attachment: "./static/images/管理员头像.jpg"
      },
      fileList: [],
      files: []
    }
  },
  computed: {
    // 这里定义上传文件时携带的参数，即表单数据
    upData: function () {
      const info = { "designNumber": this.designInfo.knowledgeNumber }
      return info
    }
  },
  methods: {
    updateDesign () {
      let info = {}
      info["knowledge"] = this.designInfo
      axios.post("http://localhost:9001/design/addKnowledge", info, {
        headers: {
          "Content-Type": "text/plain; charset=UTF-8"
        },
        timeout: 30000
      }).then(function (response) {
        if (response.data.code === 200) {
          alert("设计规范上传成功")
        } else {
          alert("设计规范上传异常，请检查填写信息完整")
        }
      })
    },
    uploadSuccess (response, file, fileList) {
      if (response.data.code === 200) {
        alert(response.data.message)
      } else {
        alert(response.data.message)
      }
    },
    uploadFalse (response, file, fileList) {
      alert("案例信息上传失败，请重试")
    },
    beforeUpload (file) {
      // 上传前对文件的大小和类型的判断
      //   this.form.fileName = file.name
      const extension1 = file.name.split(".")[1] === "jpg"
      const extension2 = file.name.split(".")[1] === "gif"
      const extension3 = file.name.split(".")[1] === "png"
      const extension4 = file.name.split(".")[1] === "jpeg"
      if (!extension1 && !extension2 && !extension3 && !extension4) {
        this.$message({
          message: "上传文件只能是 jpg、jpeg、gif、png 格式!",
          type: "error"
        })
      }
      return extension1 || extension2 || extension3 || extension4
    },
    handleChange (file, fileList) {
      this.fileList = fileList.slice(-3)
    },
    getFile (item) {
      // console.log(item.file)
      this.files.push(item.file)
    },
    uploadUrl () {
      return "http://localhost:9001/design/designPicUpload"
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
