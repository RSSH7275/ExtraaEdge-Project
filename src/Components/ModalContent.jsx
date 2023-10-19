import React, { useState ,forwardRef} from "react";
import { Avatar, Card, Modal, Input, Form} from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./CardDisplay.css";


const ModalContent = React.forwardRef(({onFinish,onFinishFailed,id},ref)=>{
  
  const userList = useSelector((state) => state.userReducer.data);
  const singleData=userList.filter((ele)=>ele.id===id);
  
  const {name, phone, email, website}=singleData[0];

  // console.log("singleData",name, phone, email, website);

  return (
    <Form
      name="basic"
      ref={ref}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "This Field is Required",
          },
        ]}
      >
        <Input defaultValue={`${name}`}/>
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input defaultValue={`${email}`}/>
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone"
        rules={[
          {
            required: true,
            message: "Enter your phone number",
          },
        ]}
      >
        <Input defaultValue={`${phone}`}/>
      </Form.Item>
      <Form.Item
        label="Website"
        name="Website"
        rules={[
          {
            required: true,
            message: "Please input website!",
          },
        ]}
      >
        <Input defaultValue={`${website}`}/>
      </Form.Item>
    </Form>
  );
});

export default ModalContent;

