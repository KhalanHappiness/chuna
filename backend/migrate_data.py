"""
SQLite to PostgreSQL Migration
Save this as migrate_db.py in your backend/ folder
"""

import os
import sys

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def export_from_sqlite():
    """Export data from SQLite database"""
    print("\n" + "="*60)
    print("STEP 1: EXPORTING FROM SQLITE")
    print("="*60)
    
    # Temporarily unset DATABASE_URL to force SQLite
    postgres_url = os.environ.pop('DATABASE_URL', None)
    
    from app import app, db
    from server.models import (
        SliderImage, NewsUpdate, Department, StaffMember, BoardMember,
        Product, ProductCategory, DownloadableForm, AboutContent, 
        CoreValue, Award
    )
    
    with app.app_context():
        data = {}
        
        try:
            data['slider_images'] = [s.to_dict() for s in SliderImage.query.all()]
            print(f"✓ Exported {len(data['slider_images'])} slider images")
        except Exception as e:
            print(f"✗ Error exporting slider images: {e}")
            data['slider_images'] = []
        
        try:
            data['news_updates'] = [n.to_dict() for n in NewsUpdate.query.all()]
            print(f"✓ Exported {len(data['news_updates'])} news updates")
        except Exception as e:
            print(f"✗ Error exporting news: {e}")
            data['news_updates'] = []
        
        try:
            data['departments'] = [d.to_dict() for d in Department.query.all()]
            print(f"✓ Exported {len(data['departments'])} departments")
        except Exception as e:
            print(f"✗ Error exporting departments: {e}")
            data['departments'] = []
        
        try:
            data['staff_members'] = [s.to_dict() for s in StaffMember.query.all()]
            print(f"✓ Exported {len(data['staff_members'])} staff members")
        except Exception as e:
            print(f"✗ Error exporting staff: {e}")
            data['staff_members'] = []
        
        try:
            data['board_members'] = [b.to_dict() for b in BoardMember.query.all()]
            print(f"✓ Exported {len(data['board_members'])} board members")
        except Exception as e:
            print(f"✗ Error exporting board: {e}")
            data['board_members'] = []
        
        try:
            data['product_categories'] = [c.to_dict() for c in ProductCategory.query.all()]
            print(f"✓ Exported {len(data['product_categories'])} product categories")
        except Exception as e:
            print(f"✗ Error exporting categories: {e}")
            data['product_categories'] = []
        
        try:
            data['products'] = [p.to_dict() for p in Product.query.all()]
            print(f"✓ Exported {len(data['products'])} products")
        except Exception as e:
            print(f"✗ Error exporting products: {e}")
            data['products'] = []
        
        try:
            data['downloadable_forms'] = [f.to_dict() for f in DownloadableForm.query.all()]
            print(f"✓ Exported {len(data['downloadable_forms'])} forms")
        except Exception as e:
            print(f"✗ Error exporting forms: {e}")
            data['downloadable_forms'] = []
        
        try:
            data['about_contents'] = [a.to_dict() for a in AboutContent.query.all()]
            print(f"✓ Exported {len(data['about_contents'])} about contents")
        except Exception as e:
            print(f"✗ Error exporting about: {e}")
            data['about_contents'] = []
        
        try:
            data['core_values'] = [v.to_dict() for v in CoreValue.query.all()]
            print(f"✓ Exported {len(data['core_values'])} core values")
        except Exception as e:
            print(f"✗ Error exporting values: {e}")
            data['core_values'] = []
        
        try:
            data['awards'] = [a.to_dict() for a in Award.query.all()]
            print(f"✓ Exported {len(data['awards'])} awards")
        except Exception as e:
            print(f"✗ Error exporting awards: {e}")
            data['awards'] = []
    
    # Restore DATABASE_URL
    if postgres_url:
        os.environ['DATABASE_URL'] = postgres_url
    
    return data

