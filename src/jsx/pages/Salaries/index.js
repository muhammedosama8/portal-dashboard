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
import SalariesService from "../../../services/SalariesService";
import TotalSalariesModal from "./TotalSalariesModal";
import MonthDropDown, { months } from "../../Enums/MonthDropDown";
import YearDropDown from "../../Enums/YearDropDown";
import print from "../../Enums/Print";

const Salaries = () => {
    const [data, setData] = useState([])
    const lang = useSelector(state=> state.auth?.lang)
    const [params, setParams] = useState({
      month: {
        label: Translate[lang][months[new Date().getMonth()].toLocaleLowerCase()],
        value: months[new Date().getMonth()]
    },
      year: {
        label: `${new Date().getFullYear()}`,
        value: new Date().getFullYear()
      }
    })
    const [modal, setModal] = useState(false)
    const [hasData, setHasData] = useState(1)
    const [search, setSearch] = useState(null)
    const [loading, setLoading] = useState(false)
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const salariesService = new SalariesService()
    const Auth = useSelector((state) => state.auth?.auth);
    const isExist = (data) => Auth?.admin?.admin_roles?.includes(data);

    const changeParams = (e, name) => {
      setParams({...params, [name]: e})
      setShouldUpdate(prev=> !prev)
    } 

    const printProjects = () => {
      setLoading(true)
      salariesService.getList({
        month: params.month.value,
        year: params.year.value,
      }).then(res=>{
        if(res?.status === 200){
          if(res?.data?.data?.data?.length === 0){
            setLoading(false)
            return
          }
          print(
            Translate[lang]?.salary,
            [ "id", 
              Translate[lang]?.employee_name, 
              Translate[lang]?.salary,
              Translate[lang]?.payroll_salary
            ],
            lang,
            res?.data?.data?.data.map(item => {
              return {
                id: item.id,
                name: item.name,
                salary: Number.parseFloat(item.salary).toFixed(3),
                payroll_salary: Number.parseFloat(item.salary_after_deduction).toFixed(3)
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
            <Button variant="secondary mx-2" onClick={printProjects}>{Translate[lang].print}</Button>
            {isExist("total_salaries") && <Button variant="primary" className='me-2 h-75' onClick={()=> { 
              setModal(true) 
            }}>
                {Translate[lang]?.total_salaries}
            </Button>}
          </div>
        </Card.Body >
      </Card>
      
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Body>
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
                      <strong>{Translate[lang]?.employee_name}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.salary}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.payroll_salary}</strong>
                    </th>
                    <th>
                    <strong>{Translate[lang]?.view}</strong>
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
              </Table>
              </>}
              {hasData === 0 && <div className='text-center'> 
                <NoData />
              </div>}
              <Pagination
                  setData={setData}
                  service={salariesService}
                  shouldUpdate={shouldUpdate}
                  setHasData={setHasData}
                  setLoading={setLoading}
                  search={search}
                  param={{
                    month: params.month.value,
                    year: params.year.value
                  }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {modal && 
        <TotalSalariesModal
          modal={modal} 
          setShouldUpdate={setShouldUpdate}
          setModal={()=> setModal(false)}
          params={{
            month: params.month.value,
            year: params.year.value
          }}
      />}

    </Fragment>
  );
};

export default Salaries;
