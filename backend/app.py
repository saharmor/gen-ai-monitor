import json
from flask import Flask, jsonify
from flask_cors import CORS
from frontend_data_adapter import TEMP_REPORTS_DIR, enrich_models_report_with_static_data

from update_models_data import update_models_data
app = Flask(__name__)
CORS(app)


@app.route('/update-report')
def update_report():
    updated_models_data = update_models_data()
    print('updated_models_data', updated_models_data)
    frontend_json = enrich_models_report_with_static_data(updated_models_data)
    print('frontend_json', frontend_json)
    return jsonify(frontend_json)


@app.route('/fetch-report')
def fetch_report():
    with open(f'{TEMP_REPORTS_DIR}/overall_report.json', 'r') as report_file:
        frontend_json = json.load(report_file)
    return jsonify(frontend_json)
