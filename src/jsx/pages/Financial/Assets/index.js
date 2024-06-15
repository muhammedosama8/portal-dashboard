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
import './style.scss'
import AssetsService from "../../../../services/AssetsService";
import AddAssetsModal from "./AddAssetsModal";
import print from "../../../Enums/Print";

const Assets = () => {
    const [data, setData] = useState([])
    const [addModal, setAddModal] = useState(false)
    const [view, setView] = useState(false)
    const [item, setItem] = useState({})
    const [hasData, setHasData] = useState(null)
    const [search, setSearch] = useState(null)
    const [loading, setLoading] = useState(false)
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const lang = useSelector(state=> state.auth?.lang)
    const assetsService = new AssetsService()

    const printProjects = () => {
      setLoading(true)
      assetsService.getList().then(res=>{
        if(res?.status === 200){
          print(
            Translate[lang]?.custody,
            [ "id", 
              Translate[lang]?.name, 
              Translate[lang]?.serial_number,
              Translate[lang]?.items,
            ],
            lang,
            res?.data?.data?.data.map(item => {
              return {
                id: item.id,
                name: item.name,
                serial_number: item.serial_number || '-',
                item: !!item.asset_items?.length ? item.asset_items?.map(res=> res.item) : '-',
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
            <Button variant="primary" className='h-75' onClick={()=> { 
              setItem({})
              setAddModal(true) 
            }}>
              <i className="la la-plus mx-1"></i>
              {Translate[lang]?.add} {Translate[lang]?.custody}
            </Button>
          </div>
        </Card.Body >
      </Card>
      
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Body>
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
                      <strong>{Translate[lang]?.serial_number}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.items}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.view}</strong>
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
                            setView={setView}
                            setItem={setItem}
                            setAddModal={setAddModal}
                            setShouldUpdate={setShouldUpdate}
                        />
                    })}
                </tbody>
              </Table>}
              {(hasData === 0 && !loading) && <div className='text-center'>
                <NoData />
              </div>}
              <Pagination
                  setData={setData}
                  service={assetsService}
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
        <AddAssetsModal
          item={item} 
          addModal={addModal} 
          setShouldUpdate={setShouldUpdate}
          setAddModal={()=> {
            setAddModal(false)
            setView(false)
          }}
          view={view}
      />}

    </Fragment>
  );
};

export default Assets;