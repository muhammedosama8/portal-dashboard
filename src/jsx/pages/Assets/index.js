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
import AssetsService from "../../../services/AssetsService";
import AddAssetsModal from "./AddAssetsModal";

const Assets = () => {
    const [data, setData] = useState([])
    const [addModal, setAddModal] = useState(false)
    const [item, setItem] = useState({})
    const [hasData, setHasData] = useState(0)
    const [search, setSearch] = useState(null)
    const [loading, setLoading] = useState(false)
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const lang = useSelector(state=> state.auth?.lang)
    const assetsService = new AssetsService()

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
              style={{position: 'absolute',zIndex:'99', right: lang === 'en' && '16px', left: lang === 'ar' && '16px', top: '50%', transform: 'translate(0, -50%)'}}
            ></div>
          </div>
          <div>
            <Button variant="primary" className='me-2 h-75' onClick={()=> { 
              setItem({})
              setAddModal(true) 
            }}>
              <i className="la la-plus mx-1"></i>
              {Translate[lang]?.add} {Translate[lang]?.assets}
            </Button>
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
                      <strong>{Translate[lang]?.start_date}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.salary}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.assets}</strong>
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
              </Table>}
              {hasData === 0 && <NoData />}
              {/* <Pagination
                  setData={setData}
                  service={AssetsService}
                  shouldUpdate={shouldUpdate}
                  setHasData={setHasData}
                  setLoading={setLoading}
                  search={search}
              /> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {addModal && 
        <AddAssetsModal
          item={item} 
          addModal={addModal} 
          setShouldUpdate={setShouldUpdate}
          setAddModal={()=> setAddModal(false)}
      />}

    </Fragment>
  );
};

export default Assets;