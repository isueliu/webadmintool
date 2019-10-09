const templateObj = {
  template: {
    begin:`<template>
<div  v-loading="loading">
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
          item:`        <el-table-column $type="index" $fixed prop="$prop" label="$label"></el-table-column>
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
    name:`  name:'callingCenterListAll',`,
    data: {
      begin:`  data: function() {
    return {
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
        showList:[{`,
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
    handleSizeChange: function(){
    },
    handleCurrentChange: function(){
    },
    search: function(){
    },
    clearFilter: function() {
    }
  }
}
</script>
`
  }
};

module.exports = templateObj;
