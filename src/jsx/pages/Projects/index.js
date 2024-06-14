import React, { Fragment, useEffect } from "react";
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
import AddProjectsModal from "./AddProjectsModal";
import MonthDropDown from "../../Enums/MonthDropDown";
import YearDropDown from "../../Enums/YearDropDown";
import print from "../../Enums/Print";
import Select from "react-select";
import Server from "./Server";
import ProjectsCardItem from "./ProjectsCardItem";

const tabs = ['projects', 'maintaince', 'server']
const Projects = () => {
  const [selectTab, setSelectTab] = useState('projects')
    const [data, setData] = useState([])
    const [addModal, setAddModal] = useState(false)
    const [item, setItem] = useState({})
    const [hasData, setHasData] = useState(1)
    const [search, setSearch] = useState(null)
    const [loading, setLoading] = useState(false)
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const lang = useSelector(state=> state.auth?.lang)
    const Auth = useSelector((state) => state.auth?.auth);
    const isExist = (data) => Auth?.admin?.admin_roles?.includes(data);
    const [customParams, setCustomParams] = useState({})
    const [params, setParams] = useState({
      month: "",
      year: "",
      type: ""
    })
    const projectsService = new ProjectsService()

    useEffect(()=>{
      let data = []
      if(!!params.month) data["month"] = params?.month?.value
      if(!!params.year) data["year"] = params?.year?.value
      if(!!params.type) data["type"] = params?.type?.value
      setCustomParams({...data})
      setShouldUpdate(prev => !prev)
    },[params])

    const changeParams = (e, name) => {
      setParams({...params, [name]: e})
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
              Translate[lang]?.client_name,
              Translate[lang]?.client_phone,
              Translate[lang]?.client_email,
              Translate[lang]?.client_civil_id,
              Translate[lang]?.works_day,
              Translate[lang]?.contract_date,
              Translate[lang]?.price,
              Translate[lang]?.maintaince,
              Translate[lang]?.start_date,
              Translate[lang]?.end_date,
              Translate[lang]?.type,
            ],
            lang,
            res?.data?.data?.data.map(item => {
              return {
                id: item.id,
                name: item.name,
                client_name: item?.client_name,
                client_phone: item?.phone,
                client_email: item?.client_email,
                client_civil_id: item?.client_civil_id,
                works_day: item?.work_day,
                contract_date: item?.contract_date?.split('T')[0],
                price: item?.price,
                maintaince: item?.maintenance,
                maintaince_start_date: item?.maintenance_start_date?.split('T')[0] || '-',
                maintaince_end_date: item?.maintenance_end_date?.split('T')[0] || '-',
                type: item?.type,
              };
            })
          )
        }
        setLoading(false)
      }).catch(()=> setLoading(false))
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
  return (
    <Fragment>
      <Card className="mb-3">
        <Card.Body className="p-0">
          <div className="tabs-div pb-0">
            {tabs?.map((tab,index)=>{
              return <p
                key={index}
                className='mb-0'
                style={{
                  color: tab === selectTab ? "var(--primary)" : "#7E7E7E",
                  borderBottom: tab === selectTab ? "2px solid" : "none",
                }}
                onClick={() => {
                  setSelectTab(tab)
                  setParams({
                    month: '',
                    year: '',
                    type: ''
                  })
                }}
                >
                  {Translate[lang][tab]}
              </p>
            })}
          </div>
         </Card.Body>
      </Card>

      {selectTab === 'projects' && <>
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
              {isExist('view_projects') && <Button 
                variant='secondary' 
                className='mx-2 h-75'
                onClick={printProjects}
              >
                {Translate[lang].print}
              </Button>}
              {isExist('add_projects') && <Button variant="primary" className='me-2 h-75' onClick={()=> { 
                setItem({})
                setAddModal(true) 
              }}>
                <i className="la la-plus mx-1"></i>
                {Translate[lang]?.add} {Translate[lang]?.projects}
              </Button>}
            </div>
          </Card.Body >
        </Card>
        
        <Row>
          <Col lg={12}>
            <Card>
              <Card.Body>
                <Row className="mb-3">
                  <Col md={3} sm={3}>
                    <MonthDropDown
                      params={params} 
                      changeParams={changeParams} 
                    />
                  </Col>
                  <Col md={3} sm={3}>
                    <YearDropDown
                      params={params} 
                      changeParams={changeParams} 
                    />
                  </Col>
                  <Col md={3} sm={3} className="d-flex align-items-end">
                    <Button 
                      type="button" 
                      style={{padding: '.4rem 2rem'}}
                      variant="outline-secondary"
                      onClick={getAll}>{Translate[lang].all}</Button>
                  </Col>
                </Row>
                {loading && <div style={{height: '300px'}}>
                  <Loader />
                </div>}
                {(hasData === 1 && !loading) && <> 
                <Table responsive>
                  <thead>
                    <tr className='text-center'>
                      <th>
                        <strong>I.D</strong>
                      </th>
                      <th>
                        <strong>{Translate[lang]?.name}</strong>
                      </th>
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
                        <strong>{Translate[lang]?.client_email}</strong>
                      </th>
                      <th>
                        <strong>{Translate[lang]?.client_civil_id}</strong>
                      </th>
                      <th>
                        <strong>{Translate[lang]?.works_day}</strong>
                      </th>
                      <th>
                        <strong>{Translate[lang]?.contract_date}</strong>
                      </th>
                      <th>
                        <strong>{Translate[lang]?.price}</strong>
                      </th>
                      <th>
                        <strong>{Translate[lang]?.maintaince}</strong>
                      </th>
                      <th>
                        <strong>{Translate[lang]?.attachments}</strong>
                      </th>
                      <th>
                        <strong>{Translate[lang]?.type}</strong>
                      </th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody className="table-body">
                      {data?.map((item, index) =>{
                          return <ProjectsCardItem 
                              index= {index}
                              key= {index}
                              item={item}
                              setItem={setItem}
                              setAddModal={setAddModal}
                              setShouldUpdate={setShouldUpdate}
                          />
                      })}
                  </tbody>
                </Table>
                </>}
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
                    param={customParams}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>}
      {selectTab === 'maintaince' && <>
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
              {isExist('view_projects') && <Button 
                variant='secondary' 
                className='mx-2 h-75'
                onClick={printProjects}
              >
                {Translate[lang].print}
              </Button>}
              {isExist('add_projects') && <Button variant="primary" className='me-2 h-75' onClick={()=> { 
                setItem({})
                setAddModal(true) 
              }}>
                <i className="la la-plus mx-1"></i>
                {Translate[lang]?.add} {Translate[lang]?.projects}
              </Button>}
            </div>
          </Card.Body >
        </Card>
        
        <Row>
          <Col lg={12}>
            <Card>
              <Card.Body>
                <Row className="mb-3">
                  <Col md={3} sm={3}>
                    <label>{Translate[lang].type}</label>
                    <Select
                        placeholder={Translate[lang]?.select}
                        options={[
                          {label: Translate[lang].existing_projects, value: "new"},
                          {label: Translate[lang].hosting_projects, value: "hosting"},
                        ]}
                        value={params?.type}
                        onChange={(e) => changeParams(e, 'type')}
                    />
                  </Col>
                  <Col md={3} sm={3}>
                    <MonthDropDown
                      params={params} 
                      changeParams={changeParams} 
                    />
                  </Col>
                  <Col md={3} sm={3}>
                    <YearDropDown
                      params={params} 
                      changeParams={changeParams} 
                    />
                  </Col>
                  <Col md={3} sm={3} className="d-flex align-items-end">
                    <Button 
                      type="button" 
                      style={{padding: '.4rem 2rem'}}
                      variant="outline-secondary"
                      onClick={getAll}>{Translate[lang].all}</Button>
                  </Col>
                </Row>
                {loading && <div style={{height: '300px'}}>
                  <Loader />
                </div>}
                {(hasData === 1 && !loading) && <> 
                <Table responsive>
                  <thead>
                    <tr className='text-center'>
                      <th>
                        <strong>I.D</strong>
                      </th>
                      <th>
                        <strong>{Translate[lang]?.name}</strong>
                      </th>
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
                        <strong>{Translate[lang]?.client_email}</strong>
                      </th>
                      <th>
                        <strong>{Translate[lang]?.contract_date}</strong>
                      </th>
                      <th>
                        <strong>{Translate[lang]?.price}</strong>
                      </th>
                      <th>
                        <strong>{Translate[lang]?.maintaince}</strong>
                      </th>
                      <th>
                        <strong>{Translate[lang]?.maintaince_start_date}</strong>
                      </th>
                      <th>
                        <strong>{Translate[lang]?.maintaince_end_date}</strong>
                      </th>
                      <th>
                        <strong>{Translate[lang]?.attachments}</strong>
                      </th>
                      <th>
                        <strong>{Translate[lang]?.type}</strong>
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
                </Table>
                </>}
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
                    param={customParams}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>}

      {selectTab === 'server' && <Server />}

      {addModal && 
        <AddProjectsModal
          item={item} 
          addModal={addModal} 
          type={params?.type}
          setShouldUpdate={setShouldUpdate}
          setAddModal={()=> setAddModal(false)}
      />}

    </Fragment>
  );
};

export default Projects;
