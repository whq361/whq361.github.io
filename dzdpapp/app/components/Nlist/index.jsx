import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class Nlist extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
                <div id="container">
                    {this.props.data.map((item, index) => {
                        return <div key={index} className="newlist">
                            <a href={item.link} target="_blank">
                                <img src={item.img} alt={item.title}/>
                                <p>{item.title}</p>
                                <span>{item.author}</span>
                            </a>
                        </div>
                    })}
                    <div className="ap"><a href="javascript:;">想看更多新鲜资讯吗，快来下载APP吧</a></div>
                </div>
            </div>
        )
    }

}

export default Nlist