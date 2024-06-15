import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Select from "react-select";
import ProjectsService from "../../../../../services/ProjectsService";
import { Translate } from "../../../../Enums/Tranlate";
import ServerService from "../../../../../services/ServerService";
import MaintenanceProjectsService from "../../../../../services/MaintenanceProjectsService";

const AddServerModal = ({addModal, setAddModal, item, setShouldUpdate})=>{
    const lang = useSelector(state=> state.auth.lang)
    const [formData, setFormData] = useState({
        project: '',
        contract_no: '',
        price: "",
        package_num: '',
        start_date: '',
        end_date: '',
    })
    const [isAdd, setIsAdd] = useState(false)
    const [loading, setLoading] = useState(false)
    const [projectsOptions, setProjectsOptions] = useState([])
    const serverService = new ServerService()

    useEffect(()=>{
        new MaintenanceProjectsService().getList().then(res=>{
            if(res.status === 200){
                let data = res.data.data.data.map(project=>{
                    return{
                        label: project?.name,
                        value: project?.id
                    }
                })
                setProjectsOptions(data)
            }
        })
    },[])

    useEffect(() => {
        setLoading(true)
        if(Object.keys(item)?.length === 0){
            setIsAdd(true)
        } else {
            setIsAdd(false)
            setFormData({
                id: item?.id,
                package_num: item?.package_num,
                price: item?.price,
                project: {
                    label: item.project.name,
                    value: item.project.id,
                },
                contract_no: item?.contract_no,
                start_date: item.start_date?.split("T")[0],
                end_date: item.end_date?.split("T")[0],
            })
        }
        setLoading(false)
    },[item])

    const submit = (e) =>{
        e.preventDefault();
        let data ={ 
            contract_no: formData.contract_no,
            price: formData.price,
            project_id: formData.project?.value,
            package_num: formData.package_num,
            start_date: formData.start_date,
            end_date: formData.end_date
        }
        setLoading(true)
        if(isAdd){
            serverService.create(data)?.then(res=>{
                if(res && res?.status === 201){
                    toast.success('Server Added Successfully')
                    setShouldUpdate(prev=> !prev)
                    setAddModal()
                }
                setLoading(false)
            })
        } else {
            serverService.update(formData?.id, data)?.then(res=>{
                if(res && res?.status === 200){
                    toast.success('Server Updated Successfully')
                    setShouldUpdate(prev=> !prev)
                    setAddModal()
                }
                setLoading(false)
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
            <Modal.Title>{isAdd ? Translate[lang]?.add : Translate[lang]?.edit} {Translate[lang]?.server}</Modal.Title>
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
                            <label className="text-label">
                                {Translate[lang].project}
                            </label>
                            <Select
                                placeholder={Translate[lang]?.select}
                                options={projectsOptions}
                                value={formData.project}
                                onChange={(e) => {
                                    setFormData({...formData, project: e});
                                }}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label={Translate[lang]?.contract_no}
                                type='number'
                                placeholder={Translate[lang]?.contract_no}
                                bsSize="lg"
                                name='contract_no'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.contract_no}
                                onChange={(e) => setFormData({...formData, contract_no: e.target.value})}
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
                                label={Translate[lang]?.package_num}
                                type='number'
                                placeholder={Translate[lang]?.package_num}
                                bsSize="lg"
                                name='package_num'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.package_num}
                                onChange={(e) => setFormData({...formData, package_num: e.target.value})}
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
                                label={Translate[lang]?.end_date}
                                type='date'
                                placeholder={Translate[lang]?.end_date}
                                bsSize="lg"
                                name='end_date'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.end_date}
                                onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                            />
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

export default AddServerModal;