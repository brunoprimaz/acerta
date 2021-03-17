import React, { useState  } from 'react';

import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import Filter from '../components/Filter';
import ResultList from '../components/ResultList';
import { useHistory } from "react-router-dom";
import * as Api from '../services/Api';

const Page: React.FC = () => { 
  const history = useHistory();
  const [leads, setLeads] = useState([]);
  const fieldsLeads = [
    { title : 'E-mail', key : 'email'},
    { title : 'Nome', key : 'nome'},
    { title : 'CPF', key : 'cpf'},
  ];

  function register() {
    history.push("/lead");
  }

  function edit(id) {
    history.push("/lead/" + id);
  }

  async function remove(id){
    let url = "leads/" + id;
    await Api.remove(url);
    find();
  }

  async function find(values?){
    let url = "leads";
    if (values){
      url += "?nome_like=" + values.nome;
      let cpf = values.cpf.replace(/[^0-9]/g,'');
      url += "&cpf_like=" + cpf;
    }
    let response = await Api.get(url);
    setLeads(response.data);
  }
  
  return (
      <div>        
        <Header title="Consulta de Leads"></Header>
        <Filter findFunction={find}></Filter>
        <Button variant="primary" className="m-2" onClick={register} type="button">
          Novo Lead
        </Button>
        {leads.length === 0 && (
          <span className="empty-result">Nenhum registro encontrado</span>
        )}
        {leads.length > 0 && (
          <ResultList fields={fieldsLeads} list={leads} editFunction={edit} removeFunction={remove}>
          </ResultList>
        )}
      </div>
  );
};

export default Page;
