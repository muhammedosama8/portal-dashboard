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
import DeductionService from "../../../services/DeductionService";
import AddDeductionModal from "./AddDeductionModal";
import MonthDropDown, { months } from "../../Enums/MonthDropDown";
import YearDropDown from "../../Enums/YearDropDown";
import print from "../../Enums/Print";

const Deduction = () => {
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
    const [item, setItem] = useState({})
    const [hasData, setHasData] = useState(null)
    const [search, setSearch] = useState(null)
    const [loading, setLoading] = useState(false)
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const Auth = useSelector((state) => state.auth?.auth);
    const isExist = (data) => Auth?.admin?.admin_roles?.includes(data);
    const deductionService = new DeductionService()

    const changeParams = (e, name) => {
      setParams({...params, [name]: e})
      setShouldUpdate(prev=> !prev)
    } 

    const printProjects = () => {
      setLoading(true)
      deductionService.getList({
        month: params.month.value,
        year: params.year.value,
      }).then(res=>{
        if(res?.status === 200){
          print(
            Translate[lang]?.deduction,
            [ "id", 
              Translate[lang]?.employee_name, 
              Translate[lang]?.deduction
            ],
            lang,
            res?.data?.data?.data.map(item => {
              return {
                id: item.id,
                name: item.employee.name,
                salary: item.deduction,
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
            <Button variant="secondary" className='mx-2 h-75' onClick={printProjects}>
                {Translate[lang]?.print}
            </Button>
            {isExist("add_deduction") && <Button variant="primary" className='h-75' onClick={()=> { 
              setItem({})
              setModal(true) 
            }}>
                {Translate[lang]?.add} {Translate[lang]?.deduction} 
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
                      <strong>{Translate[lang]?.employee_name}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.deduction}</strong>
                    </th>
                    {/* <th>
                      <strong>{Translate[lang]?.total_salary}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.salary} {Translate[lang]?.after} {Translate[lang]?.deduction}</strong>
                    </th> */}
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
                            setAddModal={setModal}
                            setShouldUpdate={setShouldUpdate}
                        />
                    })}
                </tbody>
              </Table>}
              {hasData === 0 && <NoData />}
              <Pagination
                  setData={setData}
                  service={deductionService}
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
        <AddDeductionModal
          modal={modal} 
          item={item}
          setShouldUpdate={setShouldUpdate}
          setModal={()=> setModal(false)}
      />}

    </Fragment>
  );
};

export default Deduction;
