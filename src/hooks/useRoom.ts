import { useEffect, useState } from "react"
import { database } from "../services/firebase"
import { useAuth } from "./useAuth"

type QuestionType = {
    id: string,
    content: string,
    author: {
        name: string,
        avatar: string
    },
    isHighlighted: boolean,
    isAnswered: boolean,
    likeCount: number,
    likeId: string | undefined
}

type FirebaseQuestions = Record<string, {
    content: string,
    author: {
        name: string,
        avatar: string
    },
    isHighlighted: boolean,
    isAnswered: boolean,
    likes: Record<string, {authorId: string}>
}>


export const useRoom = (roomId: string) => {
    const [questions, setQuestions] = useState<QuestionType[]>([])
    const [title, setTitle] = useState('')
    const [rcid, setRcid] = useState('')
    const { user } = useAuth()

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`)

        roomRef.on('value', room => {
            const databaseRoom = room.val()

            const databaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}
            
            const parsedQuestions = Object.entries(databaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ??{}).find(([key, value]) => value.authorId === user?.id)?.[0]
                }
            }).sort((a, b) => b.likeCount - a.likeCount).sort((a, b) => {
                let aValue;
                let bValue;
                if(a.isAnswered) {
                    aValue = -1
                }
                else {
                    aValue = 1
                }
                if(b.isAnswered) {
                    bValue = -1
                }
                else {
                    bValue = 1
                }
                return bValue - aValue
            })

            const authorId = databaseRoom.authorId
            
            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
            setRcid(authorId)
        })

        return () => {
            roomRef.off('value')
        }
    }, [roomId, user?.id])

    return { questions, title, rcid }
}