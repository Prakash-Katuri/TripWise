import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Divider,
  Image,
  InputNumber,
  Rate,
  Result,
  Row,
  Select,
  Tabs,
  Tooltip,
  Typography,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { getCitiesApi, getSearchApi } from "../services/cities.services";
import { message } from "antd";
import location from "../location.png";
import { Link } from "react-router-dom";
const { Title, Text } = Typography;

function Home() {
  const [cities, setCities] = useState([]);
  const [data, setData] = useState([]);
  const [selectedCity, setSelectedCity] = useState();
  const [budget, setBudget] = useState();
  const [persons, setPersons] = useState();
  const [TabsChange, setTabsChange] = useState("hotel");
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  const handleChange = (value) => {
    setSelectedCity(value);
  };
  const onBudgetChange = (value) => {
    setBudget(value);
  };
  const onPersonChange = (value) => {
    setPersons(value);
  };

  async function fetchCities() {
    try {
      const res = await getCitiesApi();
      if (res) setCities(res?.data);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.response.data.message,
      });
    }
  }

  async function fetchSearch() {
    try {
      const res = await getSearchApi(TabsChange, {
        city_id: selectedCity,
        budget: budget,
        persons: persons,
      });
      if (res) {
        setData(res?.data);
      }
    } catch (error) {
      console.log(error, "eerree");
      messageApi.open({
        type: "error",
        content: error?.response?.data?.message,
      });
    }
  }

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    setData([]);
    if (TabsChange != "hotel") setPersons(null);
  }, [TabsChange]);
  return (
    <Fragment>
      {contextHolder}
      <Row
        gutter={[24, 24]}
        align="middle"
        justify="center"
        // style={{ textAlign: "center" }}
      >
        <Col
          lg={{ span: 12 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <Title
            level={7}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            Where to <Image src={location} width={30} />?
          </Title>
        </Col>
        <Col
          lg={{ span: 12 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <Select
            placeholder="Please select city"
            // defaultValue="lucy"
            style={{
              width: 200,
            }}
            onChange={handleChange}
            options={cities?.map((item) => ({
              key: item?.id,
              value: item?.id,
              label: item?.name,
            }))}
          />
        </Col>
        <Divider style={{ margin: 0 }} />
        <Col
          lg={{ span: 24 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <Tabs
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            defaultActiveKey="hotel"
            items={[
              {
                key: "hotel",
                label: `Hotels `,
                // icon: <Icon />,
              },
              {
                key: "restaurant",
                label: `Restaurant `,
                // icon: <Icon />,
              },
              {
                key: "place",
                label: `Places to visit `,
                // icon: <Icon />,
              },
            ]}
            onChange={(value) => {
              setTabsChange(value);
            }}
          />
        </Col>
        {TabsChange != "place" ? (
        <Col
          lg={{ span: TabsChange != "hotel" ? 12 : 8 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
        
          <InputNumber
            placeholder="budget"
            label="budget"
            onChange={onBudgetChange}
            style={{
              width: TabsChange != "hotel" ? "200px" : "100%",
            }}
          />
        </Col>
        ):<Col
        lg={{ span: TabsChange != "hotel" ? 12 : 8 }}
        md={{ span: 24 }}
        sm={{ span: 24 }}
        xs={{ span: 24 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
        }}
      ></Col>
          }
        {TabsChange === "hotel" && (
          <Col
            lg={{ span: 8 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <InputNumber
              placeholder="No of persons"
              label="No of persons , two persons per room"
              min={1}
              onChange={onPersonChange}
              style={{
                width: "100%",
              }}
            />
          </Col>
        )}
        <Col
          lg={{ span: TabsChange != "hotel" ? 12 : 4 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <Button
            disabled={!selectedCity}
            icon={<SearchOutlined />}
            onClick={fetchSearch}
          >
            Search
          </Button>
        </Col>
        {data.length != 0 ? (
          data.map((item) => (
            <Col
              lg={{ span: 24 }}
              md={{ span: 24 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <Card hoverable={true}>
                <Row>
                  <Col
                    lg={{ span: 8 }}
                    md={{ span: 24 }}
                    sm={{ span: 24 }}
                    xs={{ span: 24 }}
                  >
                    <Image
                      width={200}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBiNuYrf9fPOuHjiIbcUfIja00md7CHuOPhA&s"
                    />
                  </Col>
                  <Col
                    lg={{ span: 12 }}
                    md={{ span: 24 }}
                    sm={{ span: 24 }}
                    xs={{ span: 24 }}
                  >
                    <Title level={3} style={{ margin: 0 }}>
                      {item.name}
                    </Title>
                    <br />
                    <Text>{item.address}</Text>
                    <br />
                    {TabsChange === "hotel" && (
                      <>
                        <Text>$ {item.price}</Text>
                        <br />
                      </>
                    )}
                    {TabsChange === "place" && (
                      <>
                        
                        <br />
                      </>
                    )}
                    <Tooltip title={item?.website}>
                      <a
                        href={item?.website}
                        target="_blank"
                        style={{
                          display: "inline-block",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "80%",
                        }}
                      >
                        {item?.website}
                      </a>
                    </Tooltip>
                  </Col>
                  <Col
                    lg={{ span: 4 }}
                    md={{ span: 24 }}
                    sm={{ span: 24 }}
                    xs={{ span: 24 }}
                  >
                    <Rate allowHalf defaultValue={item.rating} />
                  </Col>
                </Row>
              </Card>
            </Col>
          ))
        ) : (
          <Result
            icon={
              <img
                src="https://cdn-icons-png.flaticon.com/512/2942/2942206.png"
                alt="no-data"
                style={{ width: 100, height: 100 }}
              />
            }
            title="Oops! No Destinations Found"
            subTitle="Looks like the wanderlust fairy is taking a break. No places to explore right now!"
            style={{ padding: "20px", textAlign: "center" }}
          />
        )}
      </Row>
    </Fragment>
  );
}

export default Home;
