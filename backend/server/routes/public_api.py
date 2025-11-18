from flask import Blueprint, jsonify, request
from models import (
    SliderImage, NewsUpdate, Department, StaffMember, BoardMember, 
    Product, ProductCategory, DownloadableForm, AboutContent, CoreValue, Award, db
)

# Modify your existing public_bp to return JSON
public_api_bp = Blueprint('public_api', __name__, url_prefix='/api/public')

@public_api_bp.route('/home')
def home():
    """Get home page data"""
    sliders = SliderImage.query.filter_by(is_active=True).order_by(SliderImage.display_order).limit(5).all()
    news = NewsUpdate.query.order_by(NewsUpdate.publish_date.desc()).limit(3).all()
    featured_products = Product.query.filter_by(is_popular=True, is_active=True).limit(3).all()
    
    return jsonify({
        'sliders': [s.to_dict() for s in sliders],
        'news': [n.to_dict() for n in news],
        'featured_products': [p.to_dict() for p in featured_products]
    })

@public_api_bp.route('/about')
def about():
    """Get about page data"""
    about_content = AboutContent.query.filter_by(section_key='brief').first()
    mission = AboutContent.query.filter_by(section_key='mission').first()
    vision = AboutContent.query.filter_by(section_key='vision').first()
    values = CoreValue.query.order_by(CoreValue.display_order).all()
    awards = Award.query.order_by(Award.year.desc()).all()
    
    return jsonify({
        'about_content': about_content.to_dict() if about_content else None,
        'mission': mission.to_dict() if mission else None,
        'vision': vision.to_dict() if vision else None,
        'values': [v.to_dict() for v in values],
        'awards': [a.to_dict() for a in awards]
    })

@public_api_bp.route('/departments')
def departments():
    """Get all departments"""
    departments = Department.query.filter_by(is_active=True).order_by(Department.display_order).all()
    return jsonify([d.to_dict() for d in departments])

@public_api_bp.route('/departments/<slug>')
def department_detail(slug):
    """Get department detail with staff"""
    department = Department.query.filter_by(slug=slug, is_active=True).first()
    if not department:
        return jsonify({'error': 'Department not found'}), 404
    
    staff = StaffMember.query.filter_by(department_id=department.id, is_active=True).order_by(StaffMember.display_order).all()
    
    return jsonify({
        'department': department.to_dict(),
        'staff': [s.to_dict() for s in staff]
    })

@public_api_bp.route('/board')
def board():
    """Get board members"""
    executive = BoardMember.query.filter_by(category='Executive', is_active=True).order_by(BoardMember.display_order).all()
    board = BoardMember.query.filter_by(category='Board', is_active=True).order_by(BoardMember.display_order).all()
    supervisory = BoardMember.query.filter_by(category='Supervisory', is_active=True).order_by(BoardMember.display_order).all()
    
    return jsonify({
        'executive': [e.to_dict() for e in executive],
        'board': [b.to_dict() for b in board],
        'supervisory': [s.to_dict() for s in supervisory]
    })

@public_api_bp.route('/products')
def products():
    """Get products with optional category filter"""
    categories = ProductCategory.query.order_by(ProductCategory.display_order).all()
    category_slug = request.args.get('category')
    
    if category_slug:
        category = ProductCategory.query.filter_by(slug=category_slug).first()
        products = Product.query.filter_by(product_category_id=category.id, is_active=True).order_by(Product.display_order).all() if category else []
    else:
        products = Product.query.filter_by(is_active=True).order_by(Product.display_order).all()
    
    return jsonify({
        'categories': [c.to_dict() for c in categories],
        'products': [p.to_dict() for p in products]
    })

@public_api_bp.route('/downloads')
def downloads():
    """Get downloadable forms"""
    category = request.args.get('category')
    search = request.args.get('search')
    
    query = DownloadableForm.query.filter_by(is_active=True)
    
    if category:
        query = query.filter_by(category=category)
    if search:
        query = query.filter(DownloadableForm.title.ilike(f'%{search}%'))
    
    forms = query.order_by(DownloadableForm.upload_date.desc()).all()
    categories_list = db.session.query(DownloadableForm.category).distinct().all()
    
    return jsonify({
        'forms': [f.to_dict() for f in forms],
        'categories': [c[0] for c in categories_list if c[0]]
    })

@public_api_bp.route('/news')
def news():
    """Get all news"""
    news_list = NewsUpdate.query.order_by(NewsUpdate.publish_date.desc()).all()
    return jsonify([n.to_dict() for n in news_list])

@public_api_bp.route('/news/<int:id>')
def news_detail(id):
    """Get single news article"""
    news_item = NewsUpdate.query.get(id)
    if not news_item:
        return jsonify({'error': 'News not found'}), 404
    
    return jsonify(news_item.to_dict())