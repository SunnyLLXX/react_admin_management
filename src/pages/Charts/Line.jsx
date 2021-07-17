import React, { PureComponent } from 'react';
import {Card, Button} from 'antd'
import ReactEcharts from 'echarts-for-react'

class Line extends PureComponent {

    state = {
        sales: [5, 20, 36, 10, 10, 20],
        stores: [6, 15, 30, 8, 18, 6]
    }
    getOption = (sales,stores) => {
        //返回图形配置对象
        return {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量','库存']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'line',
                data: sales
            },{
                name: '库存',
                type: 'line',
                data: stores
            }]
        };
    }

    update = () => {
        this.setState((state)=>({
            sales: state.sales.map((item)=>{return item+5}),
            stores: state.stores.map((item)=>{return item-3})
        }))
    }

    render() {
        const {sales,stores} = this.state
        const title = (
            <Button type='primary' onClick={this.update}>更新</Button>
        )
        const extra = (
            <span>Echarts折线图一</span>
        )
        return (
            <Card title={title} extra={extra}>
                <ReactEcharts option={this.getOption(sales,stores)} style={{height: 300}}/>
            </Card>
        );
    }
}

export default Line;