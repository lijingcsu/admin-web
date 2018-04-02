import React, {Component} from 'react';
import {Button, Input, DatePicker, Form, Select, Tooltip, Icon, Table, Row, Col} from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Option = Select.Option;

class ContractHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pagination: {}
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        const showPageInfo = {
            total: 5,
            pageSize: 2,
            defaultCurrent: 1,
            showTotal(total, range) {
                return <span>共<span>{total}</span>条</span>;
            },
        }
        if (nextProps.onPageChange !== undefined) {
            showPageInfo.onChange = nextProps.onPageChange;
        }
        this.setState({data: nextProps.showData, pagination: showPageInfo});
    }

    render() {
        const columns = [{
            title: '联系人-人名',
            dataIndex: 'contractName',
            key: 'contractName',
        }, {
            title: '联系人-类型',
            dataIndex: 'contractType',
            key: 'contractType',
        }, {
            title: '联系人-电话',
            dataIndex: 'contractTele',
            key: 'contractTele',
        }, {
            title: '联系人-地址',
            dataIndex: 'contractAddress',
            key: 'contractAddress',
        }, {
            title: '联系人-评分',
            dataIndex: 'contractScore',
            key: 'contractScore',
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                <a href="#">Action 一 {record.contractName}</a>
                </span>
            ),}];

        return (
            <Table columns={columns}
                   dataSource={this.state.data}
                   pagination={this.state.pagination}
            />
        );
    }
}


class ContractSearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            pagination: {
                total: 0,
                pageSize: 2,
                defaultCurrent: 1,
                showTotal(total, range) {
                    return <span>共<span>{total}</span>条</span>;
                },
            }
        };
        this.doConditionsearch = this.doConditionsearch.bind(this);
        this.onPaginationChange = this.onPaginationChange.bind(this);
    }

    onPaginationChange(page, pageSize) {
        let pagination = this.state.pagination;
        pagination.page = page;
        pagination.pageSize = pageSize;
        console.log("page=", page);
        console.log("pageSize=", pageSize);
    }

    doConditionsearch(e) {
        e.preventDefault();
        const {form} = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                console.log("commit value=", values);
                return;
            }
        });
    }

    componentDidMount() {
        const data = [{
            key: '1',
            contractName: 'tufu',
            contractType: '报销',
            contractTele: '123321321321',
            contractAddress: 'dsadasdaasda',
            contractScore: '3',
        }, {
            key: '2',
            contractName: 'xxxx',
            contractType: '报销',
            contractTele: 'dsadsadsa',
            contractAddress: '10.2',
            contractScore: 'tt',
        },{
            key: '3',
            contractName: 'xxxx',
            contractType: '报销',
            contractTele: 'dsadsadsa',
            contractAddress: '10.2',
            contractScore: 'tt',
        }, {
            key: '4',
            contractName: 'xxxx',
            contractType: '报销',
            contractTele: 'dsadsadsa',
            contractAddress: '10.2',
            contractScore: 'tt',
        }, {
            key: '5',
            contractName: 'xxxx',
            contractType: '报销',
            contractTele: 'dsadsadsa',
            contractAddress: '10.2',
            contractScore: 'tt',
        }];

        var pagination = {
            total: 5,
            pageSize: 2,
            defaultCurrent: 1,
            showTotal(total, range) {
                return <span>共<span>{total}</span>条</span>;
            },
        }
        this.setState({data: data, pagination: pagination});
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 12},
        };
        return (
            <div>
                <Form onSubmit={this.doConditionsearch}>
                    <Row>
                        <Col span={6}>
                            <FormItem {...formItemLayout} label={(
                                <span>人名&nbsp;
                                    <Tooltip title="查询人名">
                            <Icon type="question-circle-o"/>
                            </Tooltip>
                        </span>
                            )}>
                                {getFieldDecorator('contractName')(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem  {...formItemLayout} label={(
                                <span>联系人-类型&nbsp;
                                    <Tooltip title="联系人-类型">
                            <Icon type="question-circle-o"/>
                            </Tooltip>
                        </span>
                            )}>
                                {getFieldDecorator('itemType')(
                                    <Select showSearch placeholder="联系人-类型">
                                        <Option value="driver">挖掘机司机</Option>
                                        <Option value="tanker">油车</Option>
                                        <Option value="trailer">拖车</Option>
                                        <Option value="maintenance">维修师傅</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem  {...formItemLayout} label="联系人-电话">{getFieldDecorator('itemRangePicker')(
                                <Input />)}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem  {...formItemLayout} > <Button type="primary" htmlType="submit">查询</Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <ContractHistory showData={this.state.data} showPage={this.state.pagination}
                                 onPageChange={this.onPaginationChange}/>
            </div>
        )
    }
}

const ContractSearch = Form.create({})(ContractSearchComponent);
export default ContractSearch;
