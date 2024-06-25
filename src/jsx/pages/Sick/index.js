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
import AddVacationsModal from "./AddSickModal";
import SickService from "../../../services/SickService";
import IsSickCardItem from "./IsSickCardItem";
import IsSickService from "../../../services/IsSickService";
import SickHistoryCardItem from "./SickHistoryCardItem";
import SickHistoryService from "../../../services/SickHistoryService";

const Sick = () => {
  const tabs = ["sick_leave", "is_sick", "sick_history"]
    const [data, setData] = useState([])
    const [modal, setModal] = useState(false)
    const [selectTab, setSelectTab] = useState('sick_leave')
    const [item, setItem] = useState({})
    const [hasData, setHasData] = useState(null)
    const [search, setSearch] = useState(null)
    const [loading, setLoading] = useState(false)
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const lang = useSelector(state=> state.auth?.lang)
    const Auth = useSelector((state) => state.auth?.auth);
    const isExist = (data) => Auth?.admin?.admin_roles?.includes(data);
    const sickService = new SickService()

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
            {isExist("add_sick") && <Button variant="primary" className='me-2 h-75' onClick={()=> { 
              setItem({})
              setModal(true) 
            }}>
                {Translate[lang]?.add} {Translate[lang]?.sick} 
            </Button>}
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
      
      {selectTab === 'sick_leave' && <Row>
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
                      <strong>{Translate[lang]?.sick_leave}</strong>
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
                            setModal={setModal}
                            setShouldUpdate={setShouldUpdate}
                        />
                    })}
                </tbody>
              </Table>}
              {hasData === 0 && <NoData />}
              <Pagination
                  setData={setData}
                  service={sickService}
                  shouldUpdate={shouldUpdate}
                  setHasData={setHasData}
                  setLoading={setLoading}
                  search={search}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>}
      {selectTab === 'is_sick' && <Row>
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
                  </tr>
                </thead>

                <tbody className="table-body">
                    {data?.map((item, index) =>{
                        return <IsSickCardItem
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
              <Pagination
                  setData={setData}
                  service={new IsSickService()}
                  shouldUpdate={shouldUpdate}
                  setHasData={setHasData}
                  setLoading={setLoading}
                  search={search}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>}
      {selectTab === 'sick_history' && <Row>
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
                  </tr>
                </thead>

                <tbody className="table-body">
                    {data?.map((item, index) =>{
                        return <SickHistoryCardItem
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
                  service={new SickHistoryService()}
                  shouldUpdate={shouldUpdate}
                  setHasData={setHasData}
                  setLoading={setLoading}
                  search={search}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>}

      {modal && 
        <AddVacationsModal
          modal={modal} 
          item={item}
          setShouldUpdate={setShouldUpdate}
          setModal={()=> setModal(false)}
      />}

    </Fragment>
  );
};

export default Sick;
