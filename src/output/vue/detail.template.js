const templateObj = {
  itemMap: {
    select:`          <el-col :span="8">
            <label>$label</label>
            <el-select
              v-model="queryModel.$model"
              placeholder="$placeholder"
              filterable
              :loading="meta.$modelLoading"
              >
              <el-option
                v-for="option in meta.$modelList"
                :key="option.value"
                :label="option.label"
                :value="option.value"
                ></el-option>
            </el-select>
          </el-col>
`,
    map:`            <query-tag
              :aspectInfo="meta.$modelAspect"
              :tagOptions="meta.$modelList"
              v-model="queryModel.$model"
              :span="12"
              />
`
  },
  template: {
    begin:`<template>
<el-container  v-loading="meta.loading">
  <el-main>
 `,
    breadcrumb:{
      begin:`    <el-breadcrumb separator="/">
`,
      item:`      <el-breadcrumb-item $to>$label</el-breadcrumb-item>
`,
      end:`    </el-breadcrumb>
`
    },
    content:{
      begin:`    <div class="main-as-content info-container">
`,
      filter:{
        begin:`      <el-col :span="24" class="form-group-title margin-bottom-16">
        <label class="form-group-title">基础信息</label>
      </el-col>
      <el-row>
        <el-col :span="12">
`,
        item:`          <info-print :label="aspectModel.$model" :value="detailModel.$model" />
`,
        end:`        </el-col>
        <el-col :span="12">
        </el-col>          
      </el-row>
      <el-row>
      </el-row>
      <el-row>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="clearFilter">清除</el-button>
      </el-row>
    </div>
`
      },
      result: {
        begin:`    <div class="main-as-content info-container">
`,
        table:{
          begin:`      <el-table  border :data="pageResult.showList" ref="multipleTable" style="width: 100%">
`,
          item:`        <el-table-column$type$fixed prop="$prop" label="$label" width="$width"></el-table-column>
`,
          operation:`        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="handleClickEdit(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
`,
          end:`      </el-table>
`,
        },
        page:`      <el-pagination background  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageResult.current" :page-sizes="[10,20,30]" :page-size="pageResult.size" layout="total,sizes, prev, pager, next, jumper" :total="pageResult.total"></el-pagination>
`,
        end:`    </div>
`
      },
      end:`  </el-main>
`
    },
    end:`</el-container>
</template>
`
  },
  script:{
    begin:`<script>
import QueryTag from '../../../components/queryTagsComponent.vue';
import InfoPrint from '../../../components/infoPrintComponent.vue';
import { $name$nameAppendController } from './lib/contr.js';
import { $name$nameAppendData } from './lib/data.js';
export default {
`,
    name:`  name:'$name',
  components: {
    QueryTag, InfoPrint
  },
`,
    data: {
      begin:`  data: function() {
    return {
      meta:{
        ...$name$nameAppendData.pageModelDefault.meta
      },
`,
      queryModel:{
        begin:`      $modelName: {
        ...$name$nameAppendData.pageModelDefault.$modelName()
      },
`,
      },
      pageResult:{
        begin:`      pageResult: {
        ...$name$nameAppendData.pageModelDefault.pageResult
      },
`
      },
      end:`    }
  },
`
    },
    end:`  mounted(){
    const vue = this;
    vue.search();
  },
  methods: {
    handleSizeChange: function(newSize, event ){
      this.pageResult.size = newSize;
      this.pageResult.current = 0;
      this.search();
    },
    handleCurrentChange: function(gotoPage, event){
      this.pageResult.current = gotoPage;
      this.search();
    },
    searchApi: function() {
      const vue = this;
      return $name$nameAppendController.query$nameAppendPage(vue.queryModel, vue.pageResult);
    },
    searchApiResultHandler:function(pageResp){
      const newPageResult = $name$nameAppendController.downloadParse(pageResp);
      this.pageResult = newPageResult;
      return this.pageResult;
    },
    search: function(){
      this.meta.loading = true;
      const vue = this;
      vue.searchApi().then((resp) => {
        return vue.searchApiResultHandler(resp);
      }).then(() => {
        vue.meta.loading = false;
      });
    },
    clearFilter: function() {
      const queryModel =this.queryModel;
      const newQueryModel = $name$nameAppendData.pageModelDefault.queryModel();
      this.queryModel = newQueryModel;
    },
    handleClick: function(rowData) {
      console.log(rowData);
    },
    handleClickEdit: function(rowData) {
      console.log(rowData);
    }
  }
}
</script>
`
  }
};

module.exports = templateObj;
