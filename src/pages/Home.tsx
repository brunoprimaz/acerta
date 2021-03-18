import React, { useState  } from 'react';

import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import Filter from '../components/Filter';
import Spinner from '../components/Spinner';
import ResultList from '../components/ResultList';
import { useHistory } from "react-router-dom";
import * as Api from '../services/Api';

const Page: React.FC = () => { 
  const history = useHistory();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
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
    try{
      setLoading(true);
      await Api.remove(url);
      find();
    } catch(e){
      alert(e)
    }
    setLoading(false);
  }

  async function find(values?){
    let url = "leads";
    if (values){
      url += "?nome_like=" + values.nome;
      let cpf = values.cpf.replace(/[^0-9]/g,'');
      url += "&cpf_like=" + cpf;
    }
    try {
      setLoading(true);
      let response = await Api.get(url);
      setLeads(response.data);
    } catch(e){
      alert(e)
    }
    setLoading(false);
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
        {loading && (
          <Spinner></Spinner>
        )}
      </div>
  );
};

export default Page;
