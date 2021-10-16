import React, { useState, useEffect, useRef } from 'react'
import { getUserList, getRegionsList, getRoleList, getNewRoleList, deleteRoleList } from '../../../api/user-manage'
import UserForm from '../../../components/user-manage/UserForm';
import { Table, Switch, Button, Modal } from 'antd'
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  EditFilled
} from '@ant-design/icons';

/*
    用户列表
*/
const { confirm } = Modal;

export default function UserList() {

  const [dataSource, setDataSource] = useState([])
  // 弹出层状态显示隐藏
  const [isAddVisible, setIsAddVisible] = useState(false)
  // 角色列表
  const [roleList, setRoleLIst] = useState([])
  // 区域列表
  const [regionList, setRegionList] = useState([])
  // 添加用户数据
  const addForm = useRef(null)

  useEffect(() => {
   UserList()
   RoleList()
   RegionsList()
  }, [])

  // 获取用户列表
  const UserList = async() => {
    const data = await getUserList()
    setDataSource(data)
    // console.log(data)
  }

  // 获取角色列表
  const RoleList = async() => {
    const data = await getRoleList()
    setRoleLIst(data)
  }

  // 获取区域列表
  const RegionsList = async() => {
    const data = await getRegionsList()
    setRegionList(data)
  }

  // 点击删除弹出删除框
  const isConfirm = (item) => {
    confirm({
      title: '确认要删除改权限吗?',
      icon: <ExclamationCircleOutlined />,
      content: '如果删除的话，可能会造成一些无法预估的损失',
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
    setDataSource([dataSource.filter(data => data.id !== item.id)])
    // 同步后端
    deleteRoleList(item.id)
  }

  // 校验成功得到表单数据,提交
  const addFormOk = () => {
    console.log(addForm)
    addForm.current.validateFields().then(value => {
      setIsAddVisible(false)
      // 重置字段
      addForm.current.resetFields()
      // post到后端，生成id 在设置 datasource ，方便以后删除和更新
      const data = getNewRoleList(value)
      setDataSource([...dataSource,data])
    }).catch(err => {
      console.log(err)
    })
  }

  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      render: (region) => {
        return <b>{region === '' ? '全球' : region}</b>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render: (role) => {
        return role?.roleName
      }
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render: (roleState, item) => {
        return <Switch checked={roleState} disabled={item.default}></Switch>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return (
          <div style={{marginLeft:'-20px'}}>
            {/* 编辑 */}
            <Button
              type="primary"
              shape="circle"
              icon={<EditFilled />}
              disabled={item.default}
            />
            {/* 删除 */}
            <Button
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => {isConfirm(item)}}
              disabled={item.default}
            />
          </div>
        )
      }
    }
  ];

  return (
    <div>
      {/* 添加用户 */}
      <Button type='primary' onClick={() => {setIsAddVisible(true)}}>添加用户</Button>

      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item.id}
        pagination={{
          pageSize: 5
        }}
      />;

    {/*  弹出层 */}
    <Modal
      visible={isAddVisible}
      title="添加用户"
      okText="确定"
      cancelText="取消"
      onCancel={() => {
        setIsAddVisible(false)
      }}
      onOk={() => addFormOk()}
    >
     <UserForm regionList={regionList} roleList={roleList} ref={addForm}></UserForm>
    </Modal>
    </div>
  )
}
