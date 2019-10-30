
const query = require('./queryList.template.js');
const contr = require('./lib.conr.template.js');
const datas = require('./lib.data.template.js');


const generateFileContent = async (dataConfig ={}, templateConfig = query) => {
  return [
    ...fillTemplate(dataConfig, templateConfig.template),
    ...fillScript(dataConfig, templateConfig.script)
  ].join('');
};

const fillTemplate = (dataConfig, template = query.template) => {
  let templateArray = [template.begin];
  if (dataConfig.breadcrumb) {
    templateArray = templateArray.concat(fillBreadcrumb(dataConfig, template.breadcrumb));
  }
  templateArray = templateArray.concat(fillContent(dataConfig, template.content));
  templateArray = templateArray.concat(template.end);
  return templateArray;
};

const fillBreadcrumb = (dataConfig, breadcrumb = query.template.breadcrumb) => {
  let breadcrumbArray = [breadcrumb.begin];
  breadcrumbArray  = breadcrumbArray.concat(dataConfig.breadcrumb.map((ele, idx) => {
    let item = breadcrumb.item;
    if (ele.path) {
      item = item.replace("$to", `:to="{ path:'${ele.path}'}"`);
    }else {
      item = item.replace("$to", '');
    }
    item = item.replace("$label", ele.label || '');
    return item;
  }));
  let lastItem = breadcrumb.item.replace("$to",  '').replace("$label", dataConfig.title||"");
  breadcrumbArray.push(lastItem);
  breadcrumbArray = breadcrumbArray.concat(breadcrumb.end);
  return breadcrumbArray;
};

const fillContent = (dataConfig, content = query.template.content) => {
  let contentArray = [
    content.begin,
    ...fillFilter(dataConfig, content.filter),
    ...fillResult(dataConfig, content.result),
    content.end
  ];
  return contentArray;
};
const fillFilter = (dataConfig, filter = query.template.content.filter, itemMap = query.itemMap || {}) => {
  const filterItemArray = dataConfig.query.map((ele, idx) => {
    let itemTemplate = ele.action == 'select' && itemMap[ele.action] || filter.item;
    let item = itemTemplate.replace("$label", ele.title).replace("$model", ele.name).replace("$filterType", ele.filterType && `type="${ele.filterType}"` || '').replace("$placeholder", ele.placeholder || '');
    return item;
  });
  return [filter.begin, ...filterItemArray, filter.end];
};

const fillResult = (dataConfig, result = query.template.content.result) => {
  return [
    result.begin,
    ...fillResultTable(dataConfig, result.table),
    ...fillResultPage(dataConfig, result.page),
    result.end
  ];
};

const fillResultTable = (dataConfig, table = query.template.content.result.table) => {
  const indexItem = table.item.replace("$type", `type="index"`).replace('$label','序号').replace("$prop","").replace("$fixed",'fixed="left"').replace('$width', '100');
  const tableItemArray = dataConfig.table.map((ele, idx) => {
    let item = table.item.replace("$type", '').replace("$label", ele.title).replace("$prop", ele.name).replace("$fixed", ele.fixed && `fixed="${ele.fixed}"` || '').replace('$width', ele.width || '100');
    return item;
  });
  return [table.begin, indexItem, ...tableItemArray, table.operation, table.end];
};

const fillResultPage = (dataConfig, page = query.tempalte.content.result.page) => {
  let pageItem = page;
  return [pageItem];
};

const fillScript = (dataConfig, script = query.script) => {
  return [
    script.begin.replace('$nameAppend', dataConfig.nameAppend).replace('$name', dataConfig.name),
    script.name.replace('$name', `${dataConfig.name}${dataConfig.nameAppend}`),
    ...fillScriptData(dataConfig, script.data),
    script.end.begin.replace('$nameAppend', dataConfig.nameAppend).replace('$name', dataConfig.name)
  ];
};

const fillScriptData = (dataConfig, scriptData = query.script.data) => {
  return [
    scriptData.begin.replace('$nameAppend', dataConfig.nameAppend).replace('$name', dataConfig.name),
    ...fillScriptDataQueryModel(dataConfig, scriptData.queryModel),
    ...fillScriptDataPageResult(dataConfig, scriptData.pageResult),
    scriptData.end
  ];
};

const fillScriptDataQueryModel = (dataConfig, queryModel = query.script.data.queryModel) => {
  return queryModel.begin.replace('$nameAppend', dataConfig.nameAppend).replace('$name', dataConfig.name);
};

const fillScriptDataPageResult = (dataConfig, pageResult = query.script.data.pageResult) => {
  return pageResult.begin..replace('$nameAppend', dataConfig.nameAppend).replace('$name', dataConfig.name);
};

const generateContrFileContent = (dataConfig = {}, templateConfig= contr) => {
  return [
    templateConfig.begin,
    ...fillControllerCondition(dataConfig, templateConfig.condition),
    templateConfig.uploadParams.replace('$nameAppend', dataConfig.nameAppend).replace('$name', dataConfig.name),
    ...fillControllerDownload(dataConfig, templateConfig.downloadParse),
    templateConfig.queryPage.replace('$nameAppend', dataConfig.nameAppend).replace('$name', dataConfig.name),
    templateConfig.updateInfo.replace('$nameAppend', dataConfig.nameAppend).replace('$name', dataConfig.name),
    templateConfig.end.replace('$nameAppend', dataConfig.nameAppend).replace('$name', dataConfig.name),
  ].join('');
};

const fillControllerCondition = (dataConfig, condition=contr.condition) => {
  return [
    ...dataConfig.query.filter(ele => ele.options),
    ...dataConfig.table.filter(ele => ele.options)
  ].map(ele => {
    return condition.replace('$nameAppend', dataConfig.nameAppend).replace('$name', dataConfig.name).replace('$domain', ele.name);
  });
};
const fillControllerDownload = (dataConfig, download=contr.downloadParse) => {
  return [
    download.begin,
    ...dataConfig.table.filter(ele => ele.format == 'map').map(ele => {
      return download.map.replace('$domain', ele.name);
    }),
    ...dataConfig.table.filter(ele => ele.format == 'date').map(ele => {
      return download.date.replace('$domain', ele.name);
    }),
    download.end
  ];
};
const generateDataFileContent = (dataConfig={}, templateConfig=datas) => {
  return [
    templateConfig.begin,
    ...fillDataGlossary(dataConfig, templateConfig.allGlossary)
  ].join('');
};
const fillDataGlossary = (dataConfig = {}, allGlossary=datas.allGlossary) => {
  return [
    allGlossary.begin.replace('$nameAppend', dataConfig.nameAppend),
    ...[...dataConfig.query.filter(ele => ele.options), ...dataConfig.table.filter(ele => ele.options)].map(domain => {
      return 
    }),
    allGlossary.end,
  ];
  return [...dataConfig.query.filter(ele => ele.options), ...dataConfig.table.filter(ele => ele.options)]
  return [
    glossary.begin,
    ....map(ele => {
      return glossary.repl
    }),
    glossary.end
  ];
};
exports.generateFileContent = generateFileContent;
exports.generateContrFileContent = generateContrFileContent;
exports.generateDataFileContent = generateDataFileContent;

