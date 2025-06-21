from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np


model = joblib.load('random_forest_model.pkl')
scaler = joblib.load("scaler.pkl")


app = FastAPI()


class PredictionInput(BaseModel):
    sector: str
    category1: str
    category2: str
    material1: str
    material2: str
    weight: float


sector_map = {
    'Food & Beverage': 5,
    'Comm. equipm. & capital goods': 2,
    'Computer, IT & telecom': 3,
    'Chemicals': 1,
    'Construction & commercial materials': 4,
    'Home durables, textiles, & equipment': 6,
    'Packaging for consumer goods': 7,
    'Automobiles & components': 0
}

category_map_1 = {
    'Food & Beverage': 5,
    'Furniture': 6,
    'Electronics': 4,
    'Chemicals': 2,
    'Construction': 3,
    'Apparel': 0,
    'Packaging': 8,
    'Office Supplies': 7,
    'Automobiles & Components': 1,
    'Personal Care': 9
}

category_map_2 = {
    'Packaging': 7,
    'Office Supplies': 6,
    'Chemicals': 1,
    'Personal Care': 8,
    'Household Items': 4,
    'Computer Accessories': 2,
    'Metal Goods': 5,
    'Plastic Goods': 9,
    'Telecommunications': 10,
    'Automobiles & Components': 0,
    'Wood Products': 12,
    'Electronics': 3,
    'Textiles': 11
}

material_map_1 = {
    'Food Ingredients': 0,
    'Wood': 8,
    'Plastic': 6,
    'Textile fibers': 7,
    'Mineral': 3,
    'Others': 4,
    'Paper': 5,
    'Glass': 1,
    'Liquid Compound': 2
}

material_map_2 = {
    'Paper': 2,
    'Plastic': 3,
    'Metal': 0,
    'Others': 1,
    'others': 4 
}

@app.post("/predict")
def predict(input: PredictionInput):
    try:

        data = [[
            sector_map[input.sector],
            category_map_1[input.category1],
            category_map_2[input.category2],
            material_map_1[input.material1],
            material_map_2[input.material2],
            input.weight
        ]]


        scaled = scaler.transform(data)
        prediction = model.predict(scaled)

        return {"predicted_carbon_footprint": prediction[0]}
    
    except KeyError as e:
        return {"error": f"Invalid category value: {e}"}
