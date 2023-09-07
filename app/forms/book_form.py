from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField, TextAreaField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.AWS_helpers import IMAGE_ALLOWED_EXTENSIONS

"""
need to add enctype="multipart/form-data" to any form tag
on the template for this form for AWS to work
"""

class BookForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    author = StringField('Author', validators=[DataRequired()])
    page_num = IntegerField('Number of Pages', validators=[DataRequired()])
    yr_published = IntegerField('Year Published', validators=[DataRequired()])
    genre = StringField('Genre', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    picture = FileField('Image URL', validators=[FileRequired(), FileAllowed(list(IMAGE_ALLOWED_EXTENSIONS))])
    submit = SubmitField('Add New Book')