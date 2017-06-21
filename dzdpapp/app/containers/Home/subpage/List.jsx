import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { getListData } from '../../../fetch/home/home'
import ListCompoent from '../../../components/List'
import LoadMore from '../../../components/LoadMore'

import './style.less'
class List extends React.Component{
    constructor(props,context){
        super(props,context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            data:[],//存储列表信息
            hasMore:false,//后端返回信息，是否有否下一页内容
            isLoadingMore:false,//记录当前状态下是加载中，还是点击加载更多
            page:1//下一页页码
        }
    }
    render(){
        return(
            <div>
                <h2 className="home-list-title">猜你喜欢</h2>
                {
                    this.state.data.length ?
                        <ListCompoent data={this.state.data}/> :
                        <div>{/* 加载中... */}</div>
                }
                {
                    this.state.hasMore ?
                        <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>:
                        <div>{/* 加载中... */}</div>

                }

            </div>
        )
    }
    componentDidMount(){
        //获取首页数据
        this.loadFirstPageData();

    }
    loadFirstPageData() {
        const cityName=this.props.cityName;
        const result =getListData(cityName,0);
        this.resultHandle(result);
    }
    //加载更多
    loadMoreData(){
        //点击记录状态
        this.setState({
            isLoadingMore:true
        })
        const cityName=this.props.cityName;
        const page=this.state.page;
        const result =getListData(cityName,page);
        this.resultHandle(result);
        // 增加 page
        this.setState({
            page: page + 1,
            isLoadingMore: false
        })
    }
    //数据处理
    resultHandle(result){
        result.then(res=>{
            return res.json()
        }).then(json=>{
            const hasMore=json.hasMore;
            const data=json.data;
            this.setState({
                hasMore:hasMore,
                //每次加载新数据覆盖旧数据
                // data:data
                // 每次加载数据把最新的添加到原数据之后，使用 concat 函数
                data: this.state.data.concat(data)
            })

        })
    }
}
export default List