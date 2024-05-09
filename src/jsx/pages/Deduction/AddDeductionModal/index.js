import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Select from "react-select";
import uploadImg from '../../../../images/upload-img.png';
import DeductionService from "../../../../services/DeductionService";
import { Translate } from "../../../Enums/Tranlate";
import Loader from "../../../common/Loader";
import BaseService from "../../../../services/BaseService";

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
    },[item])

    useEffect(() => {
        const today = new Date();
        const currentMonth = today.getMonth();
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const remainingMonths = months.slice(currentMonth)?.map(res=>{
            return{
                label: Translate[lang][res.toLocaleLowerCase()],
                value: res.toLocaleLowerCase()
            }
        });

        setMonthOptions([...remainingMonths])
    },[lang])

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
        //             setModal()
        //         }
        //     })
        // } else {
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
                                options={employeesOptions}
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