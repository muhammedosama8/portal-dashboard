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
import '../style.scss'
import AddEmployeesModal from "../AddEmployeesModal";
import ResignationModal from "../ResignationModal";
import print from "../../../Enums/Print";
import EmployeesService from "../../../../services/EmployeesService";
import { Translate } from "../../../Enums/Tranlate";
import Pagination from "../../../common/Pagination/Pagination";
import NoData from "../../../common/NoData";
import Loader from "../../../common/Loader";

const ActiveEmployees = () => {
    const [data, setData] = useState([])
    const [addModal, setAddModal] = useState(false)
    const [resignationModal, setResignationModal] = useState(false)
    const [item, setItem] = useState({})
    const [hasData, setHasData] = useState(null)
    const [search, setSearch] = useState(null)
    const [loading, setLoading] = useState(false)
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const lang = useSelector(state=> state.auth?.lang)
    const Auth = useSelector((state) => state.auth?.auth);
    const isExist = (data) => Auth?.admin?.admin_roles?.includes(data);
    const employeesService = new EmployeesService()

    const printProjects = () => {
      setLoading(true)
      let rows = [ "id", 
        Translate[lang]?.name, 
        Translate[lang]?.civil_id,
        Translate[lang]?.job_title,
        Translate[lang]?.department,
        Translate[lang]?.personal_email,
        Translate[lang]?.company_email,
        Translate[lang]?.start_date,
        Translate[lang]?.assets,
      ]
      if(isExist("view_salaries")){
        rows.push(Translate[lang]?.salary)
      }
      employeesService.getList().then(res=>{
        if(res?.status === 200){
          print(
            Translate[lang]?.employees,
            rows,
            lang,
            res?.data?.data?.data.map(item => {
              let info = {
                id: item.id,
                name: item.name,
                civil_id: item.civil_id,
                job_title: item.job_title,
                department: item.department?.name,
                personal_email: item?.personal_email,
                company_email: item?.company_email,
                start_date: item?.start_date?.split('T')[0],
                assets: item.employee_assets?.length,
              }
              if(isExist("view_salaries")){
                info['salary'] = item.salary
              }
              return info;
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
            <Button 
              variant='secondary' 
              className='mx-2 h-75'
              onClick={printProjects}
            >
              {Translate[lang].print}
            </Button>
            {isExist("add_employees") && <Button variant="primary" className='me-2 h-75' onClick={()=> { 
              setItem({})
              setAddModal(true) 
            }}>
              <i className="la la-plus mx-1"></i>
              {Translate[lang]?.add} {Translate[lang]?.employees}
            </Button>}
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
              {(hasData === 1 && !loading) && <Table responsive>
                <thead>
                  <tr className='text-center'>
                    <th>
                      <strong>I.D</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.name}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.civil_id}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.job_title}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.department}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.personal_email}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.company_email}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.start_date}</strong>
                    </th>
                    {isExist("view_salaries") && <th>
                      <strong>{Translate[lang]?.salary}</strong>
                    </th>}
                    <th>
                      <strong>{Translate[lang]?.assets}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.attachments}</strong>
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
                            setResignationModal={setResignationModal}
                            setItem={setItem}
                            setAddModal={setAddModal}
                            setShouldUpdate={setShouldUpdate}
                        />
                    })}
                </tbody>
              </Table>}
              {hasData === 0 && <NoData />}
              <Pagination
                  setData={setData}
                  service={employeesService}
                  shouldUpdate={shouldUpdate}
                  setHasData={setHasData}
                  setLoading={setLoading}
                  search={search}
                  param={{
                    is_delete: false,
                    is_resignation: false
                  }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {addModal && 
        <AddEmployeesModal
          item={item} 
          addModal={addModal} 
          setShouldUpdate={setShouldUpdate}
          setAddModal={()=> setAddModal(false)}
      />}

      {resignationModal && 
        <ResignationModal
          item={item} 
          resignationModal={resignationModal} 
          setShouldUpdate={setShouldUpdate}
          setResignationModal={()=> setResignationModal(false)}
      />}
    </Fragment>
  );
};

export default ActiveEmployees;