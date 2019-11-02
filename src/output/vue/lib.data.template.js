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
        all:`    selectAll$domain: true,
`,
        load:`    $domainLoading: false,
`,
        list:{
          begin:`    $domainList: [
`,
          item:`      {
        key: glossary$nameAppend.$domain.$glossary,
        value: glossary$nameAppend.$domain.$glossary,
        label: "$label"
      },
`,
          end:`    ],
`
        },
        aspect:`    $domainAspect: {
      label:'$label',
      all:'全部'
    },
`,
      },
      end:`  },
`,
    },
    queryModel: {
      begin:`  $modelName: function() {
    return {
`,
      item:`      $domain: '$value',
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
`,
    end:`};`
  },
  convert: {
    begin:`
const convertSetting = {
`,
    upload:{
      begin:`  upload:{
`,
      item:`    $domain: "$domain",
`,
      end:`  },
`,
    },
    detail:{
      begin:`  detail:{
`,
      item:`    $domain: "$domain",
`,
      end:`  },
`,
    },
    download:{
      begin:`  download:{
`,
      item:`    $domain: "$domain",
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
};`,
  export: `
export {
  pageModelDefault,
  convertSetting,
  mockPageResult,
  glossary$nameAppend
}
`,
};


module.exports = templateObj;
