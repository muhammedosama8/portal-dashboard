import { useEffect, useState } from "react";
import { Button, Col, Modal, Row, Form } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Select from "react-select";
import AssetsService from "../../../../../services/AssetsService";
import { Translate } from "../../../../Enums/Tranlate";

const AddAssetsModal = ({addModal, setAddModal, item, view, setShouldUpdate})=>{
    const [formData, setFormData] = useState({
        name: '',
        serial_number: '',
        items: [{item: '', cost: ''}]
    })
    const [isAdd, setIsAdd] = useState(false)
    const [loading, setLoading] = useState(false)
    const assetsService = new AssetsService()
    const lang = useSelector(state=> state.auth.lang)

    useEffect(() => {
        if(Object.keys(item)?.length === 0){
            setIsAdd(true)
        } else {
            setIsAdd(false)
            
            setFormData({
                id: item?.id,
                name: item?.name,
                serial_number: item.serial_number,
                items: item?.asset_items
            })
        }
    },[item])

    const submit = (e) =>{
        e.preventDefault();
        let data ={ 
            name: formData?.name,
            asset: 'with Items',
            asset_items: formData.items?.filter(res=> !!res)?.map(res=> {
                return {item: res}
            })
        }

        if(isAdd){
            assetsService.create(data)?.then(res=>{
                if(res?.status === 201){
                    toast.success('Custody Added Successfully')
                    setShouldUpdate(prev=> !prev)
                    setAddModal()
                }
            })
        } else {
            assetsService.update(formData?.id, data)?.then(res=>{
                if(res && res?.status === 200){
                    toast.success('Custody Updated Successfully')
                    setShouldUpdate(prev=> !prev)
                    setAddModal()
                }
            })
        }
    }

    return(
        <Modal 
            className={lang === 'en' ? "en fade addAssets" : "ar fade addAssets"} 
            style={{
                textAlign: lang === 'en' ? 'left' : 'right',
            }} 
            show={addModal} 
            onHide={()=>{
                setAddModal()
            }}
        >
            <AvForm className='form-horizontal' onValidSubmit={submit}>
                <Modal.Header>
                    <Modal.Title>{isAdd ? Translate[lang]?.add : view ? Translate[lang]?.view : Translate[lang]?.edit} {Translate[lang]?.assets}</Modal.Title>
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
                        <Col md={6} sm={12}>
                            <AvField
                                label={Translate[lang]?.name}
                                type='text'
                                placeholder={Translate[lang]?.name}
                                bsSize="lg"
                                name='name'
                                disabled={view}
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
                        <Col md={6} sm={12}></Col>
                            {formData?.items?.map((item, index)=> {
                                return <>
                                <Col md={6} sm={12} key={index}>
                                    <AvField
                                        label={`${Translate[lang]?.item} ${index+1}`}
                                        type='text'
                                        placeholder={Translate[lang]?.item}
                                        bsSize="lg"
                                        disabled={view}
                                        name={`item${index}`}
                                        value={item.item}
                                        onChange={(e) => {
                                            let update = formData.items?.map((res,ind)=>{
                                                if(index === ind){
                                                    return {
                                                        ...res,
                                                        item: e.target.value
                                                    }
                                                } else {
                                                    return res
                                                }
                                            })
                                            setFormData({...formData, items: update})
                                        }}
                                    />
                                </Col>
                                <Col md={6} sm={12} key={index}>
                                    <AvField
                                        label={`${Translate[lang]?.cost} ${index+1}`}
                                        type='number'
                                        placeholder={Translate[lang]?.cost}
                                        min={0}
                                        bsSize="lg"
                                        disabled={view}
                                        name={`cost${index}`}
                                        value={item.cost}
                                        onChange={(e) => {
                                            let update = formData.items?.map((res,ind)=>{
                                                if(index === ind){
                                                    return {
                                                        ...res,
                                                        cost: e.target.value
                                                    }
                                                } else {
                                                    return res
                                                }
                                            })
                                            setFormData({...formData, items: update})
                                        }}
                                    />
                                </Col>
                                </>
                            })}
                            {!view && <Col md={12} sm={12} className='d-flex mt-3 align-items-center'>
                                <Button variant='secondary' type="button"
                                    onClick={()=> setFormData({...formData, items: [...formData.items, {item: "", cost: ""}]})}>
                                    {Translate[lang].add} {Translate[lang].item}
                                </Button>
                            </Col>}
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={setAddModal} variant="danger light">
                        {Translate[lang]?.close}
                    </Button>
                    {!view && <Button 
                        variant="primary" 
                        type='submit'
                        disabled={loading}
                    >{isAdd ? Translate[lang]?.add : Translate[lang]?.edit}</Button>}
                </Modal.Footer>
            </AvForm>
        </Modal>)
}

export default AddAssetsModal;