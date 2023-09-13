import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from 'react-router-dom';
import { createBookThunk } from '../../store/books';
import "./AddBook.css"

export default function AddBook() {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [pageNum, setPageNum] = useState('')
    const [yrPub, setYrPub] = useState('')
    const [genre, setGenre] = useState('')
    const [description, setDescription] = useState('')
    const [picture, setPicture] = useState('')
    const [errors, setErrors] = useState({})
    const [imageLoading, setImageLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        let validationErrors = {}
        const pictureTypes = [".pdf", ".png", ".jpeg", ".jpg", ".gif"];
        if (!title) validationErrors.title = 'Please provide a valid title'
        if (!author) validationErrors.author = 'Please provide a valid author'
        if (!picture) validationErrors.picture = 'Please provide a valid book cover picture'
        if (!pageNum) validationErrors.pageNum = 'Please provide a valid number of pages'
        if (!yrPub) validationErrors.yrPub = 'Please provide a valid year published'
        if (!genre) validationErrors.genre = 'Please provide a valid genre'
        if (!description) validationErrors.description = 'Please provide a valid description'


        if (picture && !(pictureTypes.some(type => {
            return picture.name.endsWith(type)
        }))) {
            validationErrors.picture = 'Acceptable picture files must end in .pdf, .png, .jpg, .jpeg or .gif'
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }
        const user_id = user.id

        const formData = new FormData()
        formData.append("title", title)
        formData.append("author", author)
        formData.append("page_num", pageNum)
        formData.append("yr_published", yrPub)
        formData.append("genre", genre)
        formData.append("description", description)
        formData.append("user_id", user_id)
        formData.append("picture", picture)


        try {
            setImageLoading(true);
            const newBook = await dispatch(createBookThunk(formData, user))
            history.push(`/books/${newBook?.newBook.id}`)
        } catch (error) {
            console.error('Error creating book:', error)
        }
    }

    if (!user) return <Redirect to="/books" />;

    return (
        <div id='outer-add-book'>
        <div className='book-add-div'>
            <h1>Add a book</h1>
            <h3>Fill out this form to add a book to our library.</h3>
            <form className='add-form' enctype="multipart/form-data" onSubmit={handleSubmit}>
                <section id='add-form-data'>

                    <label className='add-form-label'>Title:</label>
                        <input
                            className='book-inputs'
                            type='text'
                            placeholder='Book Title'
                            value={title}
                            maxLength='400'
                            onChange={(e) => setTitle(e.target.value)}
                        />

                    {errors.title && <p classTitle='add-errors'>{errors.title}</p>}

                    <label className='add-form-label'>Author:</label>
                        <input
                            className='book-inputs'
                            type='text'
                            placeholder='Book Author'
                            value={author}
                            maxLength='500'
                            onChange={(e) => setAuthor(e.target.value)}
                        />

                    {errors.author && <p className='add-errors'>{errors.author}</p>}
                    
                    <div className='add-num-input'>
                    <label className='add-form-label'>Number of Pages:</label>
                        <input
                            className='book-inputs'
                            type='number'
                            value={pageNum}
                            onChange={(e) => setPageNum(e.target.value)}
                            />
                    </div>

                    {errors.pageNum && <p className='add-errors'>{errors.pageNum}</p>}
                    
                    <div className='add-num-input'>
                    <label className='add-form-label'> Year Published:</label>
                        <input
                            className='book-inputs'
                            type='number'
                            value={yrPub}
                            onChange={(e) => setYrPub(e.target.value)}
                        />
                    </div>

                    {errors.yrPub && <p className='add-errors'>{errors.yrPub}</p>}

                    <label className='add-form-label'>Genre:</label>
                        <input
                            className='book-inputs'
                            type='text'
                            placeholder='Book Genre'
                            value={genre}
                            maxLength='255'
                            onChange={(e) => setGenre(e.target.value)}
                        />

                    {errors.genre && <p className='add-errors'>{errors.genre}</p>}

                    <div className='add-num-input'>
                    <label className='add-form-label'>Book Cover:</label>
                        <input
                            className='book-inputs'
                            type='file'
                            accept='.pdf, .png, .jpg, .jpeg, .gif'
                            onChange={(e) => setPicture(e.target.files[0])}
                        />
                    </div>
                    {errors.picture && <p className='add-errors'>{errors.picture}</p>}

                    <label className='add-form-label'>Description:</label>
                        <textarea
                            type="text"
                            placeholder="Book description..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="10"
                            cols="35"
                        />

                    {errors.description && <p className='add-errors'>{errors.description}</p>}

                </section>
                <div id="add-book-btn-div">
                <button id='add-book-btn' type="submit">Create your book!</button>
                </div>
                {(imageLoading) && <p>Loading...</p>}
            </form>
        </div>
        </div>
    )
}