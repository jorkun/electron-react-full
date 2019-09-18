/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-07-20 16:05:14
 */
import React from "react"
export const datas = {}

const ThemeContext = React.createContext(
    datas // 默认值
)
export default ThemeContext;