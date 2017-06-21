import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'


class Zzy extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div className="info">
                <p className="author">Author:郑智勇,<a href='mailto:zzy911@foxmail.com'>邮箱</a>,<a href='tel:17600711910'>电话</a></p>
                <div className="face"></div>
                <p className="info-item">本项目使用React全家桶搭建基本页面，使用fetch代替ajax获取数据，使用mock，koa模拟动态接口。(以下二维码为移动端入口)</p>
                <div className="pic"></div>
            </div>
        )
    }
}
export default Zzy