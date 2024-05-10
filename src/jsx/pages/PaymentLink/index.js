import { AvField, AvForm } from "availity-reactstrap-validation";
import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
// import AdminBuyService from "../../../services/AdminBuyService";
// import CountryiesService from "../../../services/CountriesService";
import Select from 'react-select';
import Loader from "../../common/Loader";
import NoData from "../../common/NoData";
import Pagination from "../../common/Pagination/Pagination";
import { Translate } from "../../Enums/Tranlate";
import CardItem from "./CardItem";

const PaymentLink = () => {
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    total_price: '',
    client_name: "",
    country_code: "",
    phone: "",
    paymentType: ""
  });
  const [countriesOptions, setCountriesOptions] = useState([])
  const [typesOptions, setTypesOptions] = useState([])
  // const adminBuyService = new AdminBuyService();
  // const countryiesService = new CountryiesService()
  const lang = useSelector((state) => state.auth.lang);

  useEffect(()=>{
  //   countryiesService?.getList().then(res=>{
  //     if(res && res?.status === 200){
  //        let data = res.data.data?.map(item=>{
  //           return{
  //              label: `${lang === 'en' ? item.name_en : item.name_ar} (${item?.country_code || ''})`,
  //              name_en: item.name_en,
  //              country_code: item?.country_code,
  //              type: item.type
  //           }
  //        })
  //        setCountriesOptions(data)
  //     }
  //  })
  },[])

  useEffect(()=>{
    setTypesOptions([
      {label: "Knet", value: 'knet'},
      {label: 'CC', value: 'cc'},
      {label: 'Samsung Pay', value: 'samsung-pay'},
      {label: 'Apple Pay', value: 'apple-pay'},
      {label: 'Google Pay', value: 'google-pay'},
    ])
  }, [])

  const submit = () => {
    let data = { 
      ...formData ,
      country_code: formData.country_code.country_code,
      total_price: Number(formData.total_price),
      paymentType: formData?.paymentType?.value
    };
    setLoading(true);
    // adminBuyService.create(data).then((res) => {
    //   if (res?.status === 201) {
    //     setUrl(res?.data?.data);
    //   }
    //   setLoading(false);
    // });
  };

  const CopyToClipboardButton = ({ text }) => {
    const textAreaRef = useRef(null);

    const handleCopyClick = () => {
      if (textAreaRef.current) {
        textAreaRef.current.select();
        document.execCommand("copy");
        setCopied(true);
      }
    };

    return (
      <div>
        <textarea
          ref={textAreaRef}
          value={text}
          style={{ position: "absolute", left: "-9999px" }}
          readOnly
        />
        <Button
          variant={copied ? "secondary" : `outline-secondary`}
          onClick={handleCopyClick}
        >
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
    );
  };

  const handleFormData = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  return (<>
    <Card>
      <Card.Body>
        <AvForm onValidSubmit={submit}>
          <Row>
            <Col lg={4} md={6} >
              <AvField
                label={`${Translate[lang]?.client_name}`}
                type="text"
                placeholder={Translate[lang]?.client_name}
                value={formData.client_name}
                name="client_name"
                validate={{
                  required: {
                    value: true,
                    errorMessage: Translate[lang].field_required,
                  },
                }}
                onChange={(e) => handleFormData(e)}
              />
            </Col>
            <Col lg={3} md={6}>
              <AvField
                label={`${Translate[lang]?.phone}`}
                type="number"
                placeholder={Translate[lang]?.phone}
                value={formData.phone}
                name="phone"
                validate={{
                  required: {
                    value: true,
                    errorMessage: Translate[lang].field_required,
                  },
                }}
                onChange={(e) => handleFormData(e)}
              />
            </Col>
            {/* <Col md={3}>
              <label className="text-label">{Translate[lang]?.country_code}</label>
                  <Select
                     value={formData?.country_code}
                     name="country_code"
                     placeholder={Translate[lang]?.select}
                     options={countriesOptions}
                     onChange={(e)=> setFormData({...formData, country_code: e})}
                  />
            </Col> */}
            <Col lg={2} md={6}>
              <AvField
                label={`${Translate[lang]?.price}`}
                type="number"
                placeholder={Translate[lang]?.price}
                value={formData.total_price}
                name="total_price"
                min="0.0000000000001"
                validate={{
                  required: {
                    value: true,
                    errorMessage: Translate[lang].field_required,
                  },
                }}
                onChange={(e) => handleFormData(e)}
              />
            </Col>
            <Col lg={3} md={6}>
              <label className="text-label">{Translate[lang]?.type}</label>
                  <Select
                     value={formData?.paymentType}
                     name="paymentType"
                     placeholder={Translate[lang]?.select}
                     options={typesOptions}
                     onChange={(e)=> setFormData({...formData, paymentType: e})}
                  />
            </Col>
            <Col lg={12} md={6}>
              <Button
                variant="primary"
                loading={loading}
                type="submit"
                style={{ marginTop: "1rem" }}
              >
                {Translate[lang]?.create} {Translate[lang]?.payment_link}
              </Button>
            </Col>
          </Row>
          {url && (
            <Row
              style={{
                marginTop: "4rem",
                padding: "2rem 0",
                boxShadow: "0 0 5px #dedede",
                borderRadius: "8px",
                direction: "ltr",
                flexDirection: "row-reverse",
              }}
            >
              <Col md={2}>
                <CopyToClipboardButton text={url} />
              </Col>
              <Col md={10}>
                <p className="m-0" style={{ textAlign: "left" }}>
                  {url}
                </p>
              </Col>
            </Row>
          )}
        </AvForm>
      </Card.Body>
    </Card>
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
                      <strong>{Translate[lang]?.customer_name}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.phone}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.total_price}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.track_id}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.tran_id}</strong>
                    </th>
                  </tr>
                </thead>

                <tbody className="table-body">
                    {data?.map((item, index) =>{
                        return <CardItem
                            index= {index}
                            key= {index}
                            item={item}
                            setShouldUpdate={setShouldUpdate}
                        />
                    })}
                </tbody>
              </Table>}
              {hasData === 0 && <NoData />}
              {/* <Pagination
                  setData={setData}
                  service={adminBuyService}
                  shouldUpdate={shouldUpdate}
                  setHasData={setHasData}
                  setLoading={setLoading}
              /> */}
            </Card.Body>
    </Card>
    </>
  );
};

export default PaymentLink;
