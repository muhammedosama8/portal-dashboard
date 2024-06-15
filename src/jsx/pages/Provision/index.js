import React, { Fragment } from "react";
import { useState } from "react";
import {
  Row,
  Col,
  Card,
  Table
} from "react-bootstrap";
import { useSelector } from "react-redux";
import Loader from "../../common/Loader";
import NoData from "../../common/NoData";
import Pagination from "../../common/Pagination/Pagination";
import { Translate } from "../../Enums/Tranlate";
import CardItem from "./CardItem";
import './style.scss'
import VacationsService from "../../../services/VacationsService";
import IndemnityCardItem from "./IndemnityCardItem";
import ProvisionService from "../../../services/ProvisionService";

const Provision = () => {
  const tabs = ["provision", "indemnity"]
    const [data, setData] = useState([])
    const [selectTab, setSelectTab] = useState('provision')
    const [hasData, setHasData] = useState(null)
    const [search, setSearch] = useState(null)
    const [loading, setLoading] = useState(false)
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const lang = useSelector(state=> state.auth?.lang)
    const vacationsService = new VacationsService()

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
        </Card.Body >
      </Card>
      <Card className="mb-3">
        <Card.Body className="d-flex  p-3 align-items-center">
            {tabs?.map((tab,index)=>{
                  return <p
                  key={index}
                  className='mb-0 mx-3  cursor-pointer'
                  style={{
                    color: tab === selectTab ? "var(--primary)" : "#7E7E7E",
                    borderBottom: tab === selectTab ? "2px solid" : "none",
                  }}
                  onClick={() => {
                    setSelectTab(tab)
                    setHasData(null)
                  }}
                >
                  {Translate[lang][tab]}
                  </p>
              })}
        </Card.Body >
      </Card>
      
      {selectTab === 'provision' && <Row>
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
                      <strong>{Translate[lang]?.employee_name}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.job_title}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.department}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.accrued_leave}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.provision} KWD</strong>
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
                        />
                    })}
                </tbody>
              </Table>}
              {hasData === 0 && <NoData />}
              <Pagination
                  setData={setData}
                  service={new ProvisionService()}
                  shouldUpdate={shouldUpdate}
                  setHasData={setHasData}
                  setLoading={setLoading}
                  search={search}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>}
      {selectTab === 'indemnity' && <Row>
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
                      <strong>{Translate[lang]?.employee_name}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.job_title}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.department}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang].departure_day}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.return_day}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.reason}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.number_of_days}</strong>
                    </th>
                    <th></th>
                  </tr>
                </thead>

                <tbody className="table-body">
                    {data?.map((item, index) =>{
                        return <IndemnityCardItem
                            index= {index}
                            key= {index}
                            item={item}
                        />
                    })}
                </tbody>
              </Table>}
              {hasData === 0 && <NoData />}
              {/* <Pagination
                  setData={setData}
                  service={new OnVacationsService()}
                  shouldUpdate={shouldUpdate}
                  setHasData={setHasData}
                  setLoading={setLoading}
                  search={search}
              /> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>}

    </Fragment>
  );
};

export default Provision;
