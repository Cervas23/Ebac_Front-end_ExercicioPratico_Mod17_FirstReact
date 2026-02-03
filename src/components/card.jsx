import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash} from  '@fortawesome/free-solid-svg-icons'
import './card.css'


function Display({id, titulo, texto, preco, onDelete}){
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
        <Button variant="danger" size='sm' onClick={()=> onDelete(id)} className='btn__excluir'><FontAwesomeIcon icon={faTrash}/></Button>
      </Card.Body>
    </Card>
  );
}

export default Display;
