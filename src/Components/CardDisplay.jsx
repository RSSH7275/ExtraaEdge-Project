import React, { useState, forwardRef, useRef } from "react";
import "./CardDisplay.css";
import { useDispatch, useSelector } from "react-redux";
import {
  HeartOutlined,
  EditOutlined,
  DeleteFilled,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { Avatar, Card, Modal, Input,Divider } from "antd";
import { EditTwoTone } from "@ant-design/icons";
import ModalContent from "./ModalContent";
import {updateUser,deleteUser} from "../UserSlice/UserSlice";

const { Meta } = Card;

// src={`https://avatars.dicebear.com/v2/avataaars/${username}.svg?options[mood][]=happy`} -----> Not Rendering Dynamic Images

function CardDisplay(item) {
  const { id, name, username, phone, email, website } = item.item;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHeart,setHeart]=useState(false)

  const formRef = useRef(null);
  const dispatch = useDispatch();
  // console.log("what is item?",item);

  const editModal = (e) => {
    setIsModalOpen(true);
  };
  const handleOk = (values) => {
    formRef.current.submit();
    setIsModalOpen(false);
  };
  const handleCancel = (errorInfo) => {
    formRef.current.submit();
    setIsModalOpen(false);
  };
  
  const onFinish = (values) => {
    // console.log("Success:", values);
    dispatch(updateUser({
      id:id,
      name:values.name,
      email:values.email,
      phone:values.phone,
      website:values.Website,
    }))
   
  };
  const onFinishFailed = (errorInfo) => {
    
    const count = Object.keys(errorInfo.values).length;
    let obj={};
      
    for(let i=0;i<count;i++){
     if((errorInfo.values.name!==undefined) && (errorInfo.values.name.length)){
       obj.name=errorInfo.values.name;
      }
      if((errorInfo.values.email!==undefined)&&(errorInfo.values.email.length)){
        let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        
        if(emailReg.test(errorInfo.values.email)===true){
          obj.email=errorInfo.values.email
        }
        else{
          continue;
        }
     }
     if((errorInfo.values.phone!==undefined)&&(errorInfo.values.phone.length)){
       obj.phone=errorInfo.values.phone;
     }
     if((errorInfo.values.Website!==undefined)&&(errorInfo.values.Website.length)){
       obj.Website=errorInfo.values.Website;
     }


    }

    let isEmpty=Object.keys(obj).length
    

    if(isEmpty!==0){
      obj.id=id;
     dispatch(updateUser(obj));
    }

  };

  const handleDelete=(e)=>{
   dispatch(deleteUser({id:id}));
  }

  const handleHeart=(e)=>{
    setHeart(prevState=> !prevState)
  }
 

  return (
    <>
      <Card
        cover={
          <img
            className="card-image"
            alt="example"
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
          />
        }
        
        actions={[
          isHeart?(<HeartFilled onClick={handleHeart}  style={{color:"red"}}  key="favourite1"/>):
          (<HeartOutlined onClick={handleHeart}  style={{color:"red"}}  key="favourite" />),
          <EditOutlined onClick={editModal} key="edit" />,
          <DeleteFilled onClick={handleDelete} key="delete" />,
        ]}
      >
        <div>
          <Meta title={`${name}`} />

          <p>
            <MailOutlined /> {email}
          </p>
          <p>
            <PhoneOutlined /> {phone}
          </p>
          <p>
            <GlobalOutlined /> http://{website}
          </p>
        </div>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Divider/>
          <ModalContent ref={formRef} onFinish={onFinish} onFinishFailed={onFinishFailed} id={id}/>
          <Divider/>
        </Modal>
      </Card>
    </>
  );
}

export default CardDisplay;

