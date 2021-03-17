import React, { useState, useEffect  } from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputMask from 'react-input-mask';
import { useFormik  } from 'formik';
import Header from '../components/Header';
import ResultList from '../components/ResultList';
import { useHistory } from "react-router-dom";
import * as Api from '../services/Api';
import Dialog from 'react-bootstrap-dialog'

const Page: React.FC = () => { 
  const [leads, setLeads] = useState(null);
  const fieldsLeads = [
    { title : 'E-mail', key : 'email'},
    { title : 'Nome', key : 'nome'},
    { title : 'CPF', key : 'cpf'},
  ];
  const history = useHistory();
  
  const formik = useFormik({
    initialValues: {
      filter: {nome : '', cpf : ''}
    },
    onSubmit: async (values) => {
    }
  });

  useEffect(() => {
    find()
  },[])

  function register() {
    history.push("/lead");
  }

  function edit(id) {
    history.push("/lead/" + id);
  }

  async function remove(id){
    Dialog.show({
      title: 'Greedings',
      body: 'How are you?',
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction()
      ],
      bsSize: 'small',
      onHide: (dialog) => {
        dialog.hide()
        console.log('closed by clicking background.')
      }
    })
    return;
    let url = "leads/" + id;
    await Api.remove(url);
    find();
  }

  async function find(){
    let url = "leads";
    url += "?nome_like=" + formik.values.filter.nome;
    let cpf = formik.values.filter.cpf.replace(/[^0-9]/g,'');
    url += "&cpf_like=" + cpf;
    let response = await Api.get(url);
    setLeads(response.data);
  }
  
  return (
      <div>        
        <Header title="Consulta de Leads"></Header>
        <Card>
          <Card.Body>
            <Card.Title>Filtros</Card.Title>                    
            <Form noValidate action="" onSubmit={formik.handleSubmit}>
              <Form.Row>
                <Col md="6">
                  <Form.Group>
                    <Form.Label>Nome</Form.Label>
                    <input className="form-control" name="filter.nome" value={formik.values.filter.nome} onChange={formik.handleChange}/>
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group >
                    <Form.Label>CPF</Form.Label>
                    <InputMask className="form-control" name="filter.cpf" value={formik.values.filter.cpf} onChange={formik.handleChange} mask="999.999.999-99"/>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row className="d-flex justify-content-end">
                <Button variant="primary" type="button" onClick={find}>
                  Filtrar
                </Button>
              </Form.Row>
            </Form>     
          </Card.Body>
        </Card>
        <Button variant="primary" className="m-2" onClick={register} type="button">
          Novo Lead
        </Button>
        {leads && (
          <ResultList fields={fieldsLeads} list={leads} editFunction={edit} removeFunction={remove}>
          </ResultList>
        )}
      </div>
  );
};

export default Page;
