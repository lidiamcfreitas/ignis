#!/bin/bash

pushd "/Users/lidiafreitas/programming/ignis/backend" > /dev/null

echo "🔹 Checking for existing .env file..."
ENV_FILE=".env"
FIREBASE_FILE="firebaseServiceAccountKey.json"
GITIGNORE_FILE="../.gitignore"

# Create .env if it doesn't exist
if [ ! -f "$ENV_FILE" ]; then
    echo "🔹 Creating .env file..."
    echo "FIREBASE_CREDENTIALS=$FIREBASE_FILE" > "$ENV_FILE"
else
    echo "✅ .env already exists."
fi

# Add .env to .gitignore
if ! grep -q ".env" "$GITIGNORE_FILE"; then
    echo "🔹 Adding .env to .gitignore..."
    echo -e "\n# Environment Variables\n.env" >> "$GITIGNORE_FILE"
else
    echo "✅ .env is already in .gitignore."
fi

# Install python-dotenv if missing
if ! pip show python-dotenv > /dev/null 2>&1; then
    echo "🔹 Installing python-dotenv..."
    pip install python-dotenv
else
    echo "✅ python-dotenv is already installed."
fi

echo "✅ Environment setup complete!"
echo "📌 Your Firebase config path is stored in backend/.env and ignored by Git."
popd > /dev/null