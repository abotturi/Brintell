import React from 'react';
import './style.css';
import { Carousel } from 'react-bootstrap'

const banner = [
  {
    img: require('../../imgs/board.jpg'),
    title: 'Seja bem-vindo ao School Soft',
    subTitle: 'Um Software desenvolvido para escolas, gerenciarem seu alunos'
  },
  {
    img: require('../../imgs/pc.png'),
    title: 'Com um Unico Click',
    subTitle: 'Tenha controle do total de alunos da sua escola'
  }
]

function Home() {
  return (
    <Carousel>
      {
        banner.map((item, idx) => {
          return (
            <Carousel.Item interval={5000} key={idx}>
              <img
                style={{width: '100vw', height: '100vh', filter: 'blur(5px)'}}
                src={item.img}
                alt="First slide"
              />
              <Carousel.Caption style={{right: 0, left: 0, bottom: 0, top: '40%'}}>
                <h1>{item.title}</h1>
                <h5>{item.subTitle}</h5>
              </Carousel.Caption>
            </Carousel.Item>
          )
        })
      }
    </Carousel>
  );
}

export default Home;
