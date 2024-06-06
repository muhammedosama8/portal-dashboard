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
import AddLeadsModal from "./AddLeadsModal";
import MonthDropDown, { months } from "../../Enums/MonthDropDown";
import YearDropDown from "../../Enums/YearDropDown";
import print from "../../Enums/Print";
import LeadService from "../../../services/LeadService";

const Leads = () => {
    const [data, setData] = useState([])
    const [addModal, setAddModal] = useState(false)
    const [item, setItem] = useState({})
    const [editStatus, setEditStatus] = useState(false)
    const [hasData, setHasData] = useState(1)
    const [search, setSearch] = useState(null)
    const [loading, setLoading] = useState(false)
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const Auth = useSelector(state=> state.auth?.auth)
    const lang = useSelector(state=> state.auth?.lang)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const [params, setParams] = useState({
      month: {
        label: Translate[lang][months[new Date().getMonth()].toLocaleLowerCase()],
        value: months[new Date().getMonth()]
    } , year: {
      label: `${new Date().getFullYear()}`,
      value: new Date().getFullYear()
    }
    })
    const leadService = new LeadService()

    const changeParams = (e, name) => {
      setParams({...params, [name]: e})
      setShouldUpdate(prev=> !prev)
    } 

    const getAll = () =>{
      setLoading(true)
      leadService.getList()?.then(res=>{
        if(res?.status === 200){
          setData(res?.data?.data?.data)
          if(res?.data?.data?.data?.length){
            setHasData(1)
          } else{
            setHasData(0)
          }
          setParams({
            month: '',
            year: ''
          })
        }
        setLoading(false)
      }).catch(()=>setLoading(false))
    }

    const printProjects = () => {
      print(
        Translate[lang]?.leads,
        [ "id", 
          Translate[lang]?.lead_name, 
          Translate[lang]?.client_name, 
          Translate[lang]?.client_phone, 
          Translate[lang]?.client_email, 
          Translate[lang]?.reference,
          Translate[lang]?.status
        ],
        lang,
        data.map(item => {
          return {
            id: item.id,
            name: item.lead_name,
            client_name: item.client_name,
            client_phone: item.client_phone,
            client_email: item.client_email,
            reference: item.reference,
            status: item.status,
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
            {isExist('view_leads') && <Button 
              variant='secondary' 
              className='mx-2 h-75'
              onClick={printProjects}
            >
              {Translate[lang].print}
            </Button>}
            {isExist('add_leads') && <Button variant="primary" className='me-2 h-75' onClick={()=> { 
              setItem({})
              setAddModal(true) 
            }}>
              <i className="la la-plus mx-1"></i>
              {Translate[lang]?.add} {Translate[lang]?.leads}
            </Button>}
          </div>
        </Card.Body >
      </Card>
      
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Body className={`${hasData === 0 && 'text-center'} `}>
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
                <Col md={2} sm={5}>
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
                      <strong>{Translate[lang]?.attachments}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.status}</strong>
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
                            setEditStatus={setEditStatus}
                        />
                    })}
                </tbody>
              </Table>}
              {hasData === 0 && <NoData />}
              <Pagination
                  setData={setData}
                  service={leadService}
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
        <AddLeadsModal
          item={item} 
          addModal={addModal} 
          setShouldUpdate={setShouldUpdate}
          setAddModal={()=> setAddModal(false)}
          editStatus={editStatus}
      />}

    </Fragment>
  );
};

export default Leads;
