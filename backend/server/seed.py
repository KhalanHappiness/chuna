from app import app, db
from models import (
    AdminUser, SliderImage, NewsUpdate, AboutContent, CoreValue,
    Award, Department, StaffMember, BoardMember,
    ProductCategory, Product, ProductFeature, DownloadableForm
)
from datetime import datetime

with app.app_context():
    print("🔄 Dropping and recreating all tables...")
    db.drop_all()
    db.create_all()

    # --- ADMIN USER ---
    print("👤 Creating Admin User...")
    admin = AdminUser(
        username="admin",
        email="admin@example.com",
        full_name="Site Administrator",
        role="superadmin",
        is_active=True
    )
    admin.set_password("password123")

    # --- SLIDER IMAGES ---
    print("🖼️ Adding Slider Images...")
    sliders = [
        SliderImage(
            image_url="http://localhost:5173/src/assets/chuna%20mkting%20post%20copy.jpg",
            title="Welcome to Our Cooperative",
            subtitle="Empowering communities through savings and loans",
            link_url="/about-us",
            display_order=1
        ),
        SliderImage(
            image_url="http://localhost:5173/src/assets/chuna%20mkting%20post%20copy.jpg",
            title="Join Our Family",
            subtitle="Building financial freedom together",
            link_url="/join",
            display_order=2
        )
    ]

    # --- NEWS UPDATES ---
    print("📰 Adding News Updates...")
    news = [
        NewsUpdate(
            title="Annual General Meeting 2025",
            category="Events",
            excerpt="Join us for our upcoming AGM.",
            content="Details about the AGM will be shared soon.",
            author="Admin",
            is_featured=True
        ),
        NewsUpdate(
            title="New Savings Product Launched",
            category="Products",
            excerpt="Introducing our new high-yield savings plan.",
            content="This product offers great returns with flexible withdrawal options.",
            author="Admin"
        )
    ]

    # --- ABOUT CONTENT ---
    print("ℹ️ Adding About Us Content...")
    about_sections = [
        AboutContent(
            section_key="mission",
            title="Our Mission",
            content="To provide financial solutions that uplift our members.",
            image_url="/static/images/mission.jpg",
            display_order=1
        ),
        AboutContent(
            section_key="vision",
            title="Our Vision",
            content="A financially empowered community.",
            image_url="/static/images/vision.jpg",
            display_order=2
        )
    ]

    # --- CORE VALUES ---
    print("💎 Adding Core Values...")
    values = [
        CoreValue(title="Integrity", description="We uphold honesty and transparency.", icon_class="fa-solid fa-shield"),
        CoreValue(title="Teamwork", description="We work together to achieve our goals.", icon_class="fa-solid fa-users"),
        CoreValue(title="Excellence", description="We strive for the highest standards.", icon_class="fa-solid fa-star")
    ]

    # --- AWARDS ---
    print("🏆 Adding Awards...")
    awards = [
        Award(title="Best Cooperative Society", year=2024, description="Awarded for outstanding service.", icon_url="/static/icons/award1.png"),
        Award(title="Community Impact Award", year=2023, description="Recognized for making a positive community impact.", icon_url="/static/icons/award2.png")
    ]

    # --- DEPARTMENTS & STAFF ---
    print("🏢 Adding Departments and Staff...")
    dept1 = Department(
        name="Finance Department",
        slug="finance",
        description="Handles all financial operations.",
        key_responsibilities="Budgeting, auditing, and reporting.",
        icon_class="fa-solid fa-coins"
    )
    dept2 = Department(
        name="Customer Relations",
        slug="customer-relations",
        description="Manages member support and feedback.",
        key_responsibilities="Member assistance and communication.",
        icon_class="fa-solid fa-headset"
    )

    staff = [
        StaffMember(
            department=dept1,
            full_name="Jane Doe",
            position="Finance Manager",
            email="jane@coop.com",
            phone="+1234567890",
            education="MBA in Finance",
            bio="Over 10 years of experience in financial management."
        ),
        StaffMember(
            department=dept2,
            full_name="John Smith",
            position="Customer Service Lead",
            email="john@coop.com",
            phone="+1987654321",
            education="B.A. in Communications",
            bio="Dedicated to improving member experiences."
        )
    ]

    # --- BOARD MEMBERS ---
    print("👥 Adding Board Members...")
    board_members = [
        BoardMember(full_name="Alice Johnson", position="Chairperson", category="Executive", photo_url="/static/board/alice.jpg"),
        BoardMember(full_name="Michael Brown", position="Secretary", category="Executive", photo_url="/static/board/michael.jpg")
    ]

    # --- PRODUCTS ---
    print("💰 Adding Products...")
    loan_cat = ProductCategory(name="Loans", slug="loans", description="Various loan products for members.")
    savings_cat = ProductCategory(name="Savings", slug="savings", description="Savings products for financial growth.")

    product1 = Product(
        category=loan_cat,
        name="Personal Loan",
        slug="personal-loan",
        max_amount="₦1,000,000",
        description="Flexible personal loans at low interest rates.",
        repayment_period="12 months",
        interest_rate="8%",
        icon_class="fa-solid fa-wallet",
        is_popular=True
    )
    product2 = Product(
        category=savings_cat,
        name="Regular Savings",
        slug="regular-savings",
        max_amount="Unlimited",
        description="Encourage members to save regularly.",
        repayment_period="N/A",
        interest_rate="4%",
        icon_class="fa-solid fa-piggy-bank"
    )

    product_features = [
        ProductFeature(product=product1, feature_text="Quick approval process", display_order=1),
        ProductFeature(product=product1, feature_text="Low interest rate", display_order=2),
        ProductFeature(product=product2, feature_text="Earn competitive interest", display_order=1),
        ProductFeature(product=product2, feature_text="Withdraw anytime", display_order=2)
    ]

    # --- DOWNLOADABLE FORMS ---
    print("📄 Adding Downloadable Forms...")
    forms = [
        DownloadableForm(
            title="Loan Application Form",
            category="Loans",
            file_url="/static/forms/loan_application.pdf",
            file_size="200KB",
            file_type="PDF"
        ),
        DownloadableForm(
            title="Membership Registration Form",
            category="Membership",
            file_url="/static/forms/membership_form.pdf",
            file_size="180KB",
            file_type="PDF"
        )
    ]

    # --- COMMIT ALL ---
    db.session.add(admin)
    db.session.add_all(
        sliders + news + about_sections + values + awards +
        [dept1, dept2] + staff + board_members +
        [loan_cat, savings_cat] + [product1, product2] +
        product_features + forms
    )

    db.session.commit()
    print("✅ Database seeded successfully!")
