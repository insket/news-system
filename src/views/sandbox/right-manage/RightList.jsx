import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { getRightList } from '../../../api/right-manage'

/*
    权限列表
*/
export default function RightList() {

  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    rightList()
  }, [])

  // 获取权限列表数据
  const rightList = async() => {
    const data = await getRightList()
    // console.log(data)
    setDataSource(data)
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
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
    },
    {
      title: '操作',
      dataIndex: 'pagepermisson',
      key: 'pagepermisson',
    }
  ]

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  )
}
