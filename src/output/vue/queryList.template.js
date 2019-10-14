const templateObj = {
  template: {
    begin:`<template>
<div  v-loading="meta.loading">
 `,
    breadcrumb:{
      begin:`  <el-breadcrumb separator="/">
`,
      item:`    <el-breadcrumb-item $to>$label</el-breadcrumb-item>
`,
      end:`  </el-breadcrumb>
`
    },
    content:{
      begin:`  <div class="pubCon">
`,
      filter:{
        begin:`    <div class="filterArea">
      <div class="filter">
        <el-row>
`,
        item:`          <el-col :span="8">
            <label>$label</label>
            <el-input v-model="queryModel.$model" placeholder="" class="input" $filterType></el-input>
          </el-col>
`,
        end:`        </el-row>
        <div class="btns fr">
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="clearFilter">清除</el-button>
        </div>
      </div>
    </div>
`
      },
      result: {
        begin:`    <div class="filterConArea">
`,
        table:{
          begin:`      <el-table  border :data="pageResult.showList" ref="multipleTable" style="width: 100%">
`,
          item:`        <el-table-column $type $fixed prop="$prop" label="$label" width="100"></el-table-column>
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
      end:`  </div>
`
    },
    end:`</div>
</template>
`
  },
  script:{
    begin:`<script>
export default {
`,
    name:`  name:'$name',
`,
    data: {
      begin:`  data: function() {
    return {
      meta:{
        loading:false,
      },
`,
      queryModel:{
        begin:`      queryModel: {
`,
        item:`        $name:"",
`,
        end:`      },
`,
      },
      pageResult:{
        begin:`      pageResult: {
        current:0,
        size:20,
        total: 800,
        showList:[{
`,
        item:`          $name:"$value",
`,
        end:`        }]
      }
`
      },
      end:`    }
  },
`
    },
    end:`  methods: {
    handleSizeChange: function(newSize, event ){
      this.pageResult.size = newSize;
      this.pageResult.current = 0;
      this.search();
    },
    handleCurrentChange: function(gotoPage, event){
      console.log(gotoPage, event);
      this.pageResult.current = gotoPage;
      this.search();
    },
    searchApi: function() {
      //这里准备参数，并处理具体调用axios接口。如果过于复杂，建议适当结构化
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 1000, {
          current:0,
          size:20,
          total:0,
          showList:[]
        });
      });
    },
    searchApiResultHandler:function(pageResp){
      console.log(pageResp);
      const newPageResult = Object.entries(pageResp).reduce((sum, cur) => {
        sur[cur[0]] = cur[1];
        return sum;
      },{});
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
      const newQueryModel = Object.keys(queryModel).reduce((sum, cur) => {
        sum[cur] = undefined;
        return sum;
      }, {});
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
