import IllustrationSvg from '../assets/illustration.svg'
import Logo from '../assets/logo.svg'
import GoogleIcon from '../assets/google-icon.svg'

import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'
import { toast } from 'react-toastify'

export const Home = () => {
    const history = useHistory()
    const [roomCode, setRoomCode] = useState('')

    const { user, signInWithGoogle } = useAuth()

    const handleCreateRoom = async () => {
        if(!user) {
            await signInWithGoogle()
        }
        history.push('/rooms/new')
    }

    async function handleJoinRoom(e: FormEvent) {
        e.preventDefault()

        if(!roomCode.trim()) {
            return
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get()

        if(!roomRef.exists()) {
            toast.error("Room doesn't exist.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                className: 'toastClassName',
                bodyClassName: 'toastBodyClassName',
                progressClassName: 'toastProgressClassName'
            });
            return
        }

        if(roomRef.val().endedAt) {
            toast.error('Room is already closed.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                className: 'toastClassName',
                bodyClassName: 'toastBodyClassName',
                progressClassName: 'toastProgressClassName'
            });
            return
        }

        history.push(`rooms/${roomCode}`)
    }

    return (
        <div id='page-auth'>
            <aside>
                <img src={IllustrationSvg} alt='Ilustração simbolizando perguntas e respostas' />
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>Tire dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={Logo} alt='Logo Letmeask' />
                    <button className='create-room' onClick={handleCreateRoom}>
                        <img src={GoogleIcon} alt='Logo do Google' />
                        Crie sua sala com o Google
                    </button>
                    <div className='separator'>ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                            type='text'
                            placeholder='Digite o código da sala'
                            value={roomCode}
                            onChange={event => setRoomCode(event.target.value)}
                        />
                        <Button type='submit'>
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}