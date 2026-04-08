from flask import Blueprint, jsonify, request
from server.models import (
    SliderImage, NewsUpdate, Department, StaffMember, BoardMember, 
    Product, ProductCategory, DownloadableForm, AboutContent, CoreValue, Award, GalleryAlbum, db
)

public_api_bp = Blueprint('public_api', __name__)

@public_api_bp.route('/home')
def home():
    """Get home page data"""
    try:
        sliders = SliderImage.query.filter_by(is_active=True).order_by(SliderImage.display_order).limit(5).all()
        news = NewsUpdate.query.order_by(NewsUpdate.publish_date.desc()).limit(3).all()
        featured_products = Product.query.filter_by(is_popular=True, is_active=True).limit(3).all()
        
        return jsonify({
            'sliders': [s.to_dict() for s in sliders],
            'news': [n.to_dict() for n in news],
            'featured_products': [p.to_dict() for p in featured_products]
        })
    except Exception as e:
        print(f"Error in /home: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@public_api_bp.route('/about')
def about():
    """Get about page data"""
    try:
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
    except Exception as e:
        print(f"Error in /about: {str(e)}")
        return jsonify({'error': str(e)}), 500

@public_api_bp.route('/departments')
def departments():
    """Get all departments"""
    try:
        departments = Department.query.filter_by(is_active=True).order_by(Department.display_order).all()
        return jsonify([d.to_dict() for d in departments])
    except Exception as e:
        print(f"Error in /departments: {str(e)}")
        return jsonify({'error': str(e)}), 500

@public_api_bp.route('/departments/<slug>')
def department_detail(slug):
    """Get department detail with staff"""
    try:
        department = Department.query.filter_by(slug=slug, is_active=True).first()
        if not department:
            return jsonify({'error': 'Department not found'}), 404
        
        staff = StaffMember.query.filter_by(department_id=department.id, is_active=True).order_by(StaffMember.display_order).all()
        
        return jsonify({
            'department': department.to_dict(),
            'staff': [s.to_dict() for s in staff]
        })
    except Exception as e:
        print(f"Error in /departments/{slug}: {str(e)}")
        return jsonify({'error': str(e)}), 500

@public_api_bp.route('/board')
def board():
    """Get board members"""
    try:
        executive = BoardMember.query.filter_by(category='Executive', is_active=True).order_by(BoardMember.display_order).all()
        board = BoardMember.query.filter_by(category='Board', is_active=True).order_by(BoardMember.display_order).all()
        supervisory = BoardMember.query.filter_by(category='Supervisory', is_active=True).order_by(BoardMember.display_order).all()
        
        return jsonify({
            'executive': [e.to_dict() for e in executive],
            'board': [b.to_dict() for b in board],
            'supervisory': [s.to_dict() for s in supervisory]
        })
    except Exception as e:
        print(f"Error in /board: {str(e)}")
        return jsonify({'error': str(e)}), 500

@public_api_bp.route('/products')
def products():
    try:
        product_type = request.args.get('type')
        category_slug = request.args.get('category')
        
        query = Product.query.filter_by(is_active=True)
        
        if product_type:
            query = query.filter_by(product_type=product_type)
        
        if category_slug:
            category = ProductCategory.query.filter_by(slug=category_slug).first()
            if category:
                query = query.filter_by(product_category_id=category.id)
        
        products = query.order_by(Product.display_order).all()
        categories = ProductCategory.query.order_by(ProductCategory.display_order).all()
        
        return jsonify({
            'categories': [c.to_dict() for c in categories],
            'products': [p.to_dict(include_features=True, include_category=True) for p in products]
        })
    except Exception as e:
        print(f"Error in /products: {str(e)}")
        return jsonify({'error': str(e)}), 500

@public_api_bp.route('/downloads')
def downloads():
    """Get downloadable forms"""
    try:
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
    except Exception as e:
        print(f"Error in /downloads: {str(e)}")
        return jsonify({'error': str(e)}), 500

@public_api_bp.route('/downloads/<int:id>/track', methods=['POST'])
def track_download(id):
    """Track download count for a form"""
    try:
        form = DownloadableForm.query.get(id)
        if not form:
            return jsonify({'error': 'Form not found'}), 404
        
        # Increment download count
        form.download_count = (form.download_count or 0) + 1
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'download_count': form.download_count
        })
    except Exception as e:
        db.session.rollback()
        print(f"Error tracking download: {str(e)}")
        return jsonify({'error': str(e)}), 500

@public_api_bp.route('/news')
def news():
    """Get all news"""
    try:
        news_list = NewsUpdate.query.order_by(NewsUpdate.publish_date.desc()).all()
        return jsonify([n.to_dict() for n in news_list])
    except Exception as e:
        print(f"Error in /news: {str(e)}")
        return jsonify({'error': str(e)}), 500

@public_api_bp.route('/news/<int:id>')
def news_detail(id):
    """Get single news article"""
    try:
        news_item = NewsUpdate.query.get(id)
        if not news_item:
            return jsonify({'error': 'News not found'}), 404
        
        return jsonify(news_item.to_dict())
    except Exception as e:
        print(f"Error in /news/{id}: {str(e)}")
        return jsonify({'error': str(e)}), 500
    
@public_api_bp.route('/albums')
def public_albums():
    albums = GalleryAlbum.query.filter_by(is_active=True).order_by(GalleryAlbum.display_order).all()
    return jsonify([a.to_dict() for a in albums])

@public_api_bp.route('/albums/<int:id>')
def public_album(id):
    album = GalleryAlbum.query.filter_by(id=id, is_active=True).first_or_404()
    return jsonify(album.to_dict())