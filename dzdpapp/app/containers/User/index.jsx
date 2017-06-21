import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Header from '../../components/Header'
import Zzy from './subpage/man.jsx'

class User extends React.Component {
	constructor(props,context){
		super(props,context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);		
	}
    render() {
        return (
            <div>
                <Header title="Me"/>
                <Zzy/>
            </div>
        )
    }
    
}

export default User