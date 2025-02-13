#!/bin/bash

echo "🔹 Setting up Python virtual environment..."
python3 -m venv venv

echo "🔹 Activating virtual environment..."
source venv/bin/activate

echo "🔹 Installing dependencies..."
pip install --upgrade pip
pip install -r ../requirements.txt

echo "✅ Setup complete! To activate the virtual environment in the future, run:"
echo "   source venv/bin/activate"
