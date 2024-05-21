import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Select from "react-select";
import uploadImg from '../../../../images/upload-img.png';
import ProjectsService from "../../../../services/ProjectsService";
import { Translate } from "../../../Enums/Tranlate";

import BaseService from "../../../../services/BaseService";
import Loader from "../../../common/Loader";

const AddLeadsModal = ({addModal, setAddModal, item, setShouldUpdate})=>{
    const [formData, setFormData] = useState({
        name: '',
        client_name: "",
        client_phone: "",
        reference: "",
        document: "",
    })
    const [isAdd, setIsAdd] = useState(false)
    const [loading, setLoading] = useState(false)
    const [departmentOptions, setDepartmentOptions] = useState([])
    const projectsService = new ProjectsService()
    const lang = useSelector(state=> state.auth.lang)

    useEffect(() => {
        if(Object.keys(item)?.length === 0){
            setIsAdd(true)
        } else {
            setIsAdd(false)
            // setFormData({
            //     id: item?.id,
            //     name: item?.name,
            //     department: item.department,
            //     price: item?.price,
            //     works_day: item?.works_day,
            //     maintaince: item?.maintaince
            // })
        }
    },[item])

    const submit = (e) =>{
        e.preventDefault();
        // let data ={ 
        //     item_no: formData?.item_no,
        //     name: formData?.name,
        //     price: formData?.price,
        //     code: formData?.code,
        //     barcode: formData?.barcode,
        //     image: formData?.image
        // }

        // if(isAdd){
        //     projectsService.create(data)?.then(res=>{
        //         if(res && res?.status === 201){
        //             toast.success('Product Added Successfully')
        //             setShouldUpdate(prev=> !prev)
        //             setAddModal()
        //         }
        //     })
        // } else {
        //     projectsService.update(formData?.id, data)?.then(res=>{
        //         if(res && res?.status === 200){
        //             toast.success('Product Updated Successfully')
        //             setShouldUpdate(prev=> !prev)
        //             setAddModal()
        //         }
        //     })
        // }
    }

    const fileHandler = (e) => {
        let files = e.target.files
        const filesData = Object.values(files)

        if (filesData?.length) {
            new BaseService().postUpload(filesData[0]).then(res=>{
                if(res?.status === 200){
                    setFormData({...formData, document: res?.data?.url })
                }
            })
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
            <Modal.Title>{isAdd ? Translate[lang]?.add : Translate[lang]?.edit} {Translate[lang]?.leads}</Modal.Title>
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
                    <Row>
                        <Col md={6}>
                            <AvField
                                label={Translate[lang]?.name}
                                type='text'
                                placeholder={Translate[lang]?.name}
                                bsSize="lg"
                                name='name'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                                    <div className="avatar-edit">
                                        <input type="file" accept=".pdf" onChange={(e) => fileHandler(e)} id={`imageUpload1`} /> 					
                                        <label htmlFor={`imageUpload1`}  name=''></label>
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
                    </Row>
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