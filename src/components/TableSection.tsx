import React, { useEffect, useState } from "react";
import type { DatePickerProps } from 'antd';
import { Table, Space, DatePicker } from 'antd';
import moment from 'moment';
import type { ColumnsType } from 'antd/es/table';
import type { RangePickerProps } from 'antd/es/date-picker';


const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const weekFormat = 'MM/DD';
const monthFormat = 'YYYY/MM';//****** */
const customWeekStartEndFormat: DatePickerProps['format'] = value =>
  `${moment(value).startOf('week').format(weekFormat)} ~ ${moment(value)
    .endOf('week').format(weekFormat)}`;

let startDateWeek: string = moment(new Date()).startOf('week').format(dateFormat);
let endDateWeek: string = moment(new Date()).endOf('week').format(dateFormat);

interface DataType {
  zipOrigin: string;
  cityOrigin: string;
  zipDestination: string;
  cityDestination: string;
  tripMiles: number;
  status: string ;
  date: string ;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Zip Code Origin',
    dataIndex: 'zipOrigin',
    key: 'zipOrigin',
    //render: text => <a>{text}</a>,
  },
  {
    title: 'Origin City',
    dataIndex: 'cityOrigin',
    key: 'cityOrigin',
  },
  {
    title: 'Zip Code Destination',
    dataIndex: 'zipDestination',
    key: 'zipDestination',
  },
  {
    title: 'Destination City',
    dataIndex: 'cityDestination',
    key: 'cityDestination',
  },
  {
    title: 'Miles',
    dataIndex: 'tripMiles',
    key: 'tripMiles',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  
  },
];

// const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
//   console.log('onOk: ', value);
// };

function TableSection () {
  
  const user_id:string = 'jonveg'; //bring from user profile
  const [dataTable, setDataTable] = useState([]);
  const fetchData = () =>
    fetch(`http://localhost:5001/trips/${user_id}/${startDateWeek}/${endDateWeek}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      setDataTable(data);
    })
  
    useEffect(() => {
      fetchData();
    }, [])
  
    const onChange: RangePickerProps['onChange'] = (dates, dateStrings) => {
      if (dates) {
        startDateWeek = dateStrings[0];
        endDateWeek = dateStrings[1];
        fetchData();
      } else {
        console.log('Clear');
      }
    };

    const onChangeWeek = (value: DatePickerProps['value'] | RangePickerProps['value'], 
                          dateString: [string, string] | string,) => {
       
      let DateWeek: any = (value?.toString());
      startDateWeek = moment(new Date(DateWeek)).startOf('week').format(dateFormat);
      endDateWeek = moment(new Date(DateWeek)).endOf('week').format(dateFormat);
      fetchData();
      //console.log(moment(new Date(DateWeek)).startOf('week').format(dateFormat))
    };

  return(
    <>
    <Space direction="vertical" size={12}>
      <DatePicker defaultValue={moment()} format={customWeekStartEndFormat} picker="week" onChange={onChangeWeek}  />
      <RangePicker onChange={onChange} />
    </Space>
    <Table columns={columns} dataSource={dataTable} />
    </>
  )
}

export default TableSection;