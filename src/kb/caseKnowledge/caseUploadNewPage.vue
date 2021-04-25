<template>
  <div>
    <el-form ref="form" label-position="left" :model="caseInfo" label-width="80px">
      <el-form-item label="案例编号">
        <el-raw :gutter="20">
          <el-col :span="10">
            <el-input  v-model="caseInfo.caseNumber" placeholder="请输入新增案例的编号"></el-input>
          </el-col>
        </el-raw>
      </el-form-item>
      <el-form-item label="案例名称">
        <el-raw :gutter="20">
          <el-col :span="10">
            <el-input v-model="caseInfo.caseName" placeholder="请输入新增案例名称"></el-input>
          </el-col>
        </el-raw>
      </el-form-item>
      <el-form-item label="案例分类">
        <el-select v-model="caseInfo.belongtoCase" placeholder="请选择案例大类">
          <el-option label="审图案例" value="审图案例"></el-option>
          <el-option label="仿真试验案例" value="仿真试验案例"></el-option>
          <el-option label="现场调查案例" value="现场调查案例"></el-option>
          <el-option label="模拟试验案例" value="模拟试验案例"></el-option>
          <el-option label="开通试验案例" value="开通试验案例"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="问题描述">
        <el-raw :gutter="20">
          <el-col :span="16">
            <el-input placeholder="请输入内容" v-model="caseInfo.problemDescription" :rows="4" type="textarea"></el-input>
          </el-col>
        </el-raw>
      </el-form-item>
      <el-form-item label="解决方案">
        <el-raw :gutter="20">
          <el-col :span="16">
            <el-input placeholder="请输入内容" type="textarea" v-model="caseInfo.problemSolution" :rows="4" ></el-input>
          </el-col>
        </el-raw>
      </el-form-item>
      <el-form-item label="风险提示">
        <el-raw :gutter="20">
          <el-col :span="16">
            <el-input placeholder="请输入内容" v-model="caseInfo.riskWarning" :rows="4" type="textarea"></el-input>
          </el-col>
        </el-raw>
      </el-form-item>
      <el-form-item label="附件">
        <el-col :span="6">
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
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" type="success" @click="uploadCase">上传案例</el-button>
        <el-button @click="clearForm">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "caseUpload",
  data () {
    return {
      caseInfo: {
        caseNumber: "",
        caseName: "",
        belongtoCase: "",
        problemDescription: "",
        problemSolution: "",
        riskWarning: "",
        attachment: ""
      },
      // staticCaseInfo: {
      //   caseNumber: "1",
      //   caseName: "侵限绝缘设计错误",
      //   belongtoCase: "审图案例",
      //   problemDescription: "2015年3月份某站审图，发现D1053处绝缘节设计错误。设计图中D1053座标距信号楼766，" +
      //     "而1057#道岔警冲标座标为740，D1053绝缘节应为侵限绝缘。同时D1053按左侧设计，将侵入限界。显然存在设计错误。",
      //   problemSolution: "D1053绝缘节按侵限绝缘设计，同时D1053改右侧设置。",
      //   riskWarning: "审图工作需要对照设计规范，掌握标准。不能停留在表面，要深入计算设计中参数是否正确，要逐项参数进行比对和确认。警冲标座标容易出错，要学会计算。",
      //   attachment: "../static/案例图片/1_1.jpg"
      // },
      localFile: {
        name: "",
        url: ""
      },
      fileList: [],
      files: []
    }
  },
  computed: {
    // 这里定义上传文件时携带的参数，即表单数据
    upData: function () {
      const info = { "caseNumber": this.caseInfo.caseNumber }
      return info
    }
  },
  methods: {
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
      const extension2 = file.name.split(".")[1] === "JPG"
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
    uploadCase () {
      let info = new window.FormData()
      info.append("picture", this.files[0])
      info.append("case", JSON.stringify(this.caseInfo))
      axios.post("http://localhost:9001/case/addCase", info, {
        headers: {
          // "Content-Type": "multipart/form-data"
        },
        timeout: 30000
      }).then(function (response) {
        if (response.data.code === 200) {
          alert("案例上传成功")
        } else {
          alert(response.data.message + "请修改格式继续上传")
        }
      })
    },
    handleChange (file, fileList) {
      this.fileList = fileList.slice(-3)
    },
    getFile (item) {
      // console.log(item.file)
      this.files.push(item.file)
    },
    uploadUrl () {
      return "http://localhost:9001/case/casePicUpload"
    },
    clearForm () {
      this.caseInfo = {}
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
