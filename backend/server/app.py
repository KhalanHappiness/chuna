from flask import Flask
from models import db, AdminUser, SliderImage, NewsUpdate, AboutContent, CoreValue, Award, Department, StaffMember, BoardMember, ProductCategory, Product, ProductFeature, DownloadableForm
from flask_migrate import Migrate

app = Flask(__name__)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///chuna_sacco.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key-change-this-in-production'

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)

@app.route('/')
def home():
    return "Hello, Flask is running!"

# Optional: Create default admin user
def create_default_admin():
    """Create default admin user if none exists"""
    with app.app_context():
        if AdminUser.query.count() == 0:
            admin = AdminUser(
                username='admin',
                email='admin@chunasacco.com',
                full_name='System Administrator',
                role='super_admin',
                is_active=True
            )
            admin.set_password('admin123')  # Change this!
            db.session.add(admin)
            db.session.commit()
            print("✅ Default admin user created: username='admin', password='admin123'")

if __name__ == '__main__':
    app.run(debug=True)