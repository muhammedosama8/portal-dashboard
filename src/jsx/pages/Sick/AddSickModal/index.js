import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Select from "react-select";
import { Translate } from "../../../Enums/Tranlate";
import EmployeesService from "../../../../services/EmployeesService";
import SickService from "../../../../services/SickService";

const AddSickModal = ({modal, setModal, item, setShouldUpdate})=>{
    const [formData, setFormData] = useState({
        employee: '',
        departure_day: '',
        return_day: "",
        reason: '',
        number_of_days: ""
    })
    const lang = useSelector(state=> state.auth.lang)
    const [employeesOptions, setEmployeesOptions] = useState([])
    const [loading, setLoading] = useState(false)
    const [maxDate, setMaxDate] = useState('');
    const sickService = new SickService()
    const employeesService = new EmployeesService()

    useEffect(() => {
        setLoading(true)
        employeesService?.getList().then(res=>{
            if(res.status === 200){
                let data = res.data?.data?.data?.map(emp=>{
                    return {
                        label: emp?.name,
                        value: emp?.id
                    }
                })
                setEmployeesOptions(data)
            }
            setLoading(false)
        })
    },[])

    const submit = (e) =>{
        e.preventDefault();
        let data ={ 
            employee_id: formData?.employee?.value,
            departure_day: formData?.departure_day,
            return_day: formData?.return_day,
            reason: formData?.reason,
            number_of_days: formData?.number_of_days
        }

        setLoading(true)
        sickService.create(data)?.then(res=>{
            if(res?.status === 201){
                toast.success('Sick Added Successfully')
                setShouldUpdate(prev=> !prev)
                setModal()
            }
            setLoading(false)
        })
    }

    useEffect(()=> {
        if(!!formData?.departure_day){
            const startDate = new Date(formData?.departure_day); // Set your start date here
            const calculatedMaxDate = new Date(startDate);
            calculatedMaxDate.setMonth(startDate.getMonth() + 6); // Add 6 months

            const formattedMaxDate = calculatedMaxDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
            setMaxDate(formattedMaxDate);
        }
    }, [formData?.departure_day])

    return(
        <Modal className={lang === 'en' ? "en fade addProduct" : "ar fade addProduct"} style={{textAlign: lang === 'en' ? 'left' : 'right'}} show={modal} onHide={()=>{
            setModal()
            }}>
            <AvForm
                    className='form-horizontal'
                    onValidSubmit={submit}>
            <Modal.Header>
            <Modal.Title>{Translate[lang]?.add} {Translate[lang]?.sick}</Modal.Title>
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
                                min={formData.departure_day}
                                max={maxDate}
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
                            <AvField
                                label={Translate[lang].reason}
                                type='text'
                                placeholder={Translate[lang].reason}
                                bsSize="lg"
                                name='reason'
                                value={formData.reason}
                                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                            />
                        </Col>

                        <Col md={6}>
                            <AvField
                                label={Translate[lang]?.number_of_days}
                                type='number'
                                min='0'
                                placeholder={Translate[lang]?.number_of_days}
                                bsSize="lg"
                                name='number_of_days'
                                value={formData.number_of_days}
                                onChange={(e) => setFormData({...formData, number_of_days: e.target.value})}
                            />
                        </Col>
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
                >{Translate[lang]?.add}</Button>
            </Modal.Footer>
            </AvForm>
        </Modal>)
}

export default AddSickModal;