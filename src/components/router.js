import ReactDOM from 'react-dom';
import React from 'react';
import Dashboard from './page/components/dashboard';
import {HashRouter, Route} from 'react-router-dom';
import AppFrame from './layout/AppFrame';
import ItemList from './page/components/itemlist';
import ContractList from './page/components/contractlist';
import EditableTable from './page/components/edittable';
import {LocaleProvider} from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import zhCN from 'antd/lib/locale-provider/zh_CN';

moment.locale('zh-cn');

class AppRouter extends React.Component {

    render() {
        return (
            <LocaleProvider locale={zhCN}>
                <HashRouter>
                    <AppFrame>
                        <Route exact path="/" component={Dashboard}/>
                        <Route exact path="/index" component={Dashboard}/>
                        <Route exact path="/charts" component={ItemList}/>
                        <Route exact path="/digger/item" component={ItemList}/>
                        <Route exact path="/digger/contract" component={ContractList}/>
                        <Route exact path="/digger/bill" component={EditableTable}/>
                    </AppFrame>
                </HashRouter>
            </LocaleProvider>
        );
    }

}

ReactDOM.render(
    <AppRouter/>,
    document.getElementById('app')
);

