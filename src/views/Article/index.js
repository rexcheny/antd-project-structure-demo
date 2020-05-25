import React, {Component} from 'react';

import { Card, Button, Table, Space, Tag } from 'antd'

import { getArticles} from "../../services";

// 时间格式化
import moment from 'moment'

const dataSource = [
    {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
    },
    {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
];

const columns = [
    {
        title: '标题',
        dataIndex: 'title', // 这个指向 dataSource 里面数组中每个对象的键，这个就是关联两个数组的东西
        key: 'title',
    },
    {
        title: '作者',
        dataIndex: 'author',
        key: 'author',
    },
    {
        title: '阅读量',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: '操作',
        dataIndex: 'actions',
        key: 'actions',
        // text, record, index 这是内部提供的就直接用，record 对应就是本条数据；index是索引值，这个索引值不是dataSource里面的key
        render: (text, record, index) => {
            console.log({text, record, index});
            return <Space size="middle">
                <a>编辑</a>
                <a>删除</a>
            </Space>
        }
    },
];

// 因为获取回来的数据键都是英文，所以要进行转换，这里保证对象的键和获取数据的键一致
const columnsTitleMap = {
    id: 'id',
    title: '标题',
    author: '作者',
    amount: '阅读量',
    createAt: '创建日期',
};

class ArticleList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            columns: [],
            total: 0,
            isLoading: false  // 用于控制table的加载状态显示
        }
    }

    // 基于后端数据来生成符合antd的table中columns列表的格式，格式参考上面
    // 在antd里table里面的columns就是定义每一列如何显示
    createColumus = (columnKeys) => {
        // map 方法返回的是数组，而且map方法只能被数组调用
        const columnKeyList = columnKeys.map(item => {
            // 这里还可以针对某一列加上一些效果
            if (item === 'amount'){
                return {
                    title: columnsTitleMap[item],  // 通过对象来转换表格标题为中文
                    key: item,
                    dataIndex: item,  // 意思是该列和dataSource中一行数据的哪个键对应
                    /*
                    * 这里可能有疑问，它生成的是表格的标题行，为什么会影响后面的所有数据，也就是为什么每一行的amount都会
                    * 加上一个Tag标签呢，其实是这样，在antd里table并不是直接拿数据在表格里显示，dataSource和columns
                    * 有一个关联过程，这里只是生成columns，后面在Table标签里面当设置了dataSource和columns之后，antd内部
                    * 会做关联，然后就每一行都生效
                    * */
                    render: (key, record) => {
                        const { amount } = record;  // record表示一条记录，是一个对象，这条语句前面 { amount }是为了解构后面

                        return <Tag color={ amount > 200 ? 'green' : 'red'}>{record.amount}</Tag>
                    }
                }
            }
            if (item === 'createAt'){
                return {
                    title: columnsTitleMap[item],
                    key: item,
                    dataIndex: item,
                    render: (key, record) => {
                        return moment(record.createAt).format('YYYY-MM-DD hh:mm:ss')
                    }
                }
            }
            return {
                title: columnsTitleMap[item],  // 通过对象来转换表格标题为中文
                dataIndex: item,
                key: item,
            }
        });

        // 添加一列，这个操作列是数据中没有的，操作一项在每行都一样，所以action里面不需要dataIndex
        columnKeyList.push({
            title: '操作',
            key: 'actions',
            // text, record, index 这是内部提供的就直接用，record 对应就是本条数据；index是索引值，这个索引值不是dataSource里面的key
            render: (text, record, index) => {
                return <Space size="middle">
                    <a>编辑</a>
                    <a>删除</a>
                </Space>
            }
        })

        return columnKeyList
    };

    // 在组件的这个 componentDidMount 生命周期函数中调用AJAX请求
    componentDidMount() {
        this.setState({
            isLoading: true  // AJAX之前设置为 true，表示正在加载
        });
        getArticles().then(resp => {
            // Object.keys 获取一个对象的键，生成一个列表 resp.list是一个列表，里面是字典，意思是取列表中第一个字典的
            // 所有KEY，生成一个列表
            const columnKeys = Object.keys(resp.list[0]);
            // 基于后端返回的数据来生成符合ANTD表格标准的 columes
            const columns = this.createColumus(columnKeys);

            this.setState({
                total: resp.total,
                columns,
                dataSource: resp.list,
            })
        }).catch(err => {
            // 处理错误，一般留空就行，也没有错误
        }).finally(() => {
            this.setState({
                isLoading: false   // AJAX之后设置为false
            })
        })
    }

    render() {
        return (
            <Card title="文章列表" bordered={false} extra={<Button size="default">导出Excel</Button>}>
                <Table
                    rowKey={(record) => { return record.id}}
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                    loading={this.state.isLoading}  // 这个loading是antd 表格的属性，直接用就好，传递布尔值就会显示或者取消loading状态
                    // 这个 pagination 是Table组件的一个属性，需要传递一个对象
                    pagination={{
                        total: this.state.total,
                        showQuickJumper: true
                    }}
                />
            </Card>
        );
    }
}

export default ArticleList;