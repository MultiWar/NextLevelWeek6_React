import { Button } from "../components/Button"

import IllustrationSvg from '../assets/illustration.svg'
import Logo from '../assets/logo.svg'
import '../styles/auth.scss'
import { Link, useHistory } from "react-router-dom"
import { FormEvent, useState } from "react"
import { database } from "../services/firebase"
import { useAuth } from "../hooks/useAuth"

export const NewRoom = () => {
    const [roomName, setRoomName] = useState('')
    const { user } = useAuth()
    const history = useHistory()

    async function handleCreateRoom(e: FormEvent) {
        e.preventDefault()
        
        if(!roomName.trim()) {
            return
        }

        const roomRef = database.ref('rooms')
        const firebaseRoom = await roomRef.push({
            title: roomName,
            authorId: user?.id
        })

        history.push(`/admin/rooms/${firebaseRoom.key}`)
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
                    <h2>Crie uma nova sala</h2>
                    <form onSubmit={e => handleCreateRoom(e)}>
                        <input 
                            type='text'
                            placeholder='Nome da sala'
                            onChange={event => setRoomName(event.target.value)}
                            value={roomName}
                        />
                        <Button type='submit'>
                            Criar sala
                        </Button>
                        <p>Quer entrar numa sala já existente? <Link to='/'>Clique aqui</Link></p>
                    </form>
                </div>
            </main>
        </div>
    )
}