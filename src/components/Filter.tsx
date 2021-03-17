import React, {useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputMask from 'react-input-mask';
import { useFormik  } from 'formik';

const Filter: React.FC<{ findFunction: any }> = ({findFunction}) => {
  
  useEffect(() => {
    findFunction(formik.values)
  },[])

  const formik = useFormik({
    initialValues: {
      nome : '', 
      cpf : ''
    },
    onSubmit: async (values) => {
      findFunction(values);
    }
  });

  return (
    <Card>
      <Card.Body>
        <Card.Title>Filtros</Card.Title>                    
        <Form noValidate action="" onSubmit={formik.handleSubmit}>
          <Form.Row>
            <Col md="6">
              <Form.Group>
                <Form.Label>Nome</Form.Label>
                <input className="form-control" name="nome" value={formik.values.nome} onChange={formik.handleChange}/>
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group >
                <Form.Label>CPF</Form.Label>
                <InputMask className="form-control" name="cpf" value={formik.values.cpf} onChange={formik.handleChange} mask="999.999.999-99"/>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Filtrar
            </Button>
          </Form.Row>
        </Form>     
      </Card.Body>
    </Card>
  );
};

export default Filter;
