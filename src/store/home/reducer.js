import * as home from './action-type';
import renameActionType from '../renameActionType';
renameActionType(home,'home');

let defaultState = {
	groups:[1,2,3,4,5,6],
	updateHomePage:()=>{console.log(11111111111111111)}
};
// 首页表单数据
export const homeData = (state = defaultState, action = {}) => {
	switch (action.type) {
		case home.CLEARDATA:
			return { ...state, ...defaultState };
		case home.UPDATEGROUPLIST:
			return { ...state, ...{ groups: action.groups } };
		case home.UPDATEHOMEPAGE:
			return { ...state, ...{ updateHomePage: action.updateHomePage } };
		default:
			return state;
	}
};
