from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import (
    db, AdminUser, SliderImage, NewsUpdate, AboutContent, CoreValue, 
    Award, Department, StaffMember, BoardMember, ProductCategory, 
    Product, ProductFeature, DownloadableForm
)
from werkzeug.utils import secure_filename
from datetime import datetime
import os

admin_api_bp = Blueprint('admin_api', __name__)

# ==================== HELPER FUNCTIONS ====================

def admin_required(fn):
    """Decorator to check if user is admin"""
    @jwt_required()
    def wrapper(*args, **kwargs):
        user_id = get_jwt_identity()
        user = AdminUser.query.get(user_id)
        if not user or not user.is_active:
            return jsonify({'message': 'Admin access required'}), 403
        return fn(*args, **kwargs)
    wrapper.__name__ = fn.__name__
    return wrapper


def save_file(file, folder):
    """Save uploaded file and return URL"""
    if file and file.filename:
        # Get the original filename and replace spaces with underscores
        original_filename = secure_filename(file.filename)
        original_filename = original_filename.replace(' ', '_')
        
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S_')
        filename = timestamp + original_filename
        
        # Create the full folder path
        folder_path = os.path.join(current_app.config['UPLOAD_FOLDER'], folder)
        
        # Create directory if it doesn't exist
        os.makedirs(folder_path, exist_ok=True)
        
        # Save the file
        filepath = os.path.join(folder_path, filename)
        file.save(filepath)
        
        # Log for debugging
        print(f"File saved to: {filepath}")
        print(f"File exists: {os.path.exists(filepath)}")
        print(f"Returning URL: /static/uploads/{folder}/{filename}")
        
        return f'/static/uploads/{folder}/{filename}'
    return None
# ==================== DASHBOARD STATS ====================

@admin_api_bp.route('/dashboard/stats', methods=['GET'])
@admin_required
def dashboard_stats():
    """Get dashboard statistics"""
    try:
        stats = {
            'total_products': Product.query.count(),
            'total_staff': StaffMember.query.count(),
            'total_board_members': BoardMember.query.count(),
            'total_departments': Department.query.count(),
            'total_downloads': DownloadableForm.query.count(),
            'total_news': NewsUpdate.query.count(),
            'total_sliders': SliderImage.query.count(),
        }
        
        recent_news = NewsUpdate.query.order_by(NewsUpdate.created_at.desc()).limit(5).all()
        recent_downloads = DownloadableForm.query.order_by(DownloadableForm.created_at.desc()).limit(5).all()
        
        return jsonify({
            'stats': stats,
            'recent_news': [n.to_dict(include_content=False) for n in recent_news],
            'recent_downloads': [d.to_dict() for d in recent_downloads]
        }), 200
    except Exception as e:
        return jsonify({'message': 'Failed to fetch stats', 'error': str(e)}), 500

# ==================== SLIDER MANAGEMENT ====================

@admin_api_bp.route('/sliders', methods=['GET'])
@admin_required
def get_sliders():
    """Get all slider images"""
    try:
        sliders = SliderImage.query.order_by(SliderImage.display_order).all()
        return jsonify([s.to_dict() for s in sliders]), 200
    except Exception as e:
        return jsonify({'message': 'Failed to fetch sliders', 'error': str(e)}), 500

