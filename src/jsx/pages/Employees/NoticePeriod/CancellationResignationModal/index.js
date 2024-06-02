import React ,{useState} from 'react'
import { Modal } from "react-bootstrap";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Translate } from '../../../../Enums/Tranlate';

function CancellationResignationModal(props) {
    const [loading, setLoading] = useState(false)
    const lang = useSelector(state=> state.auth.lang)

    const handleCancellation = async () => {
        setLoading(true)
        const { data: response } = await props.modelService.cancellationResignation(props.item.id)
            if(response?.status === 200){
                toast.success(`${Translate[lang].updated} ${Translate[lang].successfully}`)
                props.setShouldUpdate(prev=> !prev)
                return props.onCloseModal(false)
            }
    }

    return (
        <Modal show={props.open}  onHide={()=> props.onCloseModal(false)} className={`${lang}`}>
            <div className="modal-header border-0">
                <button
                    type="button"
                    onClick={() => props.onCloseModal(false)}
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body border-0">
                <h5 className="modal-title mt-0" id="myModalLabel">
                    <i className='la la-times-circle text-danger mx-2' style={{fontSize: '20px'}}></i> 
                    {Translate[lang].cancellation_of_resignation} {Translate[lang].to} <span style={{fontWeight: '700'}}>{props.name}</span>
                </h5>
            </div>
            <div className="modal-footer border-0">
                <button
                    type="button"
                    onClick={() => props.onCloseModal(false)}
                    className="btn me-auto btn-secondary waves-effect waves-light"
                    data-dismiss="modal"
                >
                    {Translate[lang].cancel}
            </button>
                <button
                    onClick={handleCancellation}
                    type="button"
                    className="btn btn-danger waves-effect"
                    disabled={loading ? true : false}

                >
                    {Translate[lang].cancellation_of_resignation}
            </button>
            </div>
        </Modal>
    )
}

export default CancellationResignationModal
