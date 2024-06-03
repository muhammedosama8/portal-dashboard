import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Select from "react-select";
import uploadImg from '../../../../images/upload-img.png';
import VacationsService from "../../../../services/VacationsService";
import { Translate } from "../../../Enums/Tranlate";
import Loader from "../../../common/Loader";
import BaseService from "../../../../services/BaseService";
import EmployeesService from "../../../../services/EmployeesService";

const AddVacationsModal = ({modal, setModal, item, setShouldUpdate})=>{
    const [formData, setFormData] = useState({
        employee: '',
        departure_day: '',
        return_day: "",
        reason: '',
        number_of_days: ""
    })
    const [reasonsOptions, setReasonsOptions] = useState([])
    const [employeesOptions, setEmployeesOptions] = useState([])
    const [isAdd, setIsAdd] = useState(false)
    const [loading, setLoading] = useState(false)
    const vacationsService = new VacationsService()
    const employeesService = new EmployeesService()
    const lang = useSelector(state=> state.auth.lang)

    useEffect(() => {
        if(Object.keys(item)?.length === 0){
            setIsAdd(true)
        } else {
            setIsAdd(false)
            // setFormData({
            //     id: item?.id,
            //     name: item?.name,
            // })
        }

        employeesService?.getList().then(res=>{
            if(res.status === 200){
                let data = res.data.data.data?.map(emp=>{
                    return {
                        label: emp.name,
                        value: emp.id
                    }
                })
                setEmployeesOptions(data)
            }
        })
    },[item])

    useEffect(()=>{
        setReasonsOptions([
            {label: Translate[lang].emergency_leave, value: 'emergency_leave'},
            {label: Translate[lang].annual_leave, value: 'annual_leave'},
        ])
    },[lang])

    const submit = (e) =>{
        e.preventDefault();
        let data ={ 
            employee_id: formData?.employee?.value,
            departure_day: formData?.departure_day,
            return_day: formData?.return_day,
            reason: formData?.reason?.value,
        }
        if(formData?.reason?.value === "emergency_leave") data["number_of_days"] = formData?.number_of_days

        if(isAdd){
            vacationsService.create(data)?.then(res=>{
                if(res && res?.status === 201){
                    toast.success('Vacation Added Successfully')
                    setShouldUpdate(prev=> !prev)
                    setModal()
                }
            })
        }
        // else {
        //     projectsService.update(formData?.id, data)?.then(res=>{
        //         if(res && res?.status === 200){
        //             toast.success('Product Updated Successfully')
        //             setShouldUpdate(prev=> !prev)
        //             setModal()
        //         }
        //     })
        // }
    }

    return(
        <Modal className={lang === 'en' ? "en fade addProduct" : "ar fade addProduct"} style={{textAlign: lang === 'en' ? 'left' : 'right'}} show={modal} onHide={()=>{
            setModal()
            }}>
            <AvForm
                    className='form-horizontal'
                    onValidSubmit={submit}>
            <Modal.Header>
            <Modal.Title>{isAdd ? Translate[lang]?.add : Translate[lang]?.edit} {Translate[lang]?.vacation}</Modal.Title>
            <Button
                variant=""
                className="close"
                style={{right: lang === 'en' ? '0' : 'auto', left: lang === 'ar' ? '0' : 'auto'}}
                onClick={()=>{
                    setModal()
                }}
                >
                <span>&times;</span>
            </Button>
            </Modal.Header>
            <Modal.Body>
                    <Row>
                        <Col md={6}>
                            <label className="text-label">
                                {Translate[lang].employee}
                            </label>
                            <Select
                                placeholder={Translate[lang]?.select}
                                options={employeesOptions}
                                value={formData.employee}
                                onChange={(e) => setFormData({...formData, employee: e})}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label={Translate[lang]?.departure_day}
                                type='date'
                                placeholder={Translate[lang]?.departure_day}
                                bsSize="lg"
                                name='departure_day'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.departure_day}
                                onChange={(e) => setFormData({...formData, departure_day: e.target.value})}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label={Translate[lang]?.return_day}
                                type='date'
                                placeholder={Translate[lang]?.return_day}
                                bsSize="lg"
                                name='return_day'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.return_day}
                                onChange={(e) => setFormData({...formData, return_day: e.target.value})}
                            />
                        </Col>
                        
                        <Col md={6}>
                            <label className="text-label">
                                {Translate[lang].reason}
                            </label>
                            <Select
                                placeholder={Translate[lang]?.select}
                                options={reasonsOptions}
                                value={formData.reason}
                                onChange={(e) => setFormData({...formData, reason: e})}
                            />
                        </Col>

                        {formData.reason?.value === "emergency_leave" && <Col md={6}>
                            <AvField
                                label={Translate[lang]?.number_of_days}
                                type='number'
                                min='0'
                                placeholder={Translate[lang]?.number_of_days}
                                bsSize="lg"
                                name='number_of_days'
                                // validate={{   (not req)
                                //     required: {
                                //         value: true,
                                //         errorMessage: Translate[lang].field_required
                                //     }
                                // }}
                                value={formData.number_of_days}
                                onChange={(e) => setFormData({...formData, number_of_days: e.target.value})}
                            />
                        </Col>}
                    </Row>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={setModal} variant="danger light">
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

export default AddVacationsModal;