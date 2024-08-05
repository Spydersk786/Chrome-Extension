from flask import Blueprint, request, jsonify
from database import audios
import base64

audios_bp = Blueprint('audios', __name__)

@audios_bp.route('/audios', methods=['POST'])
def upload_audio():
    data = request.json
    audio_base64 = data['audio']
    time = data['time']

    # Convert base64 audio data to binary
    audio_binary = base64.b64decode(audio_base64.split(',')[1])

    # Create a document with the audio binary and timestamp
    audio_document = {
        'audio_data': audio_binary,
        'time': time
    }

    # Insert the document into MongoDB
    result = audios.insert_one(audio_document)

    return jsonify({'status': 'success', 'inserted_id': str(result.inserted_id)})