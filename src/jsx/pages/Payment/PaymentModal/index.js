import { useEffect, useState } from "react";
import { Button, Col, Modal, Row, Form } from "react-bootstrap"
import { AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Select from "react-select";
import uploadImg from '../../../../images/upload-img.png';
import { Translate } from "../../../Enums/Tranlate";

import BaseService from "../../../../services/BaseService";
import Loader from "../../../common/Loader";
import ProjectsPaymentService from "../../../../services/ProjectsPaymentService";

const PaymentModal = ({addModal, setAddModal, item, setShouldUpdate})=>{
    const paymentOptions = [
        {label: 'Full Payment', value: 'full', num: 1},
        {label: 'Two Payment', value: 'two', num: 2},
        {label: 'Three Payment', value: 'three', num: 3},
        {label: 'Four Payment', value: 'four', num: 4},
    ]
    const [formData, setFormData] = useState({
        payment: '',
        status: []
    })
    const [loading, setLoading] = useState(false)
    const [load, setLoad] = useState(false)
    const [update, setUpdate] = useState(false)
    const [invoices, setInvoices] = useState([])
    const [invoice, setInvoice] = useState('')
    const projectsService = new ProjectsPaymentService()
    const lang = useSelector(state=> state.auth.lang)
    
    useEffect(()=>{
        setLoad(true)
        projectsService?.getProjectPayment(item?.id).then(res=>{
            if(res?.status === 200){
                setInvoices(res?.data?.data)
            }
            setLoad(false)
        })
    },[update])

    useEffect(() => {
        let status = []
        let num = paymentOptions?.find(res=> res.value === item?.payment_method)?.num
        if(num !== 3){
            status = Array.from(
                { length: num},
                (_, index) => index + 1
            )?.map(_=>{
                return{
                    value: Number(item.price) / num,
                    status: false,
                    img: '',
                    loading: false
                }
            })
        } else{
            status = Array.from(
                { length: num},
                (_, index) => index + 1
            )?.map((_, ind)=>{
                let per = ind=== 0 ? 2 : 4
                return{
                    value: Number(item.price) / per,
                    status: false,
                    img: '',
                    loading: false
                }
            })
        }
        setFormData({
            id: item?.id,
            payment: paymentOptions?.find(res=> res.value === item?.payment_method),
            status: status
        })
    },[update])

    const fileHandler = (e) => {
        let files = e.target.files
        const filesData = Object.values(files)

        if(filesData?.length === 0){
            return
        }
        if(filesData?.length) {
            setLoading(true)
            new BaseService().postUpload(filesData[0]).then(res=>{
                if(res?.status === 200){
                    setInvoice(res?.data?.url)
                }
                setLoading(false)
            })
        }
    }

    const submit = (e) =>{
        e.preventDefault();

        let data ={ 
            url: invoice
        }

        projectsService.create(item?.id, data)?.then(res=>{
            if(res?.status === 201){
                toast.success('Invoice Added Successfully')
                setUpdate(prev => !prev)
                setInvoice('')
            }
        })
    }
    
    const SubmitButtons = () => {
        return <>
            <Button onClick={setAddModal} variant="danger light">
                {Translate[lang]?.close}
            </Button>
            <Button 
                variant="primary" 
                type='submit'
                disabled={loading}
            >{Translate[lang]?.submit}</Button>
        </>
    }
    return(
        <Modal className={lang === 'en' ? "en fade addPayment" : "ar fade addPayment"} style={{textAlign: lang === 'en' ? 'left' : 'right'}} show={addModal} onHide={()=>{
            setAddModal()
            }}>
                <AvForm
                    className='form-horizontal'
                    onValidSubmit={submit}>
            <Modal.Header>
            <Modal.Title>{Translate[lang]?.payment}</Modal.Title>
            <Button
                variant=""
                className="close"
                style={{right: lang === 'en' ? '0' : 'auto', left: lang === 'ar' ? '0' : 'auto'}}
                onClick={()=>{
                    setAddModal()
                }}
                >
                <span>&times;</span>
            </Button>
            </Modal.Header>
            {load && <Modal.Body className="my-5">
                <Loader />
            </Modal.Body>}
            {!load && <Modal.Body>
                    <Row>
                        <Col md={6} className='mb-5'>
                            <label className="text-label">
                                {Translate[lang].payment}
                            </label>
                            <Select
                                placeholder={Translate[lang]?.select}
                                options={[]}
                                value={formData.payment}
                                disabled
                            />
                        </Col>
                        <Col md={6}></Col>
                    </Row>
                    {formData?.status?.map((stat, ind) => {
                            return  <Row style={{
                                borderBottom: ind !== formData?.status?.length-1 ? '1px solid #dedede' : '', 
                                paddingBottom: ind !== formData?.status?.length-1 ? '1rem' : '',
                                marginBottom: ind !== formData?.status?.length-1 ? '1rem' : '',
                            }}>
                                <Col md={10} className='d-flex justify-content-between align-items-center'>
                                    <label>{`${ind+1})`} &nbsp;&nbsp;&nbsp;  <span className="text-primary" style={{fontSize: '1.3rem'}}>{stat.value} {Translate[lang].kwd}</span></label>
                                </Col>
                                <Col md={2} className='d-flex justify-content-between align-items-center'>
                                    <Form.Check
                                        key={ind}
                                        name={`stat${ind}`}
                                        checked={invoices[ind]?.url}
                                        type="switch"
                                        id={`custom-switch${ind}`}
                                    />
                                </Col>
                                {ind === invoices.length && <Col md={3}>
                                    <div className='form-group mb-0 w-100'>
                                        <div className="image-placeholder">	
                                            <div className="avatar-edit h-100">
                                                <input 
                                                    type="file" 
                                                    onChange={(e) => fileHandler(e, ind)} 
                                                    className='w-100 h-100 d-block'  
                                                    id={`imageUpload${ind}`} 
                                                    style={{
                                                        opacity: '0',
                                                        cursor: 'pointer'
                                                    }}
                                                /> 
                                            </div>
                                            <div className="avatar-preview2 m-auto">
                                                <div id={`imagePreview`}>
                                                {(!!invoice) && 
                                                    <img src={invoice} alt='img'
                                                        style={{ width: '80px', height: '80px' }}
                                                    />}
                                                {(!invoice && !loading) && 
                                                    <img  
                                                        src={uploadImg} alt='icon'
                                                        style={{
                                                            width: '50px', height: '50px',
                                                        }}
                                                    />}
                                                    {loading && <Loader />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>}
                                {(ind !== invoices.length && invoices[ind]?.url) && <Col md={3}>
                                    <a href={invoices[ind]?.url} target='_blank' rel="noreferrer">
                                        <img src={invoices[ind]?.url} className='mt-3' width={120} height={120} alt='invoice' />
                                    </a>
                                </Col>}
                                <Col md={9}></Col>
                                {ind === invoices.length && <Col md={12} className='d-flex justify-content-between mt-3 align-items-center'>
                                    <SubmitButtons />
                                </Col>}
                            </Row>
                    })}
            </Modal.Body>}
            </AvForm>
        </Modal>)
}

export default PaymentModal;