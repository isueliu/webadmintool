
const query = require('./queryList.template.js');
const contr = require('./lib.contr.template.js');
const datas = require('./lib.data.template.js');

const domainReg = /\$domain/gi;
const modelReg = /\$model/gi;
const nameReg = /\$name/gi;
const nameAppendReg = /\$nameAppend/gi;
const glossaryReg = /\$glossary/gi;

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
    let itemTemplate = ele.action && itemMap[ele.action] || filter.item;
    let item = itemTemplate.replace("$label", ele.title).replace(modelReg, ele.name).replace("$filterType", ele.filterType && `type="${ele.filterType}"` || '').replace("$placeholder", ele.placeholder || '');
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
  const indexItem = table.item.replace("$type", ` type="index"`).replace('$label','序号').replace("$prop","").replace("$fixed",' fixed="left"').replace('$width', '100');
  const tableItemArray = dataConfig.table.map((ele, idx) => {
    let item = table.item.replace("$type", '').replace("$label", ele.title).replace("$prop", ele.name).replace("$fixed", ele.fixed && ` fixed="${ele.fixed}"` || '').replace('$width', ele.width || '100');
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
    script.begin.replace(nameAppendReg, dataConfig.nameAppend).replace(nameReg, dataConfig.name),
    script.name.replace(nameReg, `${dataConfig.name}${dataConfig.nameAppend}`),
    ...fillScriptData(dataConfig, script.data),
    script.end.replace(nameAppendReg, dataConfig.nameAppend).replace(nameReg, dataConfig.name)
  ];
};

const fillScriptData = (dataConfig, scriptData = query.script.data) => {
  return [
    scriptData.begin.replace(nameAppendReg, dataConfig.nameAppend).replace(nameReg, dataConfig.name),
    ...fillScriptDataQueryModel(dataConfig, scriptData.queryModel),
    ...fillScriptDataPageResult(dataConfig, scriptData.pageResult),
    scriptData.end
  ];
};

const fillScriptDataQueryModel = (dataConfig, queryModel = query.script.data.queryModel) => {
  return queryModel.begin.replace(nameAppendReg, dataConfig.nameAppend).replace(nameReg, dataConfig.name);
};

const fillScriptDataPageResult = (dataConfig, pageResult = query.script.data.pageResult) => {
  return pageResult.begin.replace(nameAppendReg, dataConfig.nameAppend).replace(nameReg, dataConfig.name);
};

const generateContrFileContent = (dataConfig = {}, templateConfig= contr) => {
  return [
    templateConfig.begin,
    ...fillControllerCondition(dataConfig, templateConfig.condition),
    templateConfig.uploadParams.replace(nameAppendReg, dataConfig.nameAppend).replace(nameReg, dataConfig.name),
    ...fillControllerDownload(dataConfig, templateConfig.downloadParse),
    templateConfig.queryPage.replace(nameAppendReg, dataConfig.nameAppend).replace(nameReg, dataConfig.name),
    templateConfig.updateInfo.replace(nameAppendReg, dataConfig.nameAppend).replace(nameReg, dataConfig.name),
    templateConfig.end.replace(nameAppendReg, dataConfig.nameAppend).replace(nameReg, dataConfig.name),
  ].join('');
};

const fillControllerCondition = (dataConfig, condition=contr.condition) => {
  return [
    ...dataConfig.query.filter(ele => ele.options),
    ...dataConfig.table.filter(ele => ele.options)
  ].map(ele => {
    return condition.replace(nameAppendReg, dataConfig.nameAppend).replace(nameReg, dataConfig.name).replace(domainReg, ele.name);
  });
};
const fillControllerDownload = (dataConfig, download=contr.downloadParse) => {
  return [
    download.begin,
    ...dataConfig.table.filter(ele => ele.format == 'map').map(ele => {
      return download.map.replace(domainReg, ele.name);
    }),
    ...dataConfig.table.filter(ele => ele.format == 'date').map(ele => {
      return download.date.replace(domainReg, ele.name);
    }),
    download.end
  ];
};
const generateDataFileContent = (dataConfig={}, templateConfig=datas) => {
  return [
    templateConfig.begin,
    ...fillDataGlossary(dataConfig, templateConfig.allGlossary),
    ...fillPageModel(dataConfig, templateConfig.pageModel),
    ...fillConvert(dataConfig, templateConfig.convert),
    templateConfig.mockData,
    templateConfig.export.replace(nameAppendReg, dataConfig.nameAppend)
  ].join('');
};
const fillDataGlossary = (dataConfig = {}, allGlossary=datas.allGlossary) => {
  return [
    allGlossary.begin.replace(nameAppendReg, dataConfig.nameAppend),
    ...[...dataConfig.query.filter(ele => ele.options), ...dataConfig.table.filter(ele => ele.options)].map(domain => {
      return [
        allGlossary.glossary.begin.replace(domainReg, domain.name),
        ...domain.options.map(option => {
          return allGlossary.glossary.item.replace(glossaryReg, option.name).replace('$value', JSON.stringify(option.value));
        }),
        allGlossary.glossary.end,
      ].join('');
    }),
    allGlossary.end,
  ];
};
const fillPageModel = (dataConfig={}, pageModel=datas.pageModel) => {
  return [
    pageModel.begin,
    ...fillPageModelMeta(dataConfig, pageModel.meta),
    ...fillPageModelQuery(dataConfig, pageModel.queryModel),
    pageModel.pageResult,
    pageModel.end
  ];
};
const fillPageModelMeta = (dataConfig={}, meta=datas.pageModel.meta) => {
  return [
    meta.begin,
    ...[...dataConfig.query.filter(ele => ele.options), ...dataConfig.table.filter(ele => ele.options)].map(domain=> {
      return [
        meta.status.all.replace(domainReg, `${domain.name.slice(0,1).toUpperCase()}${domain.name.slice(1)}`),
        meta.status.list.begin.replace(domainReg, domain.name),
        ...domain.options.map(option => {
          return meta.status.list.item.replace(nameAppendReg, dataConfig.nameAppend).replace(domainReg, domain.name).replace(glossaryReg, option.name).replace('$label',option.label);
        }),
        meta.status.list.end,
        meta.status.aspect.replace(domainReg, domain.name).replace('$label',domain.title)
      ].join('');
    }),
    meta.end
  ];
};
const fillPageModelQuery = (dataConfig={}, query=datas.pageModel.queryModel) => {
  return [
    query.begin,
    ...dataConfig.query.map(ele => {
      let defaultValue = ele.defaultValue;
      return query.item.replace(domainReg, ele.name).replace('$value',defaultValue);
    }),
    query.end
  ];
};
const fillConvert = (dataConfig={}, convert=datas.convert) => {
  return [
    convert.begin,
    convert.upload.begin,
    ...dataConfig.query.map(ele => {
      return convert.upload.item.replace(domainReg, ele.name);
    }),
    convert.upload.end,
    convert.download.begin,
    ...dataConfig.table.map(ele => {
      return convert.download.item.replace(domainReg, ele.name);
    }),
    convert.download.end,
    convert.end
  ];
};
exports.generateFileContent = generateFileContent;
exports.generateContrFileContent = generateContrFileContent;
exports.generateDataFileContent = generateDataFileContent;

