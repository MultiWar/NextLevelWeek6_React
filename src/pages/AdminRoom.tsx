import { useParams } from 'react-router'
import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'
import { useHistory } from 'react-router-dom'
import ReactModal from 'react-modal'
import { AnimateSharedLayout } from 'framer-motion'
import { UserCard } from '../components/UserCard'

import Logo from '../assets/logo.svg'
import DeleteIcon from '../assets/delete.svg'
import CircledXIcon from '../assets/circled-x.svg'
import CheckIcon from '../assets/check.svg'
import AnswerIcon from '../assets/answer.svg'
import NoQuestions from '../assets/empty-questions.svg'

import '../styles/room.scss'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

type RoomParams = {
    id: string
}

const overlayStyles = {
    background: 'rgba(5,5,5,0.7)',
    display: 'grid',
    placeItems: 'center',
}

const contentStyles = {
    top: 'unset',
    bottom: 'unset',
    right: 'unset',
    left: 'unset',
    width: '35vw',
    height: '40vh',
    borderRadius: '8px'
}

export const AdminRoom = () => {
    const { id: roomId } = useParams<RoomParams>()
    const { questions, title, rcid } = useRoom(roomId)
    const { user } = useAuth()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const history = useHistory()

    useEffect(() => {
        if(rcid !== '') {
            if(rcid !== user?.id) {
                toast.error("You don't have permission to enter as an admin in this room.", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                history.push(`/rooms/${roomId}`)
            }
        }
    }, [rcid, user, roomId, history])

    async function handleDeleteQuestion(questionId: string) {
        if(window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
        return
    }

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })
        history.push('/')
        return
    }

    async function handleQuestionAsAnswered(questionId: string, isAnswered: boolean) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: !isAnswered
        })
    }

    async function handleHighlightQuestion(questionId: string, isHighlighted: boolean) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: !isHighlighted
        })
    }

    return (
        <div id='page-room'>
            <header>
                <div className="content">
                    <img src={Logo} alt="Logo Letmeask" />
                    <div className='buttons'>
                        <RoomCode code={roomId} />
                        <Button buttonType='outlined' onClick={() => setIsModalOpen(true)}>Encerrar sala</Button>
                        {user && <UserCard avatarUrl={user.avatar} username={user.username} />}
                    </div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>{title}</h1>
                    {questions.length > 0 && <span>{questions.length} perguntas</span>}
                </div>
                {questions.length > 0 ? (<div className="question-list">
                    <AnimateSharedLayout>
                        {questions.map(question => (
                            <Question key={question.id} content={question.content} author={question.author} isAnswered={question.isAnswered} isHighlighted={question.isHighlighted}>
                                <button type='button' aria-label='Marcar pergunta como "respondida"' onClick={() => handleQuestionAsAnswered(question.id, question.isAnswered)}>
                                    <img src={CheckIcon} alt='Marcar pergunta como "respondida"' />
                                </button>
                                <button type='button' aria-label='Destacar pergunta' onClick={() => handleHighlightQuestion(question.id, question.isHighlighted)}>
                                    <img src={AnswerIcon} alt="Destacar pergunta" />
                                </button>
                                <button type='button' aria-label='Deletar pergunta' onClick={() => handleDeleteQuestion(question.id)}>
                                    <img src={DeleteIcon} alt="Deletar pergunta" />
                                </button>
                            </Question>
                        ))}
                    </AnimateSharedLayout>
                </div>) : (
                    <div className="noQuestions">
                        <img src={NoQuestions} alt="Não há nenhuma pergunta, por enquanto" />
                        <h3>Nenhuma pergunta por aqui...</h3>
                        <p>Envie o código desta sala para seus amigos e comece a responder perguntas!</p>
                    </div>
                )}
            </main>
            <ReactModal 
                isOpen={isModalOpen} 
                onRequestClose={() => setIsModalOpen(false)}
                style={{
                    content: contentStyles,
                    overlay: overlayStyles
                }}
            >
                <div className='modalContent'>
                    <img src={CircledXIcon} alt="" />
                    <h1>Encerrar sala</h1>
                    <p>Tem certeza que você deseja encerrar esta sala?</p>
                    <div className="buttons">
                        <Button buttonType='grey' onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                        <Button buttonType='danger' onClick={handleEndRoom}>Sim, encerrar</Button>
                    </div>
                </div>
            </ReactModal>
        </div>
    )
}