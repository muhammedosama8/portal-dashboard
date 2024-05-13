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

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const Salaries = () => {
    const [data, setData] = useState([
      {id: 1, employee_name: 'os', salary: '123'},
      {id: 2, employee_name: 'df', salary: '123'},
    ])
    const lang = useSelector(state=> state.auth?.lang)
    const [params, setParams] = useState({
      month: {
        label: Translate[lang][months[new Date().getMonth()].toLocaleLowerCase()],
        value: months[new Date().getMonth()].toLocaleLowerCase()
    },
      year: {
        label: `${new Date().getFullYear()}`,
        value: new Date().getFullYear()
      }
    })
    const [modal, setModal] = useState(false)
    const [item, setItem] = useState({})
    const [hasData, setHasData] = useState(1)
    const [search, setSearch] = useState(null)
    const [loading, setLoading] = useState(false)
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const salariesService = new SalariesService()
    const Auth = useSelector((state) => state.auth?.auth);
    const isExist = (data) => Auth?.admin?.admin_roles?.includes(data);

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
            <Button variant="secondary mx-2">{Translate[lang].print}</Button>
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
                      <strong>{Translate[lang]?.employee_name}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.salary}</strong>
                    </th>
                    {/* <th></th> */}
                  </tr>
                </thead>

                <tbody className="table-body">
                    {data?.map((item, index) =>{
                        return <CardItem 
                            index= {index}
                            key= {index}
                            item={item}
                            setItem={setItem}
                            setModal={setModal}
                            setShouldUpdate={setShouldUpdate}
                        />
                    })}
                </tbody>
              </Table>}
              {hasData === 0 && <NoData />}
              {/* <Pagination
                  setData={setData}
                  service={SalariesService}
                  shouldUpdate={shouldUpdate}
                  setHasData={setHasData}
                  setLoading={setLoading}
                  search={search}
                  params={params}
              /> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {modal && 
        <TotalSalariesModal
          modal={modal} 
          setShouldUpdate={setShouldUpdate}
          setModal={()=> setModal(false)}
      />}

    </Fragment>
  );
};

export default Salaries;
