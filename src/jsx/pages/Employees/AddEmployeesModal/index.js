import { useEffect, useState } from "react";
import { Button, Col, Modal, Row, Form } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Select from "react-select";
import uploadImg from '../../../../images/upload-img.png';
import EmployeesService from "../../../../services/EmployeesService";
import { Translate } from "../../../Enums/Tranlate";
import BaseService from "../../../../services/BaseService";
import Loader from "../../../common/Loader";
import DepartmentService from "../../../../services/DepartmentService";
import AssetsService from "../../../../services/AssetsService";

const AddEmployeesModal = ({addModal, setAddModal, item, setShouldUpdate})=>{
    const [formData, setFormData] = useState({
        name: '',
        civil_id: '',
        job_title: "",
        start_date: "",
        salary: "",
        personal_email: "",
        company_email: "",
        iban: "",
        is_full_time: true,
        department: "",
        assets: [],
        attachments: []
    })
    const [isAdd, setIsAdd] = useState(true)
    const [assetsOptions, setAssetsOptions] = useState([])
    const [departmentOptions, setDepartmentOptions] = useState([])
    const [loading, setLoading] = useState(false)
    const employeesService = new EmployeesService()
    const departmentService = new DepartmentService()
    const assetsService = new AssetsService()
    const lang = useSelector(state=> state.auth.lang)

    useEffect(() => {
        if(Object.keys(item)?.length === 0){
            setIsAdd(true)
        } else {
            setIsAdd(false)

            setFormData({
                id: item.id,
                name: item.name,
                civil_id: item.civil_id,
                job_title: item.job_title,
                start_date: item.start_date?.split('T')[0],
                salary: item.salary,
                personal_email: item.personal_email,
                company_email: item.company_email,
                iban: item.iban,
                is_full_time: item.is_full_time,
                department: {
                    label: item.department.name,
                    value: item.department.id
                },
                assets: item.employee_assets?.map(res=>{
                    return{
                        label: `${res.asset.name} ${res.asset.asset}`,
                        value: res.asset_id,
                        id: res.id
                    }
                }),
                attachments: item.employee_attach?.map(res=> res.url)
            })
        }
    },[item])

    useEffect(()=>{
        departmentService.getList().then(res=>{
            if(res?.status === 200){
                let info = res?.data?.data?.data?.map(dep=>{
                    return {
                        label: dep.name,
                        value: dep?.id,
                        id: dep.id
                    }
                })
                setDepartmentOptions(info)
            }
        })
        assetsService.getUnsignedAssetsList().then(res=>{
            if(res?.status === 200){
                let info = res?.data?.data?.data?.map(ass=>{
                    if(ass.asset !== "with Items"){
                        return {
                            label: `${ass.name} / ${ass.serial_number}`,
                            value: ass.id,
                            id: ass.id
                        }
                    } else {
                        return {
                            label: `${ass.name} / ${ass.asset_items?.map(res=> (` ${res.item}`))}`,
                            value: ass.id,
                            id: ass.id
                        }
                    }
                })
                setAssetsOptions(info)
            }
        })
    },[])

    const fileHandler = (e) => {
        let files = e.target.files
        const filesData = Object.values(files)
        setLoading(true)
        if (filesData?.length) {
            new BaseService().postUpload(filesData[0]).then(res=>{
                if(res?.status === 200){
                    setFormData({...formData, attachments: [...formData.attachments, res?.data?.url]})
                }
                setLoading(false)
            }).catch(()=> setLoading(false))
        }
    }

    const submit = (e) =>{
        e.preventDefault();
        let data ={ 
            ...formData,
            assets_id: formData.assets?.map(res=> res.value),
            department_id: formData.department.id
        }
        delete data.department
        delete data.assets

        if(isAdd){
            employeesService.create(data)?.then(res=>{
                if(res && res?.status === 201){
                    toast.success('Employee Added Successfully')
                    setShouldUpdate(prev=> !prev)
                    setAddModal()
                }
            })
        } else {
            delete data.id

            employeesService.update(formData?.id, data)?.then(res=>{
                if(res && res?.status === 200){
                    toast.success('Employee Updated Successfully')
                    setShouldUpdate(prev=> !prev)
                    setAddModal()
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
            <Modal.Title>{isAdd ? Translate[lang]?.add : Translate[lang]?.edit} {Translate[lang]?.employees}</Modal.Title>
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
                        <Col md={12}>
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
                                label={Translate[lang]?.civil_id}
                                type='text'
                                placeholder={Translate[lang]?.civil_id}
                                bsSize="lg"
                                name='civil_id'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.civil_id}
                                onChange={(e) => setFormData({...formData, civil_id: e.target.value})}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label={Translate[lang]?.job_title}
                                type='text'
                                placeholder={Translate[lang]?.job_title}
                                bsSize="lg"
                                name='job_title'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.job_title}
                                onChange={(e) => setFormData({...formData, job_title: e.target.value})}
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
                                label={Translate[lang]?.start_date}
                                type='date'
                                placeholder={Translate[lang]?.start_date}
                                bsSize="lg"
                                name='start_date'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.start_date}
                                onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label={Translate[lang]?.salary}
                                type='number'
                                min='0'
                                placeholder={Translate[lang]?.salary}
                                bsSize="lg"
                                name='salary'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.salary}
                                onChange={(e) => setFormData({...formData, salary: e.target.value})}
                            />
                        </Col>
                        <Col md={6} className='mt-3 d-flex align-items-center' style={{gap: '18px'}}>
                            {lang==='en' ? Translate[lang]?.part_time : Translate[lang]?.full_time}
                            <Form.Check
                                type="switch"
                                id={`custom-switch`}
                                checked={formData.is_full_time}
                                onChange={(e) => setFormData({...formData, is_full_time: e.target.checked})}
                            />
                            {lang==='en' ? Translate[lang]?.full_time : Translate[lang]?.part_time}
                        </Col>
                        <Col md={12}>
                            <AvField
                                label={Translate[lang]?.iban}
                                type='text'
                                placeholder={Translate[lang]?.iban}
                                bsSize="lg"
                                name='iban'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.iban}
                                onChange={(e) => setFormData({...formData, iban: e.target.value})}
                            />
                        </Col>
                        <Col md={12} className='mb-3'>
                            <label className="text-label">
                                {Translate[lang].assets}
                            </label>
                            <Select
                                placeholder={Translate[lang]?.select}
                                options={assetsOptions}
                                isMulti
                                value={formData.assets}
                                onChange={(e) => {
                                    setFormData({...formData, assets: e});
                                }}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label={Translate[lang]?.personal_email}
                                type='text'
                                placeholder={Translate[lang]?.personal_email}
                                bsSize="lg"
                                name='personal_email'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.personal_email}
                                onChange={(e) => setFormData({...formData, personal_email: e.target.value})}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label={Translate[lang]?.company_email}
                                type='text'
                                placeholder={Translate[lang]?.company_email}
                                bsSize="lg"
                                name='company_email'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.company_email}
                                onChange={(e) => setFormData({...formData, company_email: e.target.value})}
                            />
                        </Col>
                        
                        <Col md={12} className='mt-3'>
                            <div className='form-group w-100'>
                                <label className="m-0">{Translate[lang]?.attachments}</label>
                                <div className="image-placeholder">	
                                    <div className="avatar-edit">
                                        <input type="file" onChange={(e) => fileHandler(e)} id={`imageUpload1`} /> 					
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
                        {!!formData.attachments?.length && formData.attachments?.map((attachment, index)=>{
                            return <Col md={3} key={index}>
                                <div>
                                    <i 
                                        className="la la-trash text-danger"
                                        onClick={()=>{
                                            let update = formData.attachments?.filter((_,ind)=> index !== ind)
                                            setFormData({...formData, attachments: update})
                                        }}
                                    ></i>
                                    {attachment.includes('pdf') ?
                                        <a href={attachment} target='_blank'>
                                            <i className="la la-file-pdf d-block" style={{fontSize: '6rem'}}></i>
                                        </a>
                                     : <img src={attachment} alt={index} className='w-100' />
                                     }
                                    
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

export default AddEmployeesModal;