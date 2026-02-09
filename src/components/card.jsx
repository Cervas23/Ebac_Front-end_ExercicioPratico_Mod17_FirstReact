import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash} from  '@fortawesome/free-solid-svg-icons'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';
import { useState } from 'react';

const BtnExcluir = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
  padding: 6px 8px;

  background-color: #dc3545;
  border-radius: 5px;
  border: none;
`;

const BtnCart = styled.button`
  display: grid;  
  grid-template-columns: 1fr auto;
  align-items: center;

  
  width: 100%;
  padding: 0.6rem 1rem;
  border-radius: 0.375rem;
  border: none;
  background-color: ${({adicionado}) => (adicionado ? "#198754" : "#6c757d")};
  color: #fff;
  font-weight: 700;
`;


function Display({id, titulo, texto, preco, onDelete}){

  const [adicionado, setAdicionado] = useState(false);

  const addCarrinho = () => {
    setAdicionado(prev => !prev);
  };

  return (
    <Card className="w-100 h-100 position-relative">
      <Card.Img variant="top" src="https://placehold.co/286x180"/>
      <Card.Body className='bg-light'>
        <Card.Title className='text-center'>{titulo}</Card.Title>
        <Card.Text className='text-center'>
          {texto}
        </Card.Text>
        <Card.Text className='text-center'>
          Compre Agora por R${preco}!
        </Card.Text>
        <BtnExcluir onClick={()=> onDelete(id)}><FontAwesomeIcon icon={faTrash}/></BtnExcluir>
        <BtnCart adicionado={adicionado} onClick={addCarrinho}>
          {adicionado ? "Adicionado ao carrinho" : "Adicionar ao carrinho"}
          <FontAwesomeIcon icon={faCartShopping}/>
        </BtnCart>
      </Card.Body>
    </Card>
  );
}

export default Display;
