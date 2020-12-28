import * as React from 'react';
import {
  Stack,
  IStackTokens
} from 'office-ui-fabric-react';
import styles from './List.module.scss';
import ListItem from '../ListItem/ListItem';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IApp } from './IListProps';

export class List extends React.Component<{}, {}> {
  public render(): JSX.Element {

    const sectionStackTokens: IStackTokens = { childrenGap: 30 };
    const apps: IApp[] = [
      {
        url: "http://10.132.0.14:4000/", imgUrl:"/img/devs.png", title:"Devoluciones", description:"Aplicación para introducir códigos estadísticos en clientes"
      },
      {
        url:"http://10.132.0.14:5000/", imgUrl:"/img/clients.png", title:"Clientes", description:"Aplicación de devoluciones documentadas"
      },
      // {
      //   url: "http://10.132.0.14:4000/", imgUrl:"/img/devs.png", title:"Devoluciones", description:"Aplicación para introducir códigos estadísticos en clientes"
      // },
      // {
      //   url:"http://10.132.0.14:5000/", imgUrl:"/img/clients.png", title:"Clientes", description:"Aplicación de devoluciones documentadas"
      // },
      // {
      //   url: "http://10.132.0.14:4000/", imgUrl:"/img/devs.png", title:"Devoluciones", description:"Aplicación para introducir códigos estadísticos en clientes"
      // },
      // {
      //   url:"http://10.132.0.14:5000/", imgUrl:"/img/clients.png", title:"Clientes", description:"Aplicación de devoluciones documentadas"
      // }
    ]


    return (
      <div className={styles.List}>
        <Container fluid="lg">
          {/* <Stack horizontal tokens={sectionStackTokens} > */}
          <Row>
            <Col lg md xs ="auto"></Col>
            <Col lg="8" md="10" xs="12">
                <Row>
                

                {apps.map(app=>{
                  return(
                    <Col >
                      <ListItem
                        url={app.url}
                        imgUrl={app.imgUrl}
                        title={app.title}
                        description={app.description}
                      ></ListItem>
                    </Col>
                  )
                })}
                </Row>

            </Col>
            <Col lg md xs ="auto"></Col>
            
          </Row>
          


          {/* </Stack> */}
        </Container>
      </div>
    );
  }
}