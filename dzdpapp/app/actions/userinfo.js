import * as actionTypes from '../constants/userinfo'
// 更新动作，更新之后传入reducer
export function update(data) {
    return {
        type: actionTypes.USERINFO_UPDATE,
        data
    }
}