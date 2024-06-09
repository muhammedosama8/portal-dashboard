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
import Loader from "../../../common/Loader";
import NoData from "../../../common/NoData";
import Pagination from "../../../common/Pagination/Pagination";
import { Translate } from "../../../Enums/Tranlate";
import CardItem from "./CardItem";
import '../style.scss'
import ProjectsService from "../../../../services/ProjectsService";
import MonthDropDown from "../../../Enums/MonthDropDown";
import YearDropDown from "../../../Enums/YearDropDown";
import print from "../../../Enums/Print";
import AddServerModal from "./AddServerModal";

const Server = () => {
    const [data, setData] = useState([
      {id: 1, project: {label: 'proj 1', value: 1}, price: 123, contract_no: '1234321', package_num: 123}
    ])
    const [addModal, setAddModal] = useState(false)
    const [item, setItem] = useState({})
    const [hasData, setHasData] = useState(1)
    const [search, setSearch] = useState(null)
    const [loading, setLoading] = useState(false)
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const lang = useSelector(state=> state.auth?.lang)
    const Auth = useSelector((state) => state.auth?.auth);
    const isExist = (data) => Auth?.admin?.admin_roles?.includes(data);
    const [params, setParams] = useState({
      month: "",
      year: ""
    })
    const projectsService = new ProjectsService()

    const changeParams = (e, name) => {
      setParams({...params, [name]: e})
    } 

    const printProjects = () => {
      // setLoading(true)
      // projectsService.getList((!!params.month.value || !!params.year.value) ? {
      //   month: !!params.month.value ? params.month.value : '',
      //   year: !!params.year.value ? params.year.value : ''
      // } : '').then(res=>{
      //   if(res?.status === 200){
      //     print(
      //       Translate[lang]?.server,
      //       [ "id", 
      //         Translate[lang]?.project_name, 
      //         Translate[lang]?.contract_no,
      //         Translate[lang]?.price,
      //         Translate[lang]?.package_num
      //       ],
      //       lang,
      //       res?.data?.data?.data.map(item => {
      //         return {
      //           id: item.id,
      //           project_name: item.project.label,
      //           contract_no: item.contract_no,
      //           price: item?.price,
      //           package_num: item?.package_num
      //         };
      //       })
      //     )
      //   }
      //   setLoading(false)
      // }).catch(()=> setLoading(false))
    }

    const getAll = () =>{
      // setLoading(true)
      // projectsService.getList()?.then(res=>{
      //   if(res?.status === 200){
      //     setData(res?.data?.data?.data)
      //   }
      //   setLoading(false)
      // }).catch(()=>setLoading(false))
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
                {Translate[lang]?.add} {Translate[lang]?.server}
              </Button>}
            </div>
      </Card.Body >
    </Card>
        
    <Row>
          <Col lg={12}>
            <Card>
              <Card.Body className={`${hasData === 0 && 'text-center'} `}>
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
                        <strong>{Translate[lang]?.project_name}</strong>
                      </th>
                      <th>
                        <strong>{Translate[lang]?.contract_no}</strong>
                      </th>
                      <th>
                        <strong>{Translate[lang]?.price}</strong>
                      </th>
                      <th>
                        <strong>{Translate[lang]?.package_num}</strong>
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
                {hasData === 0 && <NoData />}
                {/* <Pagination
                    setData={setData}
                    service={projectsService}
                    shouldUpdate={shouldUpdate}
                    setHasData={setHasData}
                    setLoading={setLoading}
                    search={search}
                    // param={{
                    //   month: !!params.month?.value ? params.month.value : '',
                    //   year: !!params.year?.value ? params.year.value : '',
                    // }}
                /> */}
              </Card.Body>
            </Card>
          </Col>
    </Row>


    {addModal && 
        <AddServerModal
          item={item} 
          addModal={addModal} 
          type={params?.type}
          setShouldUpdate={setShouldUpdate}
          setAddModal={()=> setAddModal(false)}
    />}

    </Fragment>
  );
};

export default Server;