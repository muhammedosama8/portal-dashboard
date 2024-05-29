import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Select from "react-select";
import DeductionService from "../../../../services/DeductionService";
import { Translate } from "../../../Enums/Tranlate";
import EmployeesService from "../../../../services/EmployeesService";

const AddDeductionModal = ({modal, setModal, item, setShouldUpdate})=>{
    const [formData, setFormData] = useState({
        employee: '',
        deduction: '',
        month: "",
    })
    const [monthOptions, setMonthOptions] = useState([])
    const [employeesOptions, setEmployeesOptions] = useState([])
    const [isAdd, setIsAdd] = useState(false)
    const [loading, setLoading] = useState(false)
    const deductionService = new DeductionService()
    const employeesService = new EmployeesService()
    const lang = useSelector(state=> state.auth.lang)

    useEffect(() => {
        if(Object.keys(item)?.length === 0){
            setIsAdd(true)
        } else {
            setIsAdd(false)
            setFormData({
                id: item?.id,
                employee: {
                    label: item?.employee.name,
                    value: item?.employee.id,
                },
                month: {
                    label: Translate[lang][item.month.toLocaleLowerCase()],
                    value: item.month
                },
                deduction: item.deduction
            })
        }
    },[item])

    useEffect(() => {
        const today = new Date();
        const currentMonth = today.getMonth();
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const remainingMonths = months.slice(currentMonth)?.map(res=>{
            return{
                label: Translate[lang][res.toLocaleLowerCase()],
                value: res
            }
        });

        setMonthOptions([...remainingMonths])
    },[lang])

    useEffect(()=>{
        employeesService?.getList().then(res=>{
            if(res?.status === 200){
                let data = res?.data?.data?.data?.map(emp=>{
                    return {
                        ...emp,
                        label: emp?.name,
                        value: emp.id
                    }
                })
                setEmployeesOptions(data)
            }
        })
    },[])

    const submit = (e) =>{
        e.preventDefault();
        let data ={ 
            employee_id: formData?.employee?.value,
            month: formData?.month?.value,
            deduction: formData?.deduction
        }

        if(isAdd){
            deductionService.create(data)?.then(res=>{
                if(res && res?.status === 201){
                    toast.success('Deduction Added Successfully')
                    setShouldUpdate(prev=> !prev)
                    setModal()
                }
            })
        } else {
            deductionService.update(formData?.id, data)?.then(res=>{
                if(res && res?.status === 200){
                    toast.success('Deduction Updated Successfully')
                    setShouldUpdate(prev=> !prev)
                    setModal()
                }
            })
        }
    }

    return(
        <Modal className={lang === 'en' ? "en fade addProduct" : "ar fade addProduct"} style={{textAlign: lang === 'en' ? 'left' : 'right'}} show={modal} onHide={()=>{
            setModal()
            }}>
            <AvForm
                    className='form-horizontal'
                    onValidSubmit={submit}>
            <Modal.Header>
            <Modal.Title>{isAdd ? Translate[lang]?.add : Translate[lang]?.edit} {Translate[lang]?.deduction}</Modal.Title>
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
                                options={isAdd ? employeesOptions : []}
                                value={formData.employee}
                                onChange={(e) => setFormData({...formData, employee: e})}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label={Translate[lang]?.deduction}
                                type='text'
                                placeholder={Translate[lang]?.deduction}
                                bsSize="lg"
                                name='deduction'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.deduction}
                                onChange={(e) => setFormData({...formData, deduction: e.target.value})}
                            />
                        </Col>
                        
                        <Col md={6}>
                            <label className="text-label">
                                {Translate[lang].month}
                            </label>
                            <Select
                                placeholder={Translate[lang]?.select}
                                options={monthOptions}
                                value={formData.month}
                                onChange={(e) => setFormData({...formData, month: e})}
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
                >{isAdd ? Translate[lang]?.add : Translate[lang]?.edit}</Button>
            </Modal.Footer>
            </AvForm>
        </Modal>)
}

export default AddDeductionModal;