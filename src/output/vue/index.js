
const query = require('./queryList.template.js');


const generateFileContent = async (dataConfig ={}, templateConfig = query) => {
  let contentArray = fillTemplate(dataConfig, templateConfig.template);
  let scriptArray = fillScript(dataConfig, templateConfig.script);
  return contentArray.join('');
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
  let lastItem = breadcrumb.item.replace("$to",  '');
  lastItem.replace("$label", dataConfig.title||"");
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
const fillFilter = (dataConfig, filter = query.template.content.filter) => {
  const filterItemArray = dataConfig.data.filter(ele => !ele.key).filter(ele => !ele.hideInQuery).map((ele, idx) => {
    let item = filter.item.replace("$label", ele.title).replace("$model", ele.name).replace("$filterType", ele.filterType && `type="${ele.filterType}"` || '');
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
  const indexItem = table.item.replace("$type", `type="index"`);
  const tableItemArray = dataConfig.data.filter(ele => !ele.key).filter(ele => !ele.hideInList).map((ele, idx) => {
    let item = table.item.replace("$type", '').replace("$label", ele.title).replace("$prop", ele.name).replace("$fixed", ele.fixed && 'fixed' || '');
    return item;
  });
  return [table.begin, indexItem, ...tableItemArray, table.end];
};

const fillResultPage = (dataConfig, page = query.tempalte.content.result.page) => {
  let pageItem = page;
  return [pageItem];
};

const fillScript = (dataConfig, script = query.script) => {
  return [
    script.begin,
    script.name,
    ...fillScriptData(dataConfig, script.data),
    script.end
  ];
};

const fillScriptData = (dataConfig, scriptData = query.script.data) => {
  return [
    scriptData.begin,
    ...fillScriptDataQueryModel(dataConfig, scriptData.queryModel),
    ...fillScriptDataPageResult(dataConfig, scriptData.pageResult),
    scriptData.end
  ];
};

const fillScriptDataQueryModel = (dataConfig, queryModel = query.script.data.queryModel) => {
  const queryItemArray = dataConfig.data.filter(ele => !ele.key).filter(ele => !ele.hideInQuery).map((ele, idx) => {
    return queryModel.item.replace("$name", ele.name);
  });
  return [
    queryModel.begin,
    ...queryItemArray,
    queryModel.end
  ];
};

const fillScriptDataPageResult = (dataConfig, pageResult = query.script.data.pageResult) => {
  const resultItemArray = dataConfig.data.map((ele, idx) => {
    return pageResult.item.replace("$name", ele.name).replace("$value", ele.defaultValue);
  });
  return [
    pageResult.begin,
    ...resultItemArray,
    pageResult.end
  ];
};

exports.generateFileContent = generateFileContent;



