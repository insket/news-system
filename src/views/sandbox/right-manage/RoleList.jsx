import React, { useState, useEffect } from 'react'
import { getRolesList, deleteRole, changeRight } from '../../../api/roleList'
import { getRightList } from '../../../api/right-manage.js'
import { Table, Button, Modal, Tree  } from 'antd'
import {
  DeleteOutlined,
  UnorderedListOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';

/*
    角色列表
*/

const { confirm } = Modal;
export default function RoleList() {

  // 获取角色数据
  const [dataSource, setDataSource] = useState([])
  //  获取权限选项数据
  const [rightList, setRightList] = useState([])
  // 弹出层的显示隐藏状态
  const [isModalVisible,setIsModalVisible] = useState(false)
  // 当前点击权限选项
  const [currentRight, setCurrentRight] = useState([])
  // 当前点击选项的ID
  const [currentId, setCurrentId] = useState(0)

  useEffect(() => {
    RolesList()
    RightList()
  }, [])

  // 获取角色列表数据
  const RolesList = async() => {
    const data = await getRolesList()
    // console.log(data)
    setDataSource(data)
  }

  // 获取权限选项列表
  const RightList = async() => {
    const data = await getRightList()
    setRightList(data)
  }

  // 弹出确认删除框
  const isConfirm = (item) => {
    confirm({
      title: '确认要删除改权限吗?',
      icon: <ExclamationCircleOutlined />,
      content: '如果删除的话，可能会造成一些无法预计的结果',
      onOk() {
        deleteMethod(item)
      },
      onCancel() {},
      okText:"确认",
      cancelText:"取消"
    });
  }

  // 确认删除
  const deleteMethod = (item) => {
    // 过滤出 与点击选项不同的 留下来
    setDataSource(dataSource.filter(data => data.id !== item.id))
    // 同步后端数据
    deleteRole(item.id)
  }

  // 弹出层点击确定的回调
  const handleOk = () => {
    // console.log(currentRight)
    setIsModalVisible(false)
    // 同步statsource
    setDataSource(dataSource.map((item) => {
      if (item.id === currentId) {
        return {
          ...item,
          rights: currentRight
        }
      }else{
        return item
      }
    }))
    //  同步后端
    changeRight(currentId, currentRight)

  }

  // 弹出层取消的回调
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  // 点击复选框触发的回调
  const onCheck  = (checkedKeys) => {
    // console.log(checkedKeys)
    setCurrentRight(checkedKeys.checked)
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
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '操作',
      render: (item) => {
        return (
          <div style={{marginLeft: '-10px'}}>
            {/* 权限分配 */}
            <Button
              shape="circle"
              type="primary"
              icon={<UnorderedListOutlined />}
              onClick={() => {
                setIsModalVisible(true)
                setCurrentRight(item.rights)
                setCurrentId(item.id)
              }}
            >
            </Button>
            {/* 删除 */}
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
  ];
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} rowKey={(item) => item.id}/>;
      <Modal
        title="权限分配"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <Tree
          checkable
          checkedKeys={currentRight}
          treeData={rightList}
          onCheck={onCheck}
          checkStrictly
        />
      </Modal>
    </div>
  )
}
