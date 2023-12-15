from ast import Dict
from datetime import date
import json
import os
from litellm import completion

from frontend_data_adapter import INPUT_PROMPT, MODELS_TO_TEST, TEMP_REPORTS_DIR

FIXED_TEMPERATURE = 0.2
FIXED_MAX_TOKENS = 512


def generate_report_per_model(modelName) -> Dict:
    response = completion(model=modelName,
                          temperature=FIXED_TEMPERATURE,
                          max_tokens=FIXED_MAX_TOKENS,
                          messages=[{"content": INPUT_PROMPT, "role": "user"}],
                          )

    response_content = response['choices'][0]['message']['content']
    response_ms = response['_response_ms']
    usage_details = response['usage']['model_extra']
    prompt_tokens = usage_details['prompt_tokens']
    completion_tokens = usage_details['completion_tokens']
    total_tokens = usage_details['total_tokens']

    return {
        "modelName": modelName,
        "responseTimeMs": round(response_ms, 4),
        "promptTokensCount": prompt_tokens,
        "completionTokensCount": completion_tokens,
        "totalTokensCount": total_tokens,
        "outputGeneration": response_content
    }

def print_model_data(model_data: Dict):
    print(f"\nModel Name: {model_data['modelName']}")
    print(f"Response Time (ms): {model_data['responseTimeMs']}")
    print(f"Prompt Tokens: {model_data['promptTokensCount']}")
    print(f"Completion Tokens: {model_data['completionTokensCount']}")
    print(f"Total Tokens: {model_data['totalTokensCount']}")
    print(f"Response Content: {model_data['outputGeneration']}")
    print("\n")


def update_models_data():
    today = date.today().strftime("%Y-%m-%d")
    models_report_data = []

    for model in MODELS_TO_TEST:
        print(f"Fetching performance data for: {model}")
        
        # generate report per model or load existing json if exists for this model
        model_json_file = f'{TEMP_REPORTS_DIR}/{model}_{today}.json'
        if os.path.exists(model_json_file):
            with open(model_json_file, 'r') as infile:
                model_data = json.load(infile)
        else:
            model_data = generate_report_per_model(model)
            with open(model_json_file, 'w') as outfile:
                json.dump(model_data, outfile)

        models_report_data.append(model_data)
        print_model_data(model_data)
        print("\n")
    
    return models_report_data
    
