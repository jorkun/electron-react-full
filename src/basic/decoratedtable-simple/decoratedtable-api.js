/*
 * @Author: Zhao kunkun
 * @Date: 2018-10-09 16:23:10
 * @Last Modified by: Zhao kunkun
 * @Last Modified time: 2019-03-19 11:49:08
 */
import {
    // GetListInfo,
    // UpdateFn,
    GetInfoFn
} from "utils/api";
// 获取操作历史信息
export const GetLogData = (params) => GetInfoFn("/process/comm/log", params);
// 获取列头、搜索信息
export const GetColumnInfo = (name) => GetInfoFn("/tmColumns?tableName=" + name);