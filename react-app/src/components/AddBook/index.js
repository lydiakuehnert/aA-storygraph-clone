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
        <div className='index'>
            <div className='book-add-div'>
                <h1>Add a Book</h1>
                <form className='add-form' enctype="multipart/form-data" onSubmit={handleSubmit}>
                    <div className='add-div'>
                        <section id='add-form-data'>

                            <label className='add-form-elements' >
                                Title:
                                <input
                                    className='book-inputs'
                                    type='text'
                                    placeholder='Book Title'
                                    value={title}
                                    maxLength='400'
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </label>

                            {errors.title && <p classTitle='add-validators'>{errors.title}</p>}

                            <label className='add-form-elements' >
                                Author:
                                <input
                                    className='book-inputs'
                                    type='text'
                                    placeholder='Book Author'
                                    value={author}
                                    maxLength='500'
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                            </label>

                            {errors.author && <p className='add-validators'>{errors.author}</p>}
                            
                            <label className='add-form-elements' >
                                Number of Pages:
                                <input
                                    className='book-inputs'
                                    type='number'
                                    value={pageNum}
                                    onChange={(e) => setPageNum(e.target.value)}
                                />
                            </label>

                            {errors.pageNum && <p className='add-validators'>{errors.pageNum}</p>}
                            
                            <label className='add-form-elements' >
                                Year Published:
                                <input
                                    className='book-inputs'
                                    type='number'
                                    value={yrPub}
                                    onChange={(e) => setYrPub(e.target.value)}
                                />
                            </label>

                            {errors.yrPub && <p className='add-validators'>{errors.yrPub}</p>}

                            <label className='add-form-elements' >
                                Genre:
                                <input
                                    className='book-inputs'
                                    type='text'
                                    placeholder='Book Genre'
                                    value={genre}
                                    maxLength='255'
                                    onChange={(e) => setGenre(e.target.value)}
                                />
                            </label>

                            {errors.genre && <p className='add-validators'>{errors.genre}</p>}

                            <label className='add-form-elements' >
                                Book Cover:
                                <input
                                    className='book-inputs'
                                    type='file'
                                    accept='.pdf, .png, .jpg, .jpeg, .gif'
                                    onChange={(e) => setPicture(e.target.files[0])}
                                />
                            </label>

                            {errors.picture && <p className='add-validators'>{errors.picture}</p>}

                            <label className='add-form-elements'>
                                Description:
                                <textarea
                                    type="text"
                                    placeholder="Book description..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows="10"
                                    cols="35"
                                />
                            </label>

                            {errors.description && <p className='add-validators'>{errors.description}</p>}

                        </section>
                        <button id='add-book-btn' type="submit">Create Book</button>
                        {(imageLoading) && <p>Loading...</p>}
                    </div>
                </form>
            </div>
        </div>
    )
}