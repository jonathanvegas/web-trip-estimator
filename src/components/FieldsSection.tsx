import React, {useState, useEffect} from "react";
import { Form, Input, Button, DatePicker, Select } from 'antd';
import moment from "moment";
import "antd/dist/antd.css"

type SizeType = Parameters<typeof Form>[0]['size'];

function FieldsSection() {
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

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

  useEffect(() => {
    //formSubmit(event);
    console.log('useEffect')
  }, [form])

  const onChangeSelect = (value: string) => {
    setStatus(value);
    };

  const onSearch = (value: string) => {
    setStatus(value);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    switch (e.target.id) {
      case 'zipOrigin':
        setZipOrigin(e.target.value);
        //if (e.target.value.length === 5) {
          zipCode = e.target.value
          fetchZipCode();
          console.log('onChange', cityState);
          //setCityOrigin(cityState);
          //console.log(cityState); 
        //}
      break;

      case 'cityOrigin':
        setCityOrigin(e.target.value);
      break;

      case 'zipDestination':
        setZipDestination(e.target.value);
      break;

      case 'cityDestination':
        setCityDestination(e.target.value);
      break;

      case 'tripMiles':
        setTripMiles(Number(e.target.value));
        console.log(e.target.value);
      break;
    
      default:
        break;
    }
  };

  const onChangeDate = (dateObject: moment.Moment | null, dateString: string) => {
      setDate(dateString);
  }

  const onClickButton = () => {
    setForm( 
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
    })
    console.log(form);
    formSubmit();
  } 

  const onFocusOriginCity =(e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(cityOrigin)
    console.log(e.target.id)
    e.target.value = cityOrigin;
    return e.target.value;
  }
  
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
        console.log('fetch', cityOrigin);
      });
      return data;
    }
    catch(error){
      console.log(error);
    }
  }

  async function formSubmit(){
    try {
      const results = await fetch("http://localhost:5001/trips/", {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(form)
      });
      console.log(results);
      const data = await results.json();
      //e.preventDefault();
    } catch(error){
      console.log(error);
    }
  }
  
  // const handleSubmit = (event: React.ChangeEvent) => {
  //   // 👇️ prevent page refresh
  //   event.preventDefault();

  //   console.log('form submitted ✅');
  // };

  return(
    <Form id="tripsData-form"  
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
      size={componentSize as SizeType} >
      <Form.Item label="From Zip Code">
          <Input id="zipOrigin" placeholder="Zip Code" allowClear onChange={onChange} />
      </Form.Item>
      
      <Form.Item label="Origin City"> 
        <Input id="cityOrigin" placeholder="Zip Code Origin" allowClear onChange={onChange} onFocus = {onFocusOriginCity} />
      </Form.Item> 

      <Form.Item label="To Zip Code">
          <Input id="zipDestination" placeholder="Zip Code" allowClear onChange={onChange} />
      </Form.Item>
      
      <Form.Item label="Destination City"> 
        <Input id="cityDestination" placeholder="Zipc Code Destination" allowClear onChange={onChange} />
      </Form.Item>

      <Form.Item label="Miles"> 
        <Input id="tripMiles" placeholder="Miles" allowClear onChange={onChange} />
      </Form.Item>

      <Form.Item label="DatePicker">
        <DatePicker id="date" onChange = {onChangeDate} />
      </Form.Item>

      <Form.Item label="Status">
        <Select
          id="status"
          showSearch
          placeholder="Select a status"
          optionFilterProp="children"
          onChange={onChangeSelect}
          onSearch={onSearch}
        >
          <Select.Option value="Loaded">Loaded</Select.Option>
          <Select.Option value="Empty">Empty</Select.Option>
        </Select>
      </Form.Item>
      <Button type="primary" htmlType='submit' onClick={onClickButton}>Submit</Button>
    </Form>
  )
}

export default FieldsSection;




// const fetchZipCode_ORIGINAL = () =>
//     fetch(`http://localhost:5001/trips/zipCode/${zipCode}`)
//     .then(response => {
//       return response.json();
//     })
//     .then(data => {
//       setZipCodeData(data);
//       //console.log(data);
//       Object.keys(data).forEach(function(key) {
//         let row = data[key];
//         cityState = row.city + ', ' + row.state_id; 
//         setCityOrigin(cityState);
//         //console.log(row.city, row.state_id)
//         console.log('fetch', cityOrigin);
//       })
//     });