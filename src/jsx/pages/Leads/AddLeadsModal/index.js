import { useEffect, useState } from "react";
import { Button, Col, Modal, Row,Dropdown } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import uploadImg from '../../../../images/upload-img.png';
import { Translate } from "../../../Enums/Tranlate";

import BaseService from "../../../../services/BaseService";
import Loader from "../../../common/Loader";
import LeadService from "../../../../services/LeadService";

const AddLeadsModal = ({addModal, setAddModal, item, setShouldUpdate, editStatus})=>{
    const [formData, setFormData] = useState({
        lead_name: '',
        client_name: "",
        client_phone: "",
        client_email: "",
        reference: "",
        attachments: []
    })
    const [status, setStatus] = useState('')
    const [isAdd, setIsAdd] = useState(false)
    const [loading, setLoading] = useState(false)
    const leadService = new LeadService()
    const lang = useSelector(state=> state.auth.lang)

    useEffect(() => {
        if(Object.keys(item)?.length === 0){
            setIsAdd(true)
        } else {
            setIsAdd(false)
            setFormData({
                id: item?.id,
                lead_name: item?.lead_name,
                client_name: item?.client_name,
                client_phone: item?.client_phone,
                client_email: item?.client_email,
                reference: item?.reference,
                attachments: item?.lead_attachments?.map(res=> res?.url),
            })
            setStatus(item?.status)
        }
    },[item])

    const submit = (e) =>{
        e.preventDefault();
        let data ={ 
            lead_name: formData?.lead_name,
            client_name: formData?.client_name,
            client_phone: formData?.client_phone,
            client_email: formData?.client_email,
            reference: formData?.reference,
            attachments: formData?.attachments,
        }

        if(isAdd){
            leadService.create(data)?.then(res=>{
                if(res && res?.status === 201){
                    toast.success('Lead Added Successfully')
                    setShouldUpdate(prev=> !prev)
                    setAddModal()
                }
            })
        } else {
            data['status'] = status
            leadService.update(formData?.id, data)?.then(res=>{
                if(res && res?.status === 200){
                    toast.success('Lead Updated Successfully')
                    setShouldUpdate(prev=> !prev)
                    setAddModal()
                }
            })
        }
    }

    const fileHandler = (e) => {
        let files = e.target.files
        const filesData = Object.values(files)

        setLoading(true)
        if (filesData?.length) {
            new BaseService().postUpload(filesData[0]).then(res=>{
                if(res?.status === 200){
                    setFormData({...formData, attachments: [...formData?.attachments, res?.data?.url] })
                }
                setLoading(false)
            }).catch(()=> setLoading(false))
        }
    }

    return(
        <Modal className={lang === 'en' ? "en fade addProduct" : "ar fade addProduct"} style={{textAlign: lang === 'en' ? 'left' : 'right'}} show={addModal} onHide={()=>{
            setAddModal()
            }}>
                <AvForm
                    className='form-horizontal'
                    onValidSubmit={submit}>
            <Modal.Header>
            <Modal.Title>{isAdd ? Translate[lang]?.add : Translate[lang]?.edit} {Translate[lang]?.leads} {editStatus ? Translate[lang]?.status : ''}</Modal.Title>
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
            <Modal.Body>
                   {!editStatus && <Row>
                        <Col md={6}>
                            <AvField
                                label={Translate[lang]?.lead_name}
                                type='text'
                                placeholder={Translate[lang]?.lead_name}
                                bsSize="lg"
                                name='lead_name'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.lead_name}
                                onChange={(e) => setFormData({...formData, lead_name: e.target.value})}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label={Translate[lang]?.client_name}
                                type='text'
                                placeholder={Translate[lang]?.client_name}
                                bsSize="lg"
                                name='client_name'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.client_name}
                                onChange={(e) => setFormData({...formData, client_name: e.target.value})}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label={Translate[lang]?.client_phone}
                                type='text'
                                placeholder={Translate[lang]?.client_phone}
                                bsSize="lg"
                                name='client_phone'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.client_phone}
                                onChange={(e) => setFormData({...formData, client_phone: e.target.value})}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label={Translate[lang]?.client_email}
                                type='text'
                                placeholder={Translate[lang]?.client_email}
                                bsSize="lg"
                                name='client_email'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.client_email}
                                onChange={(e) => setFormData({...formData, client_email: e.target.value})}
                            />
                        </Col>
                        <Col md={12}>
                            <AvField
                                label={Translate[lang]?.reference}
                                type='text'
                                placeholder={Translate[lang]?.reference}
                                bsSize="lg"
                                name='reference'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.reference}
                                onChange={(e) => setFormData({...formData, reference: e.target.value})}
                            />
                        </Col>
                        <Col md={12} className='mt-3'>
                            <div className='form-group w-100'>
                                <label className="m-0">{Translate[lang]?.attachments}</label>
                                <div className="image-placeholder">	
                                    <div className="avatar-edit h-100">
                                        <input 
                                            type="file" 
                                            accept=".pdf" 
                                            onChange={(e) => fileHandler(e)} 
                                            style={{opacity: '0'}}
                                            className='d-block w-100 h-100 cursor-pointer'
                                            value=''
                                            // id={`imageUpload1`} 
                                        /> 					
                                        {/* <label htmlFor={`imageUpload1`}  name=''></label> */}
                                    </div>
                                    <div className="avatar-preview2 m-auto">
                                        <div id={`imagePreview`}>
                                        {!loading && 
                                            <img  
                                                src={uploadImg} alt='icon'
                                                style={{
                                                    width: '80px', height: '80px',
                                                }}
                                            />}
                                        {loading && <Loader />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        {!!formData?.attachments?.length && formData?.attachments?.map((att, index)=>{
                            return <Col md={2} key={index}>
                                <div>
                                    <i 
                                        className="la la-trash text-danger position-absolute cursor-pointer" 
                                        style={{top: '-9px'}}
                                        onClick={()=> {
                                            let update = formData.attachments?.filter((_, ind)=> index !== ind)
                                            setFormData({...formData, attachments: update})
                                        }}
                                    ></i>
                                    <a href={att} target='_blank' rel='noreferrer'>
                                        <i className="la la-file-pdf" style={{fontSize: '5rem'}}></i>
                                    </a>
                                </div>
                            </Col>
                        })}
                    </Row>}
                    {editStatus && <Row>
                        <Col md={6}>
                        <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{textTransform: 'capitalize'}}>
                            {' '}{status}{' '}{' '}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={()=> setStatus('new')}>New</Dropdown.Item>
                            <Dropdown.Item onClick={()=> setStatus('on Progress')}>On Progress</Dropdown.Item>
                            <Dropdown.Item onClick={()=> setStatus('success')}>Success</Dropdown.Item>
                            <Dropdown.Item onClick={()=> setStatus('closed')}>Closed</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                        </Col>
                        </Row>}
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={setAddModal} variant="danger light">
            {Translate[lang]?.close}
            </Button>
            <Button 
                    variant="primary" 
                    type='submit'
                    disabled={loading}
                >{isAdd ? Translate[lang]?.add : Translate[lang]?.edit}</Button>
            </Modal.Footer>
            </AvForm>
        </Modal>)
}

export default AddLeadsModal;