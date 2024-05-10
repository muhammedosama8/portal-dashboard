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
        works_day: "",
        maintaince: "",
        client_name: "",
        client_phone: ""
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
                department: item.department,
                price: item?.price,
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