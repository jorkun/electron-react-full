/**
 * @Author: 张宏胜
 * @Date: 2019-04-15 14:09:03
 */
import {
    GetListInfo,
    GetInfoFn,
    UpdateFn
} from "utils/api";
// 查列表
export const GetListData = (params) => GetListInfo("/tmFormdataValidation/page", params);
// 删除
export const DeleteData = (params, cb) => UpdateFn("/tmFormdataValidation/delete", params, cb);
// 新增、修改
export const SaveData = (isAdd, params, cb) => UpdateFn("/tmFormdataValidation/save?edit=" + (isAdd? "add" : "edit"), params, cb);
// 查询下拉菜单字典
export const GetComboxList = (clsno) => GetInfoFn("/dict?clsno=" + clsno);
// 查所有请求接口
export const GetAllRequestMappingData = () => GetInfoFn("/tmFormdataValidation/getAllRequestMapping");
// 查所有流程key
export const GetAllFlowkeyData = () => GetInfoFn("/tmFormdataValidation/getAllFlowkey");
// 查表单验证元素
export const GetValidateRuleData = () => GetInfoFn("/tmFormdataValidation/getValidateRule");
// 查看表单数据配置
export const GetConfigData = (formID) => GetInfoFn("/tmFormdataValidation/" + formID, {}, "get");
