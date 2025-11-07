from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from datetime import datetime, date
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy(metadata=MetaData())


class AdminUser(db.Model):
    __tablename__ = 'admin_users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    full_name = db.Column(db.String(200))
    role = db.Column(db.String(50), default='editor')
    last_login = db.Column(db.DateTime)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self, include_sensitive=False):
        data = {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'full_name': self.full_name,
            'role': self.role,
            'last_login': self.last_login.isoformat() if self.last_login else None,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
        if include_sensitive:
            data['password_hash'] = self.password_hash
        return data
    
    def __repr__(self):
        return f'<AdminUser {self.username}>'


# SLIDER & HOMEPAGE 

class SliderImage(db.Model):
    __tablename__ = 'slider_images'
    
    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(500), nullable=False)
    title = db.Column(db.String(200))
    subtitle = db.Column(db.String(300))
    link_url = db.Column(db.String(500))
    display_order = db.Column(db.Integer, default=0)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'image_url': self.image_url,
            'title': self.title,
            'subtitle': self.subtitle,
            'link_url': self.link_url,
            'display_order': self.display_order,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<SliderImage {self.title}>'

    
class NewsUpdate(db.Model):
    __tablename__ = 'news_updates'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(300), nullable=False)
    category = db.Column(db.String(50))
    featured_image = db.Column(db.String(500))
    excerpt = db.Column(db.Text)
    content = db.Column(db.Text)
    author = db.Column(db.String(100))
    publish_date = db.Column(db.Date, default=datetime.utcnow)
    is_featured = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self, include_content=True):
        data = {
            'id': self.id,
            'title': self.title,
            'category': self.category,
            'featured_image': self.featured_image,
            'excerpt': self.excerpt,
            'author': self.author,
            'publish_date': self.publish_date.isoformat() if self.publish_date else None,
            'is_featured': self.is_featured,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
        if include_content:
            data['content'] = self.content
        return data
    
    def __repr__(self):
        return f'<NewsUpdate {self.title}>'
    

# About us content

class AboutContent(db.Model):
    __tablename__ = 'about_content'
    
    id = db.Column(db.Integer, primary_key=True)
    section_key = db.Column(db.String(50), unique=True, nullable=False)
    title = db.Column(db.String(200))
    content = db.Column(db.Text)
    image_url = db.Column(db.String(500))
    video_url = db.Column(db.String(500))
    display_order = db.Column(db.Integer, default=0)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'section_key': self.section_key,
            'title': self.title,
            'content': self.content,
            'image_url': self.image_url,
            'video_url': self.video_url,
            'display_order': self.display_order,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<AboutContent {self.section_key}>'
        

class CoreValue(db.Model):
    __tablename__ = 'core_values'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    icon_class = db.Column(db.String(100))
    display_order = db.Column(db.Integer, default=0)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'icon_class': self.icon_class,
            'display_order': self.display_order
        }
    
    def __repr__(self):
        return f'<CoreValue {self.title}>'


class Award(db.Model):
    __tablename__ = 'awards'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(300), nullable=False)
    year = db.Column(db.Integer)
    description = db.Column(db.Text)
    icon_url = db.Column(db.String(500))
    display_order = db.Column(db.Integer, default=0)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'year': self.year,
            'description': self.description,
            'icon_url': self.icon_url,
            'display_order': self.display_order
        }
    
    def __repr__(self):
        return f'<Award {self.title}>'


# Departments and Staff

class Department(db.Model):
    __tablename__ = 'departments'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    slug = db.Column(db.String(100), unique=True)
    description = db.Column(db.Text)
    key_responsibilities = db.Column(db.Text)
    icon_class = db.Column(db.String(100))
    display_order = db.Column(db.Integer, default=0)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    staff_members = db.relationship('StaffMember', backref='department', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self, include_staff=False):
        data = {
            'id': self.id,
            'name': self.name,
            'slug': self.slug,
            'description': self.description,
            'key_responsibilities': self.key_responsibilities,
            'icon_class': self.icon_class,
            'display_order': self.display_order,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'staff_count': len(self.staff_members)
        }
        if include_staff:
            data['staff_members'] = [staff.to_dict() for staff in self.staff_members]
        return data
    
    def __repr__(self):
        return f'<Department {self.name}>'

    
