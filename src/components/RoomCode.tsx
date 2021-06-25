import { toast } from 'react-toastify'
import CopyToClipboard from '../assets/copy.svg'
import '../styles/room-code.scss'

interface RoomCodeProps {
    code: string
}

export const RoomCode = ({code}: RoomCodeProps) => {
    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(code)
        toast.success('Code copied to clipboard!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: 'toastClassName',
            bodyClassName: 'toastBodyClassName',
            progressClassName: 'toastProgressClassName'
        });
    }

    return (
        <button className='room-code' onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={CopyToClipboard} alt="Copiar código da sala para a área de transferência" />
            </div>
            <span>{code}</span>
        </button>
    )
}