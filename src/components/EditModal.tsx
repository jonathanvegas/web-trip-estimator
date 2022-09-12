import React from 'react';
import { Input, Modal, DatePicker, Select, Space } from "antd";
import moment from 'moment';

interface DataType {
  trips_id: number;
  zipOrigin: string;
  cityOrigin: string;
  zipDestination: string;
  cityDestination: string;
  tripMiles: number;
  status: string;
  date: string;
  rate: number;
}

interface EditModalProp {
  visible: boolean,
  setVisible: any,
  edit: any,
  setEdit: any,
  resetEditing: Function,
  updateTrips: Function,
}

const EditModal= ({ visible, setVisible, edit, setEdit, resetEditing, updateTrips}: EditModalProp) => {
  return (
    <>
      <Modal
        title="Edit Trip Details"
        visible={visible}
        okText="Save"
        width={700}
        onCancel={() => resetEditing()}
        onOk={() => {
          updateTrips(edit);
          resetEditing();
        }}
      >
        <Space>
        <h5>Zip Code (FROM)</h5>
        <Input
          value={edit?.zipOrigin}
          onChange={(e) => {
            setEdit((pre: DataType) => {
              return { ...pre, zipOrigin: e.target.value };
            });
          }}
        />
        <h5>City Origin</h5>
        <Input
          value={edit?.cityOrigin}
          onChange={(e) => {
            setEdit((pre: DataType) => {
              return { ...pre, cityOrigin: e.target.value };
            });
          }}
        />
        </Space>
        <Space>
        <h5>Zip Code (TO)</h5>
        <Input
          value={edit?.zipDestination}
          onChange={(e) => {
            setEdit((pre: DataType) => {
              return { ...pre, zipDestination: e.target.value };
            });
          }}
        />
        <h5>City Destination</h5>
        <Input
          value={edit?.cityDestination}
          onChange={(e) => {
            setEdit((pre: DataType) => {
              return { ...pre, cityDestination: e.target.value };
            });
          }}
        />
        </Space>
        <Space>
        <h5>Miles</h5>
        <Input
          value={edit?.tripMiles}
          onChange={(e) => {
            setEdit((pre: DataType) => {
              return { ...pre, tripMiles: e.target.value };
            });
          }}
        />
        <h5>Rate</h5>
        <Input
          value={edit?.rate}
          onChange={(e) => {
            setEdit((pre: DataType) => {
              return { ...pre, rate: e.target.value };
            });
          }}
        />
        </Space>
        {/* <DatePicker
        /> */}
        <Space>
        <h5>Date</h5>
        <Input
          value={edit?.date}
          onChange={(e) => {
            setEdit((pre: DataType) => {
              return { ...pre, date: e.target.value };
            });
          }}
        />
        <h5>Status</h5>
        {/* <Select
            defaultValue={edit?.status}
            showSearch
            // placeholder="Select a status"
            optionFilterProp="children"
            onChange={(e) => {
              setEdit((pre: DataType) => {
                return { ...pre, status: e.target.value };
              });
            }}
          >
            <Select.Option value="Loaded">Loaded</Select.Option>
            <Select.Option value="Empty">Empty</Select.Option>
          </Select> */}
        <Input 
          value={edit?.status}
          onChange={(e) => {
            setEdit((pre: DataType) => {
              return { ...pre, status: e.target.value };
            });
          }}
        />
        </Space>
      </Modal>
    </>
  );
};

export default EditModal;