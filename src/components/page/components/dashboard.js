import React, {Component} from 'react';
import {Row, Col, Icon, Tooltip} from 'antd';
import numeral from 'numeral';
import {ChartCard, yuan, Field, WaterWave, MiniBar, MiniProgress, Radar, Pie} from 'ant-design-pro/lib/Charts';
import Trend from 'ant-design-pro/lib/Trend';
import moment from 'moment';
import 'ant-design-pro/dist/ant-design-pro.css';


export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalSaleData: [],
            totalCostData: [],
            workSpace: [],
            currentTabKey: '',
            rangePickerValue: [],
            visitData: [],

        };
    }

    componentDidMount() {
        const beginDay = new Date().getTime();
        const visitDataRandom = [];
        for (let i = 0; i < 20; i += 1) {
            visitDataRandom.push({
                x: moment(new Date(beginDay + (1000 * 60 * 60 * 24 * i))).format('YYYY-MM-DD'),
                y: Math.floor(Math.random() * 100) + 10,
            });
        }
        this.setState({visitData: visitDataRandom});

        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
    }

    render() {
        const radarOriginData = [
            {
                name: '个人',
                ref: 10,
                koubei: 8,
                output: 4,
                contribute: 5,
                hot: 7,
            },
            {
                name: '团队',
                ref: 3,
                koubei: 9,
                output: 6,
                contribute: 3,
                hot: 1,
            },
            {
                name: '部门',
                ref: 4,
                koubei: 1,
                output: 6,
                contribute: 5,
                hot: 7,
            },
        ]
        const radarData = [];
        const radarTitleMap = {
            ref: '时间',
            koubei: '故障率',
            output: '好评率',
            contribute: '卫生',
            hot: '小费用',
        };
        radarOriginData.forEach((item) => {
            Object.keys(item).forEach((key) => {
                if (key !== 'name') {
                    radarData.push({
                        name: item.name,
                        label: radarTitleMap[key],
                        value: item[key],
                    });
                }
            });
        });

        const salesPieData = [
            {
                x: '家用电器',
                y: 4544,
            },
            {
                x: '食用酒水',
                y: 3321,
            },
            {
                x: '个护健康',
                y: 3113,
            },
            {
                x: '服饰箱包',
                y: 2341,
            },
            {
                x: '母婴产品',
                y: 1231,
            },
            {
                x: '其他',
                y: 1231,
            },
        ]

        return (
            <div>
                <Row>
                    <Col span={12}>
                        <ChartCard
                            title="加油量"
                            action={<Tooltip title="加油日期和金额"><Icon type="info-circle-o"/></Tooltip>}
                            total={numeral(8846).format('0,0')}
                            footer={<Field label="加油频率" value={numeral(1234).format('0,0')}/>}
                            contentHeight={134}
                        >
                            <MiniBar
                                height={45}
                                data={this.state.visitData}
                            />
                        </ChartCard>
                    </Col>
                    <Col span={12}>
                        <ChartCard
                            title="维修频率"
                            action={<Tooltip title="维修日期及金额"><Icon type="info-circle-o"/></Tooltip>}
                            total="78%"
                            footer={
                                <div>
            <span>
              同比
              <Trend flag="up" style={{marginLeft: 8, color: 'rgba(0,0,0,.85)'}}>12%</Trend>
            </span>
                                    {/*<span style={{marginLeft: 16}}>*/}
                                    环比
                                    <Trend flag="down" style={{marginLeft: 8, color: 'rgba(0,0,0,.85)'}}>11%</Trend>
                                    {/*</span>*/}
                                </div>
                            }
                            contentHeight={134}
                        >
                            <MiniProgress percent={78} strokeWidth={8} target={80}/>
                        </ChartCard>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Radar
                            hasLegend
                            height={294}
                            data={radarData}
                        />
                    </Col>
                    <Col span={12}>
                        <Pie
                            hasLegend
                            title="销售额"
                            subTitle="ceshi销售额"
                            total={yuan(salesPieData.reduce((pre, now) => now.y + pre, 0))}
                            data={salesPieData}
                            valueFormat={val => yuan(val)}
                            height={294}
                        />
                    </Col>
                </Row>

                  <div>
                        <Radar
                            hasLegend
                            height={294}
                            data={radarData}
                        />
                  </div>
                    <div>
                        <Pie
                            hasLegend
                            title="销售额"
                            subTitle="ceshi销售额"
                            total={yuan(salesPieData.reduce((pre, now) => now.y + pre, 0))}
                            data={salesPieData}
                            valueFormat={val => yuan(val)}
                            height={294}
                        />
                    </div>
                <div style={{ textAlign: 'center' }}>
                    <WaterWave
                        height={161}
                        title="剩余油量"
                        percent={34}
                    />
                </div>
            </div>
        );
    }
}

