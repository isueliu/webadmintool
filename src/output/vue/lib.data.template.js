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
        list:{
          begin:`    $domainList: [
`,
          item:`      {
        key: $key,
        label: $label
      },
`,
          end:`    ],
`
        }
      },
      end:`  },
`,
    },
    queryModel: {
      begin:`  queryModel: function() {
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
`
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
