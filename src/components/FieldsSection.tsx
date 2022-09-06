import React, {useState, useEffect} from "react";
import { Form, Input, Button, DatePicker, Select, Space } from 'antd';
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

function FieldsSection() {
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

  const [user_id, setUser_Id] = useState('jonveg');////bring from user profile
  const [zipOrigin, setZipOrigin] = useState('');
  const [cityOrigin, setCityOrigin] = useState('');
  const [zipDestination, setZipDestination] = useState('');
  const [cityDestination, setCityDestination] = useState('');
  const [tripMiles, setTripMiles] = useState(0);
  const [status, setStatus] = useState('');
  const [date, setDate] = useState(moment().format('YYYY-MM-DD').toString());
  const [rate, setRate] = useState(0.6); //bring rate value from user profile
  const [form, setForm] = useState({});
  const [zipCodeData, setZipCodeData] = useState({});

  let zipCode: string = '';
  let cityState: string = '';

  type SizeType = Parameters<typeof Form>[0]['size'];


  
  async function fetchZipCode () {
    try {
      const result = await fetch(`http://localhost:5001/trips/zipCode/${zipCode}`);
      const data =   await result.json(); 
      setZipCodeData(data);
      console.log('data', data);
      Object.keys(data).forEach(function(key) {
        let row = data[key];
        cityState = row.city + ', ' + row.state_id; 
        setCityOrigin(cityState);
        //console.log(row.city, row.state_id)
        //console.log('fetch', cityOrigin);
      });
      return data;
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
  rate}: formType ){
    const _form = 
      {
        user_id: 'jonveg', //get user from profile
        zipOrigin: zipOrigin,
        cityOrigin: cityOrigin,
        zipDestination: zipDestination,
        cityDestination: cityDestination,
        tripMiles: tripMiles,
        status: status,
        date: date,
        rate: rate //get rate from profile
      }
    fetch("http://localhost:5001/trips/", {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(_form)
      })
      .then(results => results.json())
      .then(function(results){
        console.log(results)
      })
      .catch(console.error)
  }
  
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };


  

  return(
    <Form id="tripsData-form"  
      labelCol={{ span: 12 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      onValuesChange={onFormLayoutChange}
      size={componentSize as SizeType}
      initialValues={{ size: componentSize }}
      onFinish={formSubmit}
       >
      <Space>
        <Form.Item label="From Zip Code" name="zipOrigin">
            <Input placeholder="Zip Code" allowClear />
        </Form.Item>
        
        <Form.Item label="Origin City" name="cityOrigin"> 
          <Input placeholder="Zip Code Origin" allowClear />
        </Form.Item> 
      </Space>

      <Space>
        <Form.Item label="To Zip Code" name="zipDestination">
            <Input placeholder="Zip Code" allowClear/>
        </Form.Item>
        
        <Form.Item label="Destination City" name="cityDestination"> 
          <Input  placeholder="Zipc Code Destination" allowClear />
        </Form.Item>
      </Space>
    
      <Space> 
        <Form.Item label="Miles" name="tripMiles"> 
          <Input placeholder="Miles" allowClear />
        </Form.Item>

        <Form.Item label="DatePicker" name="date">
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
      <Space>
        <Button type="primary" htmlType="submit"> FORM Submit</Button>
      </Space>
    </Form>
  )
}

export default FieldsSection;
