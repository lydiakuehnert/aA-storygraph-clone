import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { editBookThunk } from '../../store/books';
import { useModal } from '../../context/Modal';
import './BookEdit.css'

export default function BookEdit({ bookId }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const chosenBook = useSelector(state => Object.values(state.books.allBooks)).filter(book => book.id === bookId)[0];
    const user = useSelector(state => state.session.user)
    const user_id = user.id

    const currentPic = chosenBook.picture.split('/').reverse()[0]

    const [title, setTitle] = useState(chosenBook.title)
    const [author, setAuthor] = useState(chosenBook.author)
    const [pageNum, setPageNum] = useState(chosenBook.pageNum)
    const [yrPub, setYrPub] = useState(chosenBook.yrPublished)
    const [genre, setGenre] = useState(chosenBook.genre)
    const [description, setDescription] = useState(chosenBook.description)
    const [picture, setPicture] = useState('')

    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()
    const [updating, setUpdating] = useState(false);
    const imageTypes = [".pdf", ".png", ".jpeg", ".jpg", ".gif"];

    const handleSubmit = async (e) => {
        e.preventDefault()
        let validationErrors = {}

        if (!title) validationErrors.title = 'Please provide a valid title'
        if (!author) validationErrors.author = 'Please provide a valid author'
        if (!pageNum) validationErrors.pageNum = 'Please provide a valid number of pages'
        if (!yrPub) validationErrors.yrPub = 'Please provide a valid year published'
        if (!genre) validationErrors.genre = 'Please provide a valid genre'
        if (!description) validationErrors.description = 'Please provide a valid description'

        if (picture.length && !(imageTypes.some(type => {
            return picture.name.endsWith(type)
        }))) {
            validationErrors.picture = 'Acceptable image files must end in .pdf, .png, .jpg, .jpeg or .gif'
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }
        const formData = new FormData()

        formData.append("title", title)
        formData.append("author", author)
        formData.append("page_num", pageNum)
        formData.append("yr_published", yrPub)
        formData.append("genre", genre)
        formData.append("description", description)
        formData.append("user_id", user_id)

        if (typeof picture !== 'string') formData.append("picture", picture)
 
        try {
            setUpdating(true)
            await dispatch(editBookThunk(formData, bookId))
            closeModal()
            history.push(`/books/${bookId}`)
        } catch (error) {
            console.error('Error creating book:', error)
        }
    }

    const handlePic = async (e) => {
        e.preventDefault();
        const ogBtn = document.getElementById('image-btn')
        ogBtn.click()
        const newBtn = document.getElementById('new-image-btn')
        newBtn.style.display = 'none'
        ogBtn.style.display = 'revert'
    }

    return (
        <div className='book-edit-div'>
            <h1>Edit your book</h1>
            <form id='book-edit-form' enctype="multipart/form-data" onSubmit={handleSubmit}>
                <section id='edit-book-data'>
                    <div className='book-edit-inputs'>
                    <label>Title:</label>
                        <input
                            className='text-edit-input'
                            type='text'
                            value={title}
                            maxLength='400'
                            size='30'
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    {errors.title && <p className='errors'>{errors.title}</p>}
                    </div>

                    <div className='book-edit-inputs'>
                    <label>Author:</label>
                        <input
                            className='text-edit-input'
                            type='text'
                            placeholder='Book Author'
                            value={author}
                            maxLength='500'
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    {errors.author && <p className='errors'>{errors.author}</p>}
                    </div>
                    
                    <div className='book-edit-inputs'>
                    <label>Number of Pages:</label>
                        <input
                            className='num-edit-input'
                            type='number'
                            value={pageNum}
                            onChange={(e) => setPageNum(e.target.value)}
                        />
                    {errors.pageNum && <p className='errors'>{errors.pageNum}</p>}
                    </div>

                    <div className='book-edit-inputs'>
                    <label>Year Published:</label>
                        <input
                            className='num-edit-input'
                            type='number'
                            value={yrPub}
                            onChange={(e) => setYrPub(e.target.value)}
                        />
                    {errors.yrPub && <p className='errors'>{errors.yrPub}</p>}
                    </div>

                    <div className='book-edit-inputs'>
                    <label>Genre:</label>
                        <input
                            className='text-edit-input'
                            type='text'
                            placeholder='Book Genre'
                            value={genre}
                            maxLength='255'
                            onChange={(e) => setGenre(e.target.value)}
                        />
                    {errors.genre && <p className='errors'>{errors.genre}</p>}
                    </div>

                    <div className='book-edit-inputs'>
                        <label>Book Cover Picture:</label>
                            <input
                                className='edit-bars'
                                type='file'
                                accept='.pdf, .png, .jpg, .jpeg, .gif'
                                id='image-btn'
                                onChange={(e) => setPicture(e.target.files[0])}
                            />
                            <input
                                className='edit-bars'
                                type="button"
                                id="new-image-btn"
                                value={`Replace ${currentPic}`}
                                onClick={handlePic}
                            />
                    {errors.picture && <p className='errors'>{errors.picture}</p>}
                    </div>

                    <div className='book-edit-inputs'>
                    <label>Description:</label>
                        <textarea
                            type="text"
                            placeholder="Leave your description here..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="10"
                            cols="60"
                        />
                    </div>
                    {errors.description && <p className='errors'>{errors.description}</p>}

                </section>
                <button type="submit" id='edit-book-btn' className='btn-hover'>Edit your book</button>
                {(updating) && <p>Updating...</p>}
            </form>
        </div>
    )
}