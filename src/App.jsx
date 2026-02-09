import Display from "./components/card"
import {useEffect, useState, useRef } from "react";
import { Button, Offcanvas, Form } from "react-bootstrap";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from "styled-components";
import bgSoccer from './assets/bg-soccer.jpg'

const Secao = styled.section`
  position: relative;
  min-height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 3rem;

  background: url(${bgSoccer}) center / cover no-repeat;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.5)
  }
`;

const Titulo = styled.h1`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  max-width: 900px;

  color: white;
  text-align: center;

  position: relative;
  z-index: 1;
`;

const BtnAdd = styled.button`
  position: fixed;
  top: 90%;
  right: 50px;
  transform: translateY(-50%);
  z-index: 1050;
  background-color: #198754;
  border-radius: 5px;
  border: none;
  color: white;
  padding: 5px;
`;

const BtnSave = styled.button`
  background-color: ${({salvo}) => (salvo ? "#198754" : "#6c757d")};
  border-radius: 5px;
  border: none;
  color: white;
  padding: 5px;
`;

const API_Url = 'https://69665990f6de16bde44d1c9d.mockapi.io/api/v1/Produtos';

function App() {

  /* Loading */
  const [loading, setLoading] = useState(true);
  
  /* Aside */
    const [showAside, setShowAside] = useState(false);

    const abrirAside = () => setShowAside(true);
    const fecharAside = () => setShowAside(false);

    /* ------------------------------------------------------------ */

    const [produtos, setProdutos] = useState([]);
    const [novoProduto, setNovoProduto] = useState('');
    const [novaDescricao, setNovaDescricao] = useState('');
    const [novoPreco, setNovoPreco] = useState('');

    const [salvo, setSalvo] = useState(false);
    const formRef = useRef(null);
 
    useEffect(() => {
      setLoading(true);

      setTimeout(() => {
        fetch(API_Url)
          .then(res => res.json())
          .then(dados => {
            setProdutos(dados);
            setLoading(false);
          }) 
        .catch(error => {
          console.error('Erro ao buscar produto:',error);
          setLoading(false);
        });
      }, 2000); 
    },[])

    const deleteProduto = async (id) => {
      console.log('ID a excluir:', id);
      if (!window.confirm('Deseja excluir este produto?')) return;

      try {
        await fetch(`${API_Url}/${id}`, {
          method: 'DELETE'
        });

        // remove da tela sem precisar refetch
        setProdutos(produtos.filter(p => p.id !== id));
      } catch (err) {
        console.error('Erro ao deletar produto:', err);
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      if(novoProduto.trim() === '') return;

      setSalvo(true);

      const novo = {
        titulo: novoProduto.trim(),
        texto: novaDescricao.trim(),
        preco: novoPreco.trim()
      }
      
      fetch(API_Url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(novo)
      })
      .then(res => res.json())
      .then(produtoCriado => {
        setProdutos([...produtos, produtoCriado])
        setNovoProduto('');
        setNovaDescricao('');
        setNovoPreco('');

        setTimeout(() =>{
          setSalvo(false);
          fecharAside();
        }, 2000);

      })
      .catch(error => {
        console.error('Erro ao criar produto:',error);
        setSalvo(false);
      });
    }

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Cervas' Sport</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#produtos">Produtos</Nav.Link>
            <Nav.Link href="#contato">Contato</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Secao>
        <Titulo >Bem-vindo ao MAIOR site esportivo da minha cadeira!</Titulo>
      </Secao>
      
      {!showAside && (<BtnAdd onClick={abrirAside}>Novo Produto</BtnAdd>)}
      
      <Offcanvas show={showAside} onHide={fecharAside} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Novo Produto</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <div className="container mt-4">
            {salvo ? (
              <p className="text-center mt-4">Adicionando produto...</p>
            ) : (
              <Form ref={formRef} onSubmit={handleSubmit}>
                <Form.Group className="mb-3 d-flex flex-column">
                  <Form.Label>Produto</Form.Label>
                  <input type="text" placeholder="Nome do produto" 
                    value={novoProduto}
                    onChange={(e) => setNovoProduto(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3 d-flex flex-column">
                  <Form.Label>Descrição</Form.Label>
                  <input type="text" placeholder="Descrição do produto" 
                    value={novaDescricao}
                    onChange={(e) => setNovaDescricao(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3 d-flex flex-column">
                  <Form.Label>Preço</Form.Label>
                  <Form.Control type="number" 
                    step="0.01" 
                    min="0" 
                    placeholder="Valor do produto" 
                    value={novoPreco}
                    onChange={(e) => setNovoPreco(e.target.value)}
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </Form.Group>
              </Form>
            )}
            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={fecharAside}>
                Cancelar
              </Button>
              <BtnSave type="submit" salvo={salvo} onClick={() => formRef.current.requestSubmit()}>
                {salvo ? "Salvando..." : "Salvar"}
              </BtnSave>
            </div>
          </div>
          
        </Offcanvas.Body>
      </Offcanvas>

      <div className="container mt-4">
        {loading ? (
          <p className="text-center mt-4">Carregando produtos...</p>
        ) : (
          <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
            {produtos.map(produto => (
              <Col key={produto.id} className="d-flex">
                <Display
                  id={produto.id}
                  titulo={produto.titulo}
                  texto={produto.texto}
                  preco={produto.preco}
                  onDelete={deleteProduto}
                />
              </Col>
            ))}
          </Row>
        )}
      </div>

      <footer className="text-center py-1">
        <p>&copy; 2026 Cervas' Sport - Todos os direitos reservados.</p>
      </footer>
    </>
  )
}

export default App
