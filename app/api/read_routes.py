from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Review, Book, db, readalready
from sqlalchemy import delete


readalready_bp = Blueprint('readalready', __name__)

@readalready_bp.route('')
@login_required
def user_read_books():
    curr_user = User.query.get(current_user.id)
    readbooks = [book.to_dict() for book in curr_user.user_read]
    return readbooks

@readalready_bp.route('/<int:bookId>', methods=['POST'])
@login_required
def create_read(bookId):
    curr_user = User.query.get(current_user.id)
    db.session.execute(readalready.insert().values(user_id=curr_user.id, book_id=bookId))
    db.session.commit()
    new_user = curr_user.to_dict()
    return new_user

@readalready_bp.route('/<int:bookId>', methods=["DELETE"])
@login_required
def delete_read(bookId):
    curr_user = User.query.get(current_user.id)
    db.session.execute(delete(readalready).where((readalready.c.user_id == curr_user.id) & (readalready.c.book_id == bookId)))
    db.session.commit()
    new_user = curr_user.to_dict()
    return new_user
