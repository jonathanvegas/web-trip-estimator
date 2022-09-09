import React from 'react';
import { Input, Modal, DatePicker } from "antd";
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
        onCancel={() => resetEditing()}
        onOk={() => {
          updateTrips(edit);
          resetEditing();
        }}
      >
        <Input
          value={edit?.zipOrigin}
          onChange={(e) => {
            setEdit((pre: DataType) => {
              return { ...pre, zipOrigin: e.target.value };
            });
          }}
        />
        <Input
          value={edit?.cityOrigin}
          onChange={(e) => {
            setEdit((pre: DataType) => {
              return { ...pre, cityOrigin: e.target.value };
            });
          }}
        />
        <Input
          value={edit?.zipDestination}
          onChange={(e) => {
            setEdit((pre: DataType) => {
              return { ...pre, zipDestination: e.target.value };
            });
          }}
        />
        <Input
          value={edit?.cityDestination}
          onChange={(e) => {
            setEdit((pre: DataType) => {
              return { ...pre, cityDestination: e.target.value };
            });
          }}
        />
        <Input
          value={edit?.tripMiles}
          onChange={(e) => {
            setEdit((pre: DataType) => {
              return { ...pre, tripMiles: e.target.value };
            });
          }}
        />
        <Input
          value={edit?.rate}
          onChange={(e) => {
            setEdit((pre: DataType) => {
              return { ...pre, rate: e.target.value };
            });
          }}
        />
        <Input
          value={edit?.date}
          onChange={(e) => {
            setEdit((pre: DataType) => {
              return { ...pre, date: e.target.value };
            });
          }}
        />
        <Input
          value={edit?.status}
          onChange={(e) => {
            setEdit((pre: DataType) => {
              return { ...pre, status: e.target.value };
            });
          }}
        />
      </Modal>
    </>
  );
};

export default EditModal;