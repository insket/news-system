import React, { forwardRef, useState } from 'react'
import { Form, Input, Select } from 'antd'

const { Option } = Select

const UserForm = forwardRef((props, ref) => {

  // 是否禁用的状态
  const [isDisable, setisDisable] = useState(false)

  return (
    <div>
       <Form
       ref={ref}
        layout="vertical"
      >
        {/* 用户名 */}
        <Form.Item
          name="username"
          label="用户名"
          rules={[{ required: true, message: '用户名为必填项' }]}
        >
          <Input />
        </Form.Item>
        {/* 密码 */}
        <Form.Item
          name="password"
          label="密码"
          rules={[{ required: true, message: '密码为必填项' }]}
        >
          <Input />
        </Form.Item>
        {/* 区域 */}
        <Form.Item
          name="region"
          label="区域"
          rules={isDisable ? [] : [{required: true, message: '请选择您的区域'}]}
        >
          <Select disabled={isDisable}>
            {
              props.regionList.map((item) => {
                return <Option value={item.value} key={item.id}>{item.title}</Option>
              })
            }
          </Select>
        </Form.Item>
        {/* 角色  */}
        <Form.Item
          name="roleId"
          label="角色"
          rules={[{ required: true, message: '请选择您的角色' }]}
        >
          <Select onChange={(value) => {
            if (value === 1) {
              setisDisable(true)
              ref.current.setFieldsValue({
                region: ''
              })
            }else{
              setisDisable(false)
            }
          }}>
            {
              props.roleList.map((item) => {
                return <Option value={item.id} key={item.id}>{item.roleName}</Option>
              })
            }
          </Select>
        </Form.Item>
      </Form>
    </div>
  )
})

export default UserForm
