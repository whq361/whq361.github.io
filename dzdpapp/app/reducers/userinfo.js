import * as actionTypes from '../constants/userinfo'

const initialState = {}
//redux定义规则
export default function userinfo (state = initialState, action) {
    switch (action.type) {
        case actionTypes.USERINFO_UPDATE:
            return action.data
        default:
            return state
    }
}