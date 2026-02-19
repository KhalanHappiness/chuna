import os
import sys
import json

# Unset DATABASE_URL temporarily for SQLite export
postgres_url = os.environ.pop('DATABASE_URL', None)

print("\n" + "="*60)
print("STEP 1: EXPORTING FROM SQLITE")
print("="*60)

# Import Flask app
try:
    # Try importing from run.py
    from run import app, db
    print("✓ Loaded app from run.py")
except ImportError:
    # Create app manually
    from flask import Flask
    from server.models import db as database
    
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///chuna_sacco.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    database.init_app(app)
    db = database
    print("✓ Created app manually")

from server.models import (
    SliderImage, NewsUpdate, Department, StaffMember, BoardMember,
    Product, ProductCategory, DownloadableForm, AboutContent, 
    CoreValue, Award
)

# Export data
with app.app_context():
    data = {}
    
    models_to_export = [
        ('slider_images', SliderImage),
        ('news_updates', NewsUpdate),
        ('departments', Department),
        ('staff_members', StaffMember),
        ('board_members', BoardMember),
        ('product_categories', ProductCategory),
        ('products', Product),
        ('downloadable_forms', DownloadableForm),
        ('about_contents', AboutContent),
        ('core_values', CoreValue),
        ('awards', Award),
    ]
    
    for key, model in models_to_export:
        try:
            items = model.query.all()
            data[key] = [item.to_dict() for item in items]
            print(f"✓ Exported {len(data[key])} {key}")
        except Exception as e:
            print(f"✗ Error exporting {key}: {e}")
            data[key] = []

# Save to JSON
with open('backup_data.json', 'w') as f:
    json.dump(data, f, indent=2, default=str)

print(f"\n✓ Data saved to backup_data.json")

# Now import to PostgreSQL
if postgres_url and len(sys.argv) > 1:
    print("\n" + "="*60)
    print("STEP 2: IMPORTING TO POSTGRESQL")
    print("="*60)
    
    # Use provided URL
    target_url = sys.argv[1]
    if target_url.startswith('postgres://'):
        target_url = target_url.replace('postgres://', 'postgresql://', 1)
    
    os.environ['DATABASE_URL'] = target_url
    
    # Reimport with PostgreSQL
    from flask import Flask
    from server.models import db as database
    from server.models import (
        SliderImage, NewsUpdate, Department, StaffMember, BoardMember,
        Product, ProductCategory, DownloadableForm, AboutContent, 
        CoreValue, Award
    )
    
    app2 = Flask(__name__)
    app2.config['SQLALCHEMY_DATABASE_URI'] = target_url
    app2.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    database.init_app(app2)
    
    with app2.app_context():
        print("\n→ Creating tables...")
        database.create_all()
        print("✓ Tables created")
        
        # Import order (respecting foreign keys)
        import_order = [
            ('product_categories', ProductCategory),
            ('departments', Department),
            ('slider_images', SliderImage),
            ('news_updates', NewsUpdate),
            ('about_contents', AboutContent),
            ('core_values', CoreValue),
            ('awards', Award),
            ('downloadable_forms', DownloadableForm),
            ('products', Product),
            ('staff_members', StaffMember),
            ('board_members', BoardMember),
        ]
        
        for key, model in import_order:
            print(f"\n→ Importing {key}...")
            count = 0
            for item in data.get(key, []):
                try:
                    item_copy = {k: v for k, v in item.items() if k != 'id'}
                    obj = model(**item_copy)
                    database.session.add(obj)
                    count += 1
                except Exception as e:
                    print(f"  ✗ Error: {e}")
            
            try:
                database.session.commit()
                print(f"✓ Imported {count} {key}")
            except Exception as e:
                database.session.rollback()
                print(f"✗ Commit error: {e}")
        
        print("\n" + "="*60)
        print("MIGRATION COMPLETE!")
        print("="*60)
        print("\n✓ Test your API:")
        print("  curl https://chuna.onrender.com/public/home")

else:
    print("\n⚠ No PostgreSQL URL provided. Data exported to backup_data.json only.")
    print("To import, run:")
    print(f"  python migrate_db.py 'your-postgres-url'")
