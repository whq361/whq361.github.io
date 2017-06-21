import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class LoadMore extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return(
            <div className="load-more"  ref="wrapper">
                {
                    this.props.isLoadingMore ?
                        <span>加载中...</span>:
                        <span onClick={this.loadMoreHandle.bind(this)}>加载更多</span>
                }
            </div>
        )
    }
    loadMoreHandle(){
       //执行传递过来loadMoreFn
        this.props.loadMoreFn()
    }
    componentDidMount() {
        // 使用滚动时自动加载更多
        const loadMoreFn = this.props.loadMoreFn;
        const wrapper = this.refs.wrapper;
        //节流处理,防止连续滚动一直加载更多
        let timeoutId;
        //节流处理
        function callback() {
            const top = wrapper.getBoundingClientRect().top;
            const windowHeight = window.screen.height;
            if (top && top < windowHeight) {
                // 证明 wrapper 已经被滚动到暴露在页面可视范围之内了
                loadMoreFn()
            }
        }
        window.addEventListener('scroll', function () {
            if (this.props.isLoadingMore) {
                return
            }
            //节流处理
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            //节流处理
            timeoutId = setTimeout(callback, 50)
        }.bind(this), false);
    }
}

export default LoadMore