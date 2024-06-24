import React, { Fragment } from "react";
import { useState } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
} from "react-bootstrap";
import Select from "react-select";
import { useSelector } from "react-redux";
import Loader from "../../common/Loader";
import NoData from "../../common/NoData";
import Pagination from "../../common/Pagination/Pagination";
import { Translate } from "../../Enums/Tranlate";
import CardItem from "./CardItem";
import './style.scss'
import PaymentModal from "./PaymentModal";
import ProjectsPaymentService from "../../../services/ProjectsPaymentService";

const Payment = () => {
    const [paymentOptions, setPaymentOptions] = useState([
      {label: 'One Payment', value: 'one'},
      {label: 'Two Payment', value: 'two'},
      {label: 'Three Payment', value: 'three'},
      {label: 'Four Payment', value: 'four'},
    ])
    const [data, setData] = useState([
      {id: 1, project_name: 'test', price: '123', client_name: 'mu', client_phone: '435235', payment: 'one'},
      {id: 2, project_name: 'any', price: '345', client_name: 'os', client_phone: '342', payment: 'two'},
      {id: 3, project_name: 'data', price: '657', client_name: 'fa', client_phone: '536', payment: 'three'},
      {id: 4, project_name: 'pro', price: '134', client_name: 'na', client_phone: '234', payment: 'four'},
      {id: 5, project_name: 'pro4', price: '134', client_name: 'na', client_phone: '234', payment: ''},
    ])
    const [addModal, setAddModal] = useState(false)
    const [paymentSelected, setPaymentSelected] = useState('')
    const [item, setItem] = useState({})
    const [hasData, setHasData] = useState(1)
    const [search, setSearch] = useState(null)
    const [loading, setLoading] = useState(false)
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const lang = useSelector(state=> state.auth?.lang)
    const projectsService = new ProjectsPaymentService()

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
          <div className="w-25">
            <Select
                placeholder={Translate[lang]?.select}
                options={paymentOptions}
                value={paymentSelected}
                onChange={(e) => setPaymentSelected(e)}
            />
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
                      <strong>{Translate[lang]?.project_name}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.price}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.client_name}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.client_phone}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.payment_method}</strong>
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
                            setAddModal={setAddModal}
                            setShouldUpdate={setShouldUpdate}
                        />
                    })}
                </tbody>
              </Table>}
              {hasData === 0 && <NoData />}
              <Pagination
                  setData={setData}
                  service={projectsService}
                  shouldUpdate={shouldUpdate}
                  setHasData={setHasData}
                  setLoading={setLoading}
                  search={search}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {addModal && 
        <PaymentModal
          item={item} 
          addModal={addModal} 
          setShouldUpdate={setShouldUpdate}
          setAddModal={()=> setAddModal(false)}
      />}

    </Fragment>
  );
};

export default Payment;
