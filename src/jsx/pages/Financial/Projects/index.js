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
import AddProjectsModal from "./AddProjectsModal";
import ProjectsService from "../../../../services/ProjectsService";
import MonthDropDown from "../../../Enums/MonthDropDown";
import YearDropDown from "../../../Enums/YearDropDown";
import NoData from "../../../common/NoData";
import Loader from "../../../common/Loader";
import { Translate } from "../../../Enums/Tranlate";
import Pagination from "../../../common/Pagination/Pagination";
import print from "../../../Enums/Print";

const Projects = () => {
    const [data, setData] = useState([])
    const [addModal, setAddModal] = useState(false)
    const [item, setItem] = useState({})
    const [hasData, setHasData] = useState(null)
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
      setShouldUpdate(prev=> !prev)
    } 
  const getAll = () =>{
    setLoading(true)
    projectsService.getList()?.then(res=>{
      if(res?.status === 200){
        setData(res?.data?.data?.data)
      }
      setLoading(false)
    }).catch(()=>setLoading(false))
  }

  const printProjects = () => {
    setLoading(true)
    projectsService.getList((!!params.month.value || !!params.year.value) ? {
      month: !!params.month.value ? params.month.value : '',
      year: !!params.year.value ? params.year.value : ''
    } : '').then(res=>{
      if(res?.status === 200){
        print(
          Translate[lang]?.projects,
          [ "id", 
            Translate[lang]?.name, 
            Translate[lang]?.department,
            Translate[lang]?.client_name,
            Translate[lang]?.client_phone,
            Translate[lang]?.cost,
          ],
          lang,
          res?.data?.data?.data.map(item => {
            return {
              id: item.id,
              name: item.name,
              department: item?.department?.name,
              client_name: item?.client_name,
              client_phone: item?.phone,
              price: item?.price
            };
          })
        )
      }
      setLoading(false)
    }).catch(()=> setLoading(false))
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
            <Button variant='secondary' onClick={printProjects} type="button" className='mx-2 h-75'>
              {Translate[lang].print}
            </Button>
          </div>
        </Card.Body >
      </Card>
      
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Body>
              <Row className="mb-3" style={{alignItems: 'end'}}>
                <Col md={3} sm={5}>
                  <MonthDropDown
                    params={params} 
                    changeParams={changeParams} 
                  />
                </Col>
                <Col md={3} sm={5}>
                  <YearDropDown
                    params={params} 
                    changeParams={changeParams} 
                  />
                </Col>
                <Col md={3} sm={5}>
                  <Button 
                    type="button" 
                    variant="outline-secondary"
                    onClick={getAll}>{Translate[lang].all}</Button>
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
              {(hasData === 0 && !loading) && <div className='text-center'>
                <NoData />
              </div>}
              <Pagination
                  setData={setData}
                  service={projectsService}
                  shouldUpdate={shouldUpdate}
                  setHasData={setHasData}
                  setLoading={setLoading}
                  search={search}
                  param={{
                    month: params.month?.value,
                    year: params.year?.value,
                  }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {addModal && 
        <AddProjectsModal
          item={item} 
          addModal={addModal} 
          setShouldUpdate={setShouldUpdate}
          setAddModal={()=> setAddModal(false)}
      />}

    </Fragment>
  );
};

export default Projects;
