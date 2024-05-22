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
import Loader from "../../common/Loader";
import NoData from "../../common/NoData";
import Pagination from "../../common/Pagination/Pagination";
import { Translate } from "../../Enums/Tranlate";
import CardItem from "./CardItem";
import './style.scss'
import ProjectsService from "../../../services/ProjectsService";
import AddLeadsModal from "./AddLeadsModal";
import MonthDropDown, { months } from "../../Enums/MonthDropDown";
import YearDropDown from "../../Enums/YearDropDown";
import print from "../../Enums/Print";

const Leads = () => {
    const [data, setData] = useState([
      {id: 1, name: 'test', client_name: 'mu', client_phone: '435235', client_email: 'muhammed@gmail.com', reference: 'lorea test lorea test lorea test lorea test lorea test lorea test lorea test lorea test lorea test lorea test lorea test lorea test lorea test lorea test lorea test lorea test lorea test lorea test lorea test lorea test lorea test lorea test lorea test lorea test lorea test lorea test lorea test lorea test lorea test lorea test lorea test lorea test lorea test lorea test lorea test', docs: ''},
      {id: 2, name: 'test1', client_name: 'os', client_phone: '324234', client_email: 'muhammed@gmail.com', reference: 'fgsdf sdfsdfssd dsfsdfsdf', docs: ''},
    ])
    const [addModal, setAddModal] = useState(false)
    const [item, setItem] = useState({})
    const [hasData, setHasData] = useState(1)
    const [search, setSearch] = useState(null)
    const [loading, setLoading] = useState(false)
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const lang = useSelector(state=> state.auth?.lang)
    const [params, setParams] = useState({
      month: "",
      year: ""
    })
    const projectsService = new ProjectsService()

    const changeParams = (e, name) => {
      setParams({...params, [name]: e})
    } 

    const printProjects = () => {
      print(
        Translate[lang]?.leads,
        [ "id", 
          Translate[lang]?.name, 
          Translate[lang]?.client_name, 
          Translate[lang]?.client_phone, 
          Translate[lang]?.client_email, 
          Translate[lang]?.reference
        ],
        lang,
        data.map(item => {
          return {
            id: item.id,
            name: item.name,
            client_name: item.client_name,
            client_phone: item.client_phone,
            client_email: item.client_email,
            reference: item.reference,
          };
        })
      )
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
            <Button 
              variant='secondary' 
              className='mx-2 h-75'
              onClick={printProjects}
            >
              {Translate[lang].print}
            </Button>
            <Button variant="primary" className='me-2 h-75' onClick={()=> { 
              setItem({})
              setAddModal(true) 
            }}>
              <i className="la la-plus mx-1"></i>
              {Translate[lang]?.add} {Translate[lang]?.leads}
            </Button>
          </div>
        </Card.Body >
      </Card>
      
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Body className={`${hasData === 0 && 'text-center'} `}>
            {loading && <div style={{height: '300px'}}>
                <Loader />
              </div>}
              <Row className="mb-3">
                <Col md={2} sm={5}>
                  <MonthDropDown
                    params={params} 
                    changeParams={changeParams} 
                  />
                </Col>
                <Col md={2} sm={5}>
                  <YearDropDown
                    params={params} 
                    changeParams={changeParams} 
                  />
                </Col>
              </Row>
              {(hasData === 1 && !loading) && <Table responsive>
                <thead>
                  <tr className='text-center'>
                    <th>
                      <strong>I.D</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.lead_name}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.client_name}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.client_phone}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.client_email}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.reference}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.document}</strong>
                    </th>
                    <th></th>
                  </tr>
                </thead>

                <tbody className="table-body">
                    {data?.map((item, index) =>{
                        return <CardItem 
                            index= {index}
                            key= {index}
                            item={item}
                            setItem={setItem}
                            setAddModal={setAddModal}
                            setShouldUpdate={setShouldUpdate}
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

      {addModal && 
        <AddLeadsModal
          item={item} 
          addModal={addModal} 
          setShouldUpdate={setShouldUpdate}
          setAddModal={()=> setAddModal(false)}
      />}

    </Fragment>
  );
};

export default Leads;