class StaffMember(db.Model):
    __tablename__ = 'staff_members'
    
    id = db.Column(db.Integer, primary_key=True)
    department_id = db.Column(db.Integer, db.ForeignKey('departments.id'), nullable=False)
    full_name = db.Column(db.String(200), nullable=False)
    position = db.Column(db.String(150))
    photo_url = db.Column(db.String(500))
    email = db.Column(db.String(150))
    phone = db.Column(db.String(20))
    education = db.Column(db.String(300))
    bio = db.Column(db.Text)
    display_order = db.Column(db.Integer, default=0)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self, include_department=False):
        data = {
            'id': self.id,
            'department_id': self.department_id,
            'full_name': self.full_name,
            'position': self.position,
            'photo_url': self.photo_url,
            'email': self.email,
            'phone': self.phone,
            'education': self.education,
            'bio': self.bio,
            'display_order': self.display_order,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
        if include_department and self.department:
            data['department'] = {
                'id': self.department.id,
                'name': self.department.name,
                'slug': self.department.slug
            }
        return data
    
    def __repr__(self):
        return f'<StaffMember {self.full_name}>'


class BoardMember(db.Model):
    __tablename__ = 'board_members'
    
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(200), nullable=False)
    position = db.Column(db.String(150))
    category = db.Column(db.String(50))
    photo_url = db.Column(db.String(500))
    email = db.Column(db.String(150))
    phone = db.Column(db.String(20))
    education = db.Column(db.String(300))
    bio = db.Column(db.Text)
    display_order = db.Column(db.Integer, default=0)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'position': self.position,
            'category': self.category,
            'photo_url': self.photo_url,
            'email': self.email,
            'phone': self.phone,
            'education': self.education,
            'bio': self.bio,
            'display_order': self.display_order,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<BoardMember {self.full_name}>'


# Products

class ProductCategory(db.Model):
    __tablename__ = 'product_categories'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    slug = db.Column(db.String(100), unique=True)
    description = db.Column(db.Text)
    display_order = db.Column(db.Integer, default=0)
    
    products = db.relationship('Product', backref='category', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self, include_products=False):
        data = {
            'id': self.id,
            'name': self.name,
            'slug': self.slug,
            'description': self.description,
            'display_order': self.display_order,
            'product_count': len(self.products)
        }
        if include_products:
            data['products'] = [product.to_dict() for product in self.products]
        return data
    
    def __repr__(self):
        return f'<ProductCategory {self.name}>'


class Product(db.Model):
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True)
    product_category_id = db.Column(db.Integer, db.ForeignKey('product_categories.id'), nullable=False)
    name = db.Column(db.String(200), nullable=False)
    slug = db.Column(db.String(200), unique=True)
    max_amount = db.Column(db.String(100))
    description = db.Column(db.Text)
    repayment_period = db.Column(db.String(100))
    interest_rate = db.Column(db.String(50))
    icon_class = db.Column(db.String(100))
    is_popular = db.Column(db.Boolean, default=False)
    display_order = db.Column(db.Integer, default=0)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    features = db.relationship('ProductFeature', backref='product', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self, include_features=True, include_category=False):
        data = {
            'id': self.id,
            'product_category_id': self.product_category_id,
            'name': self.name,
            'slug': self.slug,
            'max_amount': self.max_amount,
            'description': self.description,
            'repayment_period': self.repayment_period,
            'interest_rate': self.interest_rate,
            'icon_class': self.icon_class,
            'is_popular': self.is_popular,
            'display_order': self.display_order,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
        if include_features:
            data['features'] = [feature.to_dict() for feature in self.features]
        if include_category and self.category:
            data['category'] = {
                'id': self.category.id,
                'name': self.category.name,
                'slug': self.category.slug
            }
        return data
    
    def __repr__(self):
        return f'<Product {self.name}>'


class ProductFeature(db.Model):
    __tablename__ = 'product_features'
    
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    feature_text = db.Column(db.String(500), nullable=False)
    display_order = db.Column(db.Integer, default=0)
    
    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'feature_text': self.feature_text,
            'display_order': self.display_order
        }
    
    def __repr__(self):
        return f'<ProductFeature {self.feature_text[:30]}>'


# Downloads

class DownloadableForm(db.Model):
    __tablename__ = 'downloadable_forms'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(300), nullable=False)
    category = db.Column(db.String(100))
    file_url = db.Column(db.String(500), nullable=False)
    file_size = db.Column(db.String(50))
    file_type = db.Column(db.String(20))
    download_count = db.Column(db.Integer, default=0)
    upload_date = db.Column(db.Date, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'category': self.category,
            'file_url': self.file_url,
            'file_size': self.file_size,
            'file_type': self.file_type,
            'download_count': self.download_count,
            'upload_date': self.upload_date.isoformat() if self.upload_date else None,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<DownloadableForm {self.title}>'