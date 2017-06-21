import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Header from '../../components/Header'
import Ninfo from './subpage/index'
class New extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);		
	}
    render() {
        return (
            <div>
                <Header title="News"/>
                <Ninfo/>
            </div>
        )
    }
    
}

export default New