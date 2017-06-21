import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Nlist from '../../../components/Nlist'
import {getAdData} from '../../../fetch/new/new'
import './style.less'


class Ninfo extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            data:[]
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.data.length ?
                        <Nlist data={this.state.data}/> :
                        <div> 加载中... </div>
                }
            </div>
        )
    }
    componentDidMount() {
        const result = getAdData();
        this.resultHandle(result);
    }
    //数据处理
    resultHandle(result){
        result.then(res=>{
            return res.json()
        }).then(json=>{
            const data = json;
            if (data.length) {
                this.setState({
                    data: data
                })
            }
        })
    }

}
export default Ninfo