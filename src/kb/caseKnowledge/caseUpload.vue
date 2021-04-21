<template>
    <div>
      <el-row class="caseCss">
        <!--        案例名称应该是一个输入-->
        <el-col :span="3" offset="3">
          <p >案例编号：</p>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="请输入内容" v-model="caseInfo.caseNumber" autosize="true" type="textarea">
          </el-input>
        </el-col>
      </el-row>
      <div style="margin: 10px 0;"></div>
      <el-row class="caseCss">
        <!--        案例名称应该是一个输入-->
        <el-col :span="3" offset="3">
          <p >案例名称：</p>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="请输入内容" v-model="caseInfo.caseName" autosize="true" type="textarea">
          </el-input>
        </el-col>
      </el-row>
      <div style="margin: 10px 0;"></div>
      <el-row class="caseCss">
        <el-col :span="3" offset="3">
          <p>案例大类：</p>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="请输入内容" v-model="caseInfo.belongtoCase" autosize="true" type="textarea">
          </el-input>
        </el-col>
      </el-row>
      <div style="margin: 10px 0;"></div>
      <el-row class="caseCss">
        <el-col :span="3" offset="3">
          <p>问题描述：</p>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="请输入内容" v-model="caseInfo.problemDescription" autosize="true" type="textarea">
          </el-input>
        </el-col>
      </el-row>
      <div style="margin: 10px 0;"></div>
      <el-row class="caseCss">
        <el-col :span="3" offset="3">
          <p>解决方案：</p>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="请输入内容" v-model="caseInfo.problemSolution" autosize="true" type="textarea">
          </el-input>
        </el-col>
      </el-row>
      <div style="margin: 10px 0;"></div>
      <el-row class="caseCss">
        <el-col :span="3" offset="3">
          <p>风险提示：</p>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="请输入内容" v-model="caseInfo.riskWarning" autosize="true" type="textarea">
          </el-input>
        </el-col>
      </el-row>
      <div style="margin: 10px 0;"></div>
      <el-row class="caseCss">
<!--        上传附件-->
        <el-col :span="3" offset="3">
          <p>附件</p>
        </el-col>
        <el-col :span="6">
            <el-form-item prop="image" label="图片附件上传">
              <el-upload
                ref="uploadImage"
                :action="uploadAction"
                :beforeUpload="beforeUploadPicture"
                :on-change="imageChange"
                list-type="picture-card"
                name="files"
                :limit="3"
                multiple
                :auto-upload="false"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemovePicture">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
            <el-form-item prop="image" label="文件附件上传">
              <el-upload
                ref="uploadFile"
                class="upload-demo"
                name="files"
                :on-change="fileChange"
                :action="uploadAction"
                :on-preview="handlePreviewFile"
                :on-remove="handleRemoveFile"
                :before-remove="beforeRemoveFile"
                multiple
                :auto-upload="false"
                :limit="3"
                :on-exceed="handleExceedFile"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
        </el-col>
      </el-row>
      <div style="margin: 30px 0;"></div>
      <el-row :gutter="20">
        <el-col :span="3" :offset="20">
          <el-button size="medium" type="primary" @click="updateCase">上传案例</el-button>
        </el-col>
      </el-row>
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
      staticCaseInfo: {
        caseNumber: "1",
        caseName: "侵限绝缘设计错误",
        belongtoCase: "审图案例",
        problemDescription: "2015年3月份某站审图，发现D1053处绝缘节设计错误。设计图中D1053座标距信号楼766，" +
          "而1057#道岔警冲标座标为740，D1053绝缘节应为侵限绝缘。同时D1053按左侧设计，将侵入限界。显然存在设计错误。",
        problemSolution: "D1053绝缘节按侵限绝缘设计，同时D1053改右侧设置。",
        riskWarning: "审图工作需要对照设计规范，掌握标准。不能停留在表面，要深入计算设计中参数是否正确，要逐项参数进行比对和确认。警冲标座标容易出错，要学会计算。",
        attachment: "../static/案例图片/1_1.jpg"
      },
      fileList: [{
        name: "",
        url: ""
      }],
      localFile: {},
      model: {
        icon: ""
      },
      selectedCategorySpe: this.selectedCategory,
      serviceForm: {
        title: "",
        desc: "",
        priority: "",
        occurDate: ""
      },
      images: {},
      files: {},
      dialogImageUrl: "",
      dialogVisible: false
    }
  },
  methods: {
    updateCase () {
      // let that = this
      let info = {}
      info["case"] = this.caseInfo
      info["file"] = this.localFile
      axios.post("http://localhost:9001/case/addCase", info, {
        headers: {
          "Content-Type": "text/plain; charset=UTF-8"
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
    // handleRemove (file, fileList) {
    //   console.log(file, fileList)
    // },
    // handlePreview (file) {
    //   console.log(file)
    // },
    // handleExceed (files, fileList) {
    //   this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    // },
    // beforeRemove (file, fileList) {
    //   return this.$confirm(`确定移除 ${file.name}？`)
    // },
    imgSaveToUrl (event) { // 也可以用file
      // this.localFile = event.raw // 或者 this.localFile=file.raw

      // 转换操作可以不放到这个函数里面，
      // 因为这个函数会被多次触发，上传时触发，上传成功也触发
      // let reader = new FileReader()
      // reader.readAsDataURL(this.localFile)// 这里也可以直接写参数event.raw

      // 转换成功后的操作，reader.result即为转换后的DataURL ，
      // 它不需要自己定义，你可以console.log(reader.result)看一下
      // reader.onload = () => {
      //   console.log(reader.result)
      // }
      /* 另外一种本地预览方法 */
      let URL = window.URL || window.webkitURL
      this.localFile = URL.createObjectURL(event.raw)
      this.model.icon = URL.createObjectURL(event.raw)
    },
    beforeUploadPicture (file) {
      const isImage = file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg" || file.type == "image/bmp" || file.type == "image/gif" || file.type == "image/webp"
      const isLt2M = file.size < 1024 * 1024 * 2
      if (!isImage) {
        this.$message.error("上传只能是png,jpg,jpeg,bmp,gif,webp格式!")
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!")
      }
      return isImage && isLt2M
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemovePicture (file, fileList) {
      console.log(file, fileList)
    },
    imageChange (file, fileList, name) {
      console.log(file, fileList)
      this.imageList = fileList
      this.images["images"] = fileList
    },
    handleRemoveFile (file, fileList) {
      console.log(file, fileList)
    },
    handlePreviewFile (file) {
      console.log(file)
    },
    handleExceedFile (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemoveFile (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    fileChange (file, fileList) {
      console.log(file, fileList)
      this.fileList = fileList
      this.files["files"] = fileList
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
