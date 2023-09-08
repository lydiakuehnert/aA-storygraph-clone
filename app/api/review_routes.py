from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Review, Book, db
from ..forms import ReviewForm
from datetime import datetime


reviews = Blueprint('reviews', __name__)


@reviews.route('/<int:bookId>')
def all_reviews(bookId):
    get_reviews = Review.query.filter(Review.book_id == bookId).all()
    response = [review.to_dict() for review in get_reviews]
    return response


@reviews.route('/edit/<int:id>', methods=['PUT'])
@login_required
def update_review(id):
    form = ReviewForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        review_to_update = Review.query.get(id)
        review_to_update.review = form.data['review']
        review_to_update.date = datetime.utcnow()
        db.session.commit()
        return review_to_update.to_dict()

    else:
        print(form.errors)
        return {"errors": form.errors}



@reviews.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review_to_delete = Review.query.get(id)
    db.session.delete(review_to_delete)
    db.session.commit()
    return {"Success": "successfully deleted"}