from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, Review, Book, db

books = Blueprint('books', __name__)


@books.route('')
def all_books():
    get_books = Book.query.all()
    response = [book.to_dict() for book in get_books]
    return response