import React, { useEffect, useState } from "react";
import type { DatePickerProps } from 'antd';
import { Table, Space, DatePicker } from 'antd';
import moment from 'moment';
import type { ColumnsType } from 'antd/es/table';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const weekFormat = 'MM/DD';
const monthFormat = 'YYYY/MM';//****** */
const customWeekStartEndFormat: DatePickerProps['format'] = value =>
  `${moment(value).startOf('week').format(weekFormat)} ~ ${moment(value)
    .endOf('week')
    .format(weekFormat)}`;

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

function TableSection () {
  
  const user_id:string = 'jonveg';
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
    
  return(
    <>
    <Space direction="vertical" size={12}>
      <DatePicker defaultValue={moment()} format={customWeekStartEndFormat} picker="week" />
      <RangePicker />
    </Space>
    <Table columns={columns} dataSource={dataTable} />
    </>
  )
}

export default TableSection;

// useEffect(() => {
  //   fetch('http://localhost:5001/trips')
  //   .then(results => results.json())
  //   .then(data => setDataTable(data))
  //   .catch(console.error)
  // }, [setDataTable]);
  // console.log(dataTable)