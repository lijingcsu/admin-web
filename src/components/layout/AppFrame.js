import React from 'react';
import {Layout, Menu, Icon, Badge} from 'antd';
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import '../../assets/styles/sider.css';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import {Tag} from 'antd';
import {Link, withRouter} from 'react-router-dom';

const {Header, Sider, Content, Footer} = Layout;
const SubMenu = Menu.SubMenu;

const data = [{
    id: '000000001',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    title: '你收到了 14 份新周报',
    datetime: '2017-08-09',
    type: '通知',
}, {
    id: '000000002',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
    title: '你推荐的 曲妮妮 已通过第三轮面试',
    datetime: '2017-08-08',
    type: '通知',
}, {
    id: '000000003',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
    title: '这种模板可以区分多种通知类型',
    datetime: '2017-08-07',
    read: true,
    type: '通知',
}, {
    id: '000000004',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
    title: '左侧图标用于区分不同的类型',
    datetime: '2017-08-07',
    type: '通知',
}, {
    id: '000000005',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    title: '内容不要超过两行字，超出时自动截断',
    datetime: '2017-08-07',
    type: '通知',
}, {
    id: '000000006',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: '曲丽丽 评论了你',
    description: '描述信息描述信息描述信息',
    datetime: '2017-08-07',
    type: '消息',
}, {
    id: '000000007',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: '朱偏右 回复了你',
    description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
    datetime: '2017-08-07',
    type: '消息',
}, {
    id: '000000008',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: '标题',
    description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
    datetime: '2017-08-07',
    type: '消息',
}, {
    id: '000000009',
    title: '任务名称',
    description: '任务需要在 2017-01-12 20:00 前启动',
    extra: '未开始',
    status: 'todo',
    type: '待办',
}, {
    id: '000000010',
    title: '第三方紧急代码变更',
    description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
    extra: '马上到期',
    status: 'urgent',
    type: '待办',
}, {
    id: '000000011',
    title: '信息安全考试',
    description: '指派竹尔于 2017-01-09 前完成更新并发布',
    extra: '已耗时 8 天',
    status: 'doing',
    type: '待办',
}, {
    id: '000000012',
    title: 'ABCD 版本发布',
    description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
    extra: '进行中',
    status: 'processing',
    type: '待办',
}];


 class AppFrame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            noticeData: [],
        };
        this.toggle = this.toggle.bind(this);
        this.onItemClick = this.onItemClick.bind(this);
        this.onClear = this.onClear.bind(this);
        this.getNoticeData = this.getNoticeData.bind(this);
    };

    componentDidMount() {
        this.setState({noticeData: this.getNoticeData(data)});
    }

    onItemClick(item, tabProps) {
        console.log(item, tabProps);
    }

    onClear(tabTitle) {
        console.log(tabTitle);
    }

    getNoticeData(notices) {
        if (notices.length === 0) {
            return {};
        }
        const newNotices = notices.map((notice) => {
            const newNotice = {...notice};
            if (newNotice.datetime) {
                newNotice.datetime = moment(notice.datetime).fromNow();
            }
            // transform id to item key
            if (newNotice.id) {
                newNotice.key = newNotice.id;
            }
            if (newNotice.extra && newNotice.status) {
                const color = ({
                    todo: '',
                    processing: 'blue',
                    urgent: 'red',
                    doing: 'gold',
                })[newNotice.status];
                newNotice.extra = <Tag color={color} style={{marginRight: 0}}>{newNotice.extra}</Tag>;
            }
            return newNotice;
        });
        return groupBy(newNotices, 'type');
    }

    toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <Layout >
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    className="sider"
                >
                    {this.state.theme === 'light' ? <Icon type="github" className="github"/> :
                        <Icon type="github" className="github white"/>}
                    {this.state.theme === 'light' ? <span className="author">凤翔科技</span> :
                        <span className="author white">凤翔科技</span>}
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} className="menu">
                        <SubMenu key="/" title={<span><Icon type="user"/><span>首页</span></span>}>
                            <Menu.Item key="/index"><Link to={"/index"}>首页</Link></Menu.Item>
                            <Menu.Item key="/charts"><Link to={"/charts"}>报表</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="/digger" title={<span><Icon type="car"/><span>挖掘机管理</span></span>}>
                            <Menu.Item key="/digger/item"><Link to={"/digger/item"}>事项管理</Link></Menu.Item>
                            <Menu.Item key="/digger/contract"><Link to={"/digger/contract"}>人员管理</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="/tufu/digger2" title={<span><Icon type="pay-circle"/><span>对账</span></span>}>
                            <Menu.Item key="/digger/bill"><Link to={"/digger/bill"}>账目管理</Link></Menu.Item>
                            <Menu.Item key="/digger/billreport">费用评估</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff'}}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <Menu theme="light" mode="horizontal" style={{float: 'right'}}>
                            <Menu.Item key="notify">
                                <div>
                                    <NoticeIcon
                                        className="notice-icon"
                                        count={5}
                                        onItemClick={this.onItemClick}
                                        onClear={this.onClear}
                                        popupAlign={{offset: [20, -16]}}
                                    >
                                        <NoticeIcon.Tab
                                            list={this.state.noticeData['通知']}
                                            title="通知"
                                            emptyText="你已查看所有通知"
                                            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
                                        />
                                        <NoticeIcon.Tab
                                            list={this.state.noticeData['消息']}
                                            title="消息"
                                            emptyText="您已读完所有消息"
                                            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
                                        />
                                        <NoticeIcon.Tab
                                            list={this.state.noticeData['待办']}
                                            title="待办"
                                            emptyText="你已完成所有待办"
                                            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
                                        />
                                    </NoticeIcon>
                                </div>
                            </Menu.Item>
                            <SubMenu title={<span><Icon type="user"/>{this.state.username}</span>}>
                                <Menu.Item key="permission">权限管理</Menu.Item>
                                <Menu.Item key="discount">审核管理</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Header>
                    <Content style={{margin: '24px 16px', padding: 24, background: '#fff'}}>
                        {this.props.children}
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        财务管理系统 ©2018 凤翔科技
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(AppFrame);
