<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="序号"
        width="60"
        align="center">
      </el-table-column>
      <el-table-column
        prop="signalNameAnalysis"
        label="信号机名称审核"
        align="center"
        :filters="[{ text: '审核通过', value: '审核通过' }, { text: '审核未通过', value: '审核未通过' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>审核规范: {{ scope.row.signalNameAnalysisReason }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag
                  :type="scope.row.signalNameAnalysis === '审核通过' ? 'primary' : scope.row.signalNameAnalysis === '审核未通过' ? 'danger' : 'info'"
                  disable-transitions>{{scope.row.signalNameAnalysis}}</el-tag>
              </div>
            </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="signalMileageAnalysis"
        label="信号机里程审核"
        align="center"
        :filters="[{ text: '审核通过', value: '审核通过' }, { text: '审核未通过', value: '审核未通过' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>审核规范: {{ scope.row.signalMileageAnalysisReason }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag
                :type="scope.row.signalMileageAnalysis === '审核通过' ? 'primary' : scope.row.signalMileageAnalysis === '审核未通过' ? 'danger' : 'info'"
                disable-transitions>{{scope.row.signalMileageAnalysis}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="insulationMileageAnalysis"
        label="钢轨绝缘里程审核"
        align="center"
        :filters="[{ text: '审核通过', value: '审核通过' }, { text: '审核未通过', value: '审核未通过' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>审核规范: {{ scope.row.insulationMileageAnalysisReason }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag
                :type="scope.row.insulationMileageAnalysis === '审核通过' ? 'primary' : scope.row.insulationMileageAnalysis === '审核未通过' ? 'danger' : 'info'"
                disable-transitions>{{scope.row.insulationMileageAnalysis}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="warningMileageAnalysis"
        label="警冲标里程审核"
        align="center"
        :filters="[{ text: '审核通过', value: '审核通过' }, { text: '审核未通过', value: '审核未通过' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>审核规范: {{ scope.row.warningMileageAnalysisReason }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag
                :type="scope.row.warningMileageAnalysis === '审核通过' ? 'primary' : scope.row.warningMileageAnalysis === '审核未通过' ? 'danger' : 'info'"
                disable-transitions>{{scope.row.warningMileageAnalysis}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="boundaryAnalysis"
        label="分界处位置审核"
        align="center"
        :filters="[{ text: '审核通过', value: '审核通过' }, { text: '审核未通过', value: '审核未通过' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>审核规范: {{ scope.row.boundaryAnalysisReason }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag
                :type="scope.row.boundaryAnalysis === '审核通过' ? 'primary' : scope.row.boundaryAnalysis === '审核未通过' ? 'danger' : 'info'"
                disable-transitions>{{scope.row.boundaryAnalysis}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "analysisResult",
  data() {
    return {
      tableData: [{
        id: '1',
        signalNameAnalysis: '审核通过',
        signalNameAnalysisReason: '4.信号机采用的统一代号应符合以下规定：' +
          '1 出站信号机：上行用S，下行用X，在字母右下角加上股道号，如SI、SII、XI、XII。（一般图里面直接写，不加在右下角，如SI、SII、XI、XII）\n' +
          '2 进站信号机：上行用S，下行用X，有几个方向线路时，在字母右下角加上以线路名拼音字头，如SS、SH、XS、XH。（一般图里面直接写，不加在右下角，如SS、SH、XS、XH）\n' +
          '3 调车信号机：在D字右下角加以顺序号，上行用双号，下行用单号，有数个车场时以百位数表示车场号，如D1、D3、D202等。（一般图里面直接写，不加在右下角，如D1、D3、D202\n',
        signalMileageAnalysis: '审核通过',
        signalMileageAnalysisReason: '1.进站信号机应设在距最外方进站道岔尖轨尖端（顺向为警冲标）不少于50m的地点。',
        insulationMileageAnalysis: '审核通过',
        insulationMileageAnalysisReason: '钢轨绝缘应与通过信号机、进站信号机、出站信号机、近路信号机及调车信号机并列安装；当不能并列安装时，应符合下列规定：\n' +
          '1 进站、接车进路信号机及自动闭塞区间并置的通过信号机处，钢轨绝缘可设在信号机前方1m或后方1m的范围内。\n' +
          '2 出站（包括出站兼调车）或发车进路信号机、自动闭塞区间单置通过信号机处，钢轨绝缘可设在信号机前方1m或后方6.5m的范围内。\n' +
          '3 调车信号机处的钢轨绝缘可设在其信号机前方1m或后方1m的范围内；当该信号机设在到发线时，按本条第2款处理。\n',
        warningMileageAnalysis: '未审核',
        warningMileageAnalysisReason: '无',
        boundaryAnalysis: '未审核',
        boundaryAnalysisReason: '无'
      }, {
        id: '2',
        signalNameAnalysis: '审核通过',
        signalNameAnalysisReason: '信号机采用的统一代号应符合以下规定：' +
          '1 出站信号机：上行用S，下行用X，在字母右下角加上股道号，如SI、SII、XI、XII。（一般图里面直接写，不加在右下角，如SI、SII、XI、XII）\n' +
          '2 进站信号机：上行用S，下行用X，有几个方向线路时，在字母右下角加上以线路名拼音字头，如SS、SH、XS、XH。（一般图里面直接写，不加在右下角，如SS、SH、XS、XH）\n' +
          '3 调车信号机：在D字右下角加以顺序号，上行用双号，下行用单号，有数个车场时以百位数表示车场号，如D1、D3、D202等。（一般图里面直接写，不加在右下角，如D1、D3、D202\n',
        signalMileageAnalysis: '审核通过',
        signalMileageAnalysisReason: '进站信号机应设在距最外方进站道岔尖轨尖端（顺向为警冲标）不少于50m的地点。',
        insulationMileageAnalysis: '审核通过',
        insulationMileageAnalysisReason: '钢轨绝缘应与通过信号机、进站信号机、出站信号机、近路信号机及调车信号机并列安装；当不能并列安装时，应符合下列规定：\n' +
          '1 进站、接车进路信号机及自动闭塞区间并置的通过信号机处，钢轨绝缘可设在信号机前方1m或后方1m的范围内。\n' +
          '2 出站（包括出站兼调车）或发车进路信号机、自动闭塞区间单置通过信号机处，钢轨绝缘可设在信号机前方1m或后方6.5m的范围内。\n' +
          '3 调车信号机处的钢轨绝缘可设在其信号机前方1m或后方1m的范围内；当该信号机设在到发线时，按本条第2款处理。\n',
        warningMileageAnalysis: '审核未通过',
        warningMileageAnalysisReason: '设在警冲标内方的钢轨绝缘，除渡线上外，其安装位置距警冲标计算位置不宜少于3.5m，距警冲标实际位置不应大于4m。',
        boundaryAnalysis: '未审核',
        boundaryAnalysisReason: '无'
      }, {
        id: '3',
        signalNameAnalysis: '审核通过',
        signalNameAnalysisReason: '信号机采用的统一代号应符合以下规定：' +
          '1 出站信号机：上行用S，下行用X，在字母右下角加上股道号，如SI、SII、XI、XII。（一般图里面直接写，不加在右下角，如SI、SII、XI、XII）\n' +
          '2 进站信号机：上行用S，下行用X，有几个方向线路时，在字母右下角加上以线路名拼音字头，如SS、SH、XS、XH。（一般图里面直接写，不加在右下角，如SS、SH、XS、XH）\n' +
          '3 调车信号机：在D字右下角加以顺序号，上行用双号，下行用单号，有数个车场时以百位数表示车场号，如D1、D3、D202等。（一般图里面直接写，不加在右下角，如D1、D3、D202\n',
        signalMileageAnalysis: '未审核',
        signalMileageAnalysisReason: '无',
        insulationMileageAnalysis: '审核通过',
        insulationMileageAnalysisReason: '钢轨绝缘应与通过信号机、进站信号机、出站信号机、近路信号机及调车信号机并列安装；当不能并列安装时，应符合下列规定：\n' +
          '1 进站、接车进路信号机及自动闭塞区间并置的通过信号机处，钢轨绝缘可设在信号机前方1m或后方1m的范围内。\n' +
          '2 出站（包括出站兼调车）或发车进路信号机、自动闭塞区间单置通过信号机处，钢轨绝缘可设在信号机前方1m或后方6.5m的范围内。\n' +
          '3 调车信号机处的钢轨绝缘可设在其信号机前方1m或后方1m的范围内；当该信号机设在到发线时，按本条第2款处理。\n',
        warningMileageAnalysis: '审核通过',
        warningMileageAnalysisReason: '设在警冲标内方的钢轨绝缘，除渡线上外，其安装位置距警冲标计算位置不宜少于3.5m，距警冲标实际位置不应大于4m。',
        boundaryAnalysis: '未审核',
        boundaryAnalysisReason: '无'
      }, {
        id: '4',
        signalNameAnalysis: '审核通过',
        signalNameAnalysisReason: '信号机采用的统一代号应符合以下规定：' +
          '1 出站信号机：上行用S，下行用X，在字母右下角加上股道号，如SI、SII、XI、XII。（一般图里面直接写，不加在右下角，如SI、SII、XI、XII）\n' +
          '2 进站信号机：上行用S，下行用X，有几个方向线路时，在字母右下角加上以线路名拼音字头，如SS、SH、XS、XH。（一般图里面直接写，不加在右下角，如SS、SH、XS、XH）\n' +
          '3 调车信号机：在D字右下角加以顺序号，上行用双号，下行用单号，有数个车场时以百位数表示车场号，如D1、D3、D202等。（一般图里面直接写，不加在右下角，如D1、D3、D202\n',
        signalMileageAnalysis: '未审核',
        signalMileageAnalysisReason: '无',
        insulationMileageAnalysis: '审核通过',
        insulationMileageAnalysisReason: '钢轨绝缘应与通过信号机、进站信号机、出站信号机、近路信号机及调车信号机并列安装；当不能并列安装时，应符合下列规定：\n' +
          '1 进站、接车进路信号机及自动闭塞区间并置的通过信号机处，钢轨绝缘可设在信号机前方1m或后方1m的范围内。\n' +
          '2 出站（包括出站兼调车）或发车进路信号机、自动闭塞区间单置通过信号机处，钢轨绝缘可设在信号机前方1m或后方6.5m的范围内。\n' +
          '3 调车信号机处的钢轨绝缘可设在其信号机前方1m或后方1m的范围内；当该信号机设在到发线时，按本条第2款处理。\n',
        warningMileageAnalysis: '审核通过',
        warningMileageAnalysisReason: '设在警冲标内方的钢轨绝缘，除渡线上外，其安装位置距警冲标计算位置不宜少于3.5m，距警冲标实际位置不应大于4m。',
        boundaryAnalysis: '未审核',
        boundaryAnalysisReason: '无'
      }, {
        id: '5',
        signalNameAnalysis: '审核通过',
        signalNameAnalysisReason: '信号机采用的统一代号应符合以下规定：' +
          '1 出站信号机：上行用S，下行用X，在字母右下角加上股道号，如SI、SII、XI、XII。（一般图里面直接写，不加在右下角，如SI、SII、XI、XII）\n' +
          '2 进站信号机：上行用S，下行用X，有几个方向线路时，在字母右下角加上以线路名拼音字头，如SS、SH、XS、XH。（一般图里面直接写，不加在右下角，如SS、SH、XS、XH）\n' +
          '3 调车信号机：在D字右下角加以顺序号，上行用双号，下行用单号，有数个车场时以百位数表示车场号，如D1、D3、D202等。（一般图里面直接写，不加在右下角，如D1、D3、D202\n',
        signalMileageAnalysis: '未审核',
        signalMileageAnalysisReason: '无',
        insulationMileageAnalysis: '审核通过',
        insulationMileageAnalysisReason: '钢轨绝缘应与通过信号机、进站信号机、出站信号机、近路信号机及调车信号机并列安装；当不能并列安装时，应符合下列规定：\n' +
          '1 进站、接车进路信号机及自动闭塞区间并置的通过信号机处，钢轨绝缘可设在信号机前方1m或后方1m的范围内。\n' +
          '2 出站（包括出站兼调车）或发车进路信号机、自动闭塞区间单置通过信号机处，钢轨绝缘可设在信号机前方1m或后方6.5m的范围内。\n' +
          '3 调车信号机处的钢轨绝缘可设在其信号机前方1m或后方1m的范围内；当该信号机设在到发线时，按本条第2款处理。\n',
        warningMileageAnalysis: '审核通过',
        warningMileageAnalysisReason: '设在警冲标内方的钢轨绝缘，除渡线上外，其安装位置距警冲标计算位置不宜少于3.5m，距警冲标实际位置不应大于4m。',
        boundaryAnalysis: '未审核',
        boundaryAnalysisReason: '无'
      }, {
        id: '6',
        signalNameAnalysis: '审核通过',
        signalNameAnalysisReason: '信号机采用的统一代号应符合以下规定：' +
          '1 出站信号机：上行用S，下行用X，在字母右下角加上股道号，如SI、SII、XI、XII。（一般图里面直接写，不加在右下角，如SI、SII、XI、XII）\n' +
          '2 进站信号机：上行用S，下行用X，有几个方向线路时，在字母右下角加上以线路名拼音字头，如SS、SH、XS、XH。（一般图里面直接写，不加在右下角，如SS、SH、XS、XH）\n' +
          '3 调车信号机：在D字右下角加以顺序号，上行用双号，下行用单号，有数个车场时以百位数表示车场号，如D1、D3、D202等。（一般图里面直接写，不加在右下角，如D1、D3、D202\n',
        signalMileageAnalysis: '未审核',
        signalMileageAnalysisReason: '无',
        insulationMileageAnalysis: '审核通过',
        insulationMileageAnalysisReason: '钢轨绝缘应与通过信号机、进站信号机、出站信号机、近路信号机及调车信号机并列安装；当不能并列安装时，应符合下列规定：\n' +
          '1 进站、接车进路信号机及自动闭塞区间并置的通过信号机处，钢轨绝缘可设在信号机前方1m或后方1m的范围内。\n' +
          '2 出站（包括出站兼调车）或发车进路信号机、自动闭塞区间单置通过信号机处，钢轨绝缘可设在信号机前方1m或后方6.5m的范围内。\n' +
          '3 调车信号机处的钢轨绝缘可设在其信号机前方1m或后方1m的范围内；当该信号机设在到发线时，按本条第2款处理。\n',
        warningMileageAnalysis: '审核通过',
        warningMileageAnalysisReason: '设在警冲标内方的钢轨绝缘，除渡线上外，其安装位置距警冲标计算位置不宜少于3.5m，距警冲标实际位置不应大于4m。',
        boundaryAnalysis: '未审核',
        boundaryAnalysisReason: '无'
      }, {
        id: '7',
        signalNameAnalysis: '审核通过',
        signalNameAnalysisReason: '4.信号机采用的统一代号应符合以下规定：' +
          '1 出站信号机：上行用S，下行用X，在字母右下角加上股道号，如SI、SII、XI、XII。（一般图里面直接写，不加在右下角，如SI、SII、XI、XII）\n' +
          '2 进站信号机：上行用S，下行用X，有几个方向线路时，在字母右下角加上以线路名拼音字头，如SS、SH、XS、XH。（一般图里面直接写，不加在右下角，如SS、SH、XS、XH）\n' +
          '3 调车信号机：在D字右下角加以顺序号，上行用双号，下行用单号，有数个车场时以百位数表示车场号，如D1、D3、D202等。（一般图里面直接写，不加在右下角，如D1、D3、D202\n',
        signalMileageAnalysis: '未审核',
        signalMileageAnalysisReason: '无',
        insulationMileageAnalysis: '审核通过',
        insulationMileageAnalysisReason: '钢轨绝缘应与通过信号机、进站信号机、出站信号机、近路信号机及调车信号机并列安装；当不能并列安装时，应符合下列规定：\n' +
          '1 进站、接车进路信号机及自动闭塞区间并置的通过信号机处，钢轨绝缘可设在信号机前方1m或后方1m的范围内。\n' +
          '2 出站（包括出站兼调车）或发车进路信号机、自动闭塞区间单置通过信号机处，钢轨绝缘可设在信号机前方1m或后方6.5m的范围内。\n' +
          '3 调车信号机处的钢轨绝缘可设在其信号机前方1m或后方1m的范围内；当该信号机设在到发线时，按本条第2款处理。\n',
        warningMileageAnalysis: '未审核',
        warningMileageAnalysisReason: '无',
        boundaryAnalysis: '审核通过',
        boundaryAnalysisReason: '通过信号机应设在闭塞分区或线路所所间区间的分界处。'
      }, {
        id: '8',
        signalNameAnalysis: '审核通过',
        signalNameAnalysisReason: '信号机采用的统一代号应符合以下规定：' +
          '1 出站信号机：上行用S，下行用X，在字母右下角加上股道号，如SI、SII、XI、XII。（一般图里面直接写，不加在右下角，如SI、SII、XI、XII）\n' +
          '2 进站信号机：上行用S，下行用X，有几个方向线路时，在字母右下角加上以线路名拼音字头，如SS、SH、XS、XH。（一般图里面直接写，不加在右下角，如SS、SH、XS、XH）\n' +
          '3 调车信号机：在D字右下角加以顺序号，上行用双号，下行用单号，有数个车场时以百位数表示车场号，如D1、D3、D202等。（一般图里面直接写，不加在右下角，如D1、D3、D202\n',
        signalMileageAnalysis: '未审核',
        signalMileageAnalysisReason: '',
        insulationMileageAnalysis: '审核通过',
        insulationMileageAnalysisReason: '钢轨绝缘应与通过信号机、进站信号机、出站信号机、近路信号机及调车信号机并列安装；当不能并列安装时，应符合下列规定：\n' +
          '1 进站、接车进路信号机及自动闭塞区间并置的通过信号机处，钢轨绝缘可设在信号机前方1m或后方1m的范围内。\n' +
          '2 出站（包括出站兼调车）或发车进路信号机、自动闭塞区间单置通过信号机处，钢轨绝缘可设在信号机前方1m或后方6.5m的范围内。\n' +
          '3 调车信号机处的钢轨绝缘可设在其信号机前方1m或后方1m的范围内；当该信号机设在到发线时，按本条第2款处理。\n',
        warningMileageAnalysis: '未审核',
        warningMileageAnalysisReason: '无',
        boundaryAnalysis: '审核通过',
        boundaryAnalysisReason: '通过信号机应设在闭塞分区或线路所所间区间的分界处。'
      }, {
        id: '9',
        signalNameAnalysis: '审核通过',
        signalNameAnalysisReason: '信号机采用的统一代号应符合以下规定：' +
          '1 出站信号机：上行用S，下行用X，在字母右下角加上股道号，如SI、SII、XI、XII。（一般图里面直接写，不加在右下角，如SI、SII、XI、XII）\n' +
          '2 进站信号机：上行用S，下行用X，有几个方向线路时，在字母右下角加上以线路名拼音字头，如SS、SH、XS、XH。（一般图里面直接写，不加在右下角，如SS、SH、XS、XH）\n' +
          '3 调车信号机：在D字右下角加以顺序号，上行用双号，下行用单号，有数个车场时以百位数表示车场号，如D1、D3、D202等。（一般图里面直接写，不加在右下角，如D1、D3、D202\n',
        signalMileageAnalysis: '未审核',
        signalMileageAnalysisReason: '无',
        insulationMileageAnalysis: '审核通过',
        insulationMileageAnalysisReason: '钢轨绝缘应与通过信号机、进站信号机、出站信号机、近路信号机及调车信号机并列安装；当不能并列安装时，应符合下列规定：\n' +
          '1 进站、接车进路信号机及自动闭塞区间并置的通过信号机处，钢轨绝缘可设在信号机前方1m或后方1m的范围内。\n' +
          '2 出站（包括出站兼调车）或发车进路信号机、自动闭塞区间单置通过信号机处，钢轨绝缘可设在信号机前方1m或后方6.5m的范围内。\n' +
          '3 调车信号机处的钢轨绝缘可设在其信号机前方1m或后方1m的范围内；当该信号机设在到发线时，按本条第2款处理。\n',
        warningMileageAnalysis: '未审核',
        warningMileageAnalysisReason: '',
        boundaryAnalysis: '审核通过',
        boundaryAnalysisReason: '通过信号机应设在闭塞分区或线路所所间区间的分界处。'
      }, {
        id: '10',
        signalNameAnalysis: '审核通过',
        signalNameAnalysisReason: '信号机采用的统一代号应符合以下规定：' +
          '1 出站信号机：上行用S，下行用X，在字母右下角加上股道号，如SI、SII、XI、XII。（一般图里面直接写，不加在右下角，如SI、SII、XI、XII）\n' +
          '2 进站信号机：上行用S，下行用X，有几个方向线路时，在字母右下角加上以线路名拼音字头，如SS、SH、XS、XH。（一般图里面直接写，不加在右下角，如SS、SH、XS、XH）\n' +
          '3 调车信号机：在D字右下角加以顺序号，上行用双号，下行用单号，有数个车场时以百位数表示车场号，如D1、D3、D202等。（一般图里面直接写，不加在右下角，如D1、D3、D202\n',
        signalMileageAnalysis: '未审核',
        signalMileageAnalysisReason: '无',
        insulationMileageAnalysis: '审核通过',
        insulationMileageAnalysisReason: '钢轨绝缘应与通过信号机、进站信号机、出站信号机、近路信号机及调车信号机并列安装；当不能并列安装时，应符合下列规定：\n' +
          '1 进站、接车进路信号机及自动闭塞区间并置的通过信号机处，钢轨绝缘可设在信号机前方1m或后方1m的范围内。\n' +
          '2 出站（包括出站兼调车）或发车进路信号机、自动闭塞区间单置通过信号机处，钢轨绝缘可设在信号机前方1m或后方6.5m的范围内。\n' +
          '3 调车信号机处的钢轨绝缘可设在其信号机前方1m或后方1m的范围内；当该信号机设在到发线时，按本条第2款处理。\n',
        warningMileageAnalysis: '未审核',
        warningMileageAnalysisReason: '',
        boundaryAnalysis: '审核通过',
        boundaryAnalysisReason: '通过信号机应设在闭塞分区或线路所所间区间的分界处。'
      }]
    }
  },
  methods: {
    filterTag (value, row) {
      return row.tag === value;
    }
  }
}
</script>

<style scoped>

</style>
