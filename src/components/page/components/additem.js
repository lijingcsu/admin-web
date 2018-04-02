import React from 'react';
import {Modal, Form, Input, Button, Select, Spin, Tooltip, Icon, InputNumber, DatePicker, Table, message} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

class ItemCreateModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onCancel() {
        if (this.props.onClose !== undefined) {
            this.props.onClose();
        }
    }

    onSave(e) {
        e.preventDefault();
        const {form} = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                console.log("commit value=",values);
            }
        });
        if (this.props.onOpen !== undefined) {
            this.props.onOpen();
        }
    }

    render() {
        const {visible, form} = this.props;
        const {loading} = this.state;
        const {getFieldDecorator} = form;
        const footer = [
            <Button key="previous" onClick={this.onCancel}>取消</Button>,
            <Button key="save" type="primary" onClick={this.onSave}>保存</Button>
        ];
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };

        return (
            <Modal
                visible={visible}
                width={800}
                title="录入事项"
                onCancel={this.onCancel}
                footer={footer}
            >
                <Spin tip="加载中" spinning={loading}>
                    <Form layout="vertical">
                        <FormItem {...formItemLayout} label={(
                            <span>事项名称&nbsp;
                                <Tooltip title="一个名字概括这件事情">
                            <Icon type="question-circle-o"/>
                            </Tooltip>
                        </span>
                        )}>
                            {getFieldDecorator('itemName', {
                                rules: [{required: true, message: '请输入一个名字概括这件事情!', whitespace: true}],
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label={(
                            <span>事项类型&nbsp;
                                <Tooltip title="下拉选择事项类型">
                            <Icon type="question-circle-o"/>
                            </Tooltip>
                        </span>
                        )}>
                            {getFieldDecorator('itemType', {
                                rules: [{required: true, message: '下拉选择事项类型!', whitespace: true}],
                            })(
                                <Select showSearch placeholder="选择一个类型">
                                    <Option value="reimbursement">报销</Option>
                                    <Option value="purchase">采购</Option>
                                    <Option value="fuel">加油</Option>
                                    <Option value="repair">维修</Option>
                                    <Option value="wages">工资</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label={(
                            <span>事项描述&nbsp;
                                <Tooltip title="详细描述整个事项">
                            <Icon type="question-circle-o"/>
                            </Tooltip>
                        </span>
                        )}>
                            {getFieldDecorator('itemDesc', {
                                rules: [{required: true, message: '详细描述整个事项!', whitespace: true}],
                            })(
                                <TextArea placeholder="详细描述整个事项" autosize={{miniRows:2,maxRows:6}}  />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label={(
                            <span>涉及金额&nbsp;
                                <Tooltip title="事项涉及金额">
                            <Icon type="question-circle-o"/>
                            </Tooltip>
                        </span>
                        )}>
                            {getFieldDecorator('itemAmount', {
                                rules: [{required: true, message: '事项涉及金额!'}],
                            })(
                                <InputNumber min={0} max={1000000} step={0.1} />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label={(
                            <span>经手人&nbsp;
                                <Tooltip title="经手人">
                            <Icon type="question-circle-o"/>
                            </Tooltip>
                        </span>
                        )}>
                            {getFieldDecorator('itemBrokerage', {
                                rules: [{required: true, message: '经手人!', whitespace: true}],
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label={(
                            <span>确认人&nbsp;
                                <Tooltip title="确认人">
                            <Icon type="question-circle-o"/>
                            </Tooltip>
                        </span>
                        )}>
                            {getFieldDecorator('itemConfirmPeople', {
                                rules: [{required: true, message: '确认人!', whitespace: true}],
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label={(
                            <span>时间&nbsp;
                                <Tooltip title="时间">
                            <Icon type="question-circle-o"/>
                            </Tooltip>
                        </span>
                        )}>
                            {getFieldDecorator('itemTime', {
                                rules: [{ type: 'object', required: true, message: '时间!', whitespace: true}],
                            })(
                                <DatePicker/>
                            )}
                        </FormItem>
                    </Form>
                </Spin>
            </Modal>
        )
    }
}
const ItemEntyComponent = Form.create({})(ItemCreateModal);
export default ItemEntyComponent;
