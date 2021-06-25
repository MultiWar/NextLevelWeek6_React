import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import '../styles/question.scss'

type Author = {
    name: string,
    avatar: string
}

type QuestionProps = {
    content: string,
    author: Author,
    children?: ReactNode,
    isHighlighted?: boolean,
    isAnswered?: boolean
}

export const Question = ({content, author, children, isAnswered = false, isHighlighted = false}: QuestionProps) => {
    return (
        <motion.div layout className={`question ${isAnswered && 'answered'} ${isHighlighted && 'highlighted'}`}>
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </motion.div>
    )
}