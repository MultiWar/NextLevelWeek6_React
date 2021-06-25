import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { Button } from "./Button"

import '../styles/user-card.scss'

type UserCardProps = {
    username: string,
    avatarUrl: string
}

export const UserCard = ({username, avatarUrl}: UserCardProps) => {
    const [showCard, setShowCard] = useState(false)
    const { signOut } = useAuth()

    return (
        <div id='user-card-component'>
            <button type='button' onClick={() => setShowCard(current => !current)} className='user-card-button'>
                <img src={avatarUrl} alt={`Foto de perfil de ${username}`} />
            </button>
            <AnimatePresence>
                {showCard && (
                    <motion.div className={`user-card`} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} >
                        <img src={avatarUrl} alt={`Foto de perfil de ${username}`} />
                        <p>{username}</p>
                        <Button onClick={signOut} buttonType='danger'>Sair da conta</Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}