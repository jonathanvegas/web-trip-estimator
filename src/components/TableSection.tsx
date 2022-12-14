import React, { useEffect, useState } from "react";
import type { DatePickerProps } from 'antd';
import { Table, Space, DatePicker, Modal } from 'antd';
import moment from 'moment';
import type { ColumnsType } from 'antd/es/table';
import type { RangePickerProps } from 'antd/es/date-picker';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import EditModal from "./EditModal";

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const weekFormat = 'MM/DD';
const customWeekStartEndFormat: DatePickerProps['format'] = value =>
  `${moment(value).startOf('week').format(weekFormat)} ~ ${moment(value)
    .endOf('week').format(weekFormat)}`;

let startDateWeek: string = moment(new Date()).startOf('week').format(dateFormat);
let endDateWeek: string = moment(new Date()).endOf('week').format(dateFormat);

interface DataType {
  trips_id: number;
  zipOrigin: string;
  cityOrigin: string;
  zipDestination: string;
  cityDestination: string;
  tripMiles: number;
  status: string ;
  date: string ;
  rate: number;
}
interface TableSectionProp {
  refreshData: boolean
}

function TableSection ({refreshData}:TableSectionProp) {
  
  const user_id:string = 'jonveg'; //bring from user profile
  const [dataTable, setDataTable] = useState([]);
  const [totalMiles, setTotalMiles] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState([]);

  let totalMilesAcum: number = 0;
  let totalEarningAcum: number = 0;

  const columns: ColumnsType<DataType> = [
    {
      title: 'Zip Code Origin',
      dataIndex: 'zipOrigin',
      key: 'zipOrigin',
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
      dataIndex: 'dateFormat',
      key: 'dateFormat',
    
    },
    {
      key: "action",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <div className="actions">
              <EditOutlined
                style={{ color: "#1990ff" }}
                onClick={() => editTrip(record)}
              />
              <DeleteOutlined
                style={{ color: "red" }}
                onClick={() => deleteTrip(record)}
              />
            </div>
          </>
        );
      },
    }
  ];

  const editTrip = (record:[]) => {
    setVisible(true);
    setEdit(record);
  };

  const resetEditing = () => {
    setVisible(false);
    setEdit([]);
  };

  const updateTrips = (record:DataType) => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}update/${record.trips_id}`, {
      method: "PATCH",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(edit)
    })
    .then(res => {
      if (res.ok) { console.log("Update successful") }
      else { console.log("Update unsuccessful") }
      return res;
    })
    .then(res => res.json())
    .then(function(data){
      console.log(data);
      fetchData();
    })
    .catch(error => console.log(error));
  };

  const deleteTrip = (record:DataType) => {
    console.log(record);
    Modal.confirm({
      title: "Are you sure you want to delete this entry",
      onOk: () => {   
        fetch(`${process.env.REACT_APP_API_ENDPOINT}delete/${record.trips_id}`, {
          method: "DELETE",
          headers: {
            'Content-type': 'application/json'
          }
        })
        .then(res => {
          if (res.ok) { console.log("Delete successful") }
          else { console.log("Delete unsuccessful") }
          return res;
        })
        .then(res => res.json())
        .then(function(data){
          console.log(data);
          fetchData();
        })
        .catch(error => console.log(error))
      },
    });
  };

  const fetchData = () =>
    fetch(`${process.env.REACT_APP_API_ENDPOINT}${user_id}/${startDateWeek}/${endDateWeek}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      setDataTable(data);  
      Object.keys(data).forEach(function(key) {
        let row = data[key];
        totalMilesAcum = totalMilesAcum + row.tripMiles;
        totalEarningAcum = totalEarningAcum + (row.tripMiles * row.rate)
      });  
      setTotalMiles(totalMilesAcum);
      setTotalEarnings(totalEarningAcum);
      totalMilesAcum = 0;
      totalEarningAcum = 0;
    })
  
  useEffect(() => {
    fetchData();      
  }, [refreshData])
  
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
  };

  return(
    <>
      <Space direction="vertical" size={12}>
        <DatePicker defaultValue={moment()} format={customWeekStartEndFormat} picker="week" onChange={onChangeWeek}  />
        <RangePicker onChange={onChange} />
      </Space>
      <Table columns={columns} dataSource={dataTable} />
      <h3>Total Miles: {totalMiles} </h3>
      <h3>Total Earnings: {
        totalEarnings.toLocaleString("en-US", 
        {
          style: "currency", 
          currency: "USD"
        })
      } </h3>
      <EditModal
            visible={visible}
            setVisible={setVisible}
            edit={edit}
            setEdit={setEdit}
            updateTrips={updateTrips}
            resetEditing={resetEditing}
          />
    </>
  )
}

export default TableSection;