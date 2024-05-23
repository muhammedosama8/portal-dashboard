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
import AddRevenuesModal from "./AddRevenuesModal";
import ProjectsService from "../../../../services/ProjectsService";
import MonthDropDown from "../../../Enums/MonthDropDown";
import YearDropDown from "../../../Enums/YearDropDown";
import NoData from "../../../common/NoData";
import Loader from "../../../common/Loader";
import { Translate } from "../../../Enums/Tranlate";
import TotalRevenuesModal from "./TotalRevenuesModal";

const Revenues = () => {
    const [data, setData] = useState([])
    const [addModal, setAddModal] = useState(false)
    const [modal, setModal] = useState(false)
    const [item, setItem] = useState({})
    const [hasData, setHasData] = useState(0)
    const [search, setSearch] = useState(null)
    const [loading, setLoading] = useState(false)
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const lang = useSelector(state=> state.auth?.lang)
    const [params, setParams] = useState({
      month: ""
    //   {
    //     label: Translate[lang][months[new Date().getMonth()].toLocaleLowerCase()],
    //     value: months[new Date().getMonth()].toLocaleLowerCase()
    // }
    ,
      year: ""
      // {
      //   label: `${new Date().getFullYear()}`,
      //   value: new Date().getFullYear()
      // }
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
            <Button variant='secondary' className='h-75'>
              {Translate[lang].print}
            </Button>
            <Button variant='outline-primary' className='mx-2 h-75' onClick={()=> setModal(true)}>
              {Translate[lang].total} {Translate[lang].revenues}
            </Button>
            {/* <Button variant='primary' className='h-75' onClick={()=> setAddModal(true)}>
              {Translate[lang].add} {Translate[lang].revenues}
            </Button> */}
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
        <AddRevenuesModal
          item={item} 
          addModal={addModal} 
          setShouldUpdate={setShouldUpdate}
          setAddModal={()=> setAddModal(false)}
      />}
      {modal && 
        <TotalRevenuesModal
          item={item} 
          modal={modal} 
          setShouldUpdate={setShouldUpdate}
          setModal={()=> setModal(false)}
      />}

    </Fragment>
  );
};

export default Revenues;