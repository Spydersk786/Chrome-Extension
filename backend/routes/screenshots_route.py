from flask import Blueprint, request
import base64
from io import BytesIO
from PIL import Image
import cloudinary
cloudinary.config(
    cloud_name="dphrbeodk",
    api_key="761472445947672",
    api_secret="HkIqw8LRyo2Tx9yNCP1F0nuQ3gQ"
)
import cloudinary.uploader
from database import screenshots

screenshots_bp = Blueprint('screenshots', __name__)

@screenshots_bp.route('/upload_screenshot', methods=['POST'])
def upload_screenshot():
    # Get the screenshot data from the request
    data = request.json['screenshot']
    time = request.json['time']

    screenshot_data = base64.b64decode(data.split(",")[1])
    
    # Save the screenshot to an in-memory file
    screenshot = Image.open(BytesIO(screenshot_data))
    buffer = BytesIO()
    screenshot.save(buffer, format="PNG")
    buffer.seek(0)

    # Upload the image to Cloudinary
    upload_result = cloudinary.uploader.upload(buffer, folder="/extension")

    url = upload_result["secure_url"]
    screenshots.insert_one({"url": url,"time":time})
    
    # Return the URL of the uploaded image
    return {"url": url}, 200