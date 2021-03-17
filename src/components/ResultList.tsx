import React from 'react';
import Table from 'react-bootstrap/Table';
import { AiFillEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";

const ResultList: React.FC<{fields:any, list: any, editFunction:any, removeFunction:any }> = ({fields, list, editFunction, removeFunction}) => (
  <Table className="table-result-list">
    <thead>
      <tr>
        <th></th>
        <th></th>
        {fields.map((field, index) =>
          <th key={index}>{field.title}</th>
        )}
      </tr>
    </thead>
    <tbody>
    {list.map((item, index) =>
      <tr key={index}>
        <td className="action"><AiFillEdit onClick={()=>editFunction(item.id)}></AiFillEdit></td>
        <td className="action"><AiOutlineDelete onClick={() => removeFunction(item.id)}></AiOutlineDelete></td>
        {fields.map((field, index) =>
          <td key={index}>{item[field.key]}</td>  
        )}
      </tr>
    )}
    
    </tbody>
  </Table>
);

export default ResultList;
