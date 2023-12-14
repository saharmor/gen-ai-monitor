from flask import Flask
from backend.frontend_data_adapter import enrich_models_report_with_static_data

from backend.update_models_data import update_models_data
app = Flask(__name__)

@app.route('/updated-benchmarks')
def update_benchmarks():
    updated_models_data = update_models_data()
    frontend_json = enrich_models_report_with_static_data(updated_models_data)
    return frontend_json

@app.route('/')
def hello_world():
    return 'Hello, World!'