import React, {Component} from 'react';
import {Button, Input, DatePicker, Form, Select, Tooltip, Icon, Table, Row, Col} from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Option = Select.Option;

class ItemHistory extends React.Component {
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
            title: '事项名称',
            dataIndex: 'itemName',
            key: 'itemName',
        }, {
            title: '事项类型',
            dataIndex: 'itemType',
            key: 'itemType',
        }, {
            title: '事项描述',
            dataIndex: 'itemDesc',
            key: 'itemDesc',
        }, {
            title: '涉及金额',
            dataIndex: 'itemMoney',
            key: 'itemMoney',
        }, {
            title: '经手人',
            dataIndex: 'itemBrokerage',
            key: 'itemBrokerage',
        }, {
            title: '确认人',
            dataIndex: 'itemConfirmPeople',
            key: 'itemConfirmPeople',
        }, {
            title: '时间',
            dataIndex: 'itemTime',
            key: 'itemTime',
        }, {
            title: '事项状态',
            dataIndex: 'itemStatus',
            key: 'itemStatus',
        }];

        return (
            <Table columns={columns}
                   dataSource={this.state.data}
                   pagination={this.state.pagination}
            />
        );
    }
}


class ItemSearchComponent extends Component {
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
            itemName: 'xxxx',
            itemType: '报销',
            itemDesc: 'dsadsadsa',
            itemMoney: '10.2',
            itemBrokerage: 'tt',
            itemConfirmPeople: 'dsada',
            itemTime: '2018-02-11',
            itemStatus: '审核通过',
        }, {
            key: '2',
            itemName: 'xxxx',
            itemType: '报销',
            itemDesc0: 'dsadsadsa',
            itemMoney: '10.2',
            itemBrokerage: 'tt',
            itemConfirmPeople: 'dsada',
            itemTime: '2018-02-11',
            itemStatus: '审核通过',
        }, {
            key: '3',
            itemName: 'xxxx',
            itemType: '报销',
            itemDesc: 'dsadsadsa',
            itemMoney: '10.2',
            itemBrokerage: 'tt',
            itemConfirmPeople: 'dsada',
            itemTime: '2018-02-11',
            itemStatus: '审核通过',
        }, {
            key: '4',
            itemName: 'xxxx',
            itemType: '报销',
            itemDesc: 'dsadsadsa',
            itemMoney: '10.2',
            itemBrokerage: 'tt',
            itemConfirmPeople: 'dsada',
            itemTime: '2018-02-11',
            itemStatus: '审核通过',
        }, {
            key: '5',
            itemName: 'xxxx',
            itemType: '报销',
            itemDesc: 'dsadsadsa',
            itemMoney: '10.2',
            itemBrokerage: 'tt',
            itemConfirmPeople: 'dsada',
            itemTime: '2018-02-11',
            itemStatus: '审核通过',
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
                        <Col span={8}>
                            <FormItem {...formItemLayout} label={(
                                <span>关键字&nbsp;
                                    <Tooltip title="查询关键字">
                            <Icon type="question-circle-o"/>
                            </Tooltip>
                        </span>
                            )}>
                                {getFieldDecorator('itemKeyword')(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem  {...formItemLayout} label={(
                                <span>查询事项类型&nbsp;
                                    <Tooltip title="查询事项类型">
                            <Icon type="question-circle-o"/>
                            </Tooltip>
                        </span>
                            )}>
                                {getFieldDecorator('itemType')(
                                    <Select showSearch placeholder="选择一个类型">
                                        <Option value="reimbursement">报销</Option>
                                        <Option value="purchase">采购</Option>
                                        <Option value="fuel">加油</Option>
                                        <Option value="repair">维修</Option>
                                        <Option value="wages">工资</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem  {...formItemLayout} label="RangePicker">{getFieldDecorator('itemRangePicker')(
                                <RangePicker/>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <FormItem  {...formItemLayout} label="经手人">{getFieldDecorator('itemDoer')(<Input/>)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem  {...formItemLayout} label="确认人">{getFieldDecorator('itemSurer')(<Input/>)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem  {...formItemLayout} > <Button type="primary" htmlType="submit">查询</Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <ItemHistory showData={this.state.data} showPage={this.state.pagination}
                             onPageChange={this.onPaginationChange}/>
            </div>
        )
    }
}

const ItemSearch = Form.create({})(ItemSearchComponent);
export default ItemSearch;
