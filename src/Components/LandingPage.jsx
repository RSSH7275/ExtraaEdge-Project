import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../UserSlice/UserSlice";
import { Col, Row } from "antd";
import CardDisplay from "./CardDisplay";
import "../Components/LandingPage.css";

function LandingPage() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userReducer.data);
  const [loadIndicator, setIndicator] = useState(false);

  useEffect(() => {
    fetchUserApi();
  }, [dispatch]);

  const fetchUserApi = async () => { 
    setIndicator(true);
    const response = await axios.get(config.endpoint);
    const data = response.data;
    setIndicator(false);
    // console.log("userwala", userList);
    // console.log("datawala",data);
    dispatch(listUsers(data));
    return data;
  };

  return (
    <>
      {loadIndicator ? (
        <div class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
      ) : (
        <Row
          className="row-Spacing"
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          {userList.map((ele) => {
            // const { id } = ele;
            return (
              <Col className="col-Spacing" xs={24} sm={12} md={8} lg={6} key={ele.id}>
                <CardDisplay item={ele} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
}

export default LandingPage;
