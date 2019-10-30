const templateObj = {
  begin:`
/**
 * @author liuhanru
**/

import { mockService } from '../../mock';

import * as defaultData from './data.js';
import * as dateUtil from '../../../../utils/date.js';

const formatDateFromMillis = (dateMillis) => {
  return dateUtil.formatDateFromMillis(dateMillis);
};
const reducer = (sum, cur) => {
  sum[cur.key]= cur.label;
  return sum;
};
`,
  condition:`
const $domainMap = defaultData.$name$nameAppend.pageModelDefault.meta.$domainList.reduce(reducer, {});
`,
  uploadParams:`
const uploadParams = (queryModel, pageSetting) => {
  const uploadMap = defaultData.$name$nameAppend.convertSetting.upload||{};
  return {
    ...Object.entries(uploadMap).reduce((sum, cur) => {
      sum[cur[0]] = queryModel[cur[1]];
      return sum;
    }, {}),
    ...pageSetting
  };
};
`,
  downloadParse:{
    begin:`
const downloadParse = (respJson) => {
  return {
    ...respJson,
    showList: respJson.showList.map(ele => {
      return {
        ...ele,
`,
    map:`        $domainLabel:$domainMap[ele.$domain],`,
    date:`        $domainLabel:formatDateFromMillis[ele.$domain],`,
    end:`
      };
    }),
  };
};
`
  },
  queryPage:`
const query$nameAppendPage = (queryModel, pageSetting) => {
  const params = uploadParams(queryModel, pageSetting);
  return mockService.delayEvaluate(() => {
    return defaultData.$name$nameAppendDefault.mockPageResult;
  }, 1);
};
`,
  updateInfo:`
const remoteModify$nameAppend = (id, uploadData) => {
  return mockService.delayEvaluate(() => {
    return {
    };
  }, 1);
};
`,
  end:`
export {
  formatDateFromMillis,
  query$nameAppendPage,
  downloadParse,
  remoteModify$nameAppend
}
`,
};


module.exports = templateObj;
