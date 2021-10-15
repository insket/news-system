import React, { useState, useEffect } from 'react'
import { Table, Tag, Button, Modal } from 'antd'
import { getRightList, deleteSlideMenuList, deleteChildrenList } from '../../../api/right-manage'
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';


/*
    权限列表
*/

const { confirm } = Modal;

export default function RightList() {

  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    rightList()
  }, [])

  // 获取权限列表数据
  const rightList = async() => {
    const data = await getRightList()
    // console.log(data)
    // 找出 没有 children的选项 不渲染展开
    data.forEach((item) => {
      if (item.children && item.children.length === 0) {
        item.children = ''
      }
    })
    setDataSource(data)
  }

  // 弹出确认删除框
  const isConfirm = (item) => {
    confirm({
      title: '确认要删除改权限吗?',
      icon: <ExclamationCircleOutlined />,
      content: '如果删除的话，您将会失去一些权限',
      onOk() {
        deleteMethod(item)
      },
      onCancel() {},
      okText:"确认",
      cancelText:"取消"
    });
  }

  // q确认后删除权限
  const deleteMethod = (item) => {
    // console.log(item.id)
    // 当前页面同步状态 + 后端同步
    if (item.grade === 1) {
      // 过滤出与点击iten.id不同的
      setDataSource(dataSource.filter(data => data.id !== item.id))
      // 删除选项
      deleteSlideMenuList(item.id)
    }else{
      // 从 dataSource 中找出与点击二级标签相同 rightId 的父级标签
      let list = dataSource.filter(data => data.id === item.rightId)
      // 过滤出与点击标签id不同的
      // console.log(list)
      list[0].children = list[0].children.filter(data => data.id !== item.id)
      setDataSource([...dataSource])
      deleteChildrenList(item.id)
    }

  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id) => {
        return <b>{id}</b>
      }
    },
    {
      title: '权限名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      key: 'key',
      render: (key) => {
        return <Tag color="gold">{key}</Tag>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return (
          <div>
            <Button
              shape="circle"
              type="primary"
              icon={<EditOutlined />}
              style={{marginLeft:'-20px'}}
            >
            </Button>
            <Button
              shape="circle"
              danger
              icon={<DeleteOutlined /> }
              onClick={() => {isConfirm(item)}}
            >
            </Button>
          </div>
        )
      }
    }
  ]

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 5
        }}
      />
    </div>
  )
}
