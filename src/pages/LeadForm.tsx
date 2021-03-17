import React, {useEffect} from 'react';

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

const Page: React.FC = () => {

  const history = useHistory();
  const { id } = useParams();

  const schema = Yup.object().shape({
    nome: Yup.string().required("Informe o nome"),
    email: Yup.string().required("Informe o e-mail"),
    cpf: Yup.string().required("Informe o CPF"),
    estadoCivil: Yup.string().required("Informe o estado civil"),
    nomeConjugue: Yup.string().when('estadoCivil', {
      is: 'Casado(a)',
      then: Yup.string().required('Informe o nome do cônjuge'),
  })
  });

  useEffect(() => {
    retrieveLead();
  },[])

  async function retrieveLead(){
    if (!id){
      return;
    }
    let url = "leads/" + id;
    let response = await Api.get(url);
    formik.setValues(response.data);
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
      let data = formik.values;
      data.cpf = data.cpf.replace(/[^0-9]/g,'');
      if (data.id){
        await Api.put("leads/" + formik.values.id, data)
      } else {
        data.id = new Date().getTime().toString();
        await Api.post("leads", data)
      }
      close()
    }
  });

  function close() {
    history.push("/");
  }

  function changeMaritalStatus(e) {
    formik.values.nomeConjugue = ''
    formik.handleChange(e);
  }

  return (
      <div>        
        <Header title="Cadastro de Leads"></Header>
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
                    {formik.errors.nome && (
                      <span className="form-error-message">{formik.errors.nome}</span>
                    )}
                    
                  </Form.Group>
                </Col>
                <Col md="6">
                  <Form.Group >
                    <Form.Label>CPF</Form.Label>
                    <InputMask className="form-control" name="cpf" value={formik.values.cpf} onChange={formik.handleChange} mask="999.999.999-99"/>
                    {formik.errors.cpf && (
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
                    {formik.errors.email && (
                      <span className="form-error-message">{formik.errors.email}</span>
                    )}
                  </Form.Group>
                </Col>
                <Col md="6">
                <Form.Group>
                  <Form.Label>Estado civil</Form.Label>
                  <select className="form-control" onChange={changeMaritalStatus} name="estadoCivil" value={formik.values.estadoCivil}>
                  <option value="">Selecione</option>
                    <option value="Solteiro(a)">Solteiro(a)</option>
                    <option value="Casado(a)">Casado(a)</option>
                    <option value="Viúvo(a)">Viúvo(a)</option>
                    <option value="Separado(a)">Separado(a)</option>
                  </select>
                  {formik.errors.estadoCivil && (
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
                    {formik.errors.nomeConjugue && (
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
                    Cadastrar
                  </Button>
                </Col>
              </Form.Row>
            </Form>     
          </Card.Body>
        </Card>
      </div>

  );
};

export default Page;
