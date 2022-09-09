import React, {useState} from "react";
import { Form, Input, Button, DatePicker, Select, Space, Popconfirm, Divider, Row, Col } from 'antd';
import type { FormInstance } from 'antd/es/form';
import moment from "moment";
import "antd/dist/antd.css"

interface formType {
  user_id: string, 
  zipOrigin: string,
  cityOrigin: string,
  zipDestination: string,
  cityDestination: string,
  tripMiles: number,
  status: string,
  date: string,
  rate: number 
}


function FieldsSection({setRefreshData}:{setRefreshData:Function}) {
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

  let zipCode: string = '';
  let cityState: string = '';
  let zipIndOrigin: boolean = false;
  let zipIndDestination: boolean = false; 

  type SizeType = Parameters<typeof Form>[0]['size'];

  const [formChange] = Form.useForm();

  async function fetchZipCode () {
    try {
      const result = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/zipCode/${zipCode}`);
      const data =   await result.json(); 
  
      Object.keys(data).forEach(function(key) {
        let row = data[key];
        cityState = row.city + ', ' + row.state_id; 

        console.log({cityState})
      });
      if (zipIndOrigin){
        formChange.setFieldsValue({cityOrigin: cityState});
        zipIndOrigin = false;
      }
      if (zipIndDestination){
        formChange.setFieldsValue({cityDestination: cityState});
        zipIndDestination = false;
      }
    }
    catch(error){
      console.log(error);
    }
  }

  function formSubmit({ 
    zipOrigin,
    cityOrigin,
    zipDestination,
    cityDestination,
    tripMiles,
    status,
    date,
    rate}: formType)
  {
    const _form = 
      {
        user_id: 'jonveg',
        zipOrigin: zipOrigin,
        cityOrigin: cityOrigin,
        zipDestination: zipDestination,
        cityDestination: cityDestination,
        tripMiles: tripMiles,
        status: status,
        date: date,
        rate: rate
      }
    console.log(rate)
    fetch(`${process.env.REACT_APP_API_ENDPOINT}`, {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(_form)
      })
      .then(results => results.json())
      .then(function(results){
        console.log(results)
        formChange.resetFields();
      
        setRefreshData((refreshData: boolean) => {return !refreshData})
      })
      .catch(console.error);

  }
  
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const onReset = () => {                 
    formChange.resetFields();
  };

  const onChangeZipOrigin = (e:React.ChangeEvent<HTMLInputElement>) => {
    zipCode = e.target.value;
    if (zipCode.length === 5){
      zipIndOrigin = true;
      fetchZipCode();
    }
    else{
      formChange.setFieldsValue({cityOrigin: ''});
    }
  }

  const onChangeZipDestination = (e:React.ChangeEvent<HTMLInputElement>) => {
    zipCode = e.target.value;
    if (zipCode.length === 5){
      zipIndDestination = true;
      fetchZipCode();
    }
    else {
      formChange.setFieldsValue({cityDestination: ''});
    }
  }

  const confirm = () =>
    new Promise(resolve => {
      setTimeout(() => resolve(null), 1500);
      
    });
  
  // const confirmCancel = () =>
  //   new Promise(resolve => {
  //     setTimeout(() => resolve(null), 500);
  //     onReset();
  //   });

  return(
    <Form id="tripsData-form"  
      form={formChange}
      labelCol={{ span: 12 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      onValuesChange={onFormLayoutChange}
      size={componentSize as SizeType}
      initialValues={{ size: componentSize, rate: 0.6 }}
      onFinish={formSubmit}
       >
      <div id="sectionFields">
      <Space>
        <Form.Item label="Zip Code (FROM)" name="zipOrigin">
            <Input placeholder="Zip Code" allowClear onChange={onChangeZipOrigin} required/>
        </Form.Item>
        
        <Form.Item label="Origin City" name="cityOrigin"> 
          <Input placeholder="Origin City" allowClear required />
        </Form.Item> 
      </Space>

      <Space>
        <Form.Item label="Zip Code (TO)" name="zipDestination">
            <Input placeholder="Zip Code" allowClear onChange={onChangeZipDestination} required/>
        </Form.Item>
        
        <Form.Item label="Destination City" name="cityDestination"> 
          <Input  placeholder="City Destination" allowClear required />
        </Form.Item>
      </Space>
    
      <Space> 
        <Form.Item label="Miles" name="tripMiles"> 
          <Input placeholder="Miles" allowClear required />
        </Form.Item>

        <Form.Item label="Rate per Miles ($)" name="rate"> 
          <Input placeholder="Rate per Miles" allowClear required />
        </Form.Item>

        <Form.Item label="Date" name="date">
          <DatePicker />
        </Form.Item>   

        <Form.Item label="Status" name="status">
          <Select
            showSearch
            placeholder="Select a status"
            optionFilterProp="children"
          >
            <Select.Option value="Loaded">Loaded</Select.Option>
            <Select.Option value="Empty">Empty</Select.Option>
          </Select>
        </Form.Item>
      </Space>
      </div>
      <Space>
        {/* <Popconfirm title="Are you sure?" onConfirm={confirmCancel} > */}
          <Button type="primary" htmlType="reset">Cancel</Button>
        {/* </Popconfirm> */}
        {/* <Popconfirm title="Are you sure?" onConfirm={confirm} > */}
          <Button type="primary" htmlType="submit">Submit</Button>
        {/* </Popconfirm> */}
      </Space>
    </Form>
  )
}

export default FieldsSection;