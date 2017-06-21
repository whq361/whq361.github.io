import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link, hashHistory } from 'react-router'


import SearchInput from '../SearchInput'
import './style.less'

class HomeHeader extends React.Component{
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            kwd: ''
        }
	}
	render(){
		return(
			<div id="home-header" className="clear-fix">
				{/*城市定位*/}
				<div className="home-header-left float-left">
					<Link to="/city">
						<span>{this.props.cityName}</span>
						<i className="icon-angle-down"></i>
					</Link>
				</div>

				{/*个人*/}
				<div className="home-header-right float-right">
					<Link to="/User">
						<i className="icon-user"></i>
					</Link>
				</div>
                {/*搜索*/}
				<div className="home-header-middle">
					<div className="search-container">
						<i className="icon-search"></i>
						<SearchInput value="" enterHandle={this.enterHandle.bind(this)}/>
					</div>
				</div>
			</div>
		)
	}
    enterHandle(value) {
        hashHistory.push('/search/all/' + encodeURIComponent(value))
    }
}
export default HomeHeader