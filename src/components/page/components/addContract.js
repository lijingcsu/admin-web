import React from 'react';
import {Modal, Form, Input, Button, Select, Spin, Tooltip, Icon, InputNumber, DatePicker, Table, message} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

class ContractCreateModal extends React.Component {
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
                title="新增联系人"
                onCancel={this.onCancel}
                footer={footer}
            >
                <Spin tip="加载中" spinning={loading}>
                    <Form layout="vertical">
                        <FormItem {...formItemLayout} label={(
                            <span>联系人-人名&nbsp;
                                <Tooltip title="联系人的名字">
                            <Icon type="question-circle-o"/>
                            </Tooltip>
                        </span>
                        )}>
                            {getFieldDecorator('contractName', {
                                rules: [{required: true, message: '联系人的名字!', whitespace: true}],
                            })(
                                <Input placeholder={"请输入联系人姓名"}/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label={(
                            <span>联系人-类型&nbsp;
                                <Tooltip title="下拉选择联系人-类型">
                            <Icon type="question-circle-o"/>
                            </Tooltip>
                        </span>
                        )}>
                            {getFieldDecorator('contractType', {
                                rules: [{required: true, message: '下拉选择联系人-类型!', whitespace: true}],
                            })(
                                <Select showSearch placeholder="选择一个类型">
                                    <Option value="driver">挖掘机司机</Option>
                                    <Option value="tanker">油车</Option>
                                    <Option value="trailer">拖车</Option>
                                    <Option value="maintenance">维修师傅</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label={(
                            <span>联系人-电话&nbsp;
                                <Tooltip title="联系人-电话">
                            <Icon type="question-circle-o"/>
                            </Tooltip>
                        </span>
                        )}>
                            {getFieldDecorator('itemDesc', {
                                rules: [{required: true, message: '联系人-电话', whitespace: true}],
                            })(
                                <Input placeholder="详细描述整个事项" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label={(
                            <span>联系人-地址&nbsp;
                                <Tooltip title="联系人-地址">
                            <Icon type="question-circle-o"/>
                            </Tooltip>
                        </span>
                        )}>
                            {getFieldDecorator('itemAmount', {
                                rules: [{required: true, message: '事项涉及金额!'}],
                            })(
                                <Input placeholder={"联系人-地址"} />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label={(
                            <span>联系人-评分&nbsp;
                                <Tooltip title="联系人-评分">
                            <Icon type="question-circle-o"/>
                            </Tooltip>
                        </span>
                        )}>
                            {getFieldDecorator('itemBrokerage', {
                                rules: [{required: true, message: '联系人-评分!', whitespace: true}],
                            })(
                                <Input placeholder={"联系人-评分"}/>
                            )}
                        </FormItem>
                    </Form>
                </Spin>
            </Modal>
        )
    }
}
const ContractCreactComponent = Form.create({})(ContractCreateModal);
export default ContractCreactComponent;