def import_to_postgres(data, postgres_url):
    """Import data to PostgreSQL database"""
    print("\n" + "="*60)
    print("STEP 2: IMPORTING TO POSTGRESQL")
    print("="*60)
    
    # Fix postgres:// to postgresql://
    if postgres_url.startswith('postgres://'):
        postgres_url = postgres_url.replace('postgres://', 'postgresql://', 1)
    
    os.environ['DATABASE_URL'] = postgres_url
    
    # Import fresh instances
    from app import app, db
    from server.models import (
        SliderImage, NewsUpdate, Department, StaffMember, BoardMember,
        Product, ProductCategory, DownloadableForm, AboutContent, 
        CoreValue, Award
    )
    
    with app.app_context():
        # Create all tables
        print("\n→ Creating tables...")
        db.create_all()
        print("✓ Tables created")
        
        # Import in order
        
        # 1. Product Categories (no dependencies)
        print("\n→ Importing product categories...")
        for item in data.get('product_categories', []):
            try:
                obj = ProductCategory(
                    name=item.get('name'),
                    slug=item.get('slug'),
                    description=item.get('description'),
                    icon=item.get('icon'),
                    display_order=item.get('display_order', 0)
                )
                db.session.add(obj)
            except Exception as e:
                print(f"  ✗ Error: {e}")
        db.session.commit()
        print(f"✓ Imported {len(data.get('product_categories', []))} categories")
        
        # 2. Departments
        print("\n→ Importing departments...")
        for item in data.get('departments', []):
            try:
                obj = Department(
                    name=item.get('name'),
                    slug=item.get('slug'),
                    description=item.get('description'),
                    icon=item.get('icon'),
                    display_order=item.get('display_order', 0),
                    is_active=item.get('is_active', True)
                )
                db.session.add(obj)
            except Exception as e:
                print(f"  ✗ Error: {e}")
        db.session.commit()
        print(f"✓ Imported {len(data.get('departments', []))} departments")
        
        # 3. Simple tables (no foreign keys)
        simple_tables = [
            ('slider_images', SliderImage),
            ('news_updates', NewsUpdate),
            ('about_contents', AboutContent),
            ('core_values', CoreValue),
            ('awards', Award),
            ('downloadable_forms', DownloadableForm),
        ]
        
        for data_key, model in simple_tables:
            print(f"\n→ Importing {data_key}...")
            for item in data.get(data_key, []):
                try:
                    # Remove id field
                    item_copy = {k: v for k, v in item.items() if k != 'id'}
                    obj = model(**item_copy)
                    db.session.add(obj)
                except Exception as e:
                    print(f"  ✗ Error: {e}")
            db.session.commit()
            print(f"✓ Imported {len(data.get(data_key, []))} {data_key}")
        
        # 4. Products (depends on categories)
        print("\n→ Importing products...")
        for item in data.get('products', []):
            try:
                item_copy = {k: v for k, v in item.items() if k != 'id'}
                obj = Product(**item_copy)
                db.session.add(obj)
            except Exception as e:
                print(f"  ✗ Error: {e}")
        db.session.commit()
        print(f"✓ Imported {len(data.get('products', []))} products")
        
        # 5. Staff (depends on departments)
        print("\n→ Importing staff members...")
        for item in data.get('staff_members', []):
            try:
                item_copy = {k: v for k, v in item.items() if k != 'id'}
                obj = StaffMember(**item_copy)
                db.session.add(obj)
            except Exception as e:
                print(f"  ✗ Error: {e}")
        db.session.commit()
        print(f"✓ Imported {len(data.get('staff_members', []))} staff")
        
        # 6. Board members
        print("\n→ Importing board members...")
        for item in data.get('board_members', []):
            try:
                item_copy = {k: v for k, v in item.items() if k != 'id'}
                obj = BoardMember(**item_copy)
                db.session.add(obj)
            except Exception as e:
                print(f"  ✗ Error: {e}")
        db.session.commit()
        print(f"✓ Imported {len(data.get('board_members', []))} board members")
        
        print("\n" + "="*60)
        print("MIGRATION COMPLETE!")
        print("="*60)

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("\nUsage: python migrate_db.py <POSTGRES_URL>")
        print("\nExample:")
        print("  python migrate_db.py 'postgresql://user:pass@host/db'")
        sys.exit(1)
    
    postgres_url = sys.argv[1]
    
    print("Starting migration...")
    print(f"Target: {postgres_url[:50]}...")
    
    # Step 1: Export from SQLite
    data = export_from_sqlite()
    
    # Step 2: Import to PostgreSQL
    import_to_postgres(data, postgres_url)
    
    print("\n✓ Done! Test your API:")
    print("  curl https://chuna.onrender.com/public/home")