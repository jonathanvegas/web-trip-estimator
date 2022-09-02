import React, {useState, useEffect} from "react";
import { Form, Input, Button, DatePicker, Select } from 'antd';
import "antd/dist/antd.css"

const { Option } = Select;

// Input
const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  console.log(e);
};

// Select
const onChangeSelect = (value: string) => {
  console.log(`selected ${value}`);
};
// Select
const onSearch = (value: string) => {
  console.log('search:', value);
};

type SizeType = Parameters<typeof Form>[0]['size'];

function FieldsSection() {
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  return(
    <Form id="tripsData-form"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
      size={componentSize as SizeType} >
      <Form.Item label="From Zip Code">
          <Input placeholder="Zip Code" allowClear onChange={onChange} />
      </Form.Item>
      
      <Form.Item label="Origin City"> 
        <Input placeholder="Zip Code Origin" allowClear onChange={onChange} />
      </Form.Item>

      <Form.Item label="To Zip Code">
          <Input placeholder="Zip Code" allowClear onChange={onChange} />
      </Form.Item>
      
      <Form.Item label="Destination City"> 
        <Input placeholder="Zipc Code Destination" allowClear onChange={onChange} />
      </Form.Item>

      <Form.Item label="Miles"> 
        <Input placeholder="Miles" allowClear onChange={onChange}/>
      </Form.Item>

      <Form.Item label="DatePicker">
        <DatePicker />
      </Form.Item>

      <Form.Item label="Status">
        <Select
          showSearch
          placeholder="Select a status"
          optionFilterProp="children"
          onChange={onChangeSelect}
          onSearch={onSearch}
          filterOption={(input, option) =>
            (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
          }
        >
          <Select.Option value="loaded">Loaded</Select.Option>
          <Select.Option value="empty">Empty</Select.Option>
        </Select>
      </Form.Item>

      <Button type="primary" htmlType='submit'>Submit</Button>

    </Form>
  )
}

export default FieldsSection;