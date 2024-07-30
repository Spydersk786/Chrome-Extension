from flask import Blueprint, request, jsonify
from database import urlsvisited

urls_bp = Blueprint('urls', __name__)

@urls_bp.route('/urlvisited', methods=['GET'])
def get_urls():
    try:
        logs = list(urlsvisited.find({}, {'_id': 0}))  # Exclude MongoDB _id field
        return jsonify(logs), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@urls_bp.route('/urlvisited', methods=['POST'])
def addurl():
    try:
        data = request.json
        url = data.get('url')
        time = data.get('time')

        existing_entry = urlsvisited.find_one({"url": url})

        if existing_entry:
            urlsvisited.update_one(
                {"url": url},
                {"$push": {"time": time}}
            )
        else:
            log_entry = {
                'url': url,
                'time': [time]
            }
            urlsvisited.insert_one(log_entry)
        return jsonify({"status": "success"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
