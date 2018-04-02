import React, {Component} from 'react';
import {Modal, Button} from 'antd';
import ContractCreactComponent from './addContract';
import ContractSearch from './contractsearch';

export default class ContractList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            modalVisible: false,
        };
        this.onItemOk = this.onItemOk.bind(this);
        this.fetch = this.fetch.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onItemCancle = this.onItemCancle.bind(this);
    }

    onItemOk() {
        this.setState({modalVisible: false});
    }

    onItemCancle() {
        this.setState({modalVisible: false});
    }

    addItem() {
        this.setState({modalVisible: true});
    }

    fetch() {

    }

    componentDidMount() {
    }

    render() {
        const {modalVisible} = this.state;
        return (
            <div>
                <Button key="itemEntry" type="primary" onClick={this.addItem} style={{marginBottom: 15}}>录入联系人</Button>
                <ContractCreactComponent
                    visible={modalVisible}
                    onClose={this.onItemCancle}
                    onOpen={this.onItemOk}
                >
                </ContractCreactComponent>
                <ContractSearch />
            </div>
        )
    }

}
