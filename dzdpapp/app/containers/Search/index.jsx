import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import SearchHeader from '../../components/SearchHeader'
import List from './subpage/List'

class Search extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        const params = this.props.params;
        return (
            <div>
                <SearchHeader keyword={ params.keyword}/>
                <List keword={params.keyword} category={params.category}/>
            </div>
        )
    }
    componentDidMount() {
        //通过react-routrer  既hash获取子页面种类
        const params = this.props.params;
        // console.log(params)
        // console.log('category param:' + params.category)
        // console.log('key param:' + params.keyword)
    }
}

export default Search