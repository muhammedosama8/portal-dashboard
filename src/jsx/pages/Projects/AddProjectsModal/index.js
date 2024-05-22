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
import DepartmentService from "../../../../services/DepartmentService";

const AddProjectsModal = ({addModal, setAddModal, item, setShouldUpdate})=>{
    const maintainces = [
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'},
        {label: '5', value: '5'},
        {label: '6', value: '6'},
        {label: '7', value: '7'},
        {label: '8', value: '8'},
        {label: '9', value: '9'},
        {label: '10', value: '10'},
    ]
    const [formData, setFormData] = useState({
        name: '',
        price: "",
        department: '',
        works_day: "",
        maintaince: "",
        client_name: "",
        client_phone: "",
        client_email: "",
        client_civil_id: "",
        contract_date: "",
        contracts: [],
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
            setFormData({
                id: item?.id,
                name: item?.name,
                price: item?.price,
                department: {
                    label: item.department.name,
                    value: item.department.id,
                },
                works_day: item?.work_day,
                maintaince: {
                    label: item?.maintenance,
                    value: item?.maintenance
                },
                client_name: item.client_name,
                client_email: item.client_email,
                client_phone: item.phone,
                client_civil_id: item.client_civil_id,
                contract_date: item.contract_date.split('T')[0],
                contracts: item.project_attachments?.map(res=> res?.url)
            })
        }
    },[item])

    useEffect(()=>{
        new DepartmentService().getList().then(res=>{
            if(res?.status === 200){
                let data = res.data.data.data?.map(dep=>{
                    return{
                        label: dep.name,
                        value: dep.id
                    }
                })
                setDepartmentOptions(data)
            }
        })
    },[])

    const submit = (e) =>{
        e.preventDefault();
        let data ={ 
            name: formData.name,
            client_name: formData.client_name,
            phone: formData.client_phone,
            client_email: formData.client_email,
            client_civil_id: formData.client_civil_id,
            contract_date: formData.contract_date,
            price: formData.price,
            work_day: formData.works_day,
            maintenance: formData.maintaince.value,
            department_id: formData.department.value,
            project_attachments: formData.contracts
        }

        if(isAdd){
            projectsService.create(data)?.then(res=>{
                if(res && res?.status === 201){
                    toast.success('Project Added Successfully')
                    setShouldUpdate(prev=> !prev)
                    setAddModal()
                }
            })
        } else {
            projectsService.update(formData?.id, data)?.then(res=>{
                if(res && res?.status === 200){
                    toast.success('Project Updated Successfully')
                    setShouldUpdate(prev=> !prev)
                    setAddModal()
                }
            })
        }
    }

    const fileHandler = (e) => {
        setLoading(true)
        let files = e.target.files
        const filesData = Object.values(files)

        if (filesData?.length) {
            new BaseService().postUpload(filesData[0]).then(res=>{
                if(res?.status === 200){
                    setFormData({...formData, contracts: [res?.data?.url ]})
                }
                setLoading(false)
            }).catch(()=> setLoading(false))
        }
    }

    const deleteImg = (ind)=>{
        let update = formData.contracts?.filter((_, index)=> index !== ind)
        setFormData({...formData, contracts: [...update]})
    }

    return(
        <Modal className={lang === 'en' ? "en fade addProduct" : "ar fade addProduct"} style={{textAlign: lang === 'en' ? 'left' : 'right'}} show={addModal} onHide={()=>{
            setAddModal()
            }}>
                <AvForm
                    className='form-horizontal'
                    onValidSubmit={submit}>
            <Modal.Header>
            <Modal.Title>{isAdd ? Translate[lang]?.add : Translate[lang]?.edit} {Translate[lang]?.project}</Modal.Title>
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
                            <label className="text-label">
                                {Translate[lang].department}
                            </label>
                            <Select
                                placeholder={Translate[lang]?.select}
                                options={departmentOptions}
                                value={formData.department}
                                onChange={(e) => {
                                    setFormData({...formData, department: e});
                                }}
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
                        <Col md={6}>
                            <AvField
                                label={Translate[lang]?.client_civil_id}
                                type='text'
                                placeholder={Translate[lang]?.client_civil_id}
                                bsSize="lg"
                                name='client_civil_id'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.client_civil_id}
                                onChange={(e) => setFormData({...formData, client_civil_id: e.target.value})}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label={Translate[lang]?.contract_date}
                                type='date'
                                placeholder={Translate[lang]?.contract_date}
                                bsSize="lg"
                                name='contract_date'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.contract_date}
                                onChange={(e) => setFormData({...formData, contract_date: e.target.value})}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label={Translate[lang]?.price}
                                type='number'
                                min={0}
                                placeholder={Translate[lang]?.price}
                                bsSize="lg"
                                name='price'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.price}
                                onChange={(e) => setFormData({...formData, price: e.target.value})}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label={Translate[lang]?.works_day}
                                type='number'
                                min='0'
                                placeholder={Translate[lang]?.works_day}
                                bsSize="lg"
                                name='works_day'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.works_day}
                                onChange={(e) => setFormData({...formData, works_day: e.target.value})}
                            />
                        </Col>
                        <Col md={6}>
                            <label className="text-label">
                                {Translate[lang].maintaince}
                            </label>
                            <Select
                                placeholder={Translate[lang]?.select}
                                options={maintainces}
                                value={formData.maintaince}
                                onChange={(e) => {
                                    setFormData({...formData, maintaince: e});
                                }}
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
                        {formData.contracts?.map((contract, index)=>{
                            return <Col md={3} key={index}>
                                <div>
                                    <i 
                                        className="la la-trash text-danger position-absolute cursor-pointer"
                                        style={{fontSize: '1.2rem'}}
                                        onClick={()=> deleteImg(index)}
                                    ></i>
                                    <a href={contract} target='_blank' className="w-100 h-100">
                                        <i className="la la-file-pdf" style={{fontSize: '8rem'}}></i>
                                    </a>
                                </div>
                            </Col>                    
                        })}
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

export default AddProjectsModal;