@admin_api_bp.route('/sliders', methods=['POST'])
@admin_required
def create_slider():
    """Create new slider image"""
    try:
        data = request.form
        image = request.files.get('image')
        
        if not image:
            return jsonify({'message': 'Image is required'}), 400
        
        image_url = save_file(image, 'slider')
        
        slider = SliderImage(
            image_url=image_url,
            title=data.get('title'),
            subtitle=data.get('subtitle'),
            link_url=data.get('link_url'),
            display_order=data.get('display_order', 0),
            is_active=data.get('is_active', 'true').lower() == 'true'
        )
        
        db.session.add(slider)
        db.session.commit()
        
        return jsonify(slider.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to create slider', 'error': str(e)}), 500

@admin_api_bp.route('/sliders/<int:id>', methods=['GET'])
@admin_required
def get_slider(id):
    """Get single slider"""
    try:
        slider = SliderImage.query.get_or_404(id)
        return jsonify(slider.to_dict()), 200
    except Exception as e:
        return jsonify({'message': 'Slider not found', 'error': str(e)}), 404

@admin_api_bp.route('/sliders/<int:id>', methods=['PUT'])
@admin_required
def update_slider(id):
    """Update slider image"""
    try:
        slider = SliderImage.query.get_or_404(id)
        data = request.form
        image = request.files.get('image')
        
        if image:
            slider.image_url = save_file(image, 'slider')
        
        slider.title = data.get('title', slider.title)
        slider.subtitle = data.get('subtitle', slider.subtitle)
        slider.link_url = data.get('link_url', slider.link_url)
        slider.display_order = data.get('display_order', slider.display_order)
        slider.is_active = data.get('is_active', str(slider.is_active)).lower() == 'true'
        slider.updated_at = datetime.utcnow()
        
        db.session.commit()
        return jsonify(slider.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to update slider', 'error': str(e)}), 500

@admin_api_bp.route('/sliders/<int:id>', methods=['DELETE'])
@admin_required
def delete_slider(id):
    """Delete slider image"""
    try:
        slider = SliderImage.query.get_or_404(id)
        db.session.delete(slider)
        db.session.commit()
        return jsonify({'message': 'Slider deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to delete slider', 'error': str(e)}), 500

# ==================== NEWS MANAGEMENT ====================

@admin_api_bp.route('/news', methods=['GET'])
@admin_required
def get_all_news():
    """Get all news"""
    try:
        category = request.args.get('category')
        query = NewsUpdate.query
        
        if category:
            query = query.filter_by(category=category)
        
        news = query.order_by(NewsUpdate.publish_date.desc()).all()
        return jsonify([n.to_dict(include_content=False) for n in news]), 200
    except Exception as e:
        return jsonify({'message': 'Failed to fetch news', 'error': str(e)}), 500

@admin_api_bp.route('/news', methods=['POST'])
@admin_required
def create_news():
    """Create new news article"""
    try:
        data = request.form
        featured_image = request.files.get('featured_image')
        
        image_url = save_file(featured_image, 'news') if featured_image else None
        
        # Parse publish_date
        publish_date = None
        if data.get('publish_date'):
            publish_date = datetime.strptime(data.get('publish_date'), '%Y-%m-%d').date()
        
        news = NewsUpdate(
            title=data.get('title'),
            category=data.get('category'),
            featured_image=image_url,
            excerpt=data.get('excerpt'),
            content=data.get('content'),
            author=data.get('author'),
            publish_date=publish_date,
            is_featured=data.get('is_featured', 'false').lower() == 'true'
        )
        
        db.session.add(news)
        db.session.commit()
        
        return jsonify(news.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to create news', 'error': str(e)}), 500

@admin_api_bp.route('/news/<int:id>', methods=['GET'])
@admin_required
def get_news(id):
    """Get single news article"""
    try:
        news = NewsUpdate.query.get_or_404(id)
        return jsonify(news.to_dict()), 200
    except Exception as e:
        return jsonify({'message': 'News not found', 'error': str(e)}), 404

@admin_api_bp.route('/news/<int:id>', methods=['PUT'])
@admin_required
def update_news(id):
    """Update news article"""
    try:
        news = NewsUpdate.query.get_or_404(id)
        data = request.form
        featured_image = request.files.get('featured_image')
        
        if featured_image:
            news.featured_image = save_file(featured_image, 'news')
        
        news.title = data.get('title', news.title)
        news.category = data.get('category', news.category)
        news.excerpt = data.get('excerpt', news.excerpt)
        news.content = data.get('content', news.content)
        news.author = data.get('author', news.author)
        
        if data.get('publish_date'):
            news.publish_date = datetime.strptime(data.get('publish_date'), '%Y-%m-%d').date()
        
        news.is_featured = data.get('is_featured', str(news.is_featured)).lower() == 'true'
        news.updated_at = datetime.utcnow()
        
        db.session.commit()
        return jsonify(news.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to update news', 'error': str(e)}), 500

@admin_api_bp.route('/news/<int:id>', methods=['DELETE'])
@admin_required
def delete_news(id):
    """Delete news article"""
    try:
        news = NewsUpdate.query.get_or_404(id)
        db.session.delete(news)
        db.session.commit()
        return jsonify({'message': 'News deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to delete news', 'error': str(e)}), 500

# ==================== ABOUT CONTENT MANAGEMENT ====================

@admin_api_bp.route('/about', methods=['GET'])
@admin_required
def get_about_content():
    """Get all about sections"""
    try:
        content = AboutContent.query.order_by(AboutContent.display_order).all()
        return jsonify([c.to_dict() for c in content]), 200
    except Exception as e:
        return jsonify({'message': 'Failed to fetch about content', 'error': str(e)}), 500

@admin_api_bp.route('/about/<section_key>', methods=['GET'])
@admin_required
def get_about_section(section_key):
    """Get specific about section"""
    try:
        content = AboutContent.query.filter_by(section_key=section_key).first_or_404()
        return jsonify(content.to_dict()), 200
    except Exception as e:
        return jsonify({'message': 'Section not found', 'error': str(e)}), 404

@admin_api_bp.route('/about/<section_key>', methods=['PUT', 'POST'])
@admin_required
def update_about_section(section_key):
    """Update or create about section"""
    try:
        content = AboutContent.query.filter_by(section_key=section_key).first()
        
        data = request.form
        image = request.files.get('image')
        
        if not content:
            content = AboutContent(section_key=section_key)
            db.session.add(content)
        
        if image:
            content.image_url = save_file(image, 'about')
        
        content.title = data.get('title', content.title)
        content.content = data.get('content', content.content)
        content.video_url = data.get('video_url', content.video_url)
        content.display_order = data.get('display_order', content.display_order)
        content.updated_at = datetime.utcnow()
        
        db.session.commit()
        return jsonify(content.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to update about section', 'error': str(e)}), 500

# ==================== CORE VALUES MANAGEMENT ====================

@admin_api_bp.route('/values', methods=['GET'])
@admin_required
def get_values():
    """Get all core values"""
    try:
        values = CoreValue.query.order_by(CoreValue.display_order).all()
        return jsonify([v.to_dict() for v in values]), 200
    except Exception as e:
        return jsonify({'message': 'Failed to fetch values', 'error': str(e)}), 500

@admin_api_bp.route('/values', methods=['POST'])
@admin_required
def create_value():
    """Create new core value"""
    try:
        data = request.get_json()
        
        value = CoreValue(
            title=data.get('title'),
            description=data.get('description'),
            icon_class=data.get('icon_class'),
            display_order=data.get('display_order', 0)
        )
        
        db.session.add(value)
        db.session.commit()
        
        return jsonify(value.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to create value', 'error': str(e)}), 500

@admin_api_bp.route('/values/<int:id>', methods=['PUT'])
@admin_required
def update_value(id):
    """Update core value"""
    try:
        value = CoreValue.query.get_or_404(id)
        data = request.get_json()
        
        value.title = data.get('title', value.title)
        value.description = data.get('description', value.description)
        value.icon_class = data.get('icon_class', value.icon_class)
        value.display_order = data.get('display_order', value.display_order)
        
        db.session.commit()
        return jsonify(value.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to update value', 'error': str(e)}), 500

@admin_api_bp.route('/values/<int:id>', methods=['DELETE'])
@admin_required
def delete_value(id):
    """Delete core value"""
    try:
        value = CoreValue.query.get_or_404(id)
        db.session.delete(value)
        db.session.commit()
        return jsonify({'message': 'Value deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to delete value', 'error': str(e)}), 500

# ==================== AWARDS MANAGEMENT ====================

@admin_api_bp.route('/awards', methods=['GET'])
# @admin_required
def get_awards():
    """Get all awards"""
    try:
        awards = Award.query.order_by(Award.year.desc()).all()
        return jsonify([a.to_dict() for a in awards]), 200
    except Exception as e:
        return jsonify({'message': 'Failed to fetch awards', 'error': str(e)}), 500

@admin_api_bp.route('/awards', methods=['POST'])
@admin_required
def create_award():
    """Create new award"""
    try:
        data = request.form
        icon = request.files.get('icon')
        
        icon_url = save_file(icon, 'awards') if icon else None
        
        award = Award(
            title=data.get('title'),
            year=int(data.get('year')) if data.get('year') else None,
            description=data.get('description'),
            icon_url=icon_url,
            display_order=data.get('display_order', 0)
        )
        
        db.session.add(award)
        db.session.commit()
        
        return jsonify(award.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to create award', 'error': str(e)}), 500

@admin_api_bp.route('/awards/<int:id>', methods=['PUT'])
@admin_required
def update_award(id):
    """Update award"""
    try:
        award = Award.query.get_or_404(id)
        data = request.form
        icon = request.files.get('icon')
        
        if icon:
            award.icon_url = save_file(icon, 'awards')
        
        award.title = data.get('title', award.title)
        if data.get('year'):
            award.year = int(data.get('year'))
        award.description = data.get('description', award.description)
        award.display_order = data.get('display_order', award.display_order)
        
        db.session.commit()
        return jsonify(award.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to update award', 'error': str(e)}), 500

@admin_api_bp.route('/awards/<int:id>', methods=['DELETE'])
@admin_required
def delete_award(id):
    """Delete award"""
    try:
        award = Award.query.get_or_404(id)
        db.session.delete(award)
        db.session.commit()
        return jsonify({'message': 'Award deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to delete award', 'error': str(e)}), 500

# ==================== DEPARTMENTS MANAGEMENT ====================

@admin_api_bp.route('/departments', methods=['GET'])
@admin_required
def get_departments():
    """Get all departments"""
    try:
        include_staff = request.args.get('include_staff', 'false').lower() == 'true'
        departments = Department.query.order_by(Department.display_order).all()
        return jsonify([d.to_dict(include_staff=include_staff) for d in departments]), 200
    except Exception as e:
        return jsonify({'message': 'Failed to fetch departments', 'error': str(e)}), 500

@admin_api_bp.route('/departments', methods=['POST'])
@admin_required
def create_department():
    """Create new department"""
    try:
        data = request.get_json()
        
        department = Department(
            name=data.get('name'),
            slug=data.get('slug'),
            description=data.get('description'),
            key_responsibilities=data.get('key_responsibilities'),
            icon_class=data.get('icon_class'),
            display_order=data.get('display_order', 0),
            is_active=data.get('is_active', True)
        )
        
        db.session.add(department)
        db.session.commit()
        
        return jsonify(department.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to create department', 'error': str(e)}), 500

@admin_api_bp.route('/departments/<int:id>', methods=['GET'])
@admin_required
def get_department(id):
    """Get single department"""
    try:
        include_staff = request.args.get('include_staff', 'false').lower() == 'true'
        department = Department.query.get_or_404(id)
        return jsonify(department.to_dict(include_staff=include_staff)), 200
    except Exception as e:
        return jsonify({'message': 'Department not found', 'error': str(e)}), 404

@admin_api_bp.route('/departments/<int:id>', methods=['PUT'])
@admin_required
def update_department(id):
    """Update department"""
    try:
        department = Department.query.get_or_404(id)
        data = request.get_json()
        
        department.name = data.get('name', department.name)
        department.slug = data.get('slug', department.slug)
        department.description = data.get('description', department.description)
        department.key_responsibilities = data.get('key_responsibilities', department.key_responsibilities)
        department.icon_class = data.get('icon_class', department.icon_class)
        department.display_order = data.get('display_order', department.display_order)
        department.is_active = data.get('is_active', department.is_active)
        department.updated_at = datetime.utcnow()
        
        db.session.commit()
        return jsonify(department.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to update department', 'error': str(e)}), 500

@admin_api_bp.route('/departments/<int:id>', methods=['DELETE'])
@admin_required
def delete_department(id):
    """Delete department"""
    try:
        department = Department.query.get_or_404(id)
        
        if department.staff_members:
            return jsonify({'message': 'Cannot delete department with staff members'}), 400
        
        db.session.delete(department)
        db.session.commit()
        return jsonify({'message': 'Department deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to delete department', 'error': str(e)}), 500

# ==================== STAFF MANAGEMENT ====================

@admin_api_bp.route('/staff', methods=['GET'])
#@admin_required
def get_staff():
    """Get all staff members"""
    try:
        department_id = request.args.get('department_id')
        include_department = request.args.get('include_department', 'false').lower() == 'true'
        
        query = StaffMember.query
        
        if department_id:
            query = query.filter_by(department_id=department_id)
        
        staff = query.order_by(StaffMember.display_order).all()
        return jsonify([s.to_dict(include_department=include_department) for s in staff]), 200
    except Exception as e:
        return jsonify({'message': 'Failed to fetch staff', 'error': str(e)}), 500

@admin_api_bp.route('/staff', methods=['POST'])
@admin_required
def create_staff():
    """Create new staff member"""
    try:
        data = request.form
        photo = request.files.get('photo')
        
        photo_url = save_file(photo, 'staff') if photo else None
        
        staff = StaffMember(
            department_id=data.get('department_id'),
            full_name=data.get('full_name'),
            position=data.get('position'),
            photo_url=photo_url,
            email=data.get('email'),
            phone=data.get('phone'),
            education=data.get('education'),
            bio=data.get('bio'),
            display_order=data.get('display_order', 0),
            is_active=data.get('is_active', 'true').lower() == 'true'
        )
        
        db.session.add(staff)
        db.session.commit()
        
        return jsonify(staff.to_dict(include_department=True)), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to create staff member', 'error': str(e)}), 500

@admin_api_bp.route('/staff/<int:id>', methods=['GET'])
@admin_required
def get_staff_member(id):
    """Get single staff member"""
    try:
        staff = StaffMember.query.get_or_404(id)
        return jsonify(staff.to_dict(include_department=True)), 200
    except Exception as e:
        return jsonify({'message': 'Staff member not found', 'error': str(e)}), 404

@admin_api_bp.route('/staff/<int:id>', methods=['PUT'])
@admin_required
def update_staff(id):
    """Update staff member"""
    try:
        staff = StaffMember.query.get_or_404(id)
        data = request.form
        photo = request.files.get('photo')
        
        if photo:
            staff.photo_url = save_file(photo, 'staff')
        
        staff.department_id = data.get('department_id', staff.department_id)
        staff.full_name = data.get('full_name', staff.full_name)
        staff.position = data.get('position', staff.position)
        staff.email = data.get('email', staff.email)
        staff.phone = data.get('phone', staff.phone)
        staff.education = data.get('education', staff.education)
        staff.bio = data.get('bio', staff.bio)
        staff.display_order = data.get('display_order', staff.display_order)
        staff.is_active = data.get('is_active', str(staff.is_active)).lower() == 'true'
        staff.updated_at = datetime.utcnow()
        
        db.session.commit()
        return jsonify(staff.to_dict(include_department=True)), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to update staff member', 'error': str(e)}), 500

@admin_api_bp.route('/staff/<int:id>', methods=['DELETE'])
@admin_required
def delete_staff(id):
    """Delete staff member"""
    try:
        staff = StaffMember.query.get_or_404(id)
        db.session.delete(staff)
        db.session.commit()
        return jsonify({'message': 'Staff member deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to delete staff member', 'error': str(e)}), 500


# ==================== BOARD MEMBERS MANAGEMENT ====================

@admin_api_bp.route('/board', methods=['GET'])
# @admin_required
def get_board_members():
    """Get all board members"""
    try:
        category = request.args.get('category')
        query = BoardMember.query
        
        if category:
            query = query.filter_by(category=category)
        
        board_members = query.order_by(BoardMember.display_order).all()
        return jsonify([b.to_dict() for b in board_members]), 200
    except Exception as e:
        return jsonify({'message': 'Failed to fetch board members', 'error': str(e)}), 500

@admin_api_bp.route('/board', methods=['POST'])
@admin_required
def create_board_member():
    """Create new board member"""
    try:
        data = request.form
        photo = request.files.get('photo')
        
        photo_url = save_file(photo, 'board') if photo else None
        
        board_member = BoardMember(
            full_name=data.get('full_name'),
            position=data.get('position'),
            category=data.get('category'),
            photo_url=photo_url,
            email=data.get('email'),
            phone=data.get('phone'),
            education=data.get('education'),
            bio=data.get('bio'),
            display_order=data.get('display_order', 0),
            is_active=data.get('is_active', 'true').lower() == 'true'
        )
        
        db.session.add(board_member)
        db.session.commit()
        
        return jsonify(board_member.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to create board member', 'error': str(e)}), 500

@admin_api_bp.route('/board/<int:id>', methods=['GET'])
@admin_required
def get_board_member(id):
    """Get single board member"""
    try:
        board_member = BoardMember.query.get_or_404(id)
        return jsonify(board_member.to_dict()), 200
    except Exception as e:
        return jsonify({'message': 'Board member not found', 'error': str(e)}), 404

@admin_api_bp.route('/board/<int:id>', methods=['PUT'])
@admin_required
def update_board_member(id):
    """Update board member"""
    try:
        board_member = BoardMember.query.get_or_404(id)
        data = request.form
        photo = request.files.get('photo')
        
        if photo:
            board_member.photo_url = save_file(photo, 'board')
        
        board_member.full_name = data.get('full_name', board_member.full_name)
        board_member.position = data.get('position', board_member.position)
        board_member.category = data.get('category', board_member.category)
        board_member.email = data.get('email', board_member.email)
        board_member.phone = data.get('phone', board_member.phone)
        board_member.education = data.get('education', board_member.education)
        board_member.bio = data.get('bio', board_member.bio)
        board_member.display_order = data.get('display_order', board_member.display_order)
        board_member.is_active = data.get('is_active', str(board_member.is_active)).lower() == 'true'
        board_member.updated_at = datetime.utcnow()
        
        db.session.commit()
        return jsonify(board_member.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to update board member', 'error': str(e)}), 500

@admin_api_bp.route('/board/<int:id>', methods=['DELETE'])
@admin_required
def delete_board_member(id):
    """Delete board member"""
    try:
        board_member = BoardMember.query.get_or_404(id)
        db.session.delete(board_member)
        db.session.commit()
        return jsonify({'message': 'Board member deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to delete board member', 'error': str(e)}), 500

# ==================== PRODUCT CATEGORIES MANAGEMENT ====================

@admin_api_bp.route('/product-categories', methods=['GET'])
@admin_required
def get_product_categories():
    """Get all product categories"""
    try:
        include_products = request.args.get('include_products', 'false').lower() == 'true'
        categories = ProductCategory.query.order_by(ProductCategory.display_order).all()
        return jsonify([c.to_dict(include_products=include_products) for c in categories]), 200
    except Exception as e:
        return jsonify({'message': 'Failed to fetch product categories', 'error': str(e)}), 500

@admin_api_bp.route('/product-categories', methods=['POST'])
@admin_required
def create_product_category():
    """Create new product category"""
    try:
        data = request.get_json()
        
        category = ProductCategory(
            name=data.get('name'),
            slug=data.get('slug'),
            description=data.get('description'),
            display_order=data.get('display_order', 0)
        )
        
        db.session.add(category)
        db.session.commit()
        
        return jsonify(category.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to create product category', 'error': str(e)}), 500

@admin_api_bp.route('/product-categories/<int:id>', methods=['GET'])
@admin_required
def get_product_category(id):
    """Get single product category"""
    try:
        include_products = request.args.get('include_products', 'false').lower() == 'true'
        category = ProductCategory.query.get_or_404(id)
        return jsonify(category.to_dict(include_products=include_products)), 200
    except Exception as e:
        return jsonify({'message': 'Product category not found', 'error': str(e)}), 404

@admin_api_bp.route('/product-categories/<int:id>', methods=['PUT'])
@admin_required
def update_product_category(id):
    """Update product category"""
    try:
        category = ProductCategory.query.get_or_404(id)
        data = request.get_json()
        
        category.name = data.get('name', category.name)
        category.slug = data.get('slug', category.slug)
        category.description = data.get('description', category.description)
        category.display_order = data.get('display_order', category.display_order)
        
        db.session.commit()
        return jsonify(category.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to update product category', 'error': str(e)}), 500

@admin_api_bp.route('/product-categories/<int:id>', methods=['DELETE'])
@admin_required
def delete_product_category(id):
    """Delete product category"""
    try:
        category = ProductCategory.query.get_or_404(id)
        
        if category.products:
            return jsonify({'message': 'Cannot delete category with products'}), 400
        
        db.session.delete(category)
        db.session.commit()
        return jsonify({'message': 'Product category deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to delete product category', 'error': str(e)}), 500

# ==================== PRODUCTS MANAGEMENT ====================

@admin_api_bp.route('/products', methods=['GET'])
@admin_required
def get_products():
    """Get all products"""
    try:
        category_id = request.args.get('category_id')
        include_features = request.args.get('include_features', 'true').lower() == 'true'
        include_category = request.args.get('include_category', 'false').lower() == 'true'
        
        query = Product.query
        
        if category_id:
            query = query.filter_by(product_category_id=category_id)
        
        products = query.order_by(Product.display_order).all()
        return jsonify([p.to_dict(include_features=include_features, include_category=include_category) for p in products]), 200
    except Exception as e:
        return jsonify({'message': 'Failed to fetch products', 'error': str(e)}), 500

@admin_api_bp.route('/products', methods=['POST'])
@admin_required
def create_product():
    """Create new product with features"""
    try:
        data = request.get_json()
        
        product = Product(
            product_category_id=data.get('product_category_id'),
            name=data.get('name'),
            slug=data.get('slug'),
            max_amount=data.get('max_amount'),
            description=data.get('description'),
            repayment_period=data.get('repayment_period'),
            interest_rate=data.get('interest_rate'),
            icon_class=data.get('icon_class'),
            is_popular=data.get('is_popular', False),
            display_order=data.get('display_order', 0),
            is_active=data.get('is_active', True)
        )
        
        db.session.add(product)
        db.session.flush()  # Get product ID
        
        # Add features if provided
        features = data.get('features', [])
        for idx, feature_text in enumerate(features):
            if feature_text.strip():
                feature = ProductFeature(
                    product_id=product.id,
                    feature_text=feature_text,
                    display_order=idx
                )
                db.session.add(feature)
        
        db.session.commit()
        
        return jsonify(product.to_dict(include_features=True)), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to create product', 'error': str(e)}), 500

@admin_api_bp.route('/products/<int:id>', methods=['GET'])
@admin_required
def get_product(id):
    """Get single product"""
    try:
        product = Product.query.get_or_404(id)
        return jsonify(product.to_dict(include_features=True, include_category=True)), 200
    except Exception as e:
        return jsonify({'message': 'Product not found', 'error': str(e)}), 404

@admin_api_bp.route('/products/<int:id>', methods=['PUT'])
@admin_required
def update_product(id):
    """Update product"""
    try:
        product = Product.query.get_or_404(id)
        data = request.get_json()
        
        product.product_category_id = data.get('product_category_id', product.product_category_id)
        product.name = data.get('name', product.name)
        product.slug = data.get('slug', product.slug)
        product.max_amount = data.get('max_amount', product.max_amount)
        product.description = data.get('description', product.description)
        product.repayment_period = data.get('repayment_period', product.repayment_period)
        product.interest_rate = data.get('interest_rate', product.interest_rate)
        product.icon_class = data.get('icon_class', product.icon_class)
        product.is_popular = data.get('is_popular', product.is_popular)
        product.display_order = data.get('display_order', product.display_order)
        product.is_active = data.get('is_active', product.is_active)
        product.updated_at = datetime.utcnow()
        
        # Update features if provided
        if 'features' in data:
            # Delete existing features
            ProductFeature.query.filter_by(product_id=product.id).delete()
            
            # Add new features
            features = data.get('features', [])
            for idx, feature_text in enumerate(features):
                if feature_text.strip():
                    feature = ProductFeature(
                        product_id=product.id,
                        feature_text=feature_text,
                        display_order=idx
                    )
                    db.session.add(feature)
        
        db.session.commit()
        return jsonify(product.to_dict(include_features=True)), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to update product', 'error': str(e)}), 500

@admin_api_bp.route('/products/<int:id>', methods=['DELETE'])
@admin_required
def delete_product(id):
    """Delete product"""
    try:
        product = Product.query.get_or_404(id)
        db.session.delete(product)
        db.session.commit()
        return jsonify({'message': 'Product deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to delete product', 'error': str(e)}), 500

# ==================== DOWNLOADABLE FORMS MANAGEMENT ====================

@admin_api_bp.route('/forms', methods=['GET'])
@admin_required
def get_forms():
    """Get all downloadable forms"""
    try:
        category = request.args.get('category')
        query = DownloadableForm.query
        
        if category:
            query = query.filter_by(category=category)
        
        forms = query.order_by(DownloadableForm.upload_date.desc()).all()
        return jsonify([f.to_dict() for f in forms]), 200
    except Exception as e:
        return jsonify({'message': 'Failed to fetch forms', 'error': str(e)}), 500

@admin_api_bp.route('/forms', methods=['POST'])
@admin_required
def create_form():
    """Upload new form"""
    try:
        data = request.form
        file = request.files.get('file')
        
        if not file:
            return jsonify({'message': 'File is required'}), 400
        
        file_url = save_file(file, 'forms')
        
        # Get file size
        file.seek(0, os.SEEK_END)
        file_size = file.tell()
        file_size_mb = round(file_size / (1024 * 1024), 2)
        
        # Get file type
        file_type = file.filename.rsplit('.', 1)[1].upper() if '.' in file.filename else 'PDF'
        
        form = DownloadableForm(
            title=data.get('title'),
            category=data.get('category'),
            file_url=file_url,
            file_size=f'{file_size_mb} MB',
            file_type=file_type,
            is_active=data.get('is_active', 'true').lower() == 'true'
        )
        
        db.session.add(form)
        db.session.commit()
        
        return jsonify(form.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to upload form', 'error': str(e)}), 500

@admin_api_bp.route('/forms/<int:id>', methods=['GET'])
@admin_required
def get_form(id):
    """Get single form"""
    try:
        form = DownloadableForm.query.get_or_404(id)
        return jsonify(form.to_dict()), 200
    except Exception as e:
        return jsonify({'message': 'Form not found', 'error': str(e)}), 404

@admin_api_bp.route('/forms/<int:id>', methods=['PUT'])
@admin_required
def update_form(id):
    """Update form"""
    try:
        form = DownloadableForm.query.get_or_404(id)
        data = request.form
        file = request.files.get('file')
        
        if file:
            file_url = save_file(file, 'forms')
            form.file_url = file_url
            
            # Update file info
            file.seek(0, os.SEEK_END)
            file_size = file.tell()
            file_size_mb = round(file_size / (1024 * 1024), 2)
            form.file_size = f'{file_size_mb} MB'
            form.file_type = file.filename.rsplit('.', 1)[1].upper() if '.' in file.filename else 'PDF'
        
        form.title = data.get('title', form.title)
        form.category = data.get('category', form.category)
        form.is_active = data.get('is_active', str(form.is_active)).lower() == 'true'
        form.updated_at = datetime.utcnow()
        
        db.session.commit()
        return jsonify(form.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to update form', 'error': str(e)}), 500

@admin_api_bp.route('/forms/<int:id>', methods=['DELETE'])
@admin_required
def delete_form(id):
    """Delete form"""
    try:
        form = DownloadableForm.query.get_or_404(id)
        db.session.delete(form)
        db.session.commit()
        return jsonify({'message': 'Form deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to delete form', 'error': str(e)}), 500

@admin_api_bp.route('/forms/<int:id>/track-download', methods=['POST'])
@admin_required
def track_form_download(id):
    """Increment download count"""
    try:
        form = DownloadableForm.query.get_or_404(id)
        form.download_count += 1
        db.session.commit()
        return jsonify({'message': 'Download tracked', 'download_count': form.download_count}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to track download', 'error': str(e)}), 500