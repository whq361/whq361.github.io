import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'

import { Link,IndexLink } from 'react-router'

import './style.less'

class Footer extends Component{
	constructor(props) {
	  super(props);
	  this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render(){
		// const path=this.props.path;
		return (
			<div>
				<div id="common-footer">
					<ul className="footer-list">
						<li><IndexLink to= '/' activeStyle={{color: '#fff'}}>首页</IndexLink></li>
                        <li><Link to= '/search/all' activeStyle={{color: '#fff'}}>发现</Link></li>
						<li><Link to= '/New' activeStyle={{color: '#fff'}}>News</Link></li>
                        <li><Link to= '/User' activeStyle={{color: '#fff'}}>Me</Link></li>
					</ul>
				</div>
			</div>
		)
	}
    componentDidMount() {
		console.log(this.props.path)
    }
}

function mapStateToProps(state){
	return {
	}
}

function mapDispatchToProps(dispatch){
	return {
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Footer)