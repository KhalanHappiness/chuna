from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models import db
from flask_migrate import Migrate
import os

app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///chuna_sacco.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# JWT Configuration
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-key-change-in-production')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 3600  # 1 hour

# Upload settings
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
app.config['UPLOAD_FOLDER'] = os.path.join(BASE_DIR, 'static', 'uploads')
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

# Initialize CORS (allow React to make requests)
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000", "http://localhost:5173"],  # React dev servers
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    },
    r"/static/*": {
        "origins": ["http://localhost:3000", "http://localhost:5173"]
    }
})

# JWT error handlers
@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return {'message': 'Token has expired', 'error': 'token_expired'}, 401

@jwt.invalid_token_loader
def invalid_token_callback(error):
    return {'message': 'Invalid token', 'error': 'invalid_token'}, 401

@jwt.unauthorized_loader
def missing_token_callback(error):
    return {'message': 'Authorization token is missing', 'error': 'authorization_required'}, 401

# Serve uploaded files
@app.route('/static/uploads/<path:folder>/<path:filename>')
def serve_uploaded_file(folder, filename):
    """Serve uploaded files from the uploads directory"""
    try:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], folder)
        return send_from_directory(file_path, filename)
    except Exception as e:
        return {'error': 'File not found', 'message': str(e)}, 404

# Import and register blueprints AFTER app is created
from routes.auth_api import auth_api_bp
from routes.admin_api import admin_api_bp
from routes.public_api import public_api_bp

app.register_blueprint(auth_api_bp, url_prefix='/api/auth')
app.register_blueprint(admin_api_bp, url_prefix='/api/admin')
app.register_blueprint(public_api_bp, url_prefix='/api/public')

# Add this after registering all blueprints
print("\n" + "="*60)
print("REGISTERED ROUTES")
print("="*60)
for rule in app.url_map.iter_rules():
    methods = ','.join([m for m in rule.methods if m not in ['HEAD', 'OPTIONS']])
    print(f"{methods:10} {rule.rule:50} -> {rule.endpoint}")
print("="*60 + "\n")

@app.route('/')
def home():
    return "Chuna SACCO API - Running"

# Create upload folders
def create_upload_folders():
    folders = ['slider', 'news', 'staff', 'board', 'forms', 'about', 'awards']
    for folder in folders:
        path = os.path.join(app.config['UPLOAD_FOLDER'], folder)
        os.makedirs(path, exist_ok=True)
        print(f"Created/verified folder: {path}")

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        create_upload_folders()
    
    print(f"\nUpload folder: {app.config['UPLOAD_FOLDER']}")
    app.run(debug=True, port=5000, host='0.0.0.0')