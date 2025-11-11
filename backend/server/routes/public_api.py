from flask import Blueprint, render_template, request
from models import SliderImage, NewsUpdate, Department, StaffMember, BoardMember, Product, ProductCategory, DownloadableForm, AboutContent, CoreValue, Award

public_bp = Blueprint('public', __name__)

@public_bp.route('/')
def home():
    sliders = SliderImage.query.filter_by(is_active=True).order_by(SliderImage.display_order).limit(5).all()
    news = NewsUpdate.query.order_by(NewsUpdate.publish_date.desc()).limit(3).all()
    featured_products = Product.query.filter_by(is_popular=True, is_active=True).limit(3).all()
    
    return render_template('public/home.html', sliders=sliders, news=news, featured_products=featured_products)

@public_bp.route('/about')
def about():
    about_content = AboutContent.query.filter_by(section_key='brief').first()
    mission = AboutContent.query.filter_by(section_key='mission').first()
    vision = AboutContent.query.filter_by(section_key='vision').first()
    values = CoreValue.query.order_by(CoreValue.display_order).all()
    awards = Award.query.order_by(Award.year.desc()).all()
    
    return render_template('public/about.html', 
                         about_content=about_content,
                         mission=mission,
                         vision=vision,
                         values=values,
                         awards=awards)

@public_bp.route('/departments')
def departments():
    departments = Department.query.filter_by(is_active=True).order_by(Department.display_order).all()
    return render_template('public/departments.html', departments=departments)

@public_bp.route('/departments/<slug>')
def department_detail(slug):
    department = Department.query.filter_by(slug=slug, is_active=True).first_or_404()
    staff = StaffMember.query.filter_by(department_id=department.id, is_active=True).order_by(StaffMember.display_order).all()
    return render_template('public/department_detail.html', department=department, staff=staff)

@public_bp.route('/board')
def board():
    executive = BoardMember.query.filter_by(category='Executive', is_active=True).order_by(BoardMember.display_order).all()
    board = BoardMember.query.filter_by(category='Board', is_active=True).order_by(BoardMember.display_order).all()
    supervisory = BoardMember.query.filter_by(category='Supervisory', is_active=True).order_by(BoardMember.display_order).all()
    
    return render_template('public/board.html', executive=executive, board=board, supervisory=supervisory)

@public_bp.route('/products')
def products():
    categories = ProductCategory.query.order_by(ProductCategory.display_order).all()
    category_slug = request.args.get('category')
    
    if category_slug:
        category = ProductCategory.query.filter_by(slug=category_slug).first()
        products = Product.query.filter_by(product_category_id=category.id, is_active=True).order_by(Product.display_order).all() if category else []
    else:
        products = Product.query.filter_by(is_active=True).order_by(Product.display_order).all()
    
    return render_template('public/products.html', categories=categories, products=products)

@public_bp.route('/downloads')
def downloads():
    category = request.args.get('category')
    search = request.args.get('search')
    
    query = DownloadableForm.query.filter_by(is_active=True)
    
    if category:
        query = query.filter_by(category=category)
    if search:
        query = query.filter(DownloadableForm.title.ilike(f'%{search}%'))
    
    forms = query.order_by(DownloadableForm.upload_date.desc()).all()
    categories = db.session.query(DownloadableForm.category).distinct().all()
    
    return render_template('public/downloads.html', forms=forms, categories=categories)

@public_bp.route('/news')
def news():
    news_list = NewsUpdate.query.order_by(NewsUpdate.publish_date.desc()).all()
    return render_template('public/news.html', news=news_list)

@public_bp.route('/contact')
def contact():
    return render_template('public/contact.html')