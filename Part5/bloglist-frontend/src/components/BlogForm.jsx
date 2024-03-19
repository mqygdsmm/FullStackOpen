import { useState } from "react"
import blogServices from '../services/blogs'
import Message from "./Message"

const BlogForm = ({addNewBlog}) => {    
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [message, setMessage] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const newBlog = await blogServices.create({title, author, url})
            addNewBlog(newBlog)
            setTitle('')
            setAuthor('')
            setUrl('')
            setMessage({type:'success', content: `a new blog ${title} by ${author}`})
            setTimeout(() => {
                setMessage(null)
            }, 5000);
        } catch (exception) {
            console.log('error')

        }
    }
    return (
        <div>
            <Message message={message} />
            <h2>Create new blog</h2>
            <form onSubmit={handleSubmit}> 
            <div>
                title:<input type='text' value={title} onChange={({target}) => setTitle(target.value)}/>
            </div>
            <div>
                author:<input type='text' value={author} onChange={({target}) => setAuthor(target.value)}/>
            </div>
            <div>
                url:<input type='text' value={url} onChange={({target}) => setUrl(target.value)}/>
            </div>
            <button type="submit">Create</button>

            </form>
        </div>
    )
}

export default BlogForm