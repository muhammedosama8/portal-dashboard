import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Select from "react-select";
import uploadImg from '../../../../images/upload-img.png';
import ProjectsService from "../../../../services/ProjectsService";
import { Translate } from "../../../Enums/Tranlate";
import Loader from "../../../common/Loader";
import BaseService from "../../../../services/BaseService";

const AddProductsModal = ({addModal, setAddModal, item, setShouldUpdate})=>{
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
        department: '',
        price: "",
        cost: "",
        works_day: "",
        maintaince: "",
    })
    const [isAdd, setIsAdd] = useState(false)
    const [loading, setLoading] = useState(false)
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
                department: item.department,
                price: item?.price,
                cost: item?.cost,
                works_day: item?.works_day,
                maintaince: item?.maintaince
            })
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

    return(
        <Modal className={lang === 'en' ? "en fade addProduct" : "ar fade addProduct"} style={{textAlign: lang === 'en' ? 'left' : 'right'}} show={addModal} onHide={()=>{
            setAddModal()
            }}>
                <AvForm
                    className='form-horizontal'
                    onValidSubmit={submit}>
            <Modal.Header>
            <Modal.Title>{isAdd ? Translate[lang]?.add : Translate[lang]?.edit} {Translate[lang]?.product}</Modal.Title>
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
                                label={Translate[lang]?.department}
                                type='text'
                                placeholder={Translate[lang]?.department}
                                bsSize="lg"
                                name='department'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.department}
                                onChange={(e) => setFormData({...formData, department: e.target.value})}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label={Translate[lang]?.cost}
                                type='number'
                                min='0'
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
                            <AvField
                                label={Translate[lang]?.price}
                                type='number'
                                min='0'
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

export default AddProductsModal;