import React, {useEffect, useState} from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputMask from 'react-input-mask';
import { useFormik  } from 'formik';
import Header from '../components/Header';
import { useHistory, useParams } from "react-router-dom";
import * as Yup from 'yup';
import * as Api from '../services/Api';
import Spinner from '../components/Spinner';

const Page: React.FC = () => {

  const history = useHistory();
  const { id } = useParams();
  const [estadosCivis, setEstadosCivis] = useState([]);
  const [loading, setLoading] = useState(false);

  const schema = Yup.object().shape({
    nome: Yup.string().required("Informe o nome"),
    email: Yup.string().required("Informe o e-mail").email("Informe o e-mail corretamente"),
    cpf: Yup.string().required("Informe o CPF").test('length', 'Informe o CPF corretamente', val => (val || '').replace(/[^0-9]/g,'').length === 11),
    estadoCivil: Yup.string().required("Informe o estado civil"),
    nomeConjugue: Yup.string().when('estadoCivil', {
      is: 'Casado(a)',
      then: Yup.string().required('Informe o nome do cônjuge'),
  })
  });

  useEffect(() => {
    load();
  },[])

  async function load(){
    let responseEstadosCivis = await Api.get("tiposEstadoCivil"); 
    setEstadosCivis(responseEstadosCivis.data)
    if (!id){
      return;
    }
    try {
      setLoading(true);
      let response = await Api.get("leads/" + id);
      formik.setValues(response.data);
    } catch(e){
      alert(e)
    }
    setLoading(false);
  }

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      id : '', 
      nome : '', 
      email: '',
      cpf : '',
      estadoCivil : '',
      nomeConjugue : ''
    },
    onSubmit: async () => {
      try {
        setLoading(true);
        let data = formik.values;
        data.cpf = data.cpf.replace(/[^0-9]/g,'');
        if (data.id){
          await Api.put("leads/" + formik.values.id, data)
        } else {
          data.id = new Date().getTime().toString();
          await Api.post("leads", data)
        }
        close()
      } catch(e){
        alert(e)
      }
      setLoading(false);
    }
  });

  function close() {
    history.push("/");
  }

  function changeEstadoCivil(e) {
    formik.values.nomeConjugue = ''
    formik.handleChange(e);
  }

  return (
      <div>        
        {formik.values.id && (
          <Header title="Alteração de Leads"></Header>
        )}
        {!formik.values.id && (
          <Header title="Cadastro de Leads"></Header>
        )}
        <Card>
          <Card.Body>                
            <Form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
              <Form.Row>
                <Col md="6">
                  <Form.Group>
                    <Form.Label>Nome</Form.Label>
                    <input className="form-control" 
                           name="nome" 
                           value={formik.values.nome} 
                           onChange={formik.handleChange}/>
                    {formik.errors.nome && formik.touched && formik.touched.nome && (
                      <span className="form-error-message">{formik.errors.nome}</span>
                    )}
                    
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group >
                    <Form.Label>CPF</Form.Label>
                    <InputMask className="form-control" name="cpf" value={formik.values.cpf} onChange={formik.handleChange} mask="999.999.999-99"/>
                    {formik.errors.cpf && formik.touched && formik.touched.cpf && (
                      <span className="form-error-message">{formik.errors.cpf}</span>
                    )}
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col md="6">
                  <Form.Group>
                    <Form.Label>E-mail</Form.Label>
                    <input className="form-control" name="email" value={formik.values.email} onChange={formik.handleChange}/>
                    {formik.errors.email && formik.touched && formik.touched.email && (
                      <span className="form-error-message">{formik.errors.email}</span>
                    )}
                  </Form.Group>
                </Col>
                <Col md="6">
                <Form.Group>
                  <Form.Label>Estado civil</Form.Label>
                  <select className="form-control" onChange={changeEstadoCivil} name="estadoCivil" value={formik.values.estadoCivil}>
                    <option value="">Selecione</option>
                    {estadosCivis.map((item:any, index) =>
                      <option key={index} value={item.nomeEstadoCivil}>{item.nomeEstadoCivil}</option>
                    )}
                  </select>
                  {formik.errors.estadoCivil && formik.touched && formik.touched.estadoCivil && (
                    <span className="form-error-message">{formik.errors.estadoCivil}</span>
                  )}
                </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col md="6">
                  <Form.Group >
                    <Form.Label>Nome do cônjuge</Form.Label>
                    <input className="form-control" disabled={formik.values.estadoCivil !== 'Casado(a)'} name="nomeConjugue" value={formik.values.nomeConjugue} onChange={formik.handleChange}/>
                    {formik.errors.nomeConjugue && formik.touched && formik.touched.nomeConjugue && (
                      <span className="form-error-message">{formik.errors.nomeConjugue}</span>
                    )}
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row className="m-2">
                <Col className="d-flex justify-content-start" md="6">
                  <Button variant="secondary" onClick={close} type="button">
                    Cancelar
                  </Button>
                </Col>
                <Col className="d-flex justify-content-end" md="6">
                  <Button variant="primary" type="submit">
                    {formik.values.id && ("Alterar")}
                    {!formik.values.id && ("Cadastrar")}
                  </Button>
                </Col>
              </Form.Row>
            </Form>     
          </Card.Body>
        </Card>
        {loading && (
          <Spinner></Spinner>
        )}
      </div>

  );
};

export default Page;
