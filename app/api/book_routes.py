from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, Review, Book, db
from ..forms.book_form import BookForm
from .AWS_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3


books = Blueprint('books', __name__)


@books.route('')
def all_books():
    get_books = Book.query.all()
    response = [book.to_dict() for book in get_books]
    return response


@books.route('/add', methods=["POST"])
@login_required
def post_book():
    form = BookForm()

    form["csrf_token"].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        picture = form.data["picture"]
        picture.filename = get_unique_filename(picture.filename)
        upload = upload_file_to_s3(picture)

        if "url" not in upload:
            print([upload])
            return {'errors': upload}

        new_book = Book(
            title=form.data['title'],
            author=form.data['author'],
            page_num=form.data['page_num'],
            yr_published=form.data['yr_published'],
            genre=form.data['genre'],
            description=form.data['description'],
            user_id=current_user.id,
            picture=upload['url'],
        )

        db.session.add(new_book)
        db.session.commit()
        return {'newBook': new_book.to_dict()}

    else:
        print(form.errors)
        return {"errors": form.errors}


@books.route('/<int:id>')
def get_one_book(id):
    one_book = Book.query.get(id)
    return one_book.to_dict()