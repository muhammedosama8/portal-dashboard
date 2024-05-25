import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import EmployeesService from "../../../../services/EmployeesService";
import { Translate } from "../../../Enums/Tranlate";

const ResignationModal = ({resignationModal, setResignationModal, item, setShouldUpdate})=>{
    const [formData, setFormData] = useState({
        start_resignation_date: '',
        end_resignation_date: '',
        employee: ""
    })
    const [loading, setLoading] = useState(false)
    const employeesService = new EmployeesService()
    const lang = useSelector(state=> state.auth.lang)

    useEffect(() => {
        setFormData({
            ...formData,
            employee: item
        })
    },[item])

    const submit = (e) =>{
        e.preventDefault();
        let data ={ 
            ...formData,
            assets_id: formData.assets?.map(res=> res.value),
            department_id: formData.department.id
        }

        // setLoading(true)
        // employeesService.update(formData?.id, data)?.then(res=>{
        //     if(res && res?.status === 200){
        //         toast.success('Employee Updated Successfully')
        //         setShouldUpdate(prev=> !prev)
        //         setAddModal()
        //     }
        // })
    }

    return(
        <Modal className={lang === 'en' ? "en fade addProduct" : "ar fade addProduct"} style={{textAlign: lang === 'en' ? 'left' : 'right'}} show={resignationModal} onHide={()=>{
            setResignationModal()
            }}>
                <AvForm
                    className='form-horizontal'
                    onValidSubmit={submit}>
            <Modal.Header>
            <Modal.Title>{Translate[lang]?.resignation} <span className="text-danger">{formData?.employee?.name}</span></Modal.Title>
            <Button
                variant=""
                className="close"
                style={{right: lang === 'en' ? '0' : 'auto', left: lang === 'ar' ? '0' : 'auto'}}
                onClick={()=>{
                    setResignationModal()
                }}
                >
                <span>&times;</span>
            </Button>
            </Modal.Header>
            <Modal.Body>
                    <Row>
                        <Col md={6}>
                            <AvField
                                label={Translate[lang]?.start_resignation_date}
                                type='date'
                                placeholder={Translate[lang]?.start_resignation_date}
                                bsSize="lg"
                                name='start_resignation_date'
                                max={formData.end_resignation_date}
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.start_resignation_date}
                                onChange={(e) => setFormData({...formData, start_resignation_date: e.target.value})}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label={Translate[lang]?.end_resignation_date}
                                type='date'
                                min={formData.start_resignation_date}
                                placeholder={Translate[lang]?.end_resignation_date}
                                bsSize="lg"
                                name='end_resignation_date'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.end_resignation_date}
                                onChange={(e) => setFormData({...formData, end_resignation_date: e.target.value})}
                            />
                        </Col>
                    </Row>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={setResignationModal} variant="danger light">
            {Translate[lang]?.close}
            </Button>
            <Button 
                    variant="primary" 
                    type='submit'
                    disabled={loading}
                >{Translate[lang]?.add}</Button>
            </Modal.Footer>
            </AvForm>
        </Modal>)
}

export default ResignationModal;