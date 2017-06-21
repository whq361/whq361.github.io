import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Localstore from '../util/localStore'
import {CITYNAME} from '../constants/userinfo'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as userInfoActionsFromOtherFile from '../actions/userinfo'
import Footer from '../components/Footer'


class App extends React.Component {
	constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
       		 initDone: false,
             path:null
        }
    }
	render() { 
		return ( 
			  <div>
                {
                    this.state.initDone
                    ? this.props.children
                    : <div>正在加载...</div>
                }
                <Footer path={this.state.path}/>
              </div>
		) 
	}
	//生命周期，页面第一次渲染完毕执行
	componentDidMount() {
	    //从locallstorage中获取城市信息，没有的话设置成北京
	    let cityName=Localstore.getItem(CITYNAME);
	    if(cityName==null){
	        cityName='北京'
        }
        //a.2接收    将城市信息存储到redux中，组件间共享数据
        this.props.userInfoActions.update({
            cityName:cityName
        })

        // 更改状态
        this.setState({
            initDone: true
        })
    }
    //监听路由变化，添加样式.冗余使用Link标签activeStyle属性给当前路由添加样式
    componentWillReceiveProps(nextProps){
        // console.log(nextProps.location.pathname)    // path/to/abc
        this.setState({
            path:nextProps.location.pathname
        })
        console.log(this.state.path)
    }
}

//                                    redux绑定
//将redux中state传入props
function mapStateToProps(state) {
    return{}
}
//a.1    将actions传入props属性中
function mapDispatchToProps(dispatch) {
    return{
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile,dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)