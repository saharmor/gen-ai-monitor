from ast import Dict
import json
from datetime import date
import os


INPUT_PROMPT = "What's the weather in SF"
LAST_UPDATE = "Dec 14th, 2023"
TEMP_REPORTS_DIR = "backend/temp_model_reports"

# https://docs.litellm.ai/docs/providers
MODELS_TO_TEST = [
    # "gpt-3.5-turbo",
    # "gpt-4-1106-preview",
    "gpt-4",
    # "claude-2.1"
]


def get_model_static_data(model_name: str):
    models_static_data = json.load(
        open('backend/models_static_data.json', 'r'))
    for model in models_static_data:
        if model['name'] == model_name:
            return model

    return None


def populate_frontend_json_overall(models_data: Dict):
    return {
        'inputPrompt': INPUT_PROMPT,
        'lastUpdate': LAST_UPDATE,
        'modelsData': models_data
    }


def populate_frontend_json_model(model_data: Dict, model_static_data: Dict):
    return {
        'name': model_static_data['name'],
        'displayName': model_static_data['displayName'],
        'lastChange': model_static_data['lastChange'],
        'pricePer1kTokensInput': model_static_data['pricePer1kTokensInput'],
        'pricePer1kTokensCompletion': model_static_data['pricePer1kTokensCompletion'],
        'currency': model_static_data['currency'],
        'mmlu': model_static_data['mmlu'],
        'chatArenaEloRanking': model_static_data['chatArenaEloRanking'],
        "promptTokensCount": model_data['promptTokensCount'],
        'generatedCompletion': model_data['outputGeneration'],
        'generatedCompletionTokenCount': model_data['completionTokensCount']
    }


def enrich_models_report_with_static_data(updated_models_data: Dict):
    # create the TEMP_REPORTS_DIR if it doesn't exist
    if not os.path.exists(TEMP_REPORTS_DIR):
        os.makedirs(TEMP_REPORTS_DIR)

    model_reports = []
    for model_data in updated_models_data:
        static_model_data = get_model_static_data(model_data['modelName'])
        model_reports.append(populate_frontend_json_model(
            model_data, static_model_data))

    overall_report = populate_frontend_json_overall(model_reports)
    today = date.today().strftime("%Y-%m-%d")
    with open(f'{TEMP_REPORTS_DIR}/overall_report_{today}.json', 'w') as outfile:
        json.dump(overall_report, outfile)
