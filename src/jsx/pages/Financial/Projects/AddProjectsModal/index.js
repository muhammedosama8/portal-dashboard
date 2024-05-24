import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Translate } from "../../../../Enums/Tranlate";
import ProjectsService from "../../../../../services/ProjectsService";


const AddProductsModal = ({addModal, setAddModal, item, setShouldUpdate})=>{
    const [formData, setFormData] = useState({
        cost: ""
    })
    const [loading, setLoading] = useState(false)
    const projectsService = new ProjectsService()
    const lang = useSelector(state=> state.auth.lang)

    useEffect(()=>{
        setFormData({cost: item.price})
    },[item])

    const submit = (e) =>{
        e.preventDefault();
        let data ={ 
            name: item.name,
            client_name: item.client_name,
            phone: item.phone,
            client_email: item.client_email,
            client_civil_id: item.client_civil_id,
            contract_date: item.contract_date.split('T')[0],
            price: formData.cost,
            work_day: item.work_day,
            maintenance: item.maintenance,
            department_id: item.department_id,
            project_attachments: item.project_attachments?.map(res=> res.url)
        }
        setLoading(true)
        projectsService.update(item?.id, data)?.then(res=>{
            if(res && res?.status === 200){
                toast.success('Project Updated Successfully')
                setShouldUpdate(prev=> !prev)
                setAddModal()
            }
            setLoading(false)
        }).catch(()=> setLoading(false))
    }

    return(
        <Modal className={lang === 'en' ? "en fade addProduct" : "ar fade addProduct"} style={{textAlign: lang === 'en' ? 'left' : 'right'}} show={addModal} onHide={()=>{
            setAddModal()
            }}>
                <AvForm
                    className='form-horizontal'
                    onValidSubmit={submit}>
            <Modal.Header>
            <Modal.Title>{Translate[lang]?.edit} {Translate[lang]?.cost} {Translate[lang]?.project}</Modal.Title>
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
                                label={Translate[lang]?.cost}
                                type='number'
                                min={0}
                                placeholder={Translate[lang]?.cost}
                                bsSize="lg"
                                name='cost'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.cost}
                                onChange={(e) => setFormData({...formData, cost: e.target.value})}
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
                >{Translate[lang]?.edit}</Button>
            </Modal.Footer>
            </AvForm>
        </Modal>)
}

export default AddProductsModal;