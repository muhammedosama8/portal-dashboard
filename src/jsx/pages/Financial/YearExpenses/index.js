import React, { Fragment } from "react";
import { useState } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import CardItem from "./CardItem";
import './style.scss'
import ProjectsService from "../../../../services/ProjectsService";
import YearDropDown from "../../../Enums/YearDropDown";
import NoData from "../../../common/NoData";
import Loader from "../../../common/Loader";
import { Translate } from "../../../Enums/Tranlate";

const YearExpenses = () => {
    const [data, setData] = useState([])
    const [item, setItem] = useState({})
    const [hasData, setHasData] = useState(0)
    const [search, setSearch] = useState(null)
    const [loading, setLoading] = useState(false)
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const lang = useSelector(state=> state.auth?.lang)
    const [params, setParams] = useState({
      year: {
        label: `${new Date().getFullYear()}`,
        value: new Date().getFullYear()
      }
    })
    const projectsService = new ProjectsService()

    const changeParams = (e, name) => {
      setParams({...params, [name]: e})
    } 

  return (
    <Fragment>
      <Card className="mb-3">
        <Card.Body className="d-flex justify-content-between p-3 align-items-center">
          <div className="input-group w-50">
            <input 
                type="text" 
                style={{borderRadius: '8px',
                color: 'initial',
                padding: '18px 16px'}}
                className="form-control"
                placeholder={`${Translate[lang]?.search_by} I.D, ${Translate[lang]?.name}`}
                value={search}
                onChange={e=> setSearch(e.target.value)} 
            />
            <div className="flaticon-381-search-2"
              style={{position: 'absolute',zIndex:'1', right: lang === 'en' && '16px', left: lang === 'ar' && '16px', top: '50%', transform: 'translate(0, -50%)'}}
            ></div>
          </div>
          <div>
            <Button variant='secondary' className='mx-2 h-75'>
              {Translate[lang].print}
            </Button>
          </div>
        </Card.Body >
      </Card>
      
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Body className={`${hasData === 0 && 'text-center'} `}>
              <Row className="mb-3">
                <Col md={2} sm={5}>
                  <YearDropDown
                    params={params} 
                    changeParams={changeParams} 
                  />
                </Col>
              </Row>
              {loading && <div style={{height: '300px'}}>
                <Loader />
              </div>}
              {(hasData === 1 && !loading) && <Table responsive>
                <thead>
                  <tr className='text-center'>
                    <th>
                      <strong>I.D</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.name}</strong>
                    </th>
                    {/* <th>
                      <strong>{Translate[lang]?.cost}</strong>
                    </th> */}
                    <th>
                      <strong>{Translate[lang]?.department}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.client_name}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.client_phone}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.cost}</strong>
                    </th>
                  </tr>
                </thead>

                <tbody className="table-body">
                    {data?.map((item, index) =>{
                        return <CardItem 
                            index= {index}
                            key= {index}
                            item={item}
                        />
                    })}
                </tbody>
              </Table>}
              {hasData === 0 && <NoData />}
              {/* <Pagination
                  setData={setData}
                  service={projectsService}
                  shouldUpdate={shouldUpdate}
                  setHasData={setHasData}
                  setLoading={setLoading}
                  search={search}
              /> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Fragment>
  );
};

export default YearExpenses;