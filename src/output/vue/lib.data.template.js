const templateObj = {
  begin:`
/**
 * @author liuhanru
**/
`,
  allGlossary: {
    begin:`const glossary$nameAppend = {
`,
    glossary: {
      begin:`  $domain: {
`,
      item:`    $glossary:$value,
`,
      end:`  },
`
    },
    end:`};
`,
  },
  pageModel:{
    begin:`const pageModelDefault = {
`,
    meta:{
      begin:`  meta:{
    loading: false,
`,
      status:{
        all:`    selectAllAccountStatus: true,
`,
        list:{
          begin:`    accountStatusList: [
`,
          item:`      {
        key: 1,
        label: "启用"
      },
`,
          end:`    ],
`
        }
      }
    },
    queryModel: {
      begin:`  queryModel: function() {
    return {
`,
      item:`      driverName: "",
`,
      end:`    };
  },
`,
    },
    pageResult:`  pageResult: {
    current: 0,
    size: 20,
    total: 0,
    showList:[]
  },
`
  },
  convert: {
    begin:`
const convertSetting = {
`,
    upload:{
      begin:`  upload:{
`,
      item:`    driverName: "driverName",
`,
      end:`  },
`,
    },
    download:{
      begin:`  download:{
`,
      item:`    driverName: "driverName",
`,
      end:`  },
`,
    },
    end:`};
`,
  },
  mockData: `const mockPageResult = {
  current: 0,
  size: 20,
  total: 3,
  showList: []
`,
};


module.exports = templateObj;